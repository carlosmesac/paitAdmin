import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { MenuService } from '../menu/menu.service';
import { Menu } from '../menu/menu.model';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(
    private httpClient: HttpClient,
    private menuService: MenuService,
    private authService: AuthService,
    private fireDB: AngularFireDatabase
  ) {}

  storeMenus() {
    const menus = this.menuService.getAllMenus();
    console.log(menus);

    this.httpClient
      .put('https://bluetoothpubli.firebaseio.com/menus.json', menus)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchMenus() {
    return this.fireDB
    .list('menus', (ref) => {
      return ref.orderByChild('uid').equalTo(this.authService.getUID()); //Filtro
    })
    .valueChanges();

  }

  fetchAllMenus() {
    return this.fireDB
    .list('menus', (ref) => {
      return ref.orderByChild('uid'); //Filtro
    })
    .valueChanges();

  }
}
