import { Injectable } from "@angular/core"; 
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipeChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         "Pizza", 
    //         "Italian Bread dish.", 
    //         "https://www.simplyrecipes.com/thmb/JWjdE8YwikAae0KZuyy6ZJW7Utw=/3000x2001/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg",
    //         [
    //             new Ingredient("Cheese Cubes", 2),
    //             new Ingredient("Pizza Base", 1),
    //             new Ingredient("Tomato", 2),
    //             new Ingredient("Olives", 6),
    //             new Ingredient("Ketchup Pouches", 3)
    //         ]),
    //     new Recipe(
    //         "VadaPav", 
    //         "Most famouse dish of Mumbai.", 
    //         "https://www.mygingergarlickitchen.com/wp-content/rich-markup-images/4x3/4x3-vada-pav-recipe.jpg",
    //         [
    //             new Ingredient("Pav", 1),
    //             new Ingredient("vada", 1),
    //             new Ingredient("Mirchi", 2),
    //             new Ingredient("Chatni", 2)
    //         ]),
    // ];

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        // without slice it will return the reference to this original array.
        // with slice it will return new copy of this array. So changes don't mess up with original array.
        return this.recipes.slice();
    };

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(recipes.slice());
    } 

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe (recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }
    
    updateRecipe (index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}