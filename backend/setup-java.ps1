# Java Setup Helper Script for Windows
# Run this script in PowerShell (as Administrator if needed)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Java Installation Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Java is already installed
$javaInstalled = $false
try {
    $javaVersion = java -version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Java is installed and in PATH!" -ForegroundColor Green
        java -version
        $javaInstalled = $true
    }
} catch {
    Write-Host "[INFO] Java not found in PATH" -ForegroundColor Yellow
}

# Check JAVA_HOME
if ($env:JAVA_HOME) {
    Write-Host "[OK] JAVA_HOME is set to: $env:JAVA_HOME" -ForegroundColor Green
} else {
    Write-Host "[WARNING] JAVA_HOME is not set" -ForegroundColor Yellow
}

if (-not $javaInstalled) {
    Write-Host ""
    Write-Host "Java is not installed. Choose an installation method:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Install using Winget (Recommended)" -ForegroundColor Cyan
    Write-Host "  Run: winget install Microsoft.OpenJDK.17" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Install using Chocolatey (if installed)" -ForegroundColor Cyan
    Write-Host "  Run: choco install temurin17" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 3: Download manually" -ForegroundColor Cyan
    Write-Host "  Visit: https://adoptium.net/temurin/releases/" -ForegroundColor White
    Write-Host "  Download: JDK 17 (Windows x64)" -ForegroundColor White
    Write-Host ""
    
    $install = Read-Host "Would you like to install Java 17 using Winget now? (Y/N)"
    if ($install -eq "Y" -or $install -eq "y") {
        Write-Host ""
        Write-Host "Installing Java 17..." -ForegroundColor Cyan
        winget install Microsoft.OpenJDK.17
        Write-Host ""
        Write-Host "Installation complete! Please restart your terminal and run this script again." -ForegroundColor Green
    }
} else {
    # Java is installed, check if we need to set JAVA_HOME
    if (-not $env:JAVA_HOME) {
        Write-Host ""
        Write-Host "Searching for Java installation to set JAVA_HOME..." -ForegroundColor Cyan
        
        $javaPaths = @(
            "C:\Program Files\Java",
            "C:\Program Files\Eclipse Adoptium",
            "$env:LOCALAPPDATA\Programs\Eclipse Adoptium",
            "C:\Program Files (x86)\Java"
        )
        
        $foundJava = $false
        foreach ($path in $javaPaths) {
            if (Test-Path $path) {
                $jdkDirs = Get-ChildItem -Path $path -Directory -ErrorAction SilentlyContinue
                foreach ($jdkDir in $jdkDirs) {
                    $javaExe = Join-Path $jdkDir.FullName "bin\java.exe"
                    if (Test-Path $javaExe) {
                        Write-Host ""
                        Write-Host "[FOUND] Java at: $($jdkDir.FullName)" -ForegroundColor Green
                        $foundJava = $true
                        
                        $setJAVA_HOME = Read-Host "Would you like to set JAVA_HOME to this path? (Y/N)"
                        if ($setJAVA_HOME -eq "Y" -or $setJAVA_HOME -eq "y") {
                            try {
                                [System.Environment]::SetEnvironmentVariable("JAVA_HOME", $jdkDir.FullName, [System.EnvironmentVariableTarget]::User)
                                Write-Host "[SUCCESS] JAVA_HOME set to: $($jdkDir.FullName)" -ForegroundColor Green
                                Write-Host "Please restart your terminal for changes to take effect." -ForegroundColor Yellow
                            } catch {
                                Write-Host "[ERROR] Failed to set JAVA_HOME. Try running as Administrator." -ForegroundColor Red
                                Write-Host "Or set it manually: setx JAVA_HOME `"$($jdkDir.FullName)`"" -ForegroundColor Yellow
                            }
                        }
                        break
                    }
                }
                if ($foundJava) { break }
            }
        }
        
        if (-not $foundJava) {
            Write-Host "[WARNING] Could not automatically find Java installation" -ForegroundColor Yellow
            Write-Host "Please set JAVA_HOME manually to your Java installation path." -ForegroundColor Yellow
        }
    } else {
        Write-Host ""
        Write-Host "[SUCCESS] Java is properly configured!" -ForegroundColor Green
        Write-Host "You can now run: .\mvnw.cmd clean install" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Read-Host "Press Enter to exit"
