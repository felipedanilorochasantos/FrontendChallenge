import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CharacterListComponent } from './character-list/character-list.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CharacterListComponent,
    ScrollToTopComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule
  ],
  exports: [
    CharacterListComponent,
    ScrollToTopComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
