# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Java 17+ installed (`java -version`)
- ✅ Node.js 18+ installed (`node -v`)
- ✅ Angular CLI installed (`ng version`)

**Note:** Maven is NOT required! The project includes Maven Wrapper.

### ⚠️ If Java is Not Installed

**Quick Install (Windows 10/11):**
```powershell
# Open PowerShell as Administrator
winget install Microsoft.OpenJDK.17
```

**Or use the helper script:**
```powershell
cd backend
.\setup-java.ps1
```

For detailed instructions, see: `backend/INSTALL_JAVA.md`

If Angular CLI is not installed:
```bash
npm install -g @angular/cli
```

## Step-by-Step Setup

### 1. Start Backend (Terminal 1)

**Windows:**
```bash
cd backend
.\mvnw.cmd clean install
.\mvnw.cmd spring-boot:run
```

Or use the batch script:
```bash
cd backend
.\run-backend.bat
```

**Linux/Mac:**
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

Wait for: `Started EcommerceApplication in X.XXX seconds`

**Note:** First run will download Maven automatically (one-time download).

### 2. Start Frontend (Terminal 2)

```bash
cd frontend
npm install
ng serve
```

Wait for: `Angular Live Development Server is listening on localhost:4200`

### 3. Access Application

Open browser: `http://localhost:4200`

## Test the Application

### As Customer:
1. Click "Login" in navbar
2. Use credentials: `customer` / `password`
3. Browse products and add to cart
4. Go to cart and checkout
5. View order confirmation
6. Check "My Orders" for order history

### As Admin:
1. Logout if logged in
2. Login with: `admin` / `admin123`
3. Click "Admin Dashboard" in navbar
4. View statistics, products, and all orders

## Troubleshooting

**Backend won't start:**
- Check if port 8080 is available
- Verify Java 17+ is installed
- Check Maven installation

**Frontend won't start:**
- Delete `node_modules` and run `npm install` again
- Verify Angular CLI is installed globally
- Check Node.js version (18+)

**Cannot connect to backend:**
- Ensure backend is running on port 8080
- Check browser console for CORS errors
- Verify `http://localhost:8080/api/products` returns data

**Login fails:**
- Use exact credentials: `customer` / `password` or `admin` / `admin123`
- Check browser console for errors
- Verify backend is running

## Demo Credentials Summary

| Role | Username | Password |
|------|----------|----------|
| Customer | `customer` | `password` |
| Admin | `admin` | `admin123` |
| Customer | `user1` | `pass123` |

## API Testing

Test backend directly:
```bash
# Get products
curl http://localhost:8080/api/products

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"customer","password":"password"}'
```

## Next Steps

- Explore the codebase structure
- Modify mock data in `MockDataService.java`
- Customize UI components
- Add more features as needed

Happy coding! 🚀
