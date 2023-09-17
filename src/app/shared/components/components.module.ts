import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { IonicModule } from '@ionic/angular';
import { PdfViewerComponent } from '@shared/components/pdf-viewer/pdf-viewer.component';
import { SegmentDaysComponent } from '@shared/components/segment-days/segment-days.component';
import { WebArticleComponent } from '@shared/components/web-article/web-article.component';
import { YoutubePlayerComponent } from '@shared/components/youtube-player/youtube-player.component';
import { PipesModule } from '@shared/pipes/pipes.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { BigButtonIconComponent } from './big-button-icon/big-button-icon.component';
import { MotivationalPhraseComponent } from './motivational-phrase/motivational-phrase.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    BigButtonIconComponent,
    ToolbarComponent,
    MotivationalPhraseComponent,
    SegmentDaysComponent,
    YoutubePlayerComponent,
    PdfViewerComponent,
    WebArticleComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, YouTubePlayerModule, PipesModule, NgxExtendedPdfViewerModule],
  exports: [
    BigButtonIconComponent,
    ToolbarComponent,
    MotivationalPhraseComponent,
    SegmentDaysComponent,
    YoutubePlayerComponent,
    PdfViewerComponent,
    WebArticleComponent,
  ],
})
export class ComponentsModule {}
