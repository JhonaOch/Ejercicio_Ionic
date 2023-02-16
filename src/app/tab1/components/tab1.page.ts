import { Component, Input } from '@angular/core';
import { UserModel } from 'src/app/core/user-model';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.css'],
})
export class Tab1Page {
  user?: UserModel;
  titlePage: string = 'Home';

  constructor(private localService: LocalService) {
    this.loadStorage();
  }

  private async loadStorage() {
    await this.localService.loadStorage('user').then((res: any) => {
      if (res) {
        this.user = JSON.parse(res);
      }else{
        throw new Error('Error');
      }
    });
  }
}
