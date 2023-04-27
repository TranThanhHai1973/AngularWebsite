import { Component, OnInit } from '@angular/core';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  shippingList: any | [];
  productList: any | cart[];
  priceConver: any;
  discountConver: any;
  taxConver: any;
  deliveryConver: any;
  totalConver: any;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };
  constructor(private router: Router) { }
  ngOnInit(): void {
    let productCar = localStorage.getItem("localCart");

    // let productid = this.route.snapshot.paramMap.get('id');
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
    this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

    // price
    let number = this.priceSummary.price;
    let formattedNumber = number.toLocaleString();
    this.priceConver = formattedNumber
    // 
    let number5 = this.priceSummary.total;
    let formattedNumber5 = number5.toLocaleString();
    this.totalConver = formattedNumber5

  }
  orderData(data: any) {
    //console.warn(data);
    let productCar = localStorage.getItem("localCart");
    if (productCar) {
      let productCar = localStorage.getItem("localCart");
      localStorage.setItem('shipping', JSON.stringify([data]));
      let getShipping = localStorage.getItem('shipping')
      if (getShipping) {
        alert("Order Success");
        localStorage.removeItem("shipping");
        localStorage.removeItem("localCart");
        this.router.navigate(["/"]);
        location.reload();

      }
      //let listProductCar = productCar && JSON.parse(productCar);
    }


  }


}
