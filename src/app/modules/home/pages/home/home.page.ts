import { Component } from '@angular/core';
import { RouterService } from '@core/services/router/router.service';
import { StorageService } from '@core/services/storage/storage.service';
import { homeButtons } from '@shared/constants/buttons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  motivationalText = 'Come lo necesario, respira profundamente, vive con moderación, cultiva la alegría e interésate por la vida';
  buttons = homeButtons;

  constructor(private routerService: RouterService, private storageService: StorageService) {}

  async goToFood() {
    await this.routerService.goToMenu();
  }

  async goToExercises() {
    await this.routerService.goToExercises();
  }

  async logout() {
    await this.storageService.removeAll();
  }
}
