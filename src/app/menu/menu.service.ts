import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Menu } from './menu.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuChanged = new Subject<Menu[]>()
  private menus:Menu[] = []
  constructor(private authService:AuthService) { }

  getMenus(){
    return this.menus.slice();
  }
  getMenuFromID(id:number){
    return this.menus[id];
  }
  addMenu(menu:Menu){
    menu.uid = this.authService.getUID()
    this.menus.push(menu);
    this.menuChanged.next(this.menus.slice())
  }

  updateMenu(index:number,menu:Menu){
    this.menus[index]= menu
    this.menus[index].uid = this.authService.getUID()
    this.menuChanged.next(this.menus.slice())
  }

  deleteItem(index:number){
    this.menus.splice(index,1)
    this.menuChanged.next(this.menus.slice())
  }

  setMenu(recipes:Menu[]){
    this.menus = recipes
    this.menuChanged.next(this.menus.slice())
  }
}
