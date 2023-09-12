import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhotoPipe } from '@shared/pipes/photo.pipe';

@NgModule({
  declarations: [PhotoPipe],
  imports: [CommonModule],
  exports: [PhotoPipe],
})
export class PipesModule {}
