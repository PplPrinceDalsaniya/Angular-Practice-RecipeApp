import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public addedAt: Date;
    public ingredients: Ingredient[];

    constructor(name: string, desc: string, iPath: string, ings: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = iPath;
        this.addedAt = new Date();
        this.ingredients = ings;
    }
}