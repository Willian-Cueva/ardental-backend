@Echo off
:home
cls
cd C:\server\ardental-backend
git pull origin main
@pm2 start src/index.js
goto End
REM pm2 --version
REM npm install pm2 -g