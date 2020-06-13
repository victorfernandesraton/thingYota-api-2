const Sensor = require('../../model/sensor');
const Device = require('../../model/device');

const updateSensor = async (payload, socket) => {
  try {
    const data = await Sensor.findOneAndUpdate({mac_addres: payload.mac_addres}, payload, {
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

const createSensor = async (payload, socket) => {
  try {
    const device = await Device.findOne({mac_addres: payload.mac_addres});

    if (!device) {
      return null;
    }


    const data = await Sensor.create({...payload.Sensor, device_parent: device._id});

    device.update({
      $push: {
        Sensors: data._id,
      },
    });
    socket.emit('teste', 'teste');
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports= (payload, socket) => {
  console.log(payload)
  switch (payload.event) {
    case 'create':
      createSensor(payload , socket);
      break;
    case 'updated':
      updateSensor(payload, socket);
      break;
    default:
      break;
  }
}
