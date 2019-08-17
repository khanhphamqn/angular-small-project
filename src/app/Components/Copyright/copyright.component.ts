import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})
export class CopyRight implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    
  }
}
