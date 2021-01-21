import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from '../menu.model';
import { MenuService } from '../menu.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit,OnDestroy {
  subscription:Subscription;
  menus:Menu[];
  constructor(private router:Router, private route:ActivatedRoute, private menuService:MenuService, private dataStorageService:DataStorageService) { }

  ngOnInit(): void {
    this.menus = this.menuService.getMenus();
    this.subscription = this.menuService.menuChanged.subscribe((menus:Menu[])=>{
      this.menus=menus
    })
    this.dataStorageService.fetchAllMenus().subscribe((menus:Menu[]) =>{
      console.log(menus);
      this.menuService.setAllMenus(menus)
    })
  }
  newMenu(){
    this.router.navigate(['new'], {relativeTo:this.route})
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
