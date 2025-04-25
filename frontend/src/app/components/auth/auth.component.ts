import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  template: `
    <div class="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-gray-100">
      <h2 class="text-2xl font-bold mb-4">{{ isLogin ? 'Login' : 'Register' }}</h2>
      <form [formGroup]="authForm" (ngSubmit)="onSubmit()">
        <div *ngIf="!isLogin" class="mb-4">
          <label for="name" class="block font-medium">Name</label>
          <input
            id="name"
            formControlName="name"
            type="text"
            class="w-full p-2 border rounded"
            placeholder="Enter your name"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block font-medium">Email</label>
          <input
            id="email"
            formControlName="email"
            type="email"
            class="w-full p-2 border rounded"
            placeholder="Digite o email"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block font-medium">Password</label>
          <input
            id="password"
            formControlName="password"
            type="password"
            class="w-full p-2 border rounded"
            placeholder="Digite a palavra-passe"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {{ isLogin ? 'Login' : 'Register' }}
        </button>
      </form>
      <p class="text-center mt-4">
        {{ isLogin ? "Nao tem uma conta?" : 'Já tenho uma conta?' }}
        <a (click)="toggleMode()" class="text-blue-500 cursor-pointer">
          {{ isLogin ? 'Registre-se' : 'Login' }}
        </a>
      </p>
    </div>
  `,
  styles: [],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AuthComponent {
  authForm: FormGroup;
  isLogin = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleMode(): void {
    this.isLogin = !this.isLogin;
  }

  onSubmit(): void {
    const formValue = this.authForm.value;

    if (this.isLogin) {
      this.authService.login(formValue).subscribe(() => {
        this.router.navigate(['/home']);
      });
    } else {
      this.authService.register(formValue).subscribe(() => {
        alert('Registration successful!');
        this.isLogin = true;
      });
    }
  }
}
