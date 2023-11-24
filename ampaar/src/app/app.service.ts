import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import { UserModel } from './models/User.model';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl = "http://api.ampaar.ru/v1/";

  public loader: EventEmitter<boolean> = new EventEmitter();
  public isLogged: EventEmitter<boolean> = new EventEmitter();
  public title: EventEmitter<string> = new EventEmitter();
  public error: EventEmitter<string> = new EventEmitter();

  user = UserModel;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private options = {headers: this.headers};

  constructor(private http: HttpClient) { }

  public login(data: any): Observable<any> {
    return this.http.post<{token: string}>(this.apiUrl+'user/registration', data, this.options)
    .pipe(
      catchError(this.handleError('data', data))
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }


  getProduct(): Observable<any>{
    this.user = JSON.parse(localStorage.getItem("user")!);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.user.token}`
    });
    this.options = {headers: this.headers};
    return this.http.get<any>(this.apiUrl + "product", this.options);
  } 

  getProductbyCode(data: any) {
    return this.http.get(this.apiUrl + "products/code/"+data);
  }

  getService(procode: any, pincode: any) {
    return this.http.get(this.apiUrl + "serviceability/"+procode+"/"+pincode);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      this.error.emit(error.error.message);
      return of(result as T);
    };
  }
}
