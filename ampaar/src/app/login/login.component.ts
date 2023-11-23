import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  error: boolean;
  loginMessage: string;

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginMessage = "Login form is invalid.";
      console.error('Login form is invalid.');
      return;
    }

    const email = this.loginForm.value.email;
    const pass = this.loginForm.value.password;

    const loginUrl = 'http://localhost:8081/login';
    const body = JSON.stringify({ email, pass });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(loginUrl, body, { headers }).subscribe({
      next: (response: any) => {
        console.log("Login Response: ",response);
        this.loginMessage = response.message
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['products']);
      },
      error: (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.error = true;
            this.loginMessage = error.error.message;
            console.error(error.error);
            this.loginForm.reset();
          } else {
            console.warn('An error occurred during login:', error.error);
            this.router.navigateByUrl('/error');
          }
        }
      }
    });
  }


}