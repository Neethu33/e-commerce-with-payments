import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is already logged in (from memory)
    const storedUser = this.getStoredUser();
    if (storedUser) {
      this.currentUserSubject.next(storedUser);
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap(response => {
          const user: User = {
            username: response.username,
            role: response.role,
            token: response.token
          };
          // Store in memory only (no localStorage for demo)
          this.storeUser(user);
          this.currentUserSubject.next(user);
        })
      );
  }

  logout(): void {
    this.removeStoredUser();
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'ADMIN';
  }

  getToken(): string | null {
    const user = this.currentUserSubject.value;
    return user?.token || null;
  }

  // Store user in memory (session-based, not persistent)
  private storeUser(user: User): void {
    // Using sessionStorage for demo (clears on browser close)
    // In production, consider more secure token storage
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  private getStoredUser(): User | null {
    const stored = sessionStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }

  private removeStoredUser(): void {
    sessionStorage.removeItem('currentUser');
  }
}
