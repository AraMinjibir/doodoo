import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Shipment } from '../Modal/shipment';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { CollectionReference, DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(
    private firestore: Firestore,
    private http: HttpClient
  ) {}

  
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
    const trackingNumber = 'TRK-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    const shipmentData = { ...shipment, trackingNumber };

    console.log("Saving shipment to Firestore:", shipmentData);

    // Store it in Firestore
    await addDoc(this.getShipmentsCollection(), shipmentData);

    return trackingNumber; // Return tracking number to be used elsewhere
  }

  // Get a shipment by tracking number
  async getShipmentByTrackingNumber(trackingNumber: string): Promise<Shipment | null> {
    const shipmentQuery = query(this.getShipmentsCollection(), where('trackingNumber', '==', trackingNumber));
    const querySnapshot = await getDocs(shipmentQuery);

    if (querySnapshot.empty) {
      return null; // No shipment found
    }

    return querySnapshot.docs[0].data() as Shipment;
  }
}
