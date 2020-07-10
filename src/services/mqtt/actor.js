const constants = require("./constants");
const Actor = require("../../model/actor");
const Device = require("../../model/device");
const Bucket = require("../../model/bucket");

const { mockBuckets } = require("../../utils/socket");
const { emit } = require("../socket/bucket");

const updateActor = async (payload, socket) => {
  try {
    const device = await Device.findOne({ mac_addres: payload.mac_addres });
    const actor = await Actor.findOne({
      device_parent: device._id,
      port: payload.Actor.port,
    });
    const buckets = await Bucket.find({ Actors: { $in: { _id: actor._id } } });

    if (!device || !actor) {
      return null;
    }

    if (actor) {
      const data = await actor.update(
        { value: payload.Actor.value },
        {
          upsert: true,
          useFindAndModify: false,
          new: true,
        }
      );

      if (buckets.length > 0) {
        buckets.forEach((el) => {
          return emit(mockBuckets(el, payload.Actor, "Actors"), socket);
        });
      }
    }

    console.info(
      `${payload.to}(${actor._id}) has moddified to ${payload.from}(${device._id})`
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createActor = async (payload, socket) => {
  try {
    const device = await Device.findOne({ mac_addres: payload.mac_addres });

    if (!device) {
      return null;
    }

    const findactor = await Actor.findOne({
      device_parent: device._id,
      port: payload.Actor.port,
    });

    let actor;
    if (findactor) {
      actor = await Actor.findOneAndUpdate(
        { _id: findactor._id },
        { ...payload.Actor },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
    } else {
      actor = await Actor.create({
        ...payload.Actor,
        device_parent: device._id,
      });
      device.update({
        $push: {
          Actors: actor._id,
        },
      });
    }

    console.info(
      `${payload.to}(${actor._id}) has created to ${payload.from}(${device._id})`
    );

    return actor;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = (payload, socket) => {
  switch (payload.event) {
    case constants.Actor.CREATE:
      createActor(payload, socket);
      break;
    case constants.Actor.UPDATE:
      updateActor(payload, socket);
      break;
    default:
      break;
  }
};
