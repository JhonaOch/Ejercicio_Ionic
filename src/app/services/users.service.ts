import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  person: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private localService: LocalService
  ) {
    if (this.person.length == 0) {
      this.localService.loadStorage('userList').then((res: any) => {
        if (res) {
          this.person = JSON.parse(res);
          this.getFavorites;
        } else {
          throw new Error('Error');
        }
      });
    }
  }

  getUsers() {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }

  saveUsersData(user: any) {
    this.person.push(user);
    let result = this.person.filter((item, index) => {
      return this.person.indexOf(item) === index;
    });
    this.localService.saveStorage(result, 'userList');
  }

  get getFavorites() {
    return this.person;
  }
}
