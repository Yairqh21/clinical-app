import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  submit_attempt: boolean = false;

  // Sthis.signup_form
  signup_form = new FormGroup({
    uid: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    idCard: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastService: ToastService,
    private router: Router,
  ) { }

  ngOnInit() {

  }
  async signUp() {
    this.submit_attempt = true;

    if (this.signup_form.invalid) {
      this.toastService.presentToast('Error', 'Por favor complete todos los campos requeridos', 'top', 'danger', 2000);
      return;
    }

    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Registrando...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const res = await this.authService.signUp(this.signup_form.value as User);
      await this.authService.updateUser(this.signup_form.value.firstName);
      const uid = res.user.uid;
      this.signup_form.controls.uid.setValue(uid);
      await this.registerUserInfo(uid);
    } catch (error) {
      this.toastService.presentToast('Error', 'Inténtalo de nuevo', 'top', 'danger', 2000);
    } finally {
      await loading.dismiss();
    }
  }

  async registerUserInfo(uid: string) {
    if (this.signup_form.invalid) {
      return;
    }

    let path = `users/${uid}`;
    const formData = { ...this.signup_form.value };
    delete formData.password;

    try {
      await this.authService.setDocument(path, formData);
      this.handleSuccessfulLogin(formData);
      this.signup_form.reset();
    } catch (error) {
      this.toastService.presentToast('Error', 'Inténtalo de nuevo', 'top', 'danger', 2000);
    }
  }

  handleSuccessfulLogin(user: any) {
    const userData = {
      username: user.firstName,
      email: user.email,
      career: user.career,
      id: user.idCard
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    this.router.navigate(['/home']);
  }
}
