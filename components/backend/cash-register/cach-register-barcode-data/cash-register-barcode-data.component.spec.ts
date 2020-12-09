import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRegisterBarcodeDataComponent } from './cash-register-barcode-data.component';

describe('CashRegisterBarcodeDataComponent', () => {
  let component: CashRegisterBarcodeDataComponent;
  let fixture: ComponentFixture<CashRegisterBarcodeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashRegisterBarcodeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashRegisterBarcodeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
