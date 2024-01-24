const { Sequelize } = require('sequelize');

const connectionString = process.env.DATABASE_URL || 'postgres://db_tacks_user:fIHAzCOsgx1ihwYO1MLDwLNNaQgOG1Sz@dpg-cmokj1qcn0vc7396oklg-a.oregon-postgres.render.com/db_tacks';

const url = new URL(connectionString);

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: url.hostname,
  database: url.pathname.substr(1),
  username: url.username,
  password: url.password,
  port: url.port,
  dialectOptions: {
    ssl: true, // Agrega esto si tu base de datos requiere SSL
    // Otras opciones de SSL si es necesario...
  },
  define: {
    freezeTableName: true,
  },
  logging: console.log,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

module.exports = { sequelize };
