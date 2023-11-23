import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { RegisterComponent } from './register/register.component';
import { ResultComponent } from './result/result.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    component:HomeComponent,
    path:''
  },
  {
    component: RegisterComponent,
    path:'register',
    canActivate: [AuthGuard]
  },
  {
    component: LoginComponent,
    path:'login',
    canActivate: [AuthGuard]
  },
  {
    component: ResultComponent,
    path:'products'
  },
  {
    component: ResultComponent,
    path:'search-products/:searchText'
  },
  {
    component: ProductInfoComponent,
    path:'product-info/:product_code'
  },
  {
    component: PageNotFoundComponent,
    path:'**'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
