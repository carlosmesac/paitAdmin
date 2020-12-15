import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MenuService } from '../menu.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {
  id:number
  menuForm: FormGroup;
  editMode:boolean = false
  constructor(private route: ActivatedRoute, private router: Router, private menuService: MenuService,private datastorageService:DataStorageService ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id']
      this.editMode = params['id'] != null;
      this.initForm()
    })
  }

  onSubmit(){
    if(this.editMode){
      this.menuService.updateMenu(this.id,this.menuForm.value)
    }else{
      this.menuService.addMenu(this.menuForm.value)
    }
    this.datastorageService.storeMenus();
    this.router.navigate(['..'],{relativeTo:this.route})
  }

  onCancel(){
    this.router.navigate(['..'],{relativeTo:this.route})

  }

  private initForm(){
    let menuName = ''
    let first = '';
    let firstImageURL = ''
    let second = '';
    let secondImageURL = ''
    let dessert = '';
    let dessertImageURL = ''
    let price :number = 0
    if(this.editMode){
      let menu = this.menuService.getMenuFromID(this.id)
      menuName = menu.menuName;
      first = menu.first;
      firstImageURL = menu.firstImageURL
      second = menu.second;
      secondImageURL = menu.secondImageURL;
      dessert = menu.dessert;
      dessertImageURL = menu.dessertImageURL;
      price = menu.price;

    }
    this.menuForm = new FormGroup({
      'menuName':new FormControl(menuName,Validators.required),
      'first':new FormControl(first,Validators.required),
      'firstImageURL':new FormControl(firstImageURL,[Validators.required]),
      'second':new FormControl(second,Validators.required),
      'secondImageURL':new FormControl(secondImageURL,[Validators.required]),
      'dessert':new FormControl(dessert,Validators.required),
      'dessertImageURL':new FormControl(dessertImageURL,[Validators.required]),
      'price':new FormControl(price,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)
    ]),
    })
  }

}
