import { Component, Input } from '@angular/core';
import { Button } from '@shared/constants/buttons';

@Component({
  selector: 'app-big-button-icon',
  templateUrl: './big-button-icon.component.html',
  styleUrls: ['./big-button-icon.component.scss'],
})
export class BigButtonIconComponent {
  @Input() button!: Button;
}
