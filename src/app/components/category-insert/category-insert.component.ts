import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FridgeDataService } from '../../services/fridge-data.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-insert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-insert.component.html',
  styleUrls: ['./category-insert.component.css']
})
export class CategoryInsertComponent {

  categoryForm: FormGroup;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private fridgeDataService: FridgeDataService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

    ngOnInit(): void {
      this.loadCategories();
    }

     loadCategories(): void {
       this.fridgeDataService.getCategories().subscribe((data) => {
         this.categories = data;
       });
     }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.fridgeDataService.saveCategory(this.categoryForm.value).subscribe({
        next: () => {
          alert('Categoria salvata');
          this.categoryForm.reset();
        },
        error: () => alert('Errore salvataggio categoria')
      });
    }
  }

deleteCategory(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa categoria?')) {
      this.fridgeDataService.deleteCategory(id).subscribe({
        next: () => {
          alert('Categoria eliminata');
          this.loadCategories(); // aggiorna la lista dopo l'eliminazione
        },
        error: () => alert('Errore durante l\'eliminazione')
      });
    }
  }
}
