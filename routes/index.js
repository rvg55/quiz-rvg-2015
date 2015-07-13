var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // Autoload :quizId

router.get('/quizes/', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
// router.get('/quizes/search', quizController.search);

router.get('/author', function(req, res, next) {
  res.render('author', { author: 'Raul' });
});

module.exports = router;
