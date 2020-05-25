const errors = require("restify-errors");

const sendEmmiter = (req, res, next) => {
  const { dispensor } = req.locals;
  try {
    dispensor.forEach((el) => {
      req.mqtt.client.publish(el.topic, JSON.stringify(el.payload));
    });
    next();
  } catch (error) {
    return res.send(new errors.InternalServerError(`${error}`));
  }
};

module.exports = {
  sendEmmiter,
};
