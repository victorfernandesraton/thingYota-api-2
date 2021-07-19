const MAC_ADDRESS_REGEX =
  /^([0-9a-f]{2}([:-]|$)){6}$|([0-9a-f]{4}([.]|$)){3}$/i;

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
    let errors = [];
    if (!MAC_ADDRESS_REGEX.test(this.macAddress)) {
      errors.push(new Error(`macAdresss ${this.macAddress} not valid`));
    }

    if (!this.name || this.name === "") {
      errors.push(new Error(`name is required`));
    }
    return errors;
  }
}

module.exports = Device;
