import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerOverviewComponent } from './manufacturer-overview.component';

describe('ManufacturerOverviewComponent', () => {
  let component: ManufacturerOverviewComponent;
  let fixture: ComponentFixture<ManufacturerOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
