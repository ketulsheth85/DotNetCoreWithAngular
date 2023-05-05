import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdocumentdetailComponent } from './productdocumentdetail.component';

describe('ProductdocumentdetailComponent', () => {
  let component: ProductdocumentdetailComponent;
  let fixture: ComponentFixture<ProductdocumentdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductdocumentdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdocumentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
