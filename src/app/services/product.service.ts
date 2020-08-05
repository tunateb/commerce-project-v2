import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Product } from '../types/product.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  fetchProducts() {
    this.http.get(env.productsApiURL).subscribe((response: Product[]) => {
      this.products = response;
    });
  }

  getProducts() {
    return this.products;
  }
}
