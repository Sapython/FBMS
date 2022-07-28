import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthenticationService,
    private alertify: AlertsAndNotificationsService
  ) {}

  ngOnInit(): void {}

  submit() {
    if (this.signUpForm.valid) {
      this.authService.signUpWithEmailAndPassword(
        this.signUpForm.value.email,
        this.signUpForm.value.password,
        this.signUpForm.value.name
      );
    } else {
      this.alertify.presentToast(
        'Please fill all the fields correctly',
        'info'
      );
    }
  }
}
