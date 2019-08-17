import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router'

const temp = {
  id: 0,
  imgSrc: 'https://demo.themeum.com/html/eshopper/images/home/product3.jpg',
  title: 'Dragon Fruit White 1',
  price: '3,5',
  inStock: '300 Ton',
  supplier: 'Can Tho Ogrin Farm 1',
  rating: 4.5
}

@Component({
  selector: 'app-item-fruit',
  templateUrl: './item-fruit.component.html',
  styleUrls: ['./item-fruit.component.scss']
})
export class ItemFruitComponent implements OnInit {
  Arr = Array;

  @Input() itemData: any;
  @Output() onShowDetail = new EventEmitter();
  @Input() hideOverlay : boolean;

  isGreater(i, rating){
    return rating >= i;
  }
  isHalf(i, rating){
    return i-0.5 == rating
  }
  isLesser(i, rating){
    return i > rating && i-0.5 !== rating;
  }
  constructor(private router: Router) { }

  ngOnInit() {
    if(!this.itemData){
      this.itemData = temp;
    }
  }

  showDetail(){
    this.onShowDetail.emit(this.itemData);
  }

  ngAfterContentChecked(){
    
  }
}
