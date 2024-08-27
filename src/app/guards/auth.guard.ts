import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseSvc = inject(AuthService);
  const router = inject(Router);

  const user = localStorage.getItem('userData');

  return new Promise(resolve => {
    firebaseSvc.getAuth().onAuthStateChanged(auth => {
      if (auth) {
        if (user)
          resolve(true);
      } else {
        localStorage.removeItem('userData');
        firebaseSvc.signOut();
        router.navigate(['/signin']);
        resolve(false);
      }
    });
  });
};
