import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdocumentComponent } from './productdocument.component';

describe('ProductdocumentComponent', () => {
  let component: ProductdocumentComponent;
  let fixture: ComponentFixture<ProductdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductdocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
