import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  get products() {
    return this.productService.getProducts();
  }

  get filteredProducts() {
    return this.productService.getFilteredProducts();
  }

  get user() {
    return this.userService.getUser();
  }

  constructor(
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.productService.fetchProducts();
    this.productService.fetchCategories();
  }
}
