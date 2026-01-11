import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private apiUrl = 'http://localhost:8080/api';
  
  products: Product[] = [];
  orders: Order[] = [];
  stats: any = {};
  
  loadingProducts = false;
  loadingOrders = false;
  loadingStats = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrders();
    this.loadStats();
  }

  loadProducts(): void {
    this.loadingProducts = true;
    this.http.get<Product[]>(`${this.apiUrl}/admin/products`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    }).subscribe({
      next: (products) => {
        this.products = products;
        this.loadingProducts = false;
      },
      error: (err) => {
        console.error(err);
        this.loadingProducts = false;
      }
    });
  }

  loadOrders(): void {
    this.loadingOrders = true;
    this.http.get<Order[]>(`${this.apiUrl}/orders/all`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    }).subscribe({
      next: (orders) => {
        this.orders = orders.sort((a, b) => 
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
        this.loadingOrders = false;
      },
      error: (err) => {
        console.error(err);
        this.loadingOrders = false;
      }
    });
  }

  loadStats(): void {
    this.loadingStats = true;
    this.http.get<any>(`${this.apiUrl}/admin/stats`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    }).subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loadingStats = false;
      },
      error: (err) => {
        console.error(err);
        this.loadingStats = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'secondary';
    }
  }
}
