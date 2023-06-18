var express = require('express');
var router = express.Router();

const Controller = require('../Contrller');



/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.type('html');
  res.render('spot_main', { title: 'Express' });
}); 
 */
router.get('/searchSpot', Controller.handleSearch);

router.get('/showSpot', Controller.handleShow);

router.get('/face',Controller.handleFace);

router.post('/sendNewUser', Controller.handleRegist);

router.post('/login', Controller.handleLogin);

router.post('/citylist',Controller.handleCity);

router.get('/personalComment',Controller.handlePersonComment);

module.exports = router;