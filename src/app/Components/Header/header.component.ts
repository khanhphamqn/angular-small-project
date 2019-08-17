import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { App } from '../../Config/app';
import { AppService } from '../../Services/app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  App = App;
  @Input() headerData: any;
  itemsCartCount: Observable<number>
  
  constructor(private router: Router, private appservice: AppService) {
    this.itemsCartCount = this.appservice.itemsCartCount$;
  }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    
  }

  isActive(menu){
    return this.router.url.indexOf(menu.link) !== -1 || (menu.isActive && menu.isActive.indexOf(this.router.url) !==-1) ;
  }
}
