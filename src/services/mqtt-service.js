const env = require("../config/env");
const mqtt = require("mqtt");

const Sensor = require("../model/sensor");
const Actor = require("../model/actor");
const Device = require("../model/device");

let url = `${env.mqtt.protocol}://${env.mqtt.host}${
  env.mqtt.port ? ":" + env.mqtt.port : ""
}${env.mqtt.url ? "/" + env.mqtt.url : ""}`;

const clientMqtt = mqtt.connect(url);

module.exports = clientMqtt;
