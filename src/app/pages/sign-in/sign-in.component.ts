import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    public authService: AuthenticationService,
    private alertify: AlertsAndNotificationsService
  ) {}

  ngOnInit(): void {}

  submit() {
    if (this.signInForm.valid) {
      this.authService.loginEmailPassword(
        this.signInForm.value.email,
        this.signInForm.value.password
      );
    } else {
      this.alertify.presentToast(
        'Please fill all the fields correctly',
        'info'
      );
    }
  }
}
