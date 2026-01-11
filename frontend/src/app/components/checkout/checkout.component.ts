import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { PaymentService } from '../../services/payment.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;
  processing = false;
  orderId: number | null = null;
  paymentRef: string | null = null;
  error: string | null = null;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();

    if (this.cartItems.length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  processPayment(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    this.processing = true;
    this.error = null;

    // Step 1: Create order
    this.orderService.checkout(this.cartItems).subscribe({
      next: (orderResponse) => {
        const orderId = orderResponse.orderId;
        this.orderId = orderId;

        // Step 2: Process payment (MOCK)
        this.paymentService.initiatePayment(orderId, this.total).subscribe({
          next: (paymentResponse) => {
            this.paymentRef = paymentResponse.paymentRef;
            this.processing = false;
            
            // Clear cart
            this.cartService.clearCart();
            
            // Show success message
            setTimeout(() => {
              this.router.navigate(['/orders'], { 
                queryParams: { orderId: orderId } 
              });
            }, 2000);
          },
          error: (err) => {
            this.processing = false;
            this.error = 'Payment processing failed. Please try again.';
            console.error(err);
          }
        });
      },
      error: (err) => {
        this.processing = false;
        this.error = 'Order creation failed. Please try again.';
        console.error(err);
      }
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
