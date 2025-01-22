import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInsertComponent } from './product-insert.component';

describe('ProductInsertComponent', () => {
  let component: ProductInsertComponent;
  let fixture: ComponentFixture<ProductInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
