import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppConstant } from '../shared/app-constant';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private appConstant: AppConstant,
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  recipe_lbl: string;
  shoppingList_lbl: string;

  ngOnInit(): void {
    this.recipe_lbl = this.appConstant.RECIPE;
    this.shoppingList_lbl = this.appConstant.SHOPPING_LIST;

    this.userSub = this.authService.user.subscribe(
      (user) => {
        //this.isAuthenticated = !user ? false : true;
        this.isAuthenticated = !!user;
      }
    );
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
