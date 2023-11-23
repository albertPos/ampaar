import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})

export class ProductInfoComponent implements OnInit {
  pincode: string = '';
  serviceabilityResult: string = '';
  deliveryTime: number = 0;
  isServiceable: boolean = false;

  products: Product[] = [];
  productCode;
  delivery_style: string = '';

  product: Product = {
    brand: '',
    name: '',
    price: 0,
    product_code: '',
    product_desc: '',
    product_img: ''
  };

  constructor(private productService: ProductsService, private router: Router, private route: ActivatedRoute) { }

  isLoggedIn;
  
  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
    if (this.isLoggedIn == 'false') {
      console.log('Product Info Login: ', this.isLoggedIn)
      alert('To access this page you need to Login Yourself!');
      this.router.navigate(['/login']);
      return;
    } else {
      console.log('Product Info Login: ', this.isLoggedIn)
      this.route.paramMap.subscribe(params => {
        this.productCode = params.get('product_code');
      });
      this.productService.getProductbyCode(this.productCode).subscribe({
        next: (product: Product[]) => {
          console.warn(product)
          this.product = product[0]
          console.warn(this.product)
        },
        error: (error: any) => {
          console.error(error);
        }
      });

      this.productService.getProduct().subscribe((products: any) => {
        console.warn(products)
        this.products = products as Product[]
        console.warn(this.products)
      })
    }
  }


  checkServiceability() {

    this.productService.getService(this.product.product_code, this.pincode).subscribe({
      next: (service: any) => {
        this.deliveryTime = service[0].est_del_time
        console.log(service)
        console.log("Delivery Time " + this.deliveryTime)
        this.isServiceable = true

        if (this.isServiceable) {
          this.delivery_style = 'delivery-green';
          this.serviceabilityResult = 'Product can be delivered to your pincode. Expected delivery time: ' + (this.deliveryTime++) + ' - ' + this.deliveryTime + ' days.';
        } else {
          this.serviceabilityResult = 'Product cannot be delivered to your pincode. Please check again after some time.';
        }
      },
      error: (error: any) => {
        console.error(error);
        if (error.status === 404) {
          this.delivery_style = 'delivery-red';
          this.serviceabilityResult = 'Product cannot be delivered to your pincode. Please check again after some time.';
        }
      }, complete() {
        this.isServiceable = false
      },
    });
    // const isServiceable = true;
    // const deliveryTime = '2-3 business days';


  }
}
