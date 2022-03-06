import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient("Tomato", 4),
        new Ingredient("Olivs", 12),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}