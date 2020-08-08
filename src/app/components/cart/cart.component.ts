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

  get cartProducts() {
    return this.cartService.getCartProducts();
  }

  get user() {
    return this.userService.getUser()
  }

  get getTotal() {
    if (this.cartProducts) {
      return this.cartProducts.reduce((total, product) => {
        const productOrder = this.userCart.orders.find(order => order.product === product.id)
  
        const productTotalPrice = product.price * productOrder.quantity
  
        return total + productTotalPrice;
      }, 0)
    }
  }

  constructor(private cartService: CartService, private userService: UserService) {}

  ngOnInit(): void {}

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product, this.user.id )
  }
}
