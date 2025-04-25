import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    let isAuthenticated = false;
    this.authService.isAuthenticated$.subscribe((auth) => (isAuthenticated = auth));
    if (!isAuthenticated) {
      this.router.navigate(['/auth']);
    }
    return isAuthenticated;
  }
}
