import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  
})
export class SharedModule { }
