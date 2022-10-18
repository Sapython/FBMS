import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PageSetting } from '../structures/method.structure';
import { UserData } from '../structures/user.structure';

@Injectable()
export class DataProvider {
  public data: any;
  public pageSetting: PageSetting = {
    blur: false,
    title:'',
    overlay: false,
    lastRedirect: '',
    message: '',
    spinner: false,
    messageType: 'Error',
  };
  public guests: any[] = [];
  public currentProject:Project;
  public projects:any[] = []
  public overlayDismissed:Subject<boolean> = new Subject<boolean>();
  public userData: UserData | undefined;
  public loggedIn: boolean = false;
  public gettingUserData: boolean = true;
  public userID: string | undefined;
  public verifyEmail: boolean | undefined;
  public reloadPage: boolean = false;
}

type Project = {
  projectName: string;
  projectId: string;
  mails: string[];
}