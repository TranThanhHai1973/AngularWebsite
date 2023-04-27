import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp, login } from '../data-type';
import { flush } from '@angular/core/testing';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  authError: string = '';

  constructor(private seller: SellerService) { }

  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data: SignUp): void {
    this.seller.userSingUp(data)
  }
  login(data: login): void {
    this.authError = "";
    this.seller.userLogIn(data)
    this.seller.isLonginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Tên tài khoản hoặc mật khẩu không đúng";
      }
    })
  }
  openLogin() {
    this.showLogin = true;
  }
  opensignUp() {
    this.showLogin = false;

  }
}
