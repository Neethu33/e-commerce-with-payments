import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = false;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    }
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.router.navigate(['/']);
      }
    });
  }

  addToCart(): void {
    if (!this.product) return;

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(
      this.product.id,
      this.product.name,
      this.product.price,
      this.quantity
    ).subscribe({
      next: (response) => {
        console.log('Add to cart response:', response);
        alert(`${this.product!.name} (x${this.quantity}) added to cart!`);
      },
      error: (err) => {
        console.error('Add to cart error:', err);
        const errorMessage = err?.error?.error || err?.message || 'Failed to add item to cart';
        alert(`Error: ${errorMessage}`);
      }
    });
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
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
