import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchresult: undefined | product[];
  constructor(private activeRouter: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let query = this.activeRouter.snapshot.paramMap.get('query');
    query && this.product.searchProducts(query).subscribe((result) => {
      this.searchresult = result;

    })
  }

}
