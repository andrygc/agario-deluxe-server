@echo off
setlocal

:: Verificar si NodeJs esta instalado
node -v >nul 2>&1
IF ERRORLEVEL 1 (
	echo NodeJS no esta instalado.
	pause
	exit /b
)

:: Verificar si npm esta instalado
npm -v >nul 2>&1
IF ERRORLEVEL 1 (
	echo npm no esta instalado.
	pause
	exit /b
)

:: Verificar si pm2 esta instalado
pm2 -v >nul 2>&1
IF ERRORLEVEL 1 (
	echo pm2 no esta instalado.
	pause
	exit /b
)

:: Buscar carpeta "agario-deluxe-server" en todas las particiones
set "target_dir="
for /r %%d in (agario-deluxe-server) do (
	if exist "%%d" (
		set "target_dir=%%d"
		goto :found
	)
)

:found
if not defined target_dir (
	echo Carpeta "agario-deluxe-server" no encontrada.
	pause
	exit /b
)

:: Acceder a la carpeta "agario-deluxe-server"
cd /d "%target_dir%"

:: Ejecutar "npm install"
npm install

:: Ejecutar "pm2 start agario.config.js" para inciar las instancias del servidor
pm2 start agario.config.js

:: Mostrar mensaje de éxito
echo Dependencias instaladas satisfactoriamente, servidor Agar.io Deluxe iniciado.
pause
endlocal
