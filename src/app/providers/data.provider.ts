import { Injectable } from '@angular/core';
import { PageSetting } from '../structures/method.structure';
import { UserData } from '../structures/user.structure';

@Injectable()
export class DataProvider {
  public data: any;
  public pageSetting: PageSetting = {
    blur: false,
    lastRedirect: '',
    message: '',
    spinner: false,
    messageType: 'Error',
  };
  public userData: UserData | undefined;
  public loggedIn: boolean = false;
  public gettingUserData: boolean = true;
  public userID: string | undefined;
  public verifyEmail: boolean | undefined;
  public reloadPage: boolean = false;
}
