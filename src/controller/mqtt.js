const deviceHandler = require('../services/mqtt/device');
const semsorHandler = require('../services/mqtt/sensor');

module.exports= (payload, socket) => {
  switch (payload.to) {
    case 'Device':
      deviceHandler(payload, socket);
      break;
    case 'Sensor':
      semsorHandler(payload, socket)

    default:
      console.log(payload);
      break;
  }
}
