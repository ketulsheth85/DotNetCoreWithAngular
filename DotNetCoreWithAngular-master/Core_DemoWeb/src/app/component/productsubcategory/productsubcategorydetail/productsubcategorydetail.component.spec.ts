import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsubcategorydetailComponent } from './productsubcategorydetail.component';

describe('ProductsubcategorydetailComponent', () => {
  let component: ProductsubcategorydetailComponent;
  let fixture: ComponentFixture<ProductsubcategorydetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsubcategorydetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsubcategorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
