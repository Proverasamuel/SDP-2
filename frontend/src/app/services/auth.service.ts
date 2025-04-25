import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/auth'; // URL do backend
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Token recebido:', response.token); // Verifique o token recebido
        console.log('User ID recebido:', response.userId); // Verifique o userId recebido
        localStorage.setItem('token', response.token); // Armazena o token
        localStorage.setItem('userId', response.userId); // Armazena o userId
        this.isAuthenticatedSubject.next(true);
      })
    );
  }
  

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.http.post<boolean>(`${this.apiUrl}/validate`, { token });
  }

  private checkToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.validateToken().subscribe(
        (isValid) => this.isAuthenticatedSubject.next(isValid),
        () => this.logout()
      );
    }
  }
}
