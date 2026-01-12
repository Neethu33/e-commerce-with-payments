import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;
  loading = false;

  constructor(
    private cartService: CartService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.total = this.cartService.getTotal();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  removeItem(productId: number): void {
    const item = this.cartItems.find(i => i.productId === productId);
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        this.loadCart();
        if (item) {
          this.toastService.success(`${item.productName} removed from cart`);
        }
      },
      error: (err) => {
        this.toastService.error('Failed to remove item');
        console.error(err);
      }
    });
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      this.toastService.info('Your cart is empty');
      return;
    }
    this.router.navigate(['/checkout']);
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
