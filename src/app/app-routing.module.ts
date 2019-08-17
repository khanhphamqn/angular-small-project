import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layout
import { Layout } from './Layout/layout.component';
//Pages
import { ProductPage } from './Pages/Product/product.component';
import { ProductDetailPage } from './Pages/Product-Detail/product-detail.component';
import { MyCartPage } from './Pages/My-cart/my-cart.component';


const routes: Routes = [
  {
    path: "",
    component: Layout,
    children: [
      { 
        path: "", 
        component: ProductPage
      },
      { 
        path: "my-cart", 
        component: MyCartPage
      },
      { 
        path: "product/:id", 
        component: ProductDetailPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
