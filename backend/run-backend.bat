@echo off
echo ========================================
echo Starting E-Commerce Backend
echo ========================================
echo.

REM Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17 or higher
    echo Download from: https://adoptium.net/
    pause
    exit /b 1
)

echo Java found!
echo.

REM Use Maven Wrapper if available, otherwise try mvn
if exist "mvnw.cmd" (
    echo Using Maven Wrapper...
    call mvnw.cmd clean install
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Maven build failed
        pause
        exit /b 1
    )
    echo.
    echo Starting Spring Boot application...
    call mvnw.cmd spring-boot:run
) else (
    echo Maven Wrapper not found. Trying system Maven...
    mvn clean install
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Maven is not installed or build failed
        echo Please install Maven or use the Maven Wrapper
        pause
        exit /b 1
    )
    echo.
    echo Starting Spring Boot application...
    mvn spring-boot:run
)

pause
