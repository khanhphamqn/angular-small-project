import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-pre-loading',
  templateUrl: './pre-loading.component.html',
  styleUrls: ['./pre-loading.component.scss'],
  animations: [
    trigger('changeState', [
      state('initial', style({})),
      state('leave', style({
        transform: 'scale(0)',
        opacity: 0
      })),
      transition('*=>initial', animate('300ms')),
      transition('*=>leave', animate('300ms'))
    ])
  ]
})
export class PreLoadingComponent implements OnInit {
  @Input() LogoText: string;
  @Input() currentState;
  constructor() { }

  ngOnInit() {
    if(!this.LogoText){
      this.LogoText = 'K2';
    }
  }

  ngAfterContentChecked(){
  }
}
