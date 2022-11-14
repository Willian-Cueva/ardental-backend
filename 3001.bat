@Echo off
:home
cls
cd C:\server\ardental-backend
@pm2 start src/index.js
goto End