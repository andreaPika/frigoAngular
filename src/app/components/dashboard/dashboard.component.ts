import { Component, OnInit } from '@angular/core';
import { FridgeDataService } from '../../services/fridge-data.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [TranslateModule, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalProducts = 0;
  totalCategories = 0;
  totalPositions = 0;
  recentProducts: any[] = [];

  constructor(private fridgeDataService: FridgeDataService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Carica il numero totale di prodotti
    this.fridgeDataService.getProducts().subscribe((products) => {
    console.log(products);
      this.totalProducts = products.length;
      this.recentProducts = products.slice(-5); // Ultimi 5 prodotti
    });

    // Carica il numero totale di categorie
    this.fridgeDataService.getCategories().subscribe((categories) => {
      this.totalCategories = categories.length;
    });

    // Carica il numero totale di posizioni occupate
    this.fridgeDataService.getFridgePositions().subscribe((fridgePositions) => {
      this.totalPositions = fridgePositions.length;
    });
  }

  getExpiryClass(expiryDate: string | Date): string {
      const today = new Date();
      const date = new Date(expiryDate);

      const diffInDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      if (diffInDays > 7) {
        return 'expiry-green'; // Più di una settimana
      } else if (diffInDays <= 7 && diffInDays > 2) {
        return 'expiry-yellow'; // Da 2 a 7 giorni
      } else {
        return 'expiry-red'; // Meno di 2 giorni o scaduto
      }
    }
}
