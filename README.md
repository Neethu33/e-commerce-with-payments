# Secure E-Commerce Platform (Mock Mode Demo)

A full-stack e-commerce web application built with **Angular** (frontend) and **Spring Boot** (backend), designed for demonstration and interview purposes. This application runs entirely in **mock mode** with no real database, no real payment processing, and all data is hardcoded/simulated.

## 🎯 Features

### Public Features (No Authentication Required)
- ✅ Browse products catalog
- ✅ View product details

### User Features (Authentication Required)
- ✅ User login with mock JWT authentication
- ✅ Add products to cart
- ✅ View shopping cart
- ✅ Checkout with mock payment processing
- ✅ View order confirmation
- ✅ View order history

### Admin Features (Admin Role Required)
- ✅ Admin dashboard with statistics
- ✅ View all products with inventory
- ✅ View all orders

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** (JWT-based authentication)
- **JJWT** (JWT token generation/validation)
- **Maven** (Dependency management)

### Frontend
- **Angular 17**
- **Bootstrap 5** (Responsive UI)
- **RxJS** (Reactive programming)
- **TypeScript**

## 📋 Prerequisites

Before running the application, ensure you have the following installed:

- **Java 17** or higher ([Installation Guide](backend/INSTALL_JAVA.md))
- **Node.js 18+** and **npm**
- **Angular CLI 17+** (`npm install -g @angular/cli`)

**Note:** Maven is NOT required! The project includes Maven Wrapper that downloads Maven automatically.

## 🚀 Getting Started

### Backend Setup

**Option 1: Using Maven Wrapper (Recommended - No Maven Installation Required)**

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Windows - Build and run:**
   ```bash
   .\mvnw.cmd clean install
   .\mvnw.cmd spring-boot:run
   ```
   
   Or use the batch script:
   ```bash
   .\run-backend.bat
   ```

3. **Linux/Mac - Build and run:**
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

**Option 2: Using System Maven (If Maven is installed)**

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Build the project:**
   ```bash
   mvn clean install
   ```

3. **Run the Spring Boot application:**
   ```bash
   mvn spring-boot:run
   ```

**Note:** If you don't have Maven installed, use Option 1 (Maven Wrapper). The wrapper will automatically download Maven when needed.

4. **Verify backend is running:**
   - Backend will start on `http://localhost:8080`
   - Test endpoint: `http://localhost:8080/api/products` (should return product list)

**For detailed Maven installation instructions, see `backend/README_BACKEND.md`**

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Angular development server:**
   ```bash
   ng serve
   ```
   Or:
   ```bash
   npm start
   ```

4. **Access the application:**
   - Frontend will be available at `http://localhost:4200`
   - Open your browser and navigate to the URL

## 🔐 Demo Credentials

The application includes mock users for testing:

### Customer Account
- **Username:** `customer`
- **Password:** `password`
- **Role:** CUSTOMER

### Admin Account
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** ADMIN

### Additional Customer
- **Username:** `user1`
- **Password:** `pass123`
- **Role:** CUSTOMER

## 📡 API Endpoints

### Public Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/auth/login` - User login

### Protected Endpoints (Require JWT Token)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/remove/{productId}` - Remove item from cart
- `POST /api/orders/checkout` - Create order
- `GET /api/orders/me` - Get user's orders
- `POST /api/payments/initiate` - Process payment (mock)
- `GET /api/admin/products` - Get all products (admin only)
- `GET /api/admin/inventory` - Get inventory stats (admin only)
- `GET /api/admin/stats` - Get dashboard statistics (admin only)
- `GET /api/orders/all` - Get all orders (admin only)

### Webhook Endpoint
- `POST /api/payments/webhook` - Mock payment webhook (logs payload)

## 🎨 Application Flow

1. **Browse Products:** Users can view products without authentication
2. **Login:** Users must login to add items to cart
3. **Add to Cart:** Authenticated users can add products to their cart
4. **Checkout:** Users proceed to checkout and place an order
5. **Payment:** Mock payment processing (always succeeds)
6. **Order Confirmation:** Users see order confirmation with order ID
7. **Order History:** Users can view their past orders
8. **Admin Dashboard:** Admins can view statistics, products, and all orders

## 🔒 Security Features (Mock Implementation)

- **JWT-based Authentication:** Mock JWT tokens for user sessions
- **Role-based Access Control:** Admin vs Customer roles
- **Route Guards:** Angular guards protect routes based on authentication/role
- **CORS Configuration:** Backend configured to accept requests from frontend
- **Token Storage:** JWT stored in sessionStorage (cleared on browser close)

## ⚠️ Important Notes

### Mock Mode Limitations
- **No Real Database:** All data is hardcoded in memory
- **No Data Persistence:** Data resets on server restart
- **No Real Payments:** Payment processing is simulated
- **No Real Security:** JWT tokens are for demo purposes only
- **No PCI-DSS Compliance:** Payment data is not actually processed

### For Production Use
This application is designed for **demonstration purposes only**. For production use, you would need to:

1. Replace mock data with a real database (PostgreSQL, MySQL, etc.)
2. Implement proper JPA/Hibernate entities
3. Integrate with a real payment gateway (Stripe, PayPal, etc.)
4. Implement proper security measures (HTTPS, secure token storage, etc.)
5. Add input validation and sanitization
6. Implement proper error handling and logging
7. Add unit and integration tests
8. Set up CI/CD pipeline

## 📁 Project Structure

```
e-commerce-with-payments/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/ecommerce/
│   │       │   ├── config/          # Security & CORS configuration
│   │       │   ├── controller/      # REST controllers
│   │       │   ├── model/           # Data models
│   │       │   └── service/         # Business logic & JWT service
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/          # Angular components
│   │   │   ├── guards/              # Route guards
│   │   │   ├── interceptors/       # HTTP interceptors
│   │   │   ├── models/              # TypeScript models
│   │   │   └── services/            # Angular services
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🐛 Troubleshooting

### Backend Issues
- **Port 8080 already in use:** Change port in `backend/src/main/resources/application.properties`
- **Maven build fails:** Ensure Java 17+ is installed and Maven is configured correctly
- **CORS errors:** Verify CORS configuration in `SecurityConfig.java`

### Frontend Issues
- **Cannot connect to backend:** Ensure backend is running on `http://localhost:8080`
- **npm install fails:** Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
- **Angular CLI not found:** Install globally with `npm install -g @angular/cli`

## 📝 License

This project is created for demonstration and interview purposes. Feel free to use it as a reference or starting point for your own projects.

## 👤 Author

Built for interview/demo purposes - Mock E-Commerce Platform

---

**Note:** This is a mock application. No real transactions or data persistence occurs. All features are simulated for demonstration purposes.
