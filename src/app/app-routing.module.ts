import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderfooterComponent} from "./headerfooter/headerfooter.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {ProductsComponent} from "./products/products.component";
import {ModalComponent} from "./pages/modal/modal.component";
import {AjoutproduitComponent} from "./pages/ajoutproduit/ajoutproduit.component";
import {ProduitsComponent} from "./pages/produits/produits.component";

const routes: Routes = [
  {path:'acceuil', component:HeaderfooterComponent,
  children:[
    {path:'', component:HomeComponent},
    {path:'users',component:UsersComponent},
    {path:'products',component:ProductsComponent},
    {path:'ajoutproduit', component:AjoutproduitComponent},
    {path:'produits', component:ProduitsComponent}
  ]
  },
  {path:'login', component:LoginComponent},
  {path:'modal',component:ModalComponent},
  {path:'', redirectTo:'acceuil',pathMatch:"full"},
  {path:'**', redirectTo:'acceuil'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
