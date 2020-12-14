import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Menu } from './menu.model';
import { Observable } from 'rxjs';
import { MenuService } from './menu.service';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MenuResolverService {
  menus:Menu[];
  constructor(private menuService:MenuService, private dataStorageService:DataStorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Menu[] | Observable<Menu[]> | Promise<Menu[]> {
    let menus = this.menuService.getMenus()
    if(menus.length===0){
      this.dataStorageService.fetchMenus().subscribe((menus:Menu[])=>{
        this.menus = menus;
        console.log(menus)
      })
      menus = this.menus;
      return menus;

    }else{
      return menus
    }
  }
}
