import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | [] | any>();
  constructor(private http: HttpClient) { }
  addProduct(data: product) {
    return this.http.post("http://localhost:3000/products", data);

  }
  productList() {
    return this.http.get<product[]>("http://localhost:3000/products");
  }
  deleteproduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getproduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product: product) {
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product);
  }
  popularProducts() {
    return this.http.get<product[]>("http://localhost:3000/products?_limit=5");
  }
  trendyProducts() {
    return this.http.get<product[]>("http://localhost:3000/products?_limit=20");
  }
  searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }
  localAddToCart(data: product) {
    let carData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit(data)
    } else {
      carData = JSON.parse(localCart);
      carData.push(data);
      localStorage.setItem('localCart', JSON.stringify(carData));
      this.cartData.emit(carData)
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);

    }
  }
  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getToCart() {
    return this.http.get('http://localhost:3000/cart');
  }
  getCartList(userId: number) {
    return this.http.get('http://localhost:3000/cart?userId=' + userId, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);
        if (result && result.body) {
          //this.cartData.emit([]);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart?userId=' + cartId)
  }
  currentCart() {
    return this.http.get<cart[]>('http://localhost:300/cart')
  }

}
