import {Component, OnInit, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {
  MatStepperModule,
  MatVerticalStepper,
} from '@angular/material/stepper';
import {HeaderComponent} from '../header/header.component';
import {emailVerified} from '@angular/fire/auth-guard';
import {Subscription} from 'rxjs';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  loginInvalid = false;
  isLoginMode = true;
  isLoading = false;

  @ViewChild('stepper', {static: false}) stepper: MatVerticalStepper;

  firstSignUpGroup: FormGroup;
  secondSignUpGroup: FormGroup;
  thirdSignUpGroup: FormGroup;
  fourthSignUpGroup: FormGroup;

  error: string = null;
  private closeSub: Subscription;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.firstSignUpGroup = new FormGroup({
      MAC: new FormControl(null, Validators.required),
    });
    this.fourthSignUpGroup = new FormGroup({
      restaurantName: new FormControl(null, Validators.required),
    });
    this.secondSignUpGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    this.thirdSignUpGroup = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.authService.error.subscribe(err => {
      this.error = err;
    });


  }

  changeMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  async onSubmit() {
    if (this.isLoginMode) {
      await this.onLoginSync();
    } else {
      await this.onSignUpSync();

    }
  }


  async onSignUpSync() {
    const MAC = this.firstSignUpGroup.get('MAC').value;
    const email = this.secondSignUpGroup.get('email').value;
    const password = this.thirdSignUpGroup.get('password').value;
    const restaurantName = this.fourthSignUpGroup.get('restaurantName').value;
    const success = await this.authService.signUpSync(MAC, restaurantName, email, password);
    if (success) {
      this.isLoading = true;
      this.router.navigate(['home']);
    } else {
      this.showErrorAlert(this.error);
    }
  }

  async onLoginSync() {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    const success = await this.authService
      .loginSync(email, password);
    if (success) {
      this.isLoading = true;
      this.router.navigate(['home']);
    } else {
      this.showErrorAlert(this.error);
    }

  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(errorMsg: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainer = this.alertHost.viewContainerRef;
    hostViewContainer.clear();
    const componentRef = hostViewContainer.createComponent(alertCmpFactory);

    componentRef.instance.message = errorMsg;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainer.clear();
    });

  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }


}
