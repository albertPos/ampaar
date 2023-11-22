import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [

    {path: '', component: AppComponent,
    children: [
      { path: '', component: HomePageComponent},
      { path: 'lk', loadChildren: () => import('./modules/lk/lk.module').then(m => m.LkModule)},
    ]},
  
  { path: '**', redirectTo: '' }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }