import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FridgeDataService } from '../../services/fridge-data.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fridge-position-insert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fridge-position-insert.component.html',
  styleUrls: ['./fridge-position-insert.component.css']
})
export class FridgePositionInsertComponent {

  positionForm: FormGroup;
  fridgePositions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private fridgeDataService: FridgeDataService
  ) {
    this.positionForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadFridgePositions();
  }

  loadFridgePositions(): void {
    this.fridgeDataService.getFridgePositions().subscribe((data) => {
      this.fridgePositions = data;
    });
  }

  onSubmit(): void {
    if (this.positionForm.valid) {
      this.fridgeDataService.saveFridgePosition(this.positionForm.value).subscribe({
        next: () => {
          alert('Posizione salvata');
          this.positionForm.reset();
          this.loadFridgePositions(); // ricarica la lista dopo il salvataggio
        },
        error: () => alert('Errore salvataggio posizione')
      });
    }
  }

  deletePosition(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa posizione?')) {
      this.fridgeDataService.deleteFridgePosition(id).subscribe({
        next: () => {
          alert('Posizione eliminata');
          this.loadFridgePositions(); // aggiorna la lista dopo l'eliminazione
        },
        error: () => alert('Errore durante l\'eliminazione')
      });
    }
  }

}
