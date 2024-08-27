import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const firebaseSvc = inject(AuthService);
  const router = inject(Router);

  return new Promise(resolve => {
    firebaseSvc.getAuth().onAuthStateChanged(auth => {
      if (!auth) {
        resolve(true);
      } else {
        router.navigate(['/home']);
        resolve(false);
      }
    });
  });
};
