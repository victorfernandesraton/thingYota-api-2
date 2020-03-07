const router = require('express').Router();

// Controllers
const health = require('../controller/v1/helth.controller');
const user = require('../controller/v1/user.controller');
const bucket = require('../controller/v1/bucket.controller');

router.use('/health', health.getHelth);

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

module.exports = router;
