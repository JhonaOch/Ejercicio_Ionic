import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/core/user-model';
import { LocalService } from 'src/app/services/local.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.css'],
})
export class Tab3Page implements OnInit {
  users: UserModel[] = [];
  titlePage: string = 'Favorites';

  constructor(
    private localService: LocalService,
    private userService: UsersService
  ) {
    if (this.users.length == 0) {
      this.localService.loadStorage('userList').then((res: any) => {
        if (res) {
          this.users = JSON.parse(res);
          this.loadFavorites();
        }else{
          throw new Error('Error');
        }
      });
    }
  }

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    let data = this.userService.getFavorites;
    this.users = data;
    //console.log(data);
  }
}
