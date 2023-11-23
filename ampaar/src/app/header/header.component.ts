import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  isNavbarCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key === 'isLoggedIn') {
      this.isLoggedIn = event.newValue === 'true';
    }
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    console.log('LoggedIn:', localStorage.getItem('isLoggedIn'));
    this.router.navigate(['/login']);
  }

}
