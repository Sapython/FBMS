import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserData } from 'src/app/structures/user.structure';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  @Output() close:EventEmitter<any> = new EventEmitter();
  accessLevels: string[] = ['Admin', 'Supervisor', 'Head', 'General Manager', 'Local Manager','Staff Manager','Staff','Biller Operator','Kiosk Operator','Kitchen Operator','Waiter','Cashier','Biller'];
  constructor() { }
  newUserForm:FormGroup = new FormGroup({
    name:new FormControl(''),
    email:new FormControl(''),
    role:new FormControl(''),
    password:new FormControl(''),
    confirmPassword:new FormControl('')
  })
  ngOnInit(): void {
  }

  submit(){
    if(this.newUserForm.valid){
    }
  }

  closeModal(){
    if(confirm('Are you sure you want to cancel')){
      this.close.emit();
    }
  }

}
