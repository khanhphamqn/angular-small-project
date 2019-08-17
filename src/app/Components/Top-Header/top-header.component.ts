import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router'

const temp = {
  logo: {
    link: '/home',
    image: '../../../assets/images/bootstrap-solid.svg'
  },
  menu: [
    {
      link: '/home',
      text: 'Home',
      isActive: ['/layout/login']
    },
    {
      link: '#',
      text: 'Features',
    },
    {
      link: '#',
      text: 'Pricing',
    }
  ],
  profile: {
    avatar: 'https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg',
    actions: [
      {
        link: '#',
        text: 'Action'
      },
      {
        link: '#',
        text: 'Action 1'
      },
      {
        link: '#',
        text: 'Action 3'
      }
    ] 
  }
}

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {
  @Input() headerData: any;
  
  constructor(private router: Router) { }

  ngOnInit() {
    if(!this.headerData){
      this.headerData = temp;
    }
  }

  ngAfterContentChecked(){
    
  }

  isActive(menu){
    return this.router.url.indexOf(menu.link) !== -1 || (menu.isActive && menu.isActive.indexOf(this.router.url) !==-1) ;
  }
}
