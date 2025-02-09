import { inject, Injectable } from '@angular/core';
import { Firestore, collection, doc, collectionData, addDoc, updateDoc, deleteDoc, setDoc  } from '@angular/fire/firestore';
import { Shipment } from '../Modal/shipment';
import { User } from '../Modal/user';
import { Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, fetchSignInMethodsForEmail } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private firestore: Firestore = inject(Firestore);
  private usersCollection = collection(this.firestore, 'users');
  private auth: Auth = inject( Auth)

  // Fetch all shipments
  getAllShipments(): Observable<Shipment[]> {
    const shipmentsCollection = collection(this.firestore, 'shipments');
    return collectionData(shipmentsCollection, { idField: 'id' }) as Observable<Shipment[]>;
  }
  

   // ✅ Get all users
   getAllUsers(): Observable<User[]> {
    return collectionData(this.usersCollection, { idField: 'id' }) as Observable<User[]>;
  }

  // ✅ Create a new user
  async createUser(userData: Partial<User>): Promise<string | void> {
    try {
        const { email, role, status } = userData;
        if (!email || !role || !status) {
            throw new Error('Missing required user fields');
        }

        // Check if the email already exists
        const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);
        if (signInMethods.length > 0) {
            console.warn(`User with email ${email} already exists. Skipping creation.`);
            
            // Update Firestore for existing user
            const userDocRef = doc(this.firestore, `users/${email}`);
            await setDoc(userDocRef, { email, role, status }, { merge: true });

            await sendPasswordResetEmail(this.auth, email);
            console.log(`Existing user updated, and password reset email sent to ${email}`);

            return '';  // ✅ Ensures the function returns a value in all cases
        }

        // Generate a temporary password
        const tempPassword = this.generateRandomPassword();
        console.log(`Generated password for ${email}: ${tempPassword}`); 

        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, tempPassword);
        const uid = userCredential.user.uid;

        // Store user details in Firestore
        const userDocRef = doc(this.firestore, `users/${uid}`);
        await setDoc(userDocRef, { uid, email, role, status });

        // Send password reset email
        await sendPasswordResetEmail(this.auth, email);
        console.log(`User added successfully! Password reset email sent to ${email}`);
        
        return tempPassword;  // ✅ Always returns a password or an empty string
    } catch (error) {
        console.error('Error adding user:', error);
        return '';  // ✅ Ensures a return value even in case of an error
    }
}


  // Function to generate a random temporary password
  private generateRandomPassword(): string {
    return Math.random().toString(36).slice(-8); // Generates an 8-character password
  }

  // ✅ Update a user
  async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    if (!userId) throw new Error('User ID is required to update');
    const userDocRef = doc(this.firestore, `users/${userId}`);
    await updateDoc(userDocRef, userData);
  }

  // ✅ Delete a user
  async deleteUser(userId: string): Promise<void> {
    if (!userId) throw new Error('User ID is required to delete');
    const userDocRef = doc(this.firestore, `users/${userId}`);
    await deleteDoc(userDocRef);
  }
}