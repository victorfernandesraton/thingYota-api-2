const router = new (require('restify-router')).Router();

const auth = require('./auth.route');
const singup = require('./singup.route');

const user = require('./user.route');
const device = require('./device.route');

const bucket = require('./bucket.route');
const sensor = require('./sensor.route');
const actor = require('./actor.route');

const register = require('./register.route');

router.add('/auth', auth);
router.add('/singup', singup);

router.add('/user', user);
router.add('/device', device);
router.add('/bucket', bucket);
router.add('/sensor', sensor);
router.add('/actor', actor);

router.add('/register', register);

module.exports = router
