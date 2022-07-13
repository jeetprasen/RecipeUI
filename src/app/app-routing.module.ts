import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  /* {
    path: 'recipes', component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent }, */
  /* { path: 'auth', component: AuthComponent } */
  
  // ==================== Lazy Loading implementation Started ================================== //
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
  // ==================== Lazy Loading implementation Completed ================================ //
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

/**
 * lazyLoading -> As we have defined lazy loading we will bundle the modules seperately 
 * and load it when needed and not before when needed.
 * 
 * preloadingStrategy -> As we have defined lazy loading so the bundles will be seperate but
 * due to preloading it will load the bundles defined at the initial point only 
 * so that it wont have to load again and again.
 */