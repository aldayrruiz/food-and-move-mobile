import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Network } from '@capacitor/network';
import { AuthService } from '@core/services/api/auth.service';
import { ErrorMessageService } from '@core/services/error/error-message.service';
import { RouterService } from '@core/services/router/router.service';
import { LoadingService } from '@core/services/view/loading.service';
import { AlertController } from '@ionic/angular';
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
    private routerService: RouterService
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

    this.authService
      .signIn(this.phone?.value, this.password?.value)
      .pipe(finalize(async () => await this.loadingSrv.dismiss()))
      .subscribe({
        next: async (jwt) => {
          await this.authService.storeImportantVariables(jwt);
          await this.routerService.goToHome();
        },
        error: async (error: any) => {
          console.error(error);
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
}
