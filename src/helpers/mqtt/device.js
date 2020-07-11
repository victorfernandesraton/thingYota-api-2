const constants = require('./constants');

const Devive = require('../../model/device');

const updateDevice = async (payload, socket) => {
  try {
    const data = await Devive.findOneAndUpdate({mac_addres: payload.mac_addres}, payload, {
      upsert: true
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const createDevice = async (payload, socket) => {
  try {
    const data = await Devive.create(payload);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports= (payload, socket) => {
  switch (payload.event) {
    case constants.Device.CREATE:
      return createDevice(payload, socket)
    case constants.Device.UPDATE:
      return updateDevice(payload, socket);
    default:
      return null;
  }
}
