import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { AppService } from '../../Services/app.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartPage implements OnInit {
  @Input() headerData: any;
  myCart: Observable<any[]>;
  total: Observable<number>;
  isFetching: boolean = false;
  
  constructor(private router: Router, private appservice: AppService) {
    this.myCart = this.appservice.myCart$;
    this.total = this.appservice.total$;
  }
  
  ngOnInit() {
  }

  ngAfterContentChecked(){
    
  }
  onDelete(item){
    this.isFetching = true;
    this.appservice.deleteItem(item, () => {
      this.isFetching = false;
    });
  }
  add(item){
    if(item.buy == parseInt(item.inStock)*1000) return;
    item.buy = Math.min(item.buy + 1, parseInt(item.inStock)*1000) ;
    this.isFetching = true;
    this.appservice.addItem(item, () => {
      this.isFetching = false;
    });
  }
  update(item){
    this.isFetching = true;
    if(parseInt(item.buy)/1000 > parseInt(item.inStock)){
      item.buy = parseInt(item.inStock)*1000;
    }
    this.appservice.addItem(item, () => {
      this.isFetching = false;
    });
  }
  remove(item){
    item.buy = Math.max(item.buy - 1, 1);
    if(item.buy == 1) return;
    this.isFetching = true;
    this.appservice.addItem(item, () => {
      this.isFetching = false;
    });
  }
}
