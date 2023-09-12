import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientModel } from '@core/models/patient/patient.model';
import { AuthService } from '@core/services/api/auth.service';
import { StorageService } from '@core/services/storage/storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() defaultHref?: string;
  @Input() title?: string;
  user!: PatientModel;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    await this.initUser();
  }

  async initUser() {
    this.user = await this.storageService.getUser();
  }

  isOnMembersPage() {
    return this.router.url.startsWith('/members');
  }

  async logOut() {
    await this.authService.logout();
  }
}
