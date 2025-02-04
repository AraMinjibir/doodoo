import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

firestore: AngularFirestore = inject(AngularFirestore)

}
