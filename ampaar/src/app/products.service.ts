import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = "http://192.168.2.69:8080/"

  constructor(private http: HttpClient) { }

  getUser(data: any) {
    return this.http.get(this.url + "user/" + data);
  }

  setUser(data: any) {
    return this.http.post(this.url + "user/", data);
  }

  getProduct() {
    return this.http.get(this.url + "product");
  }

  getProductbyCode(data: any) {
    return this.http.get(this.url + "products/code/"+data);
  }

  getService(procode: any, pincode: any) {
    return this.http.get(this.url + "serviceability/"+procode+"/"+pincode);
  }
}
