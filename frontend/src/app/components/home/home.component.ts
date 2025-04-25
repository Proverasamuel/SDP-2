import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class HomeComponent {
  products: any[] = [];
  selectedProduct: any = null;
  orderQuantity: number = 1;
  showModal = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    
    this.loadProducts();
    
  }

  loadProducts() {
    this.http.get('http://localhost:5003/products').subscribe(
      (data: any) => {
        this.products = data;
      },
      (error) => {
        console.error('Falha ao carregar produtos:', error);
      }
    );
  }

  openModal(product: any) {
    this.selectedProduct = product;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
    this.orderQuantity = 1;
  }

  placeOrder() {
    if (!this.selectedProduct || !this.orderQuantity) {
      console.error('Produto ou quantidade inválida');
      return;
    }

    // Aqui você pega o userId 
    const userId = localStorage.getItem('userId');
    const orderData = {
      productId: this.selectedProduct._id,
      userId: userId, // Adiciona o userId
      quantity: this.orderQuantity,
      status: 'pending', // Define o status como "pending" por padrão
    };

    this.http.post('http://localhost:5004/orders', orderData).subscribe(
      (response) => {
        alert('Pedido realizado com sucesso!');
        this.closeModal();
      },
      (error) => {
        console.error('Erro ao realizar o pedido:', error);
        alert('Erro ao realizar o pedido. Tente novamente.');
      }
    );
  }
}
