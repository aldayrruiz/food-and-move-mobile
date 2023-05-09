import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { AuthService } from '@core/services/api/auth.service';
import { ErrorMessageService } from '@core/services/error/error-message.service';
import { StorageService } from '@core/services/storage/storage.service';
import { LoadingService } from '@core/services/view/loading.service';
import { AlertController } from '@ionic/angular';
import { emailValidators, passwordValidators } from '@utils/validators';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;
  submitted = false;

  constructor(
    private errorMessage: ErrorMessageService,
    private alertController: AlertController,
    private authService: AuthService,
    private loadingSrv: LoadingService,
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {}

  get phone() {
    return this.credentials.get('phone');
  }

  get password() {
    return this.credentials.get('password');
  }

  async ngOnInit() {
    await this.initFormGroup();
  }

  async login(): Promise<void> {
    await this.loadingSrv.present();

    const isConnected = await this.showDialogIfNoConnection();

    if (!isConnected) {
      return;
    }

    const credentials = this.getCredentials();

    this.authService
      .login(this.phone?.value, this.password?.value)
      .pipe(finalize(async () => await this.loadingSrv.dismiss()))
      .subscribe({
        next: async () =>
          // this.router.navigateByUrl('/members', { replaceUrl: true }),
          console.log('Logged'),
        error: async (error: any) => {
          const message = this.errorMessage.get(error);
          const alert = await this.alertController.create({
            header: 'Login failed',
            message,
            buttons: ['OK'],
          });

          await alert.present();
        },
      });
  }

  /**
   * Show a dialog if no connection to internet is available.
   *
   * @returns true if connected to Internet. Otherwise, returns false
   */
  private async showDialogIfNoConnection() {
    const status = await Network.getStatus();

    if (status.connected) {
      return true;
    }

    await this.loadingSrv.dismiss();
    const alert = await this.alertController.create({
      header: 'Login failed',
      message: 'No tienes conexión a internet.',
      buttons: ['OK'],
    });

    await alert.present();
    return false;
  }

  private async initFormGroup() {
    this.credentials = this.fb.group({
      phone: ['', []],
      password: ['', []],
    });
  }

  private getCredentials() {
    return {
      phone: this.phone?.value,
      password: this.password?.value,
    };
  }
}