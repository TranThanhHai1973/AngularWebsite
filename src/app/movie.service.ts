import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  id: number | any;
  name: string | any;
  releaseYear: number | any;
  arrPeople = [
    { name: 'Trần Thanh Hải', age: 18 },
    { name: 'Nguyễn văn Tối', age: 12 },
    { name: 'Trần Danh Bao', age: 14 }
  ]
  public counter = 10;
  constructor() { }
  public BinhPhuog(n: number) {
    return n * n;
  }

}
