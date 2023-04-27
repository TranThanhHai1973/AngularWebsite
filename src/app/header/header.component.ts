import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartItems = 0;
  searchResult: undefined | product[];
  menuType: String = "default";
  sellername: string = "";
  userName: string = "";
  constructor(private router: Router, private product: ProductService) { }

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        console.warn(val.url)
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn("in seller area")
          this.menuType = "seller"
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0]
            this.sellername = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore)
          this.userName = userData.name;
          this.menuType = 'user';
        } else {
          console.warn("outside seller")
          this.menuType = "default"
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    })
  }


  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  UserLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.product.cartData.emit([]);
    localStorage.removeItem('seller')
    localStorage.removeItem('user')
    localStorage.removeItem('localCart')
    localStorage.removeItem('cart')
  }
  searchProduct(query: KeyboardEvent) {
    const element = query.target as HTMLInputElement;
    console.warn(element)
    this.product.searchProducts(element.value).subscribe((result) => {
      if (result.length > 5) {
        result.length = 5;
      }
      this.searchResult = result;
    })
  }
  hidenSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    this.router.navigate([`search/${val}`])

  }
  redirectToDetails(id: number) {
    this.router.navigate(['/details/' + id])

  }
}
