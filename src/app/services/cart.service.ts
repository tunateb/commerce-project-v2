import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Cart } from '../types/cart.type';
import { Product } from '../types/product.type';
import { Order } from '../types/order.type';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private userCart: Cart;
  private cartProducts: Product[];

  constructor(
    private http: HttpClient,
    private orderService: OrderService,
  ) {}

  fetchUserCart(userId: number) {
    this.http.get(`${env.cartsApiURL}?user=${userId}`)
      .subscribe((response: Cart) => {
        this.userCart = response[0];
        this.fetchCartDetailsById(this.userCart.orders)
      });
  }

  resetCart() {
    this.userCart = null;
    this.cartProducts = null;
  }

  getUserCart() {
    return this.userCart;
  }

  getCartProducts() {
    return this.cartProducts;
  }

  fetchCartDetailsById(orders) {
    const query = orders.map(order => `id_in=${order.product}`).join('&')

    this.http.get(`${env.productsApiURL}?${query}`)
      .subscribe((response: Product[]) => {
        this.cartProducts = response
      })
  }

  createCart(userId) {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const newCart = {
      user: userId,
      orders: []
    }

    return this.http.post(`${env.cartsApiURL}`, newCart, httpOptions)
  }

  addToCart(newProduct: Product, userId: number) {
    const existingOrder = this.userCart.orders.find(order => order.product === newProduct.id)

    if (existingOrder) {
      this.orderService.updateOrder(existingOrder)
        .subscribe(response => {
          this.fetchUserCart(userId)
        })
    } else {
      this.orderService.createOrder(newProduct.id, userId)
        .subscribe((response: Order) => {
          this.updateCart(response.id, userId)
            .subscribe(response => {
              this.fetchUserCart(userId)
            })
        })
    }
  }

  updateCart(orderId: number, userId: number) {
    console.log('usercart11', this.userCart)
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const updatedCart = {
      ...this.userCart,
      user: userId,
      orders: [...this.userCart.orders, orderId]
    }

    return this.http.put(
      `${env.cartsApiURL}/${this.userCart.id}`,
      updatedCart,
      httpOptions
    )
  }

  removeFromCart(product: Product, userId: number) {
    // const productIndex = this.userCart.products.findIndex(
    //   (p) => p.id === product.id
    // );

    // this.userCart.products.splice(productIndex, 1);

    // const updatedCart: Cart = {
    //   products: this.userCart.products,
    //   user: userId,
    //   id: this.userCart.id,
    // };

    // this.updateOrCreateCart(updatedCart);
  }
}
