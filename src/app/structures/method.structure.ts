export type PageSetting = {
  title: string;
  blur: boolean;
  overlay:boolean;
  lastRedirect: string;
  message: string;
  messageType: 'Error' | 'Warning' | 'Success' | 'Info';
  spinner: boolean;
};

export type ExtraLoginGoogleInfo = {
  phoneNumber: string;
};

export type ExtraLoginEmailInfo = {
  displayName: string;
  phoneNumber: string;
  photoURL: string;
};
