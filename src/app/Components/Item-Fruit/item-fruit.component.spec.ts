import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFruitComponent } from './item-fruit.component';

describe('ItemFruitComponent', () => {
  let component: ItemFruitComponent;
  let fixture: ComponentFixture<ItemFruitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemFruitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFruitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
