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
      this.totalProducts = products.length;
      this.recentProducts = products.slice(-5); // Ultimi 5 prodotti
    });

    // Carica il numero totale di categorie
    this.fridgeDataService.getCategories().subscribe((categories) => {
      this.totalCategories = categories.length;
    });

    // Carica il numero totale di posizioni occupate
    this.fridgeDataService.getFridgePositions().subscribe((positions) => {
      this.totalPositions = positions.length;
    });
  }
}
