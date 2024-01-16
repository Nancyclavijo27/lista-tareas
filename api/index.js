// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Configurar las rutas y controladores para las operaciones CRUD

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
