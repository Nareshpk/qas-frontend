import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyExpenceComponent } from './company-expence.component';

describe('CompanyExpenceComponent', () => {
  let component: CompanyExpenceComponent;
  let fixture: ComponentFixture<CompanyExpenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyExpenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyExpenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
