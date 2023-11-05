import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDeatailComponent } from './audit-deatail.component';

describe('AuditDeatailComponent', () => {
  let component: AuditDeatailComponent;
  let fixture: ComponentFixture<AuditDeatailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditDeatailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditDeatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
