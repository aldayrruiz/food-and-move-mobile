import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AttachmentModel } from '@core/models/attachment/attachment.model';
import { FoodsService } from '@core/services/api/food.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {
  @Input() attachmentId!: string;
  attachment!: AttachmentModel;
  pdfUrl!: SafeResourceUrl;

  constructor(private foodService: FoodsService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.initPdfUrl();
  }

  initPdfUrl() {
    this.foodService.getAttachmentById(this.attachmentId).subscribe({
      next: (res: AttachmentModel) => {
        this.attachment = res;
        try {
          const pdfUrl = `https://foodandmove.app.bluece.eu/api/files/attachment/${this.attachment.filename}`;
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(encodeURI(pdfUrl));
        } catch (error) {
          console.log(error);
        }
      },
      error: (err: any) => {},
    });
  }
}
