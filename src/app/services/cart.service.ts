import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { UserService } from './user.service';
import { Cart } from '../types/cart.type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  userCart: Cart;

  constructor(private http: HttpClient, private userService: UserService) {}

  get user() {
    return this.userService.getUser();
  }

  fetchUserCart() {
    this.http.get(`${env.cartsApiURL}?user=2`).subscribe((response: Cart) => {
      // console.log(response);
      this.userCart = response;
    });
  }

  getUserCart() {
    return this.userCart;
  }
}
