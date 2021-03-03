import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditagentComponent } from './editagent.component';

describe('EditagentComponent', () => {
  let component: EditagentComponent;
  let fixture: ComponentFixture<EditagentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditagentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
