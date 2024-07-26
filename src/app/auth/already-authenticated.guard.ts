import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { map, take } from 'rxjs';

export const alreadyAuthenticatedGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router);

  return userService.getLoggedUserObs().pipe(take(1), map(user => {        
    if (user) {
      router.navigateByUrl('\groups');
    }    
    return !user;
  }));  
};
