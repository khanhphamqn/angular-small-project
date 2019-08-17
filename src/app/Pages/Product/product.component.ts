import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { Sidebar } from '../../Config/sidebar';
import { AppService } from '../../Services/app.service';
import { Observable } from 'rxjs';
import { serialize } from '../../Helper/index';
import { parse } from 'query-string';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductPage implements OnInit {
  Arr = Array;
  isOpen : boolean = false;
  Sidebar: any = Sidebar;
  items: Observable<any[]>;
  title: Observable<any>;
  count: Observable<any>;
  popupItem: any;
  quantity: number = 1;
  isBuying: boolean = false;
  sort = 1;
  
  constructor(private router: Router, public appservice: AppService) {
    this.items = this.appservice.items$;
    this.title = this.appservice.title$;
    this.count = this.appservice.count$;
  }

  ngOnInit() {
  }

  ngAfterContentChecked(){
  }

  onShowDetail(item){
    this.popupItem = item;
    this.isOpen = true;
  }

  navigateToDetail(){
    this.router.navigateByUrl(`/product/${this.popupItem.id}`);
  }

  onClose(){
    this.isOpen = false;
    this.quantity = 1;
  }

  isGreater(i, rating){
    return rating >= i;
  }
  isHalf(i, rating){
    return i-0.5 == rating
  }
  isLesser(i, rating){
    return i > rating && i-0.5 !== rating;
  }
  plus(){
    this.quantity =Math.min(this.quantity + 1, parseInt(this.popupItem.inStock)*1000);
  }
  minus(){
    this.quantity = Math.max(this.quantity - 1, 1);
  }
  update(){
    this.quantity = Math.min(this.quantity, parseInt(this.popupItem.inStock)*1000);
  }
  addCart(){
    let newItem = Object.assign({}, this.popupItem, {buy: this.quantity});
    this.isBuying = true;
    this.appservice.buyItem(newItem).subscribe(() => {
      this.isBuying = false;
    });
  }
  buyNow(){
    this.addCart();
    this.router.navigateByUrl(`/my-cart`);
  }
  onFilter(){
    var formData = parse(serialize(document.forms['product-filter']));
    this.appservice.startFilter(formData);
  }
  onSort(){
    this.appservice.onSort(this.sort);
  }
}
