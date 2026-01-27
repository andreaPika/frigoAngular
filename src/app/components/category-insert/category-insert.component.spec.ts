import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryInsertComponent } from './category-insert.component';

describe('CategoryInsertComponent', () => {
  let component: CategoryInsertComponent;
  let fixture: ComponentFixture<CategoryInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
