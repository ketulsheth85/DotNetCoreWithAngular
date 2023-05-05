import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentcategorydetailComponent } from './documentcategorydetail.component';

describe('DocumentcategorydetailComponent', () => {
  let component: DocumentcategorydetailComponent;
  let fixture: ComponentFixture<DocumentcategorydetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentcategorydetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentcategorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
