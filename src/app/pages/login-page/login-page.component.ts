import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AuthResponse } from '../../types/authResponse.type';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isLoading: boolean = false;
  errorMsg: string = '';
  loginForm = new FormGroup({
    identifier: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get identifier() {
    return this.loginForm.get('identifier');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMsg = '';

      this.authService
        .login(this.loginForm.value)
        .subscribe(this.loginSuccess.bind(this), this.loginError);
    }
  }

  loginError = (error) => {
    this.errorMsg = error.message;
    this.isLoading = false;
  };

  loginSuccess(response) {
    this.authService.setToken(response.jwt);
    this.userService.setUser(response.user);
    this.cartService.fetchUserCart(response.user.id);

    this.isLoading = false;
    this.loginForm.reset();

    this.router.navigateByUrl('/');
  }
}
