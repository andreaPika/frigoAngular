import { Component, OnInit } from '@angular/core';
import { FridgeDataService } from '../../services/fridge-data.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  // 👉  se vuoi un componente stand-alone, lascia `standalone: true`
  //     altrimenti rimuovi `standalone` e `imports`
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalProducts = 0;
  totalCategories = 0;
  totalPositions = 0;
  recentProducts: any[] = [];
  quantityUpdated: boolean = false;

  constructor(private fridgeDataService: FridgeDataService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  /** ---------- CARICAMENTO DATI ---------- */
  private loadDashboardData(): void {
    /* Prodotti */
    this.fridgeDataService.getProducts().subscribe((products) => {
      this.totalProducts = products.length;

      /* Ultimi 5 prodotti + savedQuantity */
      this.recentProducts = products
        .slice(-5)
        .map((p) => ({ ...p, savedQuantity: p.quantity, id: p._id }));
    });

    /* Categorie */
    this.fridgeDataService
      .getCategories()
      .subscribe((cat) => (this.totalCategories = cat.length));

    /* Posizioni */
    this.fridgeDataService
      .getFridgePositions()
      .subscribe((pos) => (this.totalPositions = pos.length));
  }

  /** ---------- UTILITIES ---------- */
  isExpired(expiryDate: Date | string): boolean {
    const today = new Date();
    return new Date(expiryDate) < today;
  }

  getExpiryClass(expiryDate: Date | string, product: any): string {
    if (product.savedQuantity === 0 || this.isExpired(expiryDate)) {
        return ''; // Niente classe (nessun colore) se esaurito o scaduto
      }

    const today = new Date();
    const date = new Date(expiryDate);
    const diffInDays = Math.ceil(
      (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays > 7) {
      return 'expiry-green';
    } else if (diffInDays > 2) {
      return 'expiry-yellow';
    } else {
      return 'expiry-red';
    }
  }

  /** ---------- AGGIORNA QUANTITÀ ---------- */
  updateQuantity(product: any): void {
    if (product.quantity < 0) {
      product.quantity = 0;
     }

    this.fridgeDataService
      .updateQuantity(product.id, product.quantity)
      .subscribe({
        next: () => {
              this.quantityUpdated = true;
              setTimeout(() => {
                    window.location.reload();
                  }, 2000);

              product.savedQuantity = product.quantity; // blocchiamo input se 0
              console.log(`Quantità aggiornata per ${product.name} a ${product.quantity}`);
            },
            error: (err) => {
              console.error(`Errore aggiornando ${product.name}:`, err);
            }
      });
  }
}
