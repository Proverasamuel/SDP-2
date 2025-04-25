import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Certifique-se de incluir FormsModule para usar ngModel
})
export class OrderModalComponent {
  @Input() productId!: string; // Recebe o ID do produto selecionado
  @Output() close = new EventEmitter<void>(); // Evento para fechar o modal

  quantity: number = 1; // Quantidade padrão do pedido

  constructor(private apiService: ApiService) {}

  // Fechar o modal
  closeModal() {
    this.close.emit(); // Emite o evento para o componente pai fechar o modal
  }

  // Fazer o pedido
  submitOrder() {
    const userId = localStorage.getItem('userId'); // Obtém o ID do usuário autenticado
    if (!userId) {
      alert('Usuário não está autenticado!');
      return;
    }
  
    const orderData = {
      productId: this.productId, // Usa o ID do produto que foi passado ao componente
      userId: userId, // Usa o ID do usuário autenticado
      quantity: this.quantity, // Quantidade de produtos escolhida
      status: 'pending', // Status do pedido é "pending" por padrão
    };
  
    // Log para inspecionar os dados do pedido
    console.log('Dados do pedido a serem enviados:', orderData);
  
    // Chamada para o serviço de criação do pedido
    this.apiService.createOrder(orderData).subscribe({
      next: () => {
        alert('Pedido criado com sucesso!');
        this.closeModal(); // Fecha o modal após o sucesso
      },
      error: (error) => {
        console.error('Erro ao criar pedido no componente:', error);
        alert('Erro ao criar pedido. Tente novamente. component');
      },
    });
  }
  
}
