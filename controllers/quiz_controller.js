
var models = require('../models/models.js');

// autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz){
      if(quiz){
        req.quiz = quiz;
        next();
      } else {
        next(new Error('No existe quizId='+quizId));
      };
  }).catch(function(error) {next(error);});
};

// GET /quizes
exports.index = function(req, res) {
  if(req.query.search !== undefined) {
    var search = req.query.search.replace(/\s/g,'%');
    search = '%'+search+'%';
    console.log("Buscando: "+search);
    models.Quiz.findAll({
        where: ["pregunta like ?", search],
        order: "pregunta ASC"
      }).then(
        function(quizes){
          if(quizes){
            res.render('quizes/index', {quizes: quizes});
          } else {
            next(new Error('No existen preguntas con el texto: '+req.query.texto));
          };
        }
    ).catch(function(error) {next(error);});
  } else {
    models.Quiz.findAll().then(
      function(quizes){
        res.render('quizes/index', {quizes: quizes});
      }).catch(function(error) {next(error);});
  }
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', {quiz: req.quiz});
};

// GET /quizes/:id/amswer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if(req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};
