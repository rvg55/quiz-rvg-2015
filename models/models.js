var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/DATABASE_URL
// SQLite   DATABASE_URL = sqlite://:@:
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;
// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar DB Postgres o SQLite
var sequelize = new Sequelize(DB_name, user, pwd,
  {
    dialect: protocol,
    protocol: protocol,
    port: port,
    host: host,
    storage: storage, // solo SQLite (.env)
    omitNull: true    // solo Postgres
  }
);

// Importar la definicion de la tabla
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz; // exportar definicion de la tabla Quiz

// sequelize.sync() crea e inicializa la tabla de preguntas en la DB
sequelize.sync().sucess(function(){
  // sucess ejecuta el manejador una vez creada la tabla
  Quiz.count().sucess(function(count){
    if(count === 0){ // La tabla se inicializa solo si esta vacia
      Quiz.create({
        pregunta: "Capital de Italia",
        respuesta: "Roma"
      }).sucess(function(){console.log('DB inicializada')});
    };
  });
});
