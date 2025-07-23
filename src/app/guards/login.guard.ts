import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (typeof window === 'undefined') {
    return false;
  }

  const email = sessionStorage.getItem("email")

  if (!email) {
    alert("Favor efetuar login.")
    router.navigate([""])
    return false
  }

  return true;
};
