import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcategorydetailComponent } from './productcategorydetail.component';

describe('ProductcategorydetailComponent', () => {
  let component: ProductcategorydetailComponent;
  let fixture: ComponentFixture<ProductcategorydetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductcategorydetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcategorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
