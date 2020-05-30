const env = require("../config/env");
const mqtt = require("mqtt");

let url = `${env.mqtt.protocol}://${env.mqtt.host}${
  env.mqtt.port ? ":" + env.mqtt.port : ""
}${env.mqtt.url ? "/" + env.mqtt.url : ""}`

const clientMqtt = mqtt.connect(url);

console.log(url)

clientMqtt.on("connect", (data) => {
  console.info(`connected sucessful in mqtt broker at ${url}`);
});

module.exports = clientMqtt;
