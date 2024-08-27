import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, NavController, LoadingController } from '@ionic/angular';

import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CameraService } from 'src/app/services/utils/camera.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public submit_attempt: boolean = false;
  public content_loaded: boolean = false; // Cambiar a false inicialmente

  public selectedImage: string | null = null;

  public userId!: string;
  public userEmail!: string;
  public username!: string;

  constructor(
    private toastService: ToastService,
    private navController: NavController,
    private actionSheetController: ActionSheetController,
    private cameraService: CameraService,
    private authService: AuthService,
    private LoadingController: LoadingController,
  ) { }

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) throw new Error('No userData found in localStorage');
      try {
        const userData = JSON.parse(userDataString);
        this.userId = userData.uid;
      } catch (e) {
        console.error('Error parsing userData from localStorage:', e);
      }
    this.getUser(this.userId);
  }

  edit_profile_form = new FormGroup({
    name_first: new FormControl('', Validators.required),
    name_last: new FormControl('', Validators.required),
    idCard: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  async takeimage() {

    const loading = await this.LoadingController.create({
      cssClass: 'default-loading',
      message: 'Cargando imagen...',
      spinner: 'circular'

    });

    try {
      const photo = await this.cameraService.takePicture('Elija una fotografía existente o tome una nueva');
      const dataurl = photo.base64String ? `data:image/jpeg;base64,${photo.base64String}` : null;
      if (dataurl) {
        await loading.present();
        this.selectedImage = dataurl;
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    } finally {
      await loading.dismiss();
    }
  }

  buildUserData(): User {
    return {
      uid: this.userId,
      firstName: this.edit_profile_form.value.name_first || '',
      lastName: this.edit_profile_form.value.name_last || '',
      idCard: this.edit_profile_form.value.idCard || '',
      photoURL: this.selectedImage as string,
      email: this.userEmail,
    };
  }

  async getUser(uid: string) {
    try {
      const path = `users/${uid}`;
      const user = await this.authService.getDocument(path);

      this.edit_profile_form.patchValue({
        name_first: user.firstName,
        name_last: user.lastName,
        idCard: user.idCard,
      });

      this.userEmail = user.email;
      this.username = `${user.firstName.split(' ')[0]} ${user.lastName.split(' ')[0]}`;

      this.selectedImage = user.photoURL || '../../../../assets/img/profile.png';

      this.content_loaded = true; // Cambiar a true cuando los datos del usuario estén cargados
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  }

  submit() {
    this.submit_attempt = true;

    if (this.edit_profile_form.valid) {
      const path = `users/${this.userId}`;
      const formData = this.buildUserData();
      this.authService
        .setDocument(path, formData)
        .then(async (res) => {
          this.toastService.presentToast('Success', 'Profile saved', 'top', 'success', 2000);
          this.navController.back();
        })
        .catch((error) => {
          this.toastService.presentToast('Error', 'Por favor intentalo de nuevo', 'top', 'danger', 2000);
        });
    } else {
      this.toastService.presentToast('Error', 'Por favor, rellene todos los campos obligatorios', 'top', 'danger', 2000);
    }
  }
}

