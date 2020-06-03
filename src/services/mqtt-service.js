const env = require("../config/env");
const mqtt = require("mqtt");

const Sensor = require("../model/sensor");
const Actor = require("../model/actor");
const Device = require("../model/device");

let url = `${env.mqtt.protocol}://${env.mqtt.host}${
  env.mqtt.port ? ":" + env.mqtt.port : ""
}${env.mqtt.url ? "/" + env.mqtt.url : ""}`;

const clientMqtt = mqtt.connect(url);

console.log(url);

clientMqtt.on("connect", (data) => {
  console.info(`connected sucessful in mqtt broker at ${url}`);
  clientMqtt.subscribe("server", (err) => {
    if (err) {
      console.error(err);
      clientMqtt.end();
    }
  });
});

clientMqtt.on("message", async (topic, data) => {
  // message is Buffer
  console.info(Date());
  console.log(`[${topic}]`, data.toString());
  try {
    const payload = JSON.parse(data.toString());
    const { type, value } = payload;
    if (payload && payload.type) {
      let { entity } = value;
      switch (payload.type) {
        case "update":
        case "create":
          let device;
          switch (entity) {
            case "Actor":
              device = await Device.findOne({
                mac_adress: value.device_parent.mac_adress,
              });

              if (device) {
                let actor = await Actor.findOne({
                  device_parent: device._id,
                  port: value.port,
                });
                let newActor = {
                  name: value.name,
                  type: value.type,
                  port: value.port,
                  status: value.status,
                  device_parent: device._id,
                };
                if (actor) {
                  await actor.update(newActor, {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true,
                  });
                } else {
                  Actor.create(newActor);
                }
                device.update({
                  $push: {
                    Sensors: newActor,
                  },
                });
              }
              break;
            case "Sensor":
              device = await Device.findOne({
                mac_adress: value.device_parent.mac_adress,
              });

              if (device) {
                let sensor = await Sensor.findOne({
                  device_parent: device._id,
                  port: value.port,
                });
                let newSensor = {
                  name: value.name,
                  type: value.type,
                  port: value.port,
                  status: value.status,
                  device_parent: device._id,
                };
                if (sensor) {
                  await sensor.update(newSensor, {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true,
                  });
                } else {
                  Sensor.create(newSensor);
                }
                device.update({
                  $push: {
                    Sensors: newSensor,
                  },
                });
              }
              break;
            case "Device":
              device = await Device.findOne({
                mac_adress: value.mac_adress,
              });
              let newDevice = { ...value };
              if (device) {
                device.update(newDevice, {
                  new: true,
                  upsert: true,
                  setDefaultsOnInsert: true,
                });
              } else {
                Device.create(newDevice);
              }
          }
          break;
        default:
          console.log(value);
      }
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = clientMqtt;
