import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AppService } from '../../Services/app.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailPage implements OnInit {
  @Input() headerData: any;
  item: any;
  isLoading: boolean = false;
  
  constructor(private router: Router, private route: ActivatedRoute, private appservice: AppService) {

  }

  ngOnInit() {
    // const id = this.route.snapshot.paramMap.get('id');
    // this.appservice.getItem(parseInt(id)).subscribe(item => {
    //   this.item = item;
    // })
  }

  ngAfterContentChecked(){
    if(this.isLoading) return;
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.appservice.getItem(parseInt(id)).subscribe(item => {
      this.item = item;
      this.isLoading = false;
    })
  }

  hasRelatedProduct(relatedproducts){
    return relatedproducts.length;
  }

  isActive(menu){
    return this.router.url.indexOf(menu.link) !== -1 || (menu.isActive && menu.isActive.indexOf(this.router.url) !==-1) ;
  }
}
