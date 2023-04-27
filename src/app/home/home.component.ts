import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trendeProducts: undefined | product[];
  popularProducts: undefined | product[];
  constructor(private product: ProductService) { }
  ngOnInit(): void {
    console.log("tess")
    this.product.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    });
    this.product.trendyProducts().subscribe((data) => {
      this.trendeProducts = data;
    })
  }

}
