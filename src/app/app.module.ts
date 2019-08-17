import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { HeaderComponent } from './Components/Header/header.component';
import { FooterComponent } from './Components/Footer/footer.component';
import { TopHeaderComponent } from './Components/Top-Header/top-header.component';
import { CopyRight } from './Components/Copyright/copyright.component';
import { PopupComponent } from './Components/Popup/popup.component';
import { SponsorComponent } from './Components/Sponsor/sponsor.component';
import { ItemFruitComponent } from './Components/Item-Fruit/item-fruit.component';
import { AjaxLoadingComponent } from './Components/Ajax-Loading/ajax-loading.component';
import { PreLoadingComponent } from './Components/PreLoading/pre-loading.component';
// Layout
import { Layout } from './Layout/layout.component';
//Pages
import { ProductPage } from './Pages/Product/product.component';
import { ProductDetailPage } from './Pages/Product-Detail/product-detail.component';
import { MyCartPage } from './Pages/My-cart/my-cart.component';
// Directives
import { Dropdown } from './Directives/Dropdown/dropdown';
import { Accordion } from './Directives/Accordion/accordion';


@NgModule({
  declarations: [
    AppComponent,
    // Components
    HeaderComponent,
    FooterComponent,
    TopHeaderComponent,
    CopyRight,
    PopupComponent,
    SponsorComponent,
    ItemFruitComponent,
    AjaxLoadingComponent,
    PreLoadingComponent,
    // Layout
    Layout,
    //Pages
    ProductPage,
    ProductDetailPage,
    MyCartPage,
    //Directives
    Dropdown,
    Accordion
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
