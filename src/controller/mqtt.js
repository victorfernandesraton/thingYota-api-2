const deviceHandler = require('../services/mqtt/device');

module.exports= (payload, socket) => {
  switch (payload.to) {
    case 'Device':
      deviceHandler(payload);
      break;

    default:
      console.log(payload);
      break;
  }
}
