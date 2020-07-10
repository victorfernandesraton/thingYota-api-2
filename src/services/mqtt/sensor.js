const constants = require("./constants");

const Sensor = require("../../model/sensor");
const Device = require("../../model/device");
const Bucket = require("../../model/bucket");

const { mockBuckets } = require("../../utils/socket");
const { emit } = require("../socket/bucket");

const updateSensor = async (payload, socket) => {
  try {
    const device = await Device.findOne({ mac_addres: payload.mac_addres });
    const sensor = await Sensor.findOne({
      device_parent: device._id,
      port: payload.Sensor.port,
    });
    const buckets = await Bucket.find({
      Sensors: { $in: { _id: sensor._id } },
    });

    if (!device || !sensor || buckets.length < 1) {
      return null;
    }

    const recives = buckets.map((el) => {
      return emit(mockBuckets(el, payload.Sensor, "Sensors"), socket);
    });

    const data = await Sensor.findByIdAndUpdate(
      { _id: sensor._id },
      { value: payload.Sensor.value },
      {
        upsert: true,
        useFindAndModify: false,
        new: true,
      }
    );

    console.info(
      `${payload.to}(${sensor._id}) has moddified to ${payload.from}(${device._id})`
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createSensor = async (payload, socket) => {
  try {
    const device = await Device.findOne({ mac_addres: payload.mac_addres });

    if (!device) {
      return null;
    }

    let sensor;
    const findSensor = await Sensor.findOne({device_parent: device._id, port: payload.Sensor.port})

    if (findSensor) {
      sensor = findSensor.update({...payload.Sensor})
    } else {
      sensor = await Sensor.create({
        ...payload.Sensor,
        device_parent: device._id,
      });
      device.update({
        $push: {
          Sensors: sensor._id,
        },
      });
    }

    console.info(
      `${payload.to}(${sensor._id}) has moddified to ${payload.from}(${device._id})`
    );

    return sensor;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = (payload, socket) => {
  switch (payload.event) {
    case constants.Sensor.CREATE:
      createSensor(payload, socket);
      break;
    case constants.Sensor.UPDATE:
      updateSensor(payload, socket);
      break;
    default:
      break;
  }
};
