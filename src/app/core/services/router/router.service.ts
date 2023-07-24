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
    await this.router.navigateByUrl(to, this.extras);
  }

  async goBack(route: ActivatedRoute) {
    return this.router.navigate(['..'], { relativeTo: route });
  }

  async goToLogin() {
    const to = `/login`;
    await this.router.navigateByUrl(to, this.extras);
  }

  async goToMenu() {
    const to = `/members/menu`;
    await this.router.navigateByUrl(to, this.extras);
  }

  async goToExercises() {
    const to = `/members/exercises`;
    await this.router.navigateByUrl(to, this.extras);
  }

  async goToExercise(id: string) {
    const to = `/members/exercises/exercise/${id}`;
    await this.router.navigateByUrl(to, this.extras);
  }

  async goToDiet() {
    const to = `/members/menu/diet`;
    await this.router.navigateByUrl(to, this.extras);
  }

  async goToShoppingList() {
    const to = `/members/shopping-list`;
    await this.router.navigateByUrl(to, this.extras);
  }

  async goToFood(id: string) {
    const to = `/members/menu/diet/food/${id}`;
    await this.router.navigateByUrl(to, this.extras);
  }

  async goToFeedbackMorning() {
    const to = `/members/feedback-morning`;
    await this.router.navigateByUrl(to, this.extras);
  }

  async goToFeedbackEvening() {
    const to = `/members/feedback-evening`;
    await this.router.navigateByUrl(to, this.extras);
  }
}
