const express = require('express'); // servidor de express
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const openai = require('openai'); // API
const GenerarDiagnostico = require('./controllers/gpt');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');

//clave de API
// const apiKey = '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';
const dbname = 'quemapp';
const uri = 'mongodb://localhost:27017/' + dbname;
//inicializamos el server
const quemapp = express();
const port = 3000;
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// openai.api_key = apiKey;

quemapp.set('views', path.join(__dirname, 'views'));
quemapp.set('view engine', 'ejs');

// Middlewares para parsear el cuerpo de las solicitudes HTTP
quemapp.use(express.urlencoded({ extended: false }));
quemapp.use(express.json());
//carpeta de archivos publicos
quemapp.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));
//logger de solicitudes http mod 'Dev'
quemapp.use(morgan('dev'));

quemapp.use( session({
  secret: '12344321',
  resave : true,
  saveUninitialized: true
}));



quemapp.use(userRoutes);

mongoose.connect(uri, config)
  .then(() => {
    console.log(`Conexión a la base de datos *${dbname}* establecida.`);
    // Iniciar el servidor
    quemapp.listen(port, () => {
      console.log(`Servidor iniciado en http://localhost:${port}`);
    });

  })
  .catch((error) => {
    console.error('Ocurrió un error al conectar a la base de datos:', error);
  });
