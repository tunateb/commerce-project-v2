import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Address } from '../types/address.type';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private userAddress: Address;

  constructor(private http: HttpClient) {}

  fetchUserAddress() {
    this.http
      .get(`${env.addressApiURL}/?user=2`)
      .subscribe((response: Address) => {
        console.log(response);
        this.userAddress = response;
      });
  }

  getUserAddress() {
    return this.userAddress;
  }
}
