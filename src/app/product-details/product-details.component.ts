import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product | any;
  productQuantity: number = 1;
  removeCart = false;
  itemId: undefined | [];
  cartData: product | undefined;
  constructor(private activeRouter: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRouter.snapshot.paramMap.get('productId')
    productId && this.product.getproduct(productId).subscribe((result) => {
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if (cartData && productId) {
        let items = JSON.parse(cartData);
        items = items.find((e: product) => e.id.toString() == productId);
        this.removeCart = items === undefined ? false : items.lenght == 0 ? false : true;

      }
      // let user = localStorage.getItem('user');
      // if (user) {
      //   let userId = user && JSON.parse(user).id;
      //   this.product.getCartList(userId);
      //   this.product.cartData.subscribe((result) => {
      //     let item = result.filter((item: product) => {
      //       productId?.toString() === item.productId?.toString()
      //     })
      //     if (item.lenght) {
      //       this.removeCart = true
      //     }
      //   })

      // }
    })
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity -= 1;
    }
  }
  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }

  }
  removeToCart(productId: number) {
    this.product.removeItemFromCart(productId)
    this.removeCart = false
  }

}
