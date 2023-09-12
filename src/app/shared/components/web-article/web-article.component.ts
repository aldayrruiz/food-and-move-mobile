import { Component, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-web-article',
  templateUrl: './web-article.component.html',
  styleUrls: ['./web-article.component.scss'],
})
export class WebArticleComponent implements OnInit {
  @Input() url: any;

  constructor() {}

  ngOnInit() {}

  async openLink() {
    console.log(this.url);
    await Browser.open({ url: this.url });
  }
}
