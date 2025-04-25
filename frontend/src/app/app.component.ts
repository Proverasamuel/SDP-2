import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <header class="bg-blue-500 text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-lg font-bold">Shop</h1>
          <nav class="flex gap-4">
            <a
              routerLink="/home"
              class="hover:underline"
              routerLinkActive="underline"
              >Home</a
            >
            <a
              routerLink="/order"
              class="hover:underline"
              routerLinkActive="underline"
              >Pedidos</a
            >
          </nav>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="bg-gray-800 text-gray-300 text-center py-4">
        &copy; 2025 Shop. Todos os direitos reservados.
      </footer>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
