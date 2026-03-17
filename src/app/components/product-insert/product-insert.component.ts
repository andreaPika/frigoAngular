import { Component, OnInit, OnDestroy } from '@angular/core';
import { FridgeDataService } from '../../services/fridge-data.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { BrowserMultiFormatReader } from '@zxing/browser';

@Component({
  selector: 'app-product-insert',
  standalone: true,
  imports: [TranslateModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css'],
})
export class ProductInsertComponent implements OnInit, OnDestroy {

  productForm: FormGroup;
  categories: any[] = [];
  fridgePositions: any[] = [];
  products: any[] = [];
  units = ['kg', 'g', 'pcs', 'l', 'ml', 'Scatole', 'Pacchetti'];

  // 🔍 stato barcode
  loadingBarcode = false;
  barcodeFound: boolean | null = null;

  // 📷 scanner
  codeReader = new BrowserMultiFormatReader();
  scanning = false;
  scanControls: any;

  constructor(
    private fb: FormBuilder,
    private fridgeDataService: FridgeDataService,
    private http: HttpClient
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      expiryDate: ['', Validators.required],
      unit: ['pcs', Validators.required],
      barcode: ['', [
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

    // 🔥 ascolta barcode
    this.productForm.get('barcode')?.valueChanges
      .pipe(debounceTime(500))
      .subscribe((barcode: string) => {
        if (barcode && barcode.length >= 8) {
          this.loadProductData(barcode);
        } else {
          this.barcodeFound = null;
        }
      });
  }

  ngOnDestroy(): void {
    this.stopScanner();
  }

  // ===============================
  // 📦 LOAD DATI
  // ===============================

  loadCategories(): void {
    this.fridgeDataService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadFridgePositions(): void {
    this.fridgeDataService.getFridgePositions().subscribe(data => {
      this.fridgePositions = data;
    });
  }

  loadProducts(): void {
    this.fridgeDataService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  // ===============================
  // 🔍 BARCODE AUTOLOAD
  // ===============================

  loadProductData(barcode: string): void {
    this.loadingBarcode = true;
    this.barcodeFound = null;

    this.http.get(`/assets/barcodes/${barcode}.json`).subscribe({
      next: (data: any) => {
        this.productForm.patchValue({
          name: data.name || '',
          category: data.category || '',
          quantity: data.quantity || 1,
          unit: data.unit || 'pcs',
          expiryDate: data.expiryDate || '',
          fridgePosition: data.fridgePosition || ''
        });

        this.barcodeFound = true;
        this.loadingBarcode = false;
      },
      error: () => {
        this.barcodeFound = false;
        this.loadingBarcode = false;

        setTimeout(() => {
          document.getElementById('name')?.focus();
        }, 100);
      }
    });
  }

  // ===============================
  // 📷 SCANNER
  // ===============================

async startScanner(): Promise<void> {
  if (this.scanning) return;

  const { BrowserMultiFormatReader } = await import('@zxing/browser');

  this.codeReader = new BrowserMultiFormatReader();
  this.scanning = true;

  this.codeReader.decodeFromVideoDevice(
    undefined,
    'video-preview',
    (result, err, controls) => {

      if (controls) this.scanControls = controls;

      if (result) {
        const barcode = result.getText();

        this.productForm.patchValue({ barcode });
        this.loadProductData(barcode);

        this.stopScanner();

        document.getElementById('closeModalBtn')?.click();
      }
    }
  );
}

stopScanner(): void {
  if (this.scanControls) {
    this.scanControls.stop(); // ✅ metodo corretto
    this.scanControls = null;
  }

  this.scanning = false;
}

  // ===============================
  // 💾 SAVE
  // ===============================

  onSubmit(): void {
    if (this.productForm.valid) {
      this.fridgeDataService.saveProduct(this.productForm.value).subscribe({
        next: () => {
          alert('Prodotto salvato correttamente');
          this.productForm.reset();
          this.loadProducts();
          this.barcodeFound = null;
        },
        error: (err) => {
          console.error(err);
          alert('Errore durante inserimento prodotto');
        }
      });
    }
  }

  // ===============================
  // 🗑 DELETE
  // ===============================

  deleteProduct(id: string): void {
    if (!id) return;

    if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      this.fridgeDataService.deleteProduct(id).subscribe({
        next: () => {
          alert('Prodotto eliminato');
          this.loadProducts();
        },
        error: (err) => {
          alert('Errore durante eliminazione: ' + err.message);
        }
      });
    }
  }
}