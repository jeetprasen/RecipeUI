import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ServiceConstants } from './service-constants';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private serviceConstant: ServiceConstants,
        private authService: AuthService) { }

    storeRecipes() {
        const postData = this.recipeService.getRecipes();
        let headers = new HttpHeaders({
            Accept: 'application/json'
            //Authorization: 'Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNjIxNTExNjI2fQ.lvlOzAPmnxbY2L1n5JybCeo-LlTgNP40PB3aqx5rvfyX2Wj4SqwXz_2RkQu4nCVSDZldjJXWPpG7gTPwM8NnOA'
        });
        this.http.post(this.serviceConstant.saveRecipes, postData,
            {
                headers: headers
            })
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        //const postData = this.recipeService.getRecipes();
        let headers = new HttpHeaders({
            Accept: 'application/json'
        });

        /* return this.authService.user.pipe(take(1),
            exhaustMap(user => {
                return this.http.get<Recipe[]>("http://localhost:8080/recipes");
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                });
            }),
            tap((recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            })
        ); */
        
        return this.http.get<Recipe[]>(this.serviceConstant.fetchRecipes, { headers }).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                });
            }),
            tap((recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}