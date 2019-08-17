import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { AppService } from '../Services/app.service';
import { App } from '../Config/app';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class Layout implements OnInit {
  @Input() headerData: any;
  App = App;
  state: string = 'initial';
  
  constructor(private router: Router, private appservice: AppService) { }

  ngOnInit() {
    this.appservice.loading$.subscribe((value) => {
      if(!value){
        document.body.classList.toggle('overflow-hidden');
        this.state = 'leave';
      }
    });
  }

  ngAfterContentChecked(){
    
  }

  isActive(menu){
    return this.router.url.indexOf(menu.link) !== -1 || (menu.isActive && menu.isActive.indexOf(this.router.url) !==-1) ;
  }
}
