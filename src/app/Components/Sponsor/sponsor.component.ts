import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { Sponsor } from '../../Config/sponsor';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {
  @Input() sponsorData: any = Sponsor;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    
  }

}
