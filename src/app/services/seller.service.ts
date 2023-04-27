import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignUp, login } from '../data-type';
import { flush } from '@angular/core/testing';
import { BehaviorSubject, flatMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLonginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }
  userSingUp(data: SignUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: "response" })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
      })
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogIn(data: login) {
    console.warn(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: "response" })
      .subscribe((result: any) => {
        console.warn(result)
        if (result && result.body && result.body.length) {
          console.warn("user logged in")
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        } else {
          console.warn("loggin fail")
          this.isLonginError.emit(true)
        }

      })
  }
}
