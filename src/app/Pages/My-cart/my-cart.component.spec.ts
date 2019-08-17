import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCartPage } from './my-cart.component';

describe('MyCartPage', () => {
  let component: MyCartPage;
  let fixture: ComponentFixture<MyCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCartPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
