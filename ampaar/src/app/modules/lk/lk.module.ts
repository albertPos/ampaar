import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LkRoutingModule } from './lk.routes';
import { LkComponent } from './lk/lk.component';

@NgModule({
  declarations: [
    LkComponent
  ],
  imports: [
    CommonModule,
    LkRoutingModule,
  ]
})
export class LkModule { }
