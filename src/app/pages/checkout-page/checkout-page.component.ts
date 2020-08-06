import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {

  get userAddress() {
    return this.addressService.getUserAddress()
  }
 

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.addressService.fetchUserAddress()
  }
}
