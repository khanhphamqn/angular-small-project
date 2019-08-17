import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyRight } from './copyright.component';

describe('CopyRight', () => {
  let component: CopyRight;
  let fixture: ComponentFixture<CopyRight>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyRight ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyRight);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
