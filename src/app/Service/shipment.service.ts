import { inject, Injectable, NgZone } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Shipment } from '../Modal/shipment';
import { CollectionReference, doc, DocumentData, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';


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

// Generate a unique estimated delivery date
const orderDate = new Date(); 
orderDate.setDate(orderDate.getDate() + deliveryDays);

// Format as YYYY-MM-DD
const estimatedDeliveryDate = orderDate.toISOString().split('T')[0];
const shipmentData = { ...shipment, trackingNumber, estimatedDeliveryDate };
await addDoc(this.getShipmentsCollection(), shipmentData);

  // Store it in Firestore
  await addDoc(this.getShipmentsCollection(), shipmentData);

  return trackingNumber; // Return tracking number to be used elsewhere
}



  // Get a shipment by tracking number
  async getShipmentByTrackingNumber(trackingNumber: string): Promise<Shipment | null> {
    return new Promise<Shipment | null>((resolve, reject) => {
      this.ngZone.run(async () => {
        try {
          const shipmentQuery = query(this.getShipmentsCollection(), where('trackingNumber', '==', trackingNumber));
          const querySnapshot = await getDocs(shipmentQuery);
  
          if (querySnapshot.empty) {
            resolve(null); // No shipment found
          } else {
            const shipmentData = querySnapshot.docs[0].data() as Shipment;
            resolve(shipmentData);
          }
        } catch (error) {
          reject(error);
        }
      });
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
async updateShipmentStatus(docId: string, updatedShipmentData: Shipment): Promise<void> {
  try {
    const shipmentRef = doc(this.getShipmentsCollection(), docId);
    await setDoc(shipmentRef, updatedShipmentData, { merge: true });  // Update the document with the new data
  } catch (error) {
    console.error("Error updating shipment status:", error);
    throw new Error('Error updating shipment status');
  }
}


  
}
