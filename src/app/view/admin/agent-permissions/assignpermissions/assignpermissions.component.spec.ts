import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignpermissionsComponent } from './assignpermissions.component';

describe('AssignpermissionsComponent', () => {
  let component: AssignpermissionsComponent;
  let fixture: ComponentFixture<AssignpermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignpermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignpermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
