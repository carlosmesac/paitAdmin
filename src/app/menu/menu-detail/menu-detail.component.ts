import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu.model';
import { MenuService } from '../menu.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit {

  menuID:number;
  menuDetail:Menu;

  constructor(private menuService:MenuService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.menuID = +params['id'];
      this.menuDetail = this.menuService.getMenuFromID(this.menuID)
    })
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.menuService.deleteItem(this.menuID);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
