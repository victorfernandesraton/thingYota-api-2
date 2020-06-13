const Devive = require('../../model/device');

const updateDevice = async (payload, socket) => {
  try {
    const data = await Devive.findOneAndUpdate({mac_addres: payload.mac_addres}, payload, {
      upsert: true
    });
    console.log("Data has accepted");
    // socket.emit('teste', 'teste');
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const createDevice = async (payload, socket) => {
  try {
    const data = await Devive.create(payload);
    // socket.emit('teste', 'teste');
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports= (payload, socket) => {
  switch (payload.event) {
    case 'create':
      createDevice(payload , socket);
      break;
    case 'updated':
      updateDevice(payload, socket);
      break;
    default:
      break;
  }
}
