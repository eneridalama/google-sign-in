import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({});
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  errorMessage: string = '';

  constructor(private authService: AuthService) {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  signIn() {
    this.authService
      .signIn({
        email: this.signInForm.value.email,
        password: this.signInForm.value.password,
      })
      .pipe(
        tap(
          (res) => {},
          (error) => {
            const errorList = error.error.message;
            this.errorMessage = errorList;
          }
        )
      )
      .subscribe();
  }
}
