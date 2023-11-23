import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) { }
  searchText:String = '';
  searchMessage:String = '';

  search(){
    console.log('Searching ...')
    if (this.searchText === ''){
      this.searchMessage = "The search box cann't be empty!";
      return;
    }
    this.router.navigate(['search-products/' + this.searchText]);
  }
}
