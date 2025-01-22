import { Component, OnInit } from '@angular/core';
import { FridgeDataService } from '../../services/fridge-data.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-insert',
  imports: [TranslateModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css'],
})
export class ProductInsertComponent implements OnInit {
  product = {
    name: '',
    category: '',
    quantity: 0,
    expiryDate: '',
    position: '',
  };

  categories: any[] = [];
  fridgePositions: any[] = [];

  constructor(private fridgeDataService: FridgeDataService) {}

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
    console.log('Product submitted:', this.product);
    // Aggiungi qui la logica per salvare il prodotto
  }
}
