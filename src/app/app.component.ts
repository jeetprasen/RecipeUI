import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { AppConstant } from './shared/app-constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  recipe_lbl: string;
  shoppingList_lbl: string;
  
  constructor(private appConstant: AppConstant,
    private authService: AuthService) {}

  ngOnInit() {
    this.recipe_lbl = this.appConstant.RECIPE;
    this.shoppingList_lbl = this.appConstant.SHOPPING_LIST;

    this.authService.autoLogin();
  }

  title = 'my-first-project';
  
}

