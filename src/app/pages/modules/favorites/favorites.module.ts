import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { SharedModule } from 'src/app/shared/components/shared.module';


@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
