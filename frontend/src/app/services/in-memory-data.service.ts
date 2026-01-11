import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // Mock data - This is a fallback if backend is not available
    // In this demo, we're using the Spring Boot backend, so this may not be used
    const products: Product[] = [
      {
        id: 1,
        name: 'Laptop',
        description: 'High-performance laptop with 16GB RAM',
        price: 800,
        imageUrl: 'https://via.placeholder.com/300x200?text=Laptop',
        stock: 50
      },
      {
        id: 2,
        name: 'Phone',
        description: 'Latest smartphone with 128GB storage',
        price: 400,
        imageUrl: 'https://via.placeholder.com/300x200?text=Phone',
        stock: 100
      },
      {
        id: 3,
        name: 'Tablet',
        description: '10-inch tablet with stylus support',
        price: 300,
        imageUrl: 'https://via.placeholder.com/300x200?text=Tablet',
        stock: 75
      }
    ];

    return { products };
  }

  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  }
}
