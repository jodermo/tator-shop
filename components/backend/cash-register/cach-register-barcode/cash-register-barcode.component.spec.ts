import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRegisterBarcodeComponent } from './cash-register-barcode.component';

describe('CashRegisterBarcodeComponent', () => {
  let component: CashRegisterBarcodeComponent;
  let fixture: ComponentFixture<CashRegisterBarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashRegisterBarcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashRegisterBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
