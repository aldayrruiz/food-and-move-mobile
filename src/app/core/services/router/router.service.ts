import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  extras = { replaceUrl: true };

  constructor(private router: Router) {}

  async goTo(to: string) {
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToHome() {
    const to = `/members/home`;
    this.router.navigateByUrl(to, this.extras);
  }

  async goBack(route: ActivatedRoute) {
    return this.router.navigate(['..'], { relativeTo: route });
  }

  async goToLogin() {
    const to = `/login`;
    this.router.navigateByUrl(to, this.extras);
  }

  async goToMenu() {
    const to = `/members/menu`;
    this.router.navigateByUrl(to, this.extras);
  }

  async goToExercise() {
    const to = `/members/exercise`;
    this.router.navigateByUrl(to, this.extras);
  }

  async goToDiet() {
    const to = `/members/menu/diet`;
    this.router.navigateByUrl(to, this.extras);
  }

  async goToShoppingList() {
    const to = `/members/shopping-list`;
    this.router.navigateByUrl(to, this.extras);
  }

  async goToMeal(id: string) {
    const to = `/members/menu/diet/meal/${id}`;
    this.router.navigateByUrl(to, this.extras);
  }
}
