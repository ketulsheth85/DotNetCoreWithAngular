import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmasterdetailComponent } from './productmasterdetail.component';

describe('ProductmasterdetailComponent', () => {
  let component: ProductmasterdetailComponent;
  let fixture: ComponentFixture<ProductmasterdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductmasterdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmasterdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
