import { inject, Injectable, NgZone } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Shipment } from '../Modal/shipment';
import { CollectionReference, doc, DocumentData,  setDoc, updateDoc } from 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private firestore: Firestore = inject(Firestore);
  constructor(private ngZone: NgZone) {}
  private getShipmentsCollection(): CollectionReference<DocumentData> {
    return collection(this.firestore, 'shipments');
  }
  

// Create a new shipment
async createShipment(shipment: Shipment): Promise<string> {
  if (!shipment || typeof shipment !== "object") {
    console.error("Invalid shipment data:", shipment);
    throw new Error("Invalid shipment data: Must be an object.");
  }

  // Generate a unique 12-character tracking number
  const trackingNumber = 'TRK-' + Math.random().toString(36).substring(2, 11).toUpperCase();

  let deliveryDays = 10; 

  if (shipment.recipientAdd) {
    try {
      const deliveryQuery = query(
        collection(this.firestore, 'deliveryTimes'),
        where('city', '==', shipment.recipientAdd)
      );

      const deliverySnapshot = await getDocs(deliveryQuery);

      if (!deliverySnapshot.empty) {
        const deliveryData = deliverySnapshot.docs[0].data();
        deliveryDays = deliveryData['EstimatedDays'] || 10;
      }
    } catch (error) {
      console.error("Error fetching delivery time:", error);
    }
  }

  // Generate an estimated delivery date
  const orderDate = new Date(); 
  orderDate.setDate(orderDate.getDate() + deliveryDays);
  const estimatedDeliveryDate = orderDate.toISOString().split('T')[0];

  // Add default status and tracking details
  const shipmentData = { 
    ...shipment, 
    trackingNumber, 
    estimatedDeliveryDate,
    status: "Pending" // <-- Ensure status is added
  };

  // Store in Firestore
  const shipmentRef = await addDoc(this.getShipmentsCollection(), shipmentData);

  return trackingNumber; // Return tracking number for reference
}




getShipmentByTrackingNumber(trackingNumber: string): Promise<Shipment | null> {
  console.log('Querying Firestore for tracking number:', `'${trackingNumber}'`);
  const shipmentsRef = collection(this.firestore, 'shipments');
  const q = query(shipmentsRef, where('trackingNumber', '==', trackingNumber));

  return getDocs(q)
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching shipment found for:', trackingNumber);
        return null;
      }
      // Assuming only one shipment per tracking number
      const shipment = snapshot.docs[0].data() as Shipment;
      console.log('Shipment found:', shipment);
      return shipment;
    })
    .catch(error => {
      console.error('Firestore query error:', error);
      return null;
    });
}


// by email
async getShipmentByRecipientEmail(email: string): Promise<Shipment | null> {
  try {
    const shipmentQuery = query(
      this.getShipmentsCollection(),
      where('recipientEm', '==', email)  // Ensure this matches your Firestore field name
    );
    
    const querySnapshot = await getDocs(shipmentQuery);

    if (querySnapshot.empty) {
      console.log("No shipment found for this email!");
      return null;  // No shipment found
    } else {
      const shipmentData = querySnapshot.docs[0].data() as Shipment;
      const docId = querySnapshot.docs[0].id; // Fetch document ID
      return { ...shipmentData, docId };  // Include the document ID in the return value
    }
  } catch (error) {
    console.error("Error fetching shipment:", error);
    throw new Error('Error fetching shipment');
  }
}


// Update shipment status and set the delivery confirmation date
async updateShipmentStatus(docId: string, updateData: Partial<Shipment>): Promise<void> {
  try {
    const shipmentRef = doc(this.getShipmentsCollection(), docId);

    // Use merge: true to update only specific fields instead of overwriting the whole document
    await setDoc(shipmentRef, updateData, { merge: true });  

    console.log("Shipment status updated successfully.");
  } catch (error) {
    console.error("Error updating shipment status:", error);
    throw new Error('Error updating shipment status');
  }
}

// Fetch all pickup requests (status = 'pending')
async getPickupRequests(): Promise<any[]> {
  try {
    const shipmentsRef = collection(this.firestore, 'shipments');
    const q = query(shipmentsRef, where('status', '==', 'Pending')); // Fetch only pending shipments

    const querySnapshot = await getDocs(q);
    const requests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log('📦 Fetched Pending Shipments:', requests);
    return requests;
  } catch (error) {
    console.error('❌ Error fetching pickup requests:', error);
    return [];
  }
}

// Fetch all delivery requests (status = 'picked up')
async getDeliveryRequests(): Promise<any[]> {
  const shipmentsRef = collection(this.firestore, 'shipments');
  const q = query(shipmentsRef, where('status', '==', 'picked up'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Update shipment status to 'picked up'
async pickupPackage(shipmentId: string): Promise<void> {
  const shipmentRef = doc(this.firestore, 'shipments', shipmentId);
  await updateDoc(shipmentRef, { status: 'picked up' });
}

// Update shipment status to 'delivered'
async deliverPackage(shipmentId: string): Promise<void> {
  const shipmentRef = doc(this.firestore, 'shipments', shipmentId);
  await updateDoc(shipmentRef, { status: 'delivered' });
}


  
}
