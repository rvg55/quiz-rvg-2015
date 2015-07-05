var path = require('path');

// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar la DB SQLite
var sequelize = new Sequelize(null, null, null,
                              {dialect: "sqlite", storage: "quiz.sqlite"}
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
      }).sucess(funtion(){
        console.log('DB inicializada');
      });
    }
  });
});
