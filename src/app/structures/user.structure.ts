import { Timestamp } from '@angular/fire/firestore';

export type UserData = {
  id?: string;
  email: string;
  emailVerified: boolean;
  created: Timestamp;
  name: string;
  photoURL?: string;
  access:UserAccess;
};
export type UserAccess = {
  access:'admin' | 'inventoryManager'|'generalManager'|'inventoryManager'|'salesManager'|'salesPerson'|'customer'|'guest';
}
