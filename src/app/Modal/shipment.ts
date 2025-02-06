import { Timestamp } from "firebase/firestore";

export interface Shipment {
    weight: number;
    dimensions: string;
    pckCont: string;
    recipientName: string;
    recipientAdd: string;
    senderName: string;
    sendertEm: string,
    recipientEm: string;
    recipientPhone: string;
    shippingCost: number;
    trackingNumber: string;
    estimatedDeliveryDate?: Timestamp;
    cost: number,
    isDelivered: boolean;
    docId: string;
  }
  