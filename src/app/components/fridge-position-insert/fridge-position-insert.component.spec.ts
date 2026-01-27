import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgePositionInsertComponent } from './fridge-position-insert.component';

describe('FridgePositionInsertComponent', () => {
  let component: FridgePositionInsertComponent;
  let fixture: ComponentFixture<FridgePositionInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FridgePositionInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgePositionInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
