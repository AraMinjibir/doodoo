import { inject, Injectable } from '@angular/core';
import { Firestore, collection, doc, collectionData, addDoc, updateDoc, deleteDoc, setDoc  } from '@angular/fire/firestore';
import { Shipment } from '../Modal/shipment';
import { User } from '../Modal/user';
import { Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { DialogService } from './dialog.service';
import { TuiDialogService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private firestore: Firestore = inject(Firestore);
  private usersCollection = collection(this.firestore, 'users');
  private auth: Auth = inject( Auth);
  private readonly dialogs = inject(TuiDialogService);
  private theme = { color: '#ff7043' }; 

  protected showDialog(message: string, title: string): void {
        this.theme.color = '#ffdd2d'; 
        this.dialogs.open(message, { label: title }).subscribe({
          complete: () => {
            this.theme.color = '#ff7043'; // ✅ Reset color after closing
          },
        });
      }
    
  // Fetch all shipments
  getAllShipments(): Observable<Shipment[]> {
    const shipmentsCollection = collection(this.firestore, 'shipments');
    return collectionData(shipmentsCollection, { idField: 'id' }) as Observable<Shipment[]>;
  }
  

   // Get all users
   getAllUsers(): Observable<User[]> {
    return collectionData(this.usersCollection, { idField: 'id' }) as Observable<User[]>;
  }

  //  Create a new user
  async createUser(userData: Partial<User>): Promise<string | void> {
    try {
      const { email, role, status } = userData;
      if (!email || !role || !status) {
        throw new Error('Missing required user fields');
      }

      const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);
      if (signInMethods.length > 0) {
        await setDoc(doc(this.firestore, `users/${email}`), { email, role, status }, { merge: true });
        await sendPasswordResetEmail(this.auth, email);

        this.showDialog(`Existing user updated, and password reset email sent to ${email}`, 'User Update');
        return '';  
      }
      // Generate a random password
      const tempPassword = this.generateRandomPassword();
        console.log(`Generated password for ${email}: ${tempPassword}`); 
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, tempPassword);
      const uid = userCredential.user.uid;

      await setDoc(doc(this.firestore, `users/${uid}`), { uid, email, role, status });
      await sendPasswordResetEmail(this.auth, email);

      this.showDialog(`User added successfully! Password reset email sent to ${email}`, 'Success');
      return tempPassword;  
    } catch (error) {
      this.showDialog(`Error adding user: ${error.message}`, 'Error');
      return '';  
    }
  }

  // Function to generate a random temporary password
  private generateRandomPassword(): string {
    return Math.random().toString(36).slice(-8); // Generates an 8-character password
  }

  //  Update a user
  async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    if (!userId) throw new Error('User ID is required to update');
    const userDocRef = doc(this.firestore, `users/${userId}`);
    await updateDoc(userDocRef, userData);
    this.showDialog( 'details is updated successfully', 'Success');
  }

  // Delete a user
  async deleteUser(userId: string): Promise<void> {
    if (!userId) throw new Error('User ID is required to delete');
    const userDocRef = doc(this.firestore, `users/${userId}`);
    await deleteDoc(userDocRef);
    this.showDialog( 'details is deleted successfully', 'Success');
  }
}