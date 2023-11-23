import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  isLoggedin = '';
  
  isLoggedIn(): boolean {
    this.isLoggedin = localStorage.getItem('isLoggedIn');
    if (this.isLoggedin == 'true') {
      return true;
    }
    return false;
  }

  canActivate(): boolean {

    if (this.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}