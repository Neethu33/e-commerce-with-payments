import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartItem } from '../models/cart-item.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api';
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loadCart();
  }

  addToCart(productId: number, productName: string, price: number, quantity: number = 1): Observable<any> {
    if (!this.authService.isAuthenticated()) {
      return new Observable(observer => {
        observer.error(new Error('Please login to add items to cart'));
      });
    }

    const item: CartItem = { productId, productName, price, quantity };
    return this.http.post(`${this.apiUrl}/cart/add`, item)
      .pipe(
        tap((response: any) => {
          if (response && response.cart) {
            this.cartSubject.next(response.cart);
          } else if (Array.isArray(response)) {
            this.cartSubject.next(response);
          }
        })
      );
  }

  getCart(): Observable<CartItem[]> {
    if (!this.authService.isAuthenticated()) {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    return this.http.get<CartItem[]>(`${this.apiUrl}/cart`)
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/remove/${productId}`)
      .pipe(
        tap((response: any) => {
          this.cartSubject.next(response.cart || []);
        })
      );
  }

  clearCart(): void {
    this.cartSubject.next([]);
  }

  getCartItems(): CartItem[] {
    return this.cartSubject.value;
  }

  getTotal(): number {
    return this.cartSubject.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  private loadCart(): void {
    if (this.authService.isAuthenticated()) {
      this.getCart().subscribe();
    }
  }
}
