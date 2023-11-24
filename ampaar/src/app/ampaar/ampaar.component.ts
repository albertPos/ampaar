import { Component } from '@angular/core';
import { Product } from '../models/product';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ampaar',
  templateUrl: './ampaar.component.html',
  styleUrls: ['./ampaar.component.css']
})
export class AmpaarComponent {

  products: Product[];
  product: Product;

  constructor(private appService:AppService, private router:Router,
    )
    {
  }

  ngOnInit():void{
    this.getProduct();
  }

  private getProduct(){
    this.appService.getProduct()
    .subscribe(data=>{ 
      this.products = data;
    })
  }

}

