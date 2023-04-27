import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Route, Router } from '@angular/router';
import { cart, priceSummary, product } from '../data-type';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  productList: any | cart[];
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };
  priceConver: any;
  discountConver: any;
  taxConver: any;
  deliveryConver: any;
  totalConver: any;
  items: [] | any;
  constructor(private product: ProductService, private route: Router) { }
  ngOnInit(): void {

    let productCar = localStorage.getItem("localCart");
    let listProductCar = productCar && JSON.parse(productCar);
    this.productList = listProductCar
    let price = 0;
    this.productList.forEach((item: any) => {
      let quanty = parseFloat(item.quantity)
      console.log(typeof quanty);

      if (item.quantity) {
        price = price + (+parseFloat(item.price) * quanty)
      }
    });
    this.priceSummary.price = price;
    this.priceSummary.discount = price / 10;
    this.priceSummary.tax = price / 10;
    this.priceSummary.delivery = 100;
    this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

    // price
    let number = this.priceSummary.price;
    let formattedNumber = number.toLocaleString();
    this.priceConver = formattedNumber

    // discount
    let number2 = this.priceSummary.discount;
    let formattedNumber2 = number2.toLocaleString();
    this.discountConver = formattedNumber2
    // tax
    let number3 = this.priceSummary.tax;
    let formattedNumber3 = number3.toLocaleString();
    this.taxConver = formattedNumber3
    // delivery
    let number4 = this.priceSummary.delivery;
    let formattedNumber4 = number4.toLocaleString();
    this.deliveryConver = formattedNumber4
    // 
    let number5 = this.priceSummary.total;
    let formattedNumber5 = number5.toLocaleString();
    this.totalConver = formattedNumber5
  }
  checkout() {
    this.route.navigate(["/checkout"])
  }
  removecart(id: number) {
    // let itemLocal: any = localStorage.getItem('localCart');
    // this.items = JSON.parse(itemLocal);
    // this.items = this.items.filter((item: product) => id !== item.id);
    // localStorage.setItem('localCart', JSON.stringify(this.items));

    const index = this.productList.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      this.productList.splice(index, 1);
      localStorage.setItem('localCart', JSON.stringify(this.productList));
      location.reload();

    }

  }
}



