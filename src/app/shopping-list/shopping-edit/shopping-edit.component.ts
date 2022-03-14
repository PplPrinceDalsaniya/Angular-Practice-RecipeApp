import { Component,  OnDestroy,  OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedIngIndex: number;
  editedIng: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (ingId: number) => {
          this.editMode = true;
          this.editedIngIndex = ingId;
          this.editedIng = this.shoppingListService.getIngredient(ingId);
          this.slForm.setValue({
            name: this.editedIng.name,
            quentity: this.editedIng.quentity
          })
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddUpdateItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.quentity);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIngIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedIngIndex);
    this.onClear();
  }
}
