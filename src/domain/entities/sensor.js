const requiredString = require("../validation/requiredString");
const sensorValue = require("../validation/sensorValue");

class Sensor {
  constructor({ name, port, device, type, value, status }) {
    this.name = name;
    this.port = port;
    this.device = device;
    this.type = type ?? "volume-sensor";
    this.value = value;
    this.status = status;
  }

  validation() {
    return [
      ...requiredString(this, ["name", "port", "type"]),
      sensorValue({ ...this.value }),
    ].filter((item) => !!item);
  }

  isValid() {
    return !this.validation()?.length;
  }
}

module.exports = Sensor;
