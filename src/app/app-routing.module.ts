import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/modules/home/home.module').then(m => m.HomeModule) },
  { path: 'favorites', loadChildren: () => import('./pages/modules/favorites/favorites.module').then(m => m.FavoritesModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
