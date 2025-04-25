import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/order.service';
import { NgFor } from '@angular/common';

@Component({
  
  standalone: true,
  selector: 'app-orders',
  templateUrl: './order.component.html',
  imports: [NgFor]
})
export class OrderComponent implements OnInit {
  orders: any = [];  // Usando o tipo any em vez de any[]


  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Usuário não autenticado!');
      return;
    }
  
    this.apiService.getOrdersByUser(userId).subscribe((data) => {
      this.orders = data;
    });
  }
  
}