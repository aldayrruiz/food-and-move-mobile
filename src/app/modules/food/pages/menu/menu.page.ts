import { Component } from '@angular/core';
import { RouterService } from '@core/services/router/router.service';
import { homeButtons } from '@shared/constants/buttons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  backHref = '/members';
  motivationalText = 'Come lo necesario, respira profundamente, vive con moderación, cultiva la alegría e interésate por la vida';
  buttons = homeButtons;

  constructor(private routerService: RouterService) {}

  goToDiet() {
    this.routerService.goToDiet();
  }

  goToShoppingList() {
    return;
    this.routerService.goToShoppingList();
  }
}
