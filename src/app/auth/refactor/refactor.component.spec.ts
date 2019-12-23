import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefactorComponent } from './refactor.component';

describe('RefactorComponent', () => {
  let component: RefactorComponent;
  let fixture: ComponentFixture<RefactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
