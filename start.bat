@echo off
cd c:\xampp\htdocs\agario-deluxe-server\ 
pm2 start agario.config.js
pm2 monit
pause>null
