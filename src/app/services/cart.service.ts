import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { UserService } from './user.service';
import { Cart } from '../types/cart.type';
import { User } from '../types/user.type';
import { Product } from '../types/product.type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private userCart: Cart;

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

  updateCart(updatedCart: Cart) {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };

    this.http
      .put(
        `${env.cartsApiURL}/${this.userCart[0].id}`,
        updatedCart,
        httpOptions
      )
      .subscribe((response: Cart) => {
        this.userCart[0] = response;
      });
  }

  addToCart(newProduct: Product) {
    this.userCart[0].products.push(newProduct);

    const updatedCart: Cart = {
      products: this.userCart[0].products,
      user: this.user.id,
      id: this.userCart[0].id,
    };
    
    this.updateCart(updatedCart)

    // console.log(updatedCart)
  }

  removeFromCart(product) {
    const productIndex = this.userCart[0].products.findIndex(
      (p) => p.id === product.id
    );

    this.userCart[0].products.splice(productIndex, 1);
 

    const updatedCart: Cart = {
      products: this.userCart[0].products,
      user: this.user.id,
      id: this.userCart[0].id,
    };

    this.updateCart(updatedCart)
    
  }
}
