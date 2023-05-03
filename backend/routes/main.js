// moudule providing objects and functions for routing
const express = require('express');
// import controller functions
const miscCtrl = require('../controllers/misc');
const userCtrl = require('../controllers/user');
const router = express.Router();



router.get('/hw', miscCtrl.getHelloWorld);
router.post('/pm', miscCtrl.postMessage);
router.get("/", miscCtrl.default);

router.post('/user/signup', userCtrl.SignUp);
router.post('/user/login', userCtrl.LogIn);

module.exports = router;