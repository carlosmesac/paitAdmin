import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Menu } from './menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private menuService : MenuService, private datastorageService: DataStorageService) { }

  ngOnInit(): void {
    this.datastorageService.fetchMenus().subscribe((menus:Menu[])=>{
      this.menuService.setMenu(menus);
    })
  }

}
