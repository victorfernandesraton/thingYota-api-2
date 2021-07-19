const macAdresssValidation = require("../validation/macAddress");
const requiredString = require("../validation/requiredString");
class Device {
  constructor({ name, macAddress, sensors, actors }) {
    this.name = name;
    this.macAddress = macAddress;
    this.sensors = sensors;
    this.actors = actors;
  }

  isValid() {
    return this.validation()?.length === 0;
  }
  validation() {
    return [
      macAdresssValidation(this.macAddress),
      ...requiredString(this, ["name"]),
    ].filter((item) => item != null);
  }
}

module.exports = Device;
