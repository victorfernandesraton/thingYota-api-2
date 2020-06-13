const deviceHandler = require("../services/mqtt/device");
const semsorHandler = require("../services/mqtt/sensor");
const actorHandler = require("../services/mqtt/actor");

module.exports = (payload, socket) => {
  switch (payload.to) {
    case "Device":
      deviceHandler(payload, socket);
      break;
    case "Sensor":
      semsorHandler(payload, socket);
      break;
    case "Actor":
      actorHandler(payload, socket);
      break;
    default:
      console.log(payload);
      break;
  }
};
