import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductvideodetailComponent } from './productvideodetail.component';

describe('ProductvideodetailComponent', () => {
  let component: ProductvideodetailComponent;
  let fixture: ComponentFixture<ProductvideodetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductvideodetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductvideodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
