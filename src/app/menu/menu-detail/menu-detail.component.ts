import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu.model';
import { MenuService } from '../menu.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit {

  menuID:number;
  menuDetail:Menu;

  constructor(private menuService:MenuService,private route:ActivatedRoute,private router:Router, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.menuID = +params['id'];
      console.log(this.menuDetail);

      this.menuDetail = this.menuService.getMenuFromID(this.menuID)
    })
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.menuService.deleteItem(this.menuID);
    this.router.navigate(['..'], { relativeTo: this.route });
    this.dataStorageService.storeMenus()
  }

}
