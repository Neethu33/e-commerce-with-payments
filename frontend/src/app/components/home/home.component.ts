import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please ensure the backend is running.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  addToCart(product: Product): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(product.id, product.name, product.price, 1).subscribe({
      next: (response) => {
        console.log('Add to cart response:', response);
        alert(`${product.name} added to cart!`);
      },
      error: (err) => {
        console.error('Add to cart error:', err);
        const errorMessage = err?.error?.error || err?.message || 'Failed to add item to cart';
        alert(`Error: ${errorMessage}`);
      }
    });
  }

  viewDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  onImageError(event: any, productName: string): void {
    // Fallback to a simple colored placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(0, 0, 300, 200);
      ctx.fillStyle = '#999';
      ctx.font = '18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(productName, 150, 100);
      event.target.src = canvas.toDataURL();
    } else {
      // Ultimate fallback
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2UwZTBlMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9kdWN0PC90ZXh0Pjwvc3ZnPg==';
    }
  }
}
