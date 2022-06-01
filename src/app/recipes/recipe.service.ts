import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable(/* { providedIn: 'root' } */)
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    /* private recipes: Recipe[] = [
        new Recipe('Dosa', 'Simply a test Image', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsDhPIQtwv5Fe78NQNvus7L1MRNT3fCOAVPw&usqp=CAU',
            [
                new Ingredient('Rice', 1),
                new Ingredient('Potato', 2)
            ]),
        new Recipe('Samosa', 'Another test Image', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkSykAngJdnsma5jZFB4mmnieLz1PLO8rU7Q&usqp=CAU',
            [
                new Ingredient('Potato', 3),
                new Ingredient('Flour', 2)
            ]),
        new Recipe('Chole', 'Another recipe test Image', 'https://s3-eu-west-1.amazonaws.com/uploads.playbaamboozle.com/uploads/images/97330/1603866032_115515',
            [
                new Ingredient('Chana', 4),
                new Ingredient('Chole Mix', 3)
            ]),
        new Recipe('Pakode', 'Sukhis', 'https://sukhis.com/wp-content/uploads/2017/06/Appetizers.jpg',
            [
                new Ingredient('Potato', 4),
                new Ingredient('Tomato', 5),
                new Ingredient('Masala Mix', 3)
            ])
    ]; */

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    
    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
    
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}