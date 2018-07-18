import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestTestingComponent } from './rest-testing.component';

describe('RestTestingComponent', () => {
  let component: RestTestingComponent;
  let fixture: ComponentFixture<RestTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
