export interface Shipment {
    weight: number;
    dimensions: string;
    contents: string;
    recipientName: string;
    recipientAddress: string;
    sendertEmail: string,
    recipientEmail: string;
    recipientPhone: string;
    shippingCost: number;
    trackingNumber: string;
  }
  