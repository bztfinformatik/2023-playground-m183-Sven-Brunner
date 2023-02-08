// moudule providing objects and functions for routing
const express = require('express');
// import controller functions
const miscCtrl = require('../controllers/misc');

const router = express.Router();



router.get('/hw', miscCtrl.getHelloWorld);
router.post('/pm', miscCtrl.postMessage);
router.get("/", miscCtrl.default);


module.exports = router;