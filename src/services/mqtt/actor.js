const Actor = require('../../model/actor');

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
    const data = await Actor.create(payload);
    // socket.emit('teste', 'teste');
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
      createActor(payload , socket);
      break;
    case 'updated':
      updateActor(payload, socket);
      break;
    default:
      break;
  }
}
