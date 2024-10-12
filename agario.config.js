module.exports = {
  apps: [
    {
      name: 'agario-ffa', // Nombre identificativo único
      script: './ffa/index.js', // Ruta de la ejecución
      exec_mode: 'fork', // 'cluster' o 'fork'
      namespace: 'gamemode', // Nombre de espacio
      instances: 1, // Cantidad de instancias de la aplicación
      autorestart: true, // Auto restart en caso de crash, usar 'true' o 'false'
      watch: false, // Reiniciar en caso que cambie algún archivo, usar 'true' o 'false'
      ignore_watch: ['./node_modules', './keys', './logs'], // Directorios que se deben ignorar
      max_memory_restart: '500M', // Reiniciar en caso que se supere la memoria establecida, B = Byte, M = Megabyte, G = Gygabyte
      //merge_logs: true, // si es verdadero, stdout y stderr se fusionarán y se enviarán al registro de pm2
      //output: './logs/ffa-server-status.log', // Registros de salida
      //error: './logs/ffa-server-error.log' // Registros de errores
    }, 
    {
      name: 'agario-team', // Nombre identificativo único
      script: './team/index.js', // Ruta de la ejecución
      exec_mode: 'fork', // 'cluster' o 'fork'
      namespace: 'gamemode', // Nombre de espacio
      instances: 1, // Cantidad de instancias de la aplicación
      autorestart: true, // Auto restart en caso de crash, usar 'true' o 'false'
      watch: false, // Reiniciar en caso que cambie algún archivo, usar 'true' o 'false'
      ignore_watch: ['./node_modules', './keys', './logs'], // Directorios que se deben ignorar
      max_memory_restart: '500M', // Reiniciar en caso que se supere la memoria establecida, B = Byte, M = Megabyte, G = Gygabyte
      //merge_logs: true, // si es verdadero, stdout y stderr se fusionarán y se enviarán al registro de pm2
      //output: './logs/team-server-status.log', // Registros de salida
      //error: './logs/team-server-error.log' // Registros de errores
    }, 
    {
      name: 'agario-experimental', // Nombre identificativo único
      script: './experimental/index.js', // Ruta de la ejecución
      exec_mode: 'fork', // 'cluster' o 'fork'
      namespace: 'gamemode', // Nombre de espacio
      instances: 1, // Cantidad de instancias de la aplicación
      autorestart: true, // Auto restart en caso de crash, usar 'true' o 'false'
      watch: false, // Reiniciar en caso que cambie algún archivo, usar 'true' o 'false'
      ignore_watch: ['./node_modules', './keys', './logs'], // Directorios que se deben ignorar
      max_memory_restart: '500M', // Reiniciar en caso que se supere la memoria establecida, B = Byte, M = Megabyte, G = Gygabyte
      //merge_logs: true, // si es verdadero, stdout y stderr se fusionarán y se enviarán al registro de pm2
      //output: './logs/experimental-server-status.log', // Registros de salida
      //error: './logs/experimental-server-error.log' // Registros de errores
    }, 
    {
      name: 'agario-rainbow', // Nombre identificativo único
      script: './rainbow/index.js', // Ruta de la ejecución
      exec_mode: 'fork', // 'cluster' o 'fork'
      namespace: 'gamemode', // Nombre de espacio
      instances: 1, // Cantidad de instancias de la aplicación
      autorestart: true, // Auto restart en caso de crash, usar 'true' o 'false'
      watch: false, // Reiniciar en caso que cambie algún archivo, usar 'true' o 'false'
      ignore_watch: ['./node_modules', './keys', './logs'], // Directorios que se deben ignorar
      max_memory_restart: '500M', // Reiniciar en caso que se supere la memoria establecida, B = Byte, M = Megabyte, G = Gygabyte
      //merge_logs: true, // si es verdadero, stdout y stderr se fusionarán y se enviarán al registro de pm2
      //output: './logs/rainbow-server-status.log', // Registros de salida
      //error: './logs/rainbow-server-error.log' // Registros de errores
    }, 
  ]
};
