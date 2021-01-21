import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Menu } from './menu.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private allMenus:Menu[] = []

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
    menu.uid = this.authService.getUID()
    for(let i = 0; i<this.allMenus.length;i++){
      if(menu.uid == this.allMenus[i].uid&& menu.menuName == this.allMenus[i].menuName){
        this.allMenus[i] =menu
          console.log("update",this.allMenus);
      }
    }
    this.menus[index]= menu
    this.menuChanged.next(this.menus.slice())
  }
  setAllMenus(menus:Menu[]){
    this.allMenus = menus
  }
  getAllMenus(){
    return this.allMenus;
  }
  deleteItem(index:number){
    console.log(this.menus[index]);
    let menu = this.menus[index]
    for(let i = 0; i<this.allMenus.length;i++){
      if(menu.uid == this.allMenus[i].uid&& menu.menuName == this.allMenus[i].menuName){
        this.allMenus.splice(i,1)
        console.log(this.allMenus);

      }
    }
    this.menus.splice(index,1)
    this.menuChanged.next(this.menus.slice())
  }

  setMenu(recipes:Menu[]){
    this.menus = recipes
    this.menuChanged.next(this.menus.slice())
  }
}
