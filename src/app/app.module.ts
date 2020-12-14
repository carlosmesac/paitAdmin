import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from './material.module';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../environments/environment.prod';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { MenuDetailComponent } from './menu/menu-detail/menu-detail.component';
import { MenuItemComponent } from './menu/menu-list/menu-item/menu-item.component';
import { AuthComponent } from './auth/auth.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { AlertComponent } from './shared/alert/alert.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuStartComponent } from './menu/menu-start/menu-start.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    MenuListComponent,
    MenuEditComponent,
    MenuDetailComponent,
    PlaceholderDirective,
    AlertComponent,
    MenuItemComponent,
    AuthComponent,
    MenuStartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
