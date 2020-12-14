import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router, Params, ActivatedRoute} from '@angular/router';
import {query} from '@angular/animations';
import { DataStorageService } from '../shared/data-storage.service';
import { Menu } from '../menu/menu.model';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;
  currentUID: string;

  constructor(private authService: AuthService,
              private changeDetector: ChangeDetectorRef,
              private route: ActivatedRoute,
              private router: Router,
              private datasotrageService:DataStorageService,
              private menuService:MenuService) {
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(value => {
      this.loggedIn = value;
    });
    this.authService.currentID2.subscribe(uid => {
      this.currentUID = uid;

    });
  }

  async onLogoutSync() {
    const success = await this.authService.logoutSync();
    if (success) {
      this.router.navigate(['auth']);
    }


  }

  saveMenus(){
    this.datasotrageService.storeMenus();
  }

  fetchMenus(){
    this.datasotrageService.fetchMenus().subscribe((menus:Menu[])=>{
      this.menuService.setMenu(menus);
    })

  }


  // onLogout() {
  //   this.authService.logout();
  //   this.router.navigate(['auth'])
  // }
}
