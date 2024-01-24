require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/config/database');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
const PORT = 3001; 

app.use(express.json()); // Usa el middleware nativo de express para analizar el cuerpo JSON
app.use(cors());

const corsOptions = {
  origin: '*', // Permitir solicitudes desde cualquier origen
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


// Configurar las rutas y controladores para las operaciones CRUD
app.use('/api', taskRoutes);

// Iniciar la aplicación después de verificar la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // Sincronizar modelos con la base de datos
    await sequelize.sync();
    console.log('Modelos sincronizados correctamente con la base de datos.');

    // Iniciar servidor Express
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();