
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
