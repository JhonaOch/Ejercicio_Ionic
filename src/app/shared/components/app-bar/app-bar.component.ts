import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css'],
})
export class AppBarComponent implements OnInit {
  @Input() title: string = '';

  constructor(
    private localService: LocalService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Esta seguro que desea salir.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            //this.handlerMessage = 'Alert confirmed';

            console.log('Entro');
            this.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  private logout() {
    this.localService.deleteStorage('user').then(
      () => this.router.navigate(['']),
      (err) => err
    );
  }
}
