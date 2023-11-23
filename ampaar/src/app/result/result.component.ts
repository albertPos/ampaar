import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {

  constructor(private product: ProductsService, private router: Router, private route: ActivatedRoute) { }

  products: Product[] = [];

  brands: String[] = [];

  isLoggedIn: any;
  searchText: string = '';
  currentPath: String;

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {

      this.currentPath = urlSegments[0].path;

      this.isLoggedIn = localStorage.getItem('isLoggedIn');
      
      this.product.getProduct().subscribe((products: any) => {
        console.warn(products)
        this.products = products as Product[]
        console.warn(this.products)

        this.brands = this.products.map(product => product.brand);
        console.log('Brands:', this.brands);
        console.log('LoggedIn:', localStorage.getItem('isLoggedIn'));
      })
      
      if (this.currentPath === 'products') {
        console.log('Path 2: http://localhost:4200/products');
      } else if (this.currentPath === 'search-products') {
        this.searchText = this.route.snapshot.paramMap.get('searchText');
        console.log('Path 1: http://localhost:4200/products/search/' + this.searchText);
      }

    });
  }

  selectedBrand: string = '';

  minPrice: number = 0;
  maxPrice: number = 10000;

  sortBy: string = '';

  isFilterExpanded: boolean = false;

  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  get filteredProducts(): Product[] {
    let filteredProducts = this.products;

    // Apply search filter
    if (this.searchText.trim() !== '') {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // Apply brand filter
    if (this.selectedBrand !== '') {
      filteredProducts = filteredProducts.filter(product =>
        product.brand === this.selectedBrand
      );
    }

    // Apply price range filter
    filteredProducts = filteredProducts.filter(product =>
      product.price >= this.minPrice && product.price <= this.maxPrice
    );

    return filteredProducts;
  }


  clearSearch(): void {
    this.searchText = '';
  }

  clearFilter(): void {
    this.selectedBrand = '';
    this.minPrice = 0;
    this.maxPrice = 10000;
  }

  applySort(): void {
    if (this.sortBy === 'priceLowToHigh') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'priceHighToLow') {
      this.products.sort((a, b) => b.price - a.price);
    }
  }

  viewProductDetail(procode) {
    this.router.navigate(['product-info/' + procode]);
  }

}
