import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/types/product.type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  get userCart() {
    return this.cartService.getUserCart();
  }

  get user() {
    return this.userService.getUser()
  }

  constructor(private cartService: CartService, private userService: UserService) {}

  ngOnInit(): void {
    this.cartService.fetchUserCart();
  }

  getTotal() {
    const products = this.userCart[0].products;
    let total = 0;

    for (let i = 0; i < products.length; i++) {
      total += products[i].price;
    }
    return total;
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product, this.user.id )
  }
}
