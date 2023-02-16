import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserModel } from 'src/app/core/user-model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.css'],
})
export class Tab2Page implements OnInit {
  public users: UserModel[] = [];
  titlePage: string = 'List';

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    try {
      let users: any = await firstValueFrom(this.usersService.getUsers());
      this.users = users;
      console.log(users);
    } catch (error) {
      throw new Error('Error:' + error);
    }
  }

  addFavorite(user: any) {
    this.usersService.saveUsersData(user);
  }
}
