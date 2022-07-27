import { Timestamp } from '@angular/fire/firestore';

export type UserData = {
  id?: string;
  email: string;
  emailVerified: boolean;
  created: Timestamp;
  name: string;
  photoURL?: string;
};
