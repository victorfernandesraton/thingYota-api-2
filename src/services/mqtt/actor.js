const Actor = require('../../model/actor');
const Device = require('../../model/device');

const updateActor = async (payload, socket) => {
  try {
    const data = await Actor.findOneAndUpdate({mac_addres: payload.mac_addres}, payload, {
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

const createActor = async (payload, socket) => {
  try {
    const device = await Device.findOne({mac_addres: payload.mac_addres});

    if (!device) {
      return null;
    }

    const data = await Actor.create({...payload.Actor, device_parent: device._id});

    device.update({
      $push: {
        Actors: data._id,
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
  switch (payload.event) {
    case 'create':
      createActor(payload , socket);
      break;
    case 'updated':
      updateActor(payload, socket);
      break;
    default:
      break;
  }
}
