import { Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { AppComponent } from './app.component';

export const routes: Routes = [

    {path: '', component: AppComponent,
    children: [
      { path: '', component: HomePageComponent},
      { path: 'quest', loadChildren: () => import('./modules/lk/lk.module').then(m => m.LkModule)},
    ]},
  
  { path: '**', redirectTo: '' }


];
