import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { MenuStartComponent } from './menu/menu-start/menu-start.component';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { MenuDetailComponent } from './menu/menu-detail/menu-detail.component';
import { MenuResolverService } from './menu/menu-resolver.service';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: MenuComponent,
    canActivate: [AuthGuard],children:[{
      path:'',component: MenuStartComponent
    },
    {path:'new', component: MenuEditComponent},
    {path: ':id', component:MenuDetailComponent, resolve: [MenuResolverService]},
    {path: ':id/edit', component: MenuEditComponent, resolve:[MenuResolverService]}
  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
