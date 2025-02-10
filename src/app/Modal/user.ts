import { Timestamp } from "firebase/firestore/lite";

export interface User {
        id: string;
        name:string;
        email: string;
        role: string;
        createdAt: string;
        status: string
      
}
