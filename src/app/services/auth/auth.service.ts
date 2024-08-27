import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { User } from 'src/app/interfaces/user.interface';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';



@Injectable({
  providedIn: 'root', // o en 'providedIn: ProfileModule' si está limitado a un módulo específico
})

export class AuthService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  router = inject(Router);

  getAuth() {
    return getAuth();
  }

  async signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  async signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  async signOut() {
    await this.auth.signOut();
    this.clearLocalStorage();

    this.router.navigateByUrl('/signin');
  }

  private clearLocalStorage() {
    localStorage.clear();
    localStorage.removeItem('userData');
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }


  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string): Promise<User> {
    const docSnap = await getDoc(doc(getFirestore(), path));
    return docSnap.data() as User;
  }


}


