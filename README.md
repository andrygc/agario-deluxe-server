<p align="center">
    <img src="https://github.com/andrygc/agario-deluxe/blob/main/logo.png" height="130">
</p>

# Agar.io Deluxe
Servidor open source con todas las funcionalidades del famoso juego Agar.io


## Características
- Uso de HTTP/HTTPS
- 4 modos de juego: Free For All, Teams, Experimental, Rainbow
- Comandos desde la consola o desde el cliente web
- Soporte para aplicaciones nativas de Windows, Linux y Android (en desarrollo)


## Despliegue
Se requiere tener instalado `pm2` a nivel global para desplegar los 4 modos de juego de forma independiente como procesos, ya que tendrian q tener abierta 4 terminales para cada modo.
```bash
  npm install pm2@latest -g
```


## Instalación
Instalar Agar.io Deluxe usando npm
```bash
  git clone https://github.com/andrygc/agario-deluxe.git
  cd agario-deluxe
  npm install
  pm2 start agario.config.js
```


## Ayuda
El archivo `agario.config.js` está basado en el archivo `ecosystem.config.js` de `pm2`, en el están configurados cada uno de los módulos de juego del servidor para iniciarse en 4 instancias diferentes, con algunas opciones especificas de pm2, si quieren agregar otras opciones deben configurlas en este archivo para iniciarlo con pm2.


## Licencia
[MIT Copyright (c) 2024 Andry Noilien Guzmán Cardoza](https://github.com/andrygc/agario-deluxe/blob/main/LICENSE)


## Autor
- [@andrygc](https://www.github.com/andrygc)


## 🔗 Enlaces del autor
[![facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://facebook.com/andrynolien)
[![instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/andrycardoza)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andry-cardoza)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/@andrycardoza)
[![youtube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@andrycardoza)
[![telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/andry_cardoza)



