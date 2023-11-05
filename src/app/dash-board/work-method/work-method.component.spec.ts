import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMethodComponent } from './work-method.component';

describe('WorkMethodComponent', () => {
  let component: WorkMethodComponent;
  let fixture: ComponentFixture<WorkMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
