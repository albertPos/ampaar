import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LkComponent } from './lk/lk.component';

const routes: Routes = [
  { path: '', component: LkComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LkRoutingModule { }