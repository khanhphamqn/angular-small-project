import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() isOpen: boolean;
  @Output() onClose = new EventEmitter();
  
  constructor(private router: Router) { }

  ngOnInit() {
 
  }

  ngAfterContentChecked(){
    
  }

  close(){
    this.onClose.emit();
  }
}
