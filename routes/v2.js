const router = require('express').Router();

// controllers
const user = require('../controller/v2/user.controller');
const bucket = require('../controller/v2/bucket.controller');

// User
router.get('/user',user.getAll);
router.get('/user/:id', user.getOne);
router.post('/user', user.create);
router.put('/user/:id', user.putData)

// Bucket
router.get('/bucket',bucket.getAll);
router.get('/bucket/:id', bucket.getOne);
router.post('/bucket', bucket.create);
router.put('/bucket/:id', bucket.putData)

module.exports = router
