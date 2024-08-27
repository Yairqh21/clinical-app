import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  current_year: number = new Date().getFullYear();
  submit_attempt: boolean = false;

  // Setup form
  signin_form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private loadingController: LoadingController,
    private toastService: ToastService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() { }

  // Sign in
  async signIn() {
    this.submit_attempt = true;

    if (this.signin_form.invalid) {
      this.toastService.presentToast('Error', 'Por favor ingrese el email y la contraseña', 'top', 'danger', 2000);
      return;
    }

    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Iniciando sesión...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const res = await this.auth.signIn(this.signin_form.value as User);
      console.log(res);
      this.getUserInfo(res.user.uid);
    } catch (err) {
      console.log(err);
      this.toastService.presentToast('Error', 'Contraseña o email incorrecto', 'top', 'danger', 2000);
    } finally {
      await loading.dismiss();
    }
  }

  async getUserInfo(uid: string) {
    if (this.signin_form.valid) {

      let path = `users/${uid}`;

      this.auth.getDocument(path).then((user: User)=> {
        console.log('Usuario obtenido:', user);
        this.handleSuccessfulLogin(user);
        this.signin_form.reset();

      });
    }
  }

  handleSuccessfulLogin(user: User) {
    const userData = {
      username: user.firstName.split(' ')[0], // extraer primer nombre
      email: user.email,
      uid: user.uid
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    this.router.navigate(['/home']);
  }
}
