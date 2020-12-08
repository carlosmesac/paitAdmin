import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router, Params, ActivatedRoute} from '@angular/router';
import {query} from '@angular/animations';

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
              private router: Router) {
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



  // onLogout() {
  //   this.authService.logout();
  //   this.router.navigate(['auth'])
  // }
}
