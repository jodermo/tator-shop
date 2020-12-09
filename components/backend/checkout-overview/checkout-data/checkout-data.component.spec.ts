import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDataComponent } from './checkout-data.component';

describe('CheckoutDataComponent', () => {
  let component: CheckoutDataComponent;
  let fixture: ComponentFixture<CheckoutDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
