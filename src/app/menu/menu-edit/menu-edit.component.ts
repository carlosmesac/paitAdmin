import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MenuService } from '../menu.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Menu } from '../menu.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css'],
})
export class MenuEditComponent implements OnInit {
  id: number;
  menuForm: FormGroup;
  editMode: boolean = false;
  allMenus:Menu[] = []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private datastorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();

    });
    this.datastorageService.fetchAllMenus().subscribe((menus:Menu[]) =>{
      console.log(menus);
      this.allMenus = menus;
      this.menuService.setAllMenus(menus)
    })
  }

   onSubmit() {
    if (this.editMode) {
      this.menuService.updateMenu(this.id, this.menuForm.value);
    } else {
      this.menuService.addMenu(this.menuForm.value);
    }
    if(!this.editMode){
    const menus = this.menuService.getMenus();
    let length = menus.length;
    console.log("menus antes de añadir",menus);

    if (this.allMenus.length == 0) {
      menus.forEach((menu) => {
        this.allMenus.push(menu);
        console.log("allmenus vacio",this.allMenus);

      });
    } else {
      this.allMenus.push(menus[length-1])
    }
  }
    this.menuService.setAllMenus(this.allMenus)
    this.datastorageService.storeMenus();
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  private initForm() {
    let menuName = '';
    let first = '';
    let firstImageURL = '';
    let second = '';
    let secondImageURL = '';
    let dessert = '';
    let dessertImageURL = '';
    let price: number = 0;
    if (this.editMode) {
      let menu = this.menuService.getMenuFromID(this.id);
      menuName = menu.menuName;
      first = menu.first;
      firstImageURL = menu.firstImageURL;
      second = menu.second;
      secondImageURL = menu.secondImageURL;
      dessert = menu.dessert;
      dessertImageURL = menu.dessertImageURL;
      price = menu.price;
    }
    this.menuForm = new FormGroup({
      menuName: new FormControl(menuName, Validators.required),
      first: new FormControl(first, Validators.required),
      firstImageURL: new FormControl(firstImageURL, [Validators.required]),
      second: new FormControl(second, Validators.required),
      secondImageURL: new FormControl(secondImageURL, [Validators.required]),
      dessert: new FormControl(dessert, Validators.required),
      dessertImageURL: new FormControl(dessertImageURL, [Validators.required]),
      price: new FormControl(price, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }
}
