import { Component, Input, OnInit } from '@angular/core';
import { AttachmentModel } from '@core/models/attachment/attachment.model';
import { FoodsService } from '@core/services/api/food.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {
  @Input() attachmentId!: string;
  attachment!: AttachmentModel;
  pdfUrl!: string;

  constructor(private foodService: FoodsService) {}

  ngOnInit() {
    this.initPdfUrl();
  }

  initPdfUrl() {
    if (!this.attachmentId) {
      return;
    }
    this.foodService.getAttachmentById(this.attachmentId).subscribe({
      next: (res: AttachmentModel) => {
        this.attachment = res;
        try {
          this.pdfUrl = `${environment.api}/files/attachment/${this.attachment.filename}`;
        } catch (error) {
          console.error(error);
        }
      },
      error: (err: any) => {},
    });
  }
}
