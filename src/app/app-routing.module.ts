import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { MenuStartComponent } from './menu/menu-start/menu-start.component';

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
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
