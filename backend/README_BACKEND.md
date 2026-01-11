# Backend Setup Instructions

## Option 1: Using Maven Wrapper (Recommended - No Maven Installation Required)

The project includes a Maven Wrapper that will automatically download Maven if needed.

### Windows:
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

### Linux/Mac:
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

## Option 2: Install Maven (If you prefer using system Maven)

### Windows Installation:

1. **Download Maven:**
   - Visit: https://maven.apache.org/download.cgi
   - Download `apache-maven-3.9.5-bin.zip` (or latest version)

2. **Extract Maven:**
   - Extract to a folder like `C:\Program Files\Apache\maven`

3. **Set Environment Variables:**
   - Open "Environment Variables" (Search in Windows)
   - Under "System Variables", click "New"
   - Variable name: `MAVEN_HOME`
   - Variable value: `C:\Program Files\Apache\maven` (your Maven path)
   - Edit "Path" variable and add: `%MAVEN_HOME%\bin`

4. **Verify Installation:**
   ```bash
   mvn -version
   ```

5. **Run the application:**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

### Alternative: Using Chocolatey (Windows Package Manager)

If you have Chocolatey installed:
```bash
choco install maven
```

### Alternative: Using Scoop (Windows Package Manager)

If you have Scoop installed:
```bash
scoop install maven
```

## Troubleshooting

### "JAVA_HOME is not set"
- Set JAVA_HOME environment variable to your Java installation path
- Example: `C:\Program Files\Java\jdk-17`

### "mvnw.cmd is not recognized"
- Make sure you're in the `backend` directory
- Try: `.\mvnw.cmd` (with backslash and .cmd extension on Windows)

### Port 8080 already in use
- Change port in `src/main/resources/application.properties`
- Add: `server.port=8081`

## Quick Test

Once the backend is running, test it:
```bash
curl http://localhost:8080/api/products
```

Or open in browser: http://localhost:8080/api/products
