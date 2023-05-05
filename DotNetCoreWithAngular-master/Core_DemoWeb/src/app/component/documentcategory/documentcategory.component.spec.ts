import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentcategoryComponent } from './documentcategory.component';

describe('DocumentcategoryComponent', () => {
  let component: DocumentcategoryComponent;
  let fixture: ComponentFixture<DocumentcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
