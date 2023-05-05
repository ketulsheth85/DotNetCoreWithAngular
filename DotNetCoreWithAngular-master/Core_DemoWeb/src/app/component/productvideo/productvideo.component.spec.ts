import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductvideoComponent } from './productvideo.component';

describe('ProductvideoComponent', () => {
  let component: ProductvideoComponent;
  let fixture: ComponentFixture<ProductvideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductvideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
