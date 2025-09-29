import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import type { User } from '../types';

// Kullanıcı kayıt
export const registerUser = async (email: string, password: string, firstName: string, lastName: string): Promise<User> => {
  try {
    // Firebase Auth'da kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Kullanıcı profilini güncelle
    await updateProfile(firebaseUser, {
      displayName: `${firstName} ${lastName}`
    });

    // Firestore'da kullanıcı bilgilerini kaydet
    const userData: User = {
      firstName,
      lastName,
      email,
      uid: firebaseUser.uid
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), userData);

    return userData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Kullanıcı giriş
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Firestore'dan kullanıcı bilgilerini al
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

    if (userDoc.exists()) {
      return userDoc.data() as User;
    } else {
      throw new Error('Kullanıcı bilgileri bulunamadı');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Kullanıcı çıkış
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Firebase User'ı User tipine dönüştür
export const mapFirebaseUser = async (firebaseUser: FirebaseUser): Promise<User | null> => {
  try {
    // Önce displayName'den bilgileri almaya çalış
    if (firebaseUser.displayName) {
      const [firstName, ...lastNameParts] = firebaseUser.displayName.split(' ');
      return {
        firstName,
        lastName: lastNameParts.join(' ') || '',
        email: firebaseUser.email || '',
        uid: firebaseUser.uid
      };
    }

    // Firestore'dan almaya çalış
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

    if (userDoc.exists()) {
      return userDoc.data() as User;
    }

    // Fallback - sadece email ile
    return {
      firstName: firebaseUser.email?.split('@')[0] || 'Kullanıcı',
      lastName: '',
      email: firebaseUser.email || '',
      uid: firebaseUser.uid
    };
  } catch (error) {
    console.error('Kullanıcı bilgileri alınamadı:', error);
    // Fallback - sadece email ile
    return {
      firstName: firebaseUser.email?.split('@')[0] || 'Kullanıcı',
      lastName: '',
      email: firebaseUser.email || '',
      uid: firebaseUser.uid
    };
  }
};