import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:5004'; // Substitua com sua URL

  constructor(private http: HttpClient) {}

getOrdersByUser(userId: string) {
  return this.http.get(`${this.baseUrl}/orders/user/${userId}`);
}

  

createOrder(orderData: { productId: string; userId: string; quantity: number; status: string }): Observable<any> {
  const token = localStorage.getItem('token'); // Obtém o token do localStorage

  if (!token) {
    throw new Error('Token de autenticação não encontrado. Faça login novamente.');
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
    'Content-Type': 'application/json', // Certifique-se de que o tipo de conteúdo está configurado
  });

  // Log para verificar os dados enviados
  console.log('Dados enviados para createOrder:', {
    url: `${this.baseUrl}`,
    headers: headers,
    body: orderData,
  });

  return this.http.post(`${this.baseUrl}`, orderData, { headers }).pipe(
    catchError((error) => {
      console.error('Erro ao criar pedido service:', error);
      throw error; // Relança o erro para ser tratado onde for chamado
    })
  );
}

  

}
