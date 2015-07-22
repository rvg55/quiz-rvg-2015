var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // Autoload :quizId

// Definicion de rutas de sesion
router.get('/login',                        sessionController.new); // formulario de login
router.post('/login',                       sessionController.create); // crear sesion
router.get('/logout',                       sessionController.destroy); // destruir sesion

// Definicion de rutas de quizes
router.get('/quizes/',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new',                   quizController.new);
router.post('/quizes/create',               quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',    quizController.edit);
router.put('/quizes/:quizId(\\d+)',         quizController.update);
router.delete('/quizes/:quizId(\\d+)',         quizController.destroy);
router.get('/author', function(req, res, next) {
  res.render('author', { author: 'Raul' , errors: [] });
});

router.get('/quizes/:quizId(\\d+)/comments/new',  commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',     commentController.create);

module.exports = router;
