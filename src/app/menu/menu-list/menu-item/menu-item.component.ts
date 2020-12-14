import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../menu.model';
import { MenuService } from '../../menu.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() menu : Menu;
  @Input() menuID : number;
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
  }

}
