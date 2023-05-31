import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRolComponent } from './form-rol.component';

describe('FormRolComponent', () => {
  let component: FormRolComponent;
  let fixture: ComponentFixture<FormRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
