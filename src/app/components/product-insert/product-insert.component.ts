import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FridgeDataService } from '../../services/fridge-data.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserMultiFormatReader } from '@zxing/browser';

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
products: any[] = [];
units = ['kg', 'g', 'pcs', 'l', 'ml', 'Scatole', 'Pacchetti']; // Unità di misura disponibili

constructor(
  private fb: FormBuilder,
  private fridgeDataService: FridgeDataService
) {
  this.productForm = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    quantity: [0, [Validators.required, Validators.min(1)]],
    expiryDate: ['', Validators.required],
    unit: ['pcs', Validators.required],
    barcode: ['',
                    [
                      Validators.required,
                      Validators.minLength(8),
                      Validators.maxLength(13)
                    ]],
    fridgePosition: ['', Validators.required],
  });
}

ngOnInit(): void {
  this.loadCategories();
  this.loadFridgePositions();
  this.loadProducts();
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

loadProducts(): void {
    this.fridgeDataService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }



onSubmit(): void {
  if (this.productForm.valid) {
    this.fridgeDataService.saveProduct(this.productForm.value).subscribe({
      next: (response) => {
        console.log('Product saved successfully:', response);
        this.productForm.reset();
        alert('Prodosso salvato correttamente')
      },
      error: (err) => {
        console.error('Error saving product:', err);
        error: (err: any) => alert('Errore durante Inserimento prodotti') // Tipo esplicito
      },
    });
  } else {
    console.error('Form is invalid');
  }
}

// Funzione opzionale per eliminare un prodotto
  deleteProduct(id: string): void {
    if (!id) return;
    if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      this.fridgeDataService.deleteProduct(id).subscribe({
        next: () => {
          alert('Prodotto eliminato');
          this.loadProducts(); // ricarica la lista
        },
        error: (err) => alert('Errore durante l\'eliminazione: ' + err.message),
      });
    }
  }

}