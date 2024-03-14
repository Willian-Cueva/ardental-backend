@Echo off
:home
cls
cd C:\server\ardental-backend
git pull origin main
@npm install
@npm run dev
goto End
REM pm2 --version
REM npm install pm2 -g