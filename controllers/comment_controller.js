
var models = require('../models/models.js');

// GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
  res.render('comments/new', {quizId: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments
exports.create = function(req, res) {
  var comment = models.Comment.build({
      texto: req.body.comment.texto,
      QuizId: req.params.quizId
    });

  comment.validate().then(function(err){
    if(err){
      res.render('comments/new', {comment: comment, errors: err.errors});
    } else {
      // guarda en la DB el campo texto de comment
      comment.save()
      .then(function(){
        res.redirect('/quizes/'+req.params.quizId);
      }); // Redireccion HTTP (URL relativo) lista de preguntas
    }
  }).catch(function(err){next(err)});
};

// // GET /quizes/:id/edit
// exports.edit = function(req, res) {
//   res.render('quizes/edit', {quiz: req.quiz, errors: []});
// };
//
// // PUT /quizes/:id
// exports.update = function(req, res) {
//   req.quiz.pregunta = req.body.quiz.pregunta;
//   req.quiz.respuesta = req.body.quiz.respuesta;
//   req.quiz.tematico = req.body.quiz.tematico;
//
//   req.quiz.validate().then(function(err){
//     if(err){
//       res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
//     } else {
//       // guarda en la DB los campos pregunta y respuesta de quiz
//       req.quiz
//       .save({fields: ["pregunta","respuesta","tematico"]})
//       .then(function(){
//         res.redirect('/quizes');
//       }); // Redireccion HTTP (URL relativo) lista de preguntas
//     }
//   })
// };
//
// // DELETE /quizes/:id
// exports.destroy = function(req, res) {
//   req.quiz.destroy().then(function(){
//     res.redirect('/quizes');
//   }).catch(function(err){next(err)});
// };
