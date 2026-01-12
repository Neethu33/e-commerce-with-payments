import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string | null = null;
  loading = false;
  returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // If already logged in, redirect
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = null;

      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: () => {
          this.loading = false;
          this.toastService.success('Login successful! Welcome back.');
          this.router.navigate([this.returnUrl]);
        },
        error: (err) => {
          this.loading = false;
          const errorMessage = err.error?.error || 'Invalid username or password';
          this.error = errorMessage;
          this.toastService.error(errorMessage);
        }
      });
    }
  }

  // Demo credentials helper
  fillDemoCredentials(role: 'customer' | 'admin'): void {
    if (role === 'customer') {
      this.loginForm.patchValue({ username: 'customer', password: 'password' });
    } else {
      this.loginForm.patchValue({ username: 'admin', password: 'admin123' });
    }
  }
}
