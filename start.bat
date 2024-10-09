@echo off
cd c:\xampp\htdocs\agar.io2\server\ 
pm2 start agario.config.js
pm2 monit
pause>null