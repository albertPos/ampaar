import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/User.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;
  user = UserModel;
  message: string;
  error: boolean = false;
  loader: boolean = false;
  loginForm = new FormGroup({
    phone: new FormControl(''),
    fullname: new FormControl(''),
  });

  constructor(private appService: AppService,
              private router: Router) {
    this.appService.loader.subscribe(loader => this.loader = loader);
    this.appService.error.subscribe(error => this.message = error);
    this.appService.loader.emit(false);
    this.appService.isLogged.emit(false);
    this.appService.title.emit('Авторизация');
    localStorage.setItem("user", "");
    this.message = "Введите данные";
  }

  ngOnInit(): void {
  }

  login() {
    this.error = false;
    this.message = "Подождите, идет авторизация...";
    this.appService.loader.emit(true);
    
    this.appService.login(this.loginForm.value).subscribe(result => {
      console.log(JSON.stringify(result));
      if(result.status === 'success'){
        this.user = result.data;
        localStorage.setItem("user", JSON.stringify(this.user));
        this.router.navigate(['/']);
      }else{
        this.error = true;
        this.appService.loader.emit(false);
        localStorage.setItem("user", "");
      }
    });
  }
}
