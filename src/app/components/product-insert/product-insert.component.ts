import { Component, OnInit } from '@angular/core';
import { FridgeDataService } from '../../services/fridge-data.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-insert',
  imports: [TranslateModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css'],
})
export class ProductInsertComponent implements OnInit {
productForm: FormGroup;
categories: any[] = [];
fridgePositions: any[] = [];

constructor(
  private fb: FormBuilder,
  private fridgeDataService: FridgeDataService
) {
  this.productForm = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    quantity: [0, [Validators.required, Validators.min(1)]],
    expiryDate: ['', Validators.required],
    position: ['', Validators.required],
  });
}

ngOnInit(): void {
  this.loadCategories();
  this.loadFridgePositions();
}

loadCategories(): void {
  this.fridgeDataService.getCategories().subscribe((data) => {
    this.categories = data;
  });
}

loadFridgePositions(): void {
  this.fridgeDataService.getFridgePositions().subscribe((data) => {
    this.fridgePositions = data;
  });
}

onSubmit(): void {
  if (this.productForm.valid) {
    this.fridgeDataService.saveProduct(this.productForm.value).subscribe({
      next: (response) => {
        console.log('Product saved successfully:', response);
        this.productForm.reset();
      },
      error: (err) => {
        console.error('Error saving product:', err);
      },
    });
  } else {
    console.error('Form is invalid');
  }
}

}
