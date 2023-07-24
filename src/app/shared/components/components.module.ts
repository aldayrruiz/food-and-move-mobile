import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { IonicModule } from '@ionic/angular';
import { SegmentDaysComponent } from '@shared/components/segment-days/segment-days.component';
import { YoutubePlayerComponent } from '@shared/components/youtube-player/youtube-player.component';
import { BigButtonIconComponent } from './big-button-icon/big-button-icon.component';
import { MotivationalPhraseComponent } from './motivational-phrase/motivational-phrase.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [BigButtonIconComponent, ToolbarComponent, MotivationalPhraseComponent, SegmentDaysComponent, YoutubePlayerComponent],
  imports: [CommonModule, IonicModule, FormsModule, YouTubePlayerModule],
  exports: [BigButtonIconComponent, ToolbarComponent, MotivationalPhraseComponent, SegmentDaysComponent, YoutubePlayerComponent],
})
export class ComponentsModule {}
