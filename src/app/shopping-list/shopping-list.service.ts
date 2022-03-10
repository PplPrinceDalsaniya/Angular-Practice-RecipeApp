import { Subject, Subscription } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient("Tomato", 4),
        new Ingredient("Olivs", 12),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ings: Ingredient[]) {
        // for (const ing of ings) {
        //     this.ingredients.push(ing);
        // }
        this.ingredients.push(...ings);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}