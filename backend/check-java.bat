@echo off
echo ========================================
echo Java Installation Checker
echo ========================================
echo.

REM Check if Java is in PATH
java -version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Java found in PATH!
    java -version
    echo.
    echo Checking JAVA_HOME...
    if defined JAVA_HOME (
        echo [OK] JAVA_HOME is set to: %JAVA_HOME%
    ) else (
        echo [WARNING] JAVA_HOME is not set
        echo.
        echo Searching for Java installation...
        goto searchJava
    )
    goto end
)

echo [ERROR] Java not found in PATH
echo.
echo Searching for Java installation in common locations...
echo.

:searchJava
set FOUND=0

REM Check common Java installation locations
echo Checking: C:\Program Files\Java
if exist "C:\Program Files\Java" (
    for /d %%j in ("C:\Program Files\Java\*") do (
        if exist "%%j\bin\java.exe" (
            echo.
            echo [FOUND] Java installation at: %%j
            set FOUND=1
            echo.
            echo To set JAVA_HOME, run this command in PowerShell (as Administrator):
            echo setx JAVA_HOME "%%j" /M
            echo.
        )
    )
)

echo Checking: C:\Program Files\Eclipse Adoptium
if exist "C:\Program Files\Eclipse Adoptium" (
    for /d %%j in ("C:\Program Files\Eclipse Adoptium\*") do (
        if exist "%%j\bin\java.exe" (
            echo.
            echo [FOUND] Java installation at: %%j
            set FOUND=1
            echo.
            echo To set JAVA_HOME, run this command in PowerShell (as Administrator):
            echo setx JAVA_HOME "%%j" /M
            echo.
        )
    )
)

echo Checking: %LOCALAPPDATA%\Programs\Eclipse Adoptium
if exist "%LOCALAPPDATA%\Programs\Eclipse Adoptium" (
    for /d %%j in ("%LOCALAPPDATA%\Programs\Eclipse Adoptium\*") do (
        if exist "%%j\bin\java.exe" (
            echo.
            echo [FOUND] Java installation at: %%j
            set FOUND=1
            echo.
            echo To set JAVA_HOME, run this command in PowerShell (as Administrator):
            echo setx JAVA_HOME "%%j" /M
            echo.
        )
    )
)

if %FOUND% equ 0 (
    echo.
    echo [NOT FOUND] Java installation not found in common locations
    echo.
    echo ========================================
    echo INSTALLATION INSTRUCTIONS
    echo ========================================
    echo.
    echo Option 1: Install using Chocolatey (if installed)
    echo   choco install temurin17
    echo.
    echo Option 2: Download and install manually
    echo   1. Visit: https://adoptium.net/temurin/releases/
    echo   2. Download: JDK 17 (Windows x64)
    echo   3. Run the installer
    echo   4. Restart your terminal
    echo.
    echo Option 3: Install using Winget (Windows 10/11)
    echo   winget install Microsoft.OpenJDK.17
    echo.
)

:end
echo.
echo ========================================
pause
