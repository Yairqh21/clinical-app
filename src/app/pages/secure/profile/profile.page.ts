import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {


  userId!: string;
  userPass!: string;
  username!: string;
  userEmail!: string;
  userImage: string | null = null;
  public content_loaded: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        this.userId = userData.uid;
      } catch (e) {
        console.error('Error parsing userData from localStorage:', e);
      }
    } else {
      console.warn('No userData found in localStorage');
    }
    this.getUserImg(this.userId);
  }

  async getUserImg(uid: string): Promise<void> {
    const path = `users/${uid}`;

    try {
      const user = await this.authService.getDocument(path);
      if (user) {
        const { photoURL, email, firstName, lastName } = user;


        this.userImage = photoURL;
        this.userEmail = email;
        this.username = `${firstName.split(' ')[0]} ${lastName.split(' ')[0]}`;

        this.content_loaded = true;
        //console.log("user image", this.userImage, this.userEmail, this.username);
      }
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  }

  // Sign out
  signOut() {
    this.authService.signOut();
  }



}
