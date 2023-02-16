import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor(private platform: Platform, private storage: NativeStorage) {}

  saveStorage(user: any, key: string) {
    return new Promise((resolve, _) => {
      if (this.platform.is('cordova')) {
        this.storage.setItem(key, JSON.stringify(user)).then(
          () => resolve(true),
          (error) => resolve(false)
        );
      } else {
        localStorage.setItem(key, JSON.stringify(user));
        resolve(true);
      }
    });
  }

  loadStorage(key: string) {
    return new Promise((resolve, _) => {
      if (this.platform.is('cordova')) {
        this.storage.getItem(key).then((data) => {
          if (data) {
            resolve(data);
          } else {
            resolve(false);
          }
        });
      } else {
        if (localStorage.getItem(key)) {
          const user = localStorage.getItem(key);
          resolve(user);
        } else {
          resolve(false);
        }
      }
    });
  }

  deleteStorage(key: string) {
    return new Promise((resolve, _) => {
      if (this.platform.is('cordova')) {
        this.storage.remove(key).then(
          () => resolve(true),
          (error) => resolve(false)
        );
      } else {
        localStorage.removeItem(key);
        resolve(true);
      }
    });
  }
}
