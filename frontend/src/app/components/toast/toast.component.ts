import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService, Toast } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toast$.subscribe(toast => {
      this.toasts.push(toast);
      const duration = toast.duration || 3000;
      setTimeout(() => {
        this.removeToast(toast.id);
      }, duration);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeToast(id: number): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bi bi-check-circle-fill';
      case 'error':
        return 'bi bi-x-circle-fill';
      case 'warning':
        return 'bi bi-exclamation-triangle-fill';
      case 'info':
      default:
        return 'bi bi-info-circle-fill';
    }
  }
}
