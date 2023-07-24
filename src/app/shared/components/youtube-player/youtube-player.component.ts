import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
})
export class YoutubePlayerComponent implements OnInit {
  @Input() videoId?: string;
  apiLoaded = false;
  width = 100;
  height = 100;

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      const paddingCard = 70;
      this.width = this.platform.width() - paddingCard;
      this.height = this.width * 0.5625;
    });
  }

  ngOnInit() {
    if (!this.apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
}
