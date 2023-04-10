import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { HomeComponent } from './components/home/home.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { ProductAdminComponent } from './components/product/product-admin/product-admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'productos', component: ProductListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'agregar-producto', component: ProductAddComponent },
  { path: 'administrar-productos', component: ProductAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
