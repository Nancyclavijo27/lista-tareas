require('dotenv').config();
require('./src/config/database');  // Importa la configuración de la base de datos
const express = require('express');
const { sequelize } = require('./src/config/database'); // Asegúrate de tener la ruta correcta

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Configurar las rutas y controladores para las operaciones CRUD

// Verificar la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');

    // Puedes iniciar tu servidor Express aquí después de verificar la conexión
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
