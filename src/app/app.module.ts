import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppConstant } from './shared/app-constant';
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { ServiceConstants } from './shared/service-constants';

@NgModule({
  declarations: [
    /* RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeStartComponent, */
    /* ShoppingListComponent,
    ShoppingEditComponent, */
    /* DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent, */
    AppComponent,
    HeaderComponent
  ],
  imports: [
    /* FormsModule,
    ReactiveFormsModule, */
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    /* RecipesModule, */
    /* ShoppingListModule, */
    /* AuthModule, */
    SharedModule,
    CoreModule
  ],
  providers: [
    AppConstant,
    ServiceConstants,
    /* ShoppingListService, 
    RecipeService, */
    /* DataStorageService,  */
    /* {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true} */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
