import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'photo',
})
export class PhotoPipe implements PipeTransform {
  transform(photoId?: string): unknown {
    return `${environment.api}/files/profile-image/${photoId}`;
  }
}
