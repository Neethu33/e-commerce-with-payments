import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  initiatePayment(orderId: number, amount: number, paymentMethod: string = 'CARD'): Observable<any> {
    return this.http.post(`${this.apiUrl}/payments/initiate`, {
      orderId,
      amount,
      paymentMethod
    });
  }

  webhook(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/payments/webhook`, payload);
  }
}
