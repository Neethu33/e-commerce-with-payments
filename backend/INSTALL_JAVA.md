# Java Installation Guide for Windows

## Quick Check

Run this script to check if Java is installed:
```bash
.\check-java.bat
```

## Installation Options

### Option 1: Using Winget (Windows 10/11 - Easiest)

Open PowerShell as Administrator and run:
```powershell
winget install Microsoft.OpenJDK.17
```

After installation, restart your terminal and verify:
```bash
java -version
```

### Option 2: Using Chocolatey (If you have Chocolatey)

Open PowerShell as Administrator and run:
```powershell
choco install temurin17
```

### Option 3: Manual Installation (Recommended for most users)

1. **Download Java 17:**
   - Visit: https://adoptium.net/temurin/releases/
   - Select:
     - **Version:** 17 (LTS)
     - **Operating System:** Windows
     - **Architecture:** x64
     - **Package Type:** JDK
   - Click "Latest" to download the installer

2. **Install Java:**
   - Run the downloaded `.msi` installer
   - Follow the installation wizard
   - **Important:** Check "Add to PATH" during installation (or set it manually)

3. **Verify Installation:**
   - Close and reopen your terminal
   - Run:
     ```bash
     java -version
     ```
   - You should see something like:
     ```
     openjdk version "17.0.x"
     ```

4. **Set JAVA_HOME (if not set automatically):**
   
   **Method A: Using System Properties (GUI)**
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Go to "Advanced" tab → "Environment Variables"
   - Under "System Variables", click "New"
   - Variable name: `JAVA_HOME`
   - Variable value: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot` (your Java path)
   - Click OK

   **Method B: Using Command Line (Administrator)**
   ```powershell
   # Find your Java installation path first
   # Usually: C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot
   
   # Set JAVA_HOME (replace with your actual path)
   setx JAVA_HOME "C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot" /M
   
   # Add to PATH (if not already added)
   setx PATH "%PATH%;C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\bin" /M
   ```

5. **Restart Terminal:**
   - Close and reopen your terminal/PowerShell
   - Verify:
     ```bash
     java -version
     echo %JAVA_HOME%
     ```

## Troubleshooting

### "java is not recognized"
- Java is not in PATH
- Solution: Add Java bin directory to PATH (see step 4 above)
- Restart terminal after changing PATH

### "JAVA_HOME not found"
- JAVA_HOME environment variable is not set
- Solution: Set JAVA_HOME (see step 4 above)
- Restart terminal after setting JAVA_HOME

### Finding Your Java Installation Path

If Java is installed but you don't know the path:

1. **Check common locations:**
   - `C:\Program Files\Java\`
   - `C:\Program Files\Eclipse Adoptium\`
   - `C:\Program Files (x86)\Java\`

2. **Or use the checker script:**
   ```bash
   .\check-java.bat
   ```

3. **Or search in File Explorer:**
   - Search for `java.exe` in `C:\Program Files`
   - The path will be something like: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\bin\java.exe`
   - JAVA_HOME should be: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot` (without \bin)

## Quick Test After Installation

Once Java is installed and JAVA_HOME is set:

```bash
cd backend
.\mvnw.cmd clean install
.\mvnw.cmd spring-boot:run
```

## Alternative: Use Java from PATH Only

If you don't want to set JAVA_HOME, you can modify the Maven wrapper to use Java from PATH. However, setting JAVA_HOME is the recommended approach.

## Need Help?

- Check Java installation: `.\check-java.bat`
- Verify Java: `java -version`
- Check JAVA_HOME: `echo %JAVA_HOME%` (PowerShell: `$env:JAVA_HOME`)
