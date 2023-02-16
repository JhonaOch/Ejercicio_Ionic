import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { UserModel } from 'src/app/core/user-model';
import { UsersService } from 'src/app/services/users.service';
import { LocalService } from 'src/app/services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public users: UserModel[] = [];
  formLogin?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private localService: LocalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
    this.buildForm();
  }

  async getUsers() {
    try {
      let users: any = await firstValueFrom(this.usersService.getUsers());
      this.users = users;
      //console.log(this.users);
    } catch (error) {
      throw new Error('Error:' + error);
    }
  }

  private buildForm() {
    this.formLogin = this.formBuilder.group({
      user: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z._%+-]+$')],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ],
      ],
    });
  }

  async login() {
    if (this.formLogin?.valid) {
      const user = this.users.find(
        (res) =>
          res.username === this.formLogin?.value.user &&
          res.email === this.formLogin?.value.email
      );

      if (user != null) {
        await this.localService
          .saveStorage(user, 'user')
          .then(() => this.router.navigate(['/tabs/tab1']));
      } else {
        throw new Error('Error');
      }
    } else {
      this.income();
    }
  }

  private income() {
    (<any>Object).values(this.formLogin!.controls).forEach((control: any) => {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();
    });
  }
}
