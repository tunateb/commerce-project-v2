import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantity'
})
export class QuantityPipe implements PipeTransform {

  transform(product, orders, ...args: unknown[]): unknown {
    const order = orders.find(order => order.product === product.id)

    return order.quantity;
  }

}
