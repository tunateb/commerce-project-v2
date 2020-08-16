import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AuthResponse } from 'src/app/types/authResponse.type';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  isLoading: boolean = false;

  public registerForm: FormGroup;

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        username: [null, Validators.compose([Validators.required])],
        email: [
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ),
          ]),
        ],
        password: [null, Validators.compose([Validators.minLength(6)])],
        confirmPassword: [null, Validators.compose([Validators.required])],
      },
      {
        validator: CustomValidators.passwordMatchValidator,
      }
    );
  }

  errorMsg = '';

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.registerForm = this.createSignupForm();
  }

  ngOnInit(): void {}

  register() {
    this.isLoading = true;

    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.value)
        .subscribe(this.registerSuccess.bind(this), (error) => {
          console.error('EEEE', error);
          this.errorMsg = error.message;
          this._snackbar.open(error.message, 'OK', {
            duration: 5000,
          });
          this.isLoading = false;
        });
    }
  }

  registerSuccess(response: AuthResponse) {
    this.userService.setUser(response.user);
    this.authService.setToken(response.jwt);
    this.cartService.createCart(response.user.id);

    this.registerForm.reset();

    this.isLoading = false;
    this.errorMsg = '';

    this.router.navigateByUrl('/');
  }
}
