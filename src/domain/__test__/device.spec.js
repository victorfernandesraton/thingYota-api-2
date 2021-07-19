const Device = require("../entities/device");

describe("Device", () => {
  test("should be a valid device", () => {
    const device = new Device({
      name: "Arduino T",
      actors: [],
      sensors: [],
      macAddress: "9c:30:5b:f6:fa:75",
    });

    expect(device.validation()).toHaveLength(0);
    expect(device.isValid()).toBeTruthy();
  });
  test("should be not a valid device because have invalid mac adress", () => {
    const device = new Device({
      name: "Arduino T",
      actors: [],
      sensors: [],
      macAddress: "01-23-45-67-89-a",
    });

    expect(device.isValid()).toBeFalsy();
    expect(device.validation()).toContainEqual(
      new Error(`macAdresss 01-23-45-67-89-a not valid`)
    );
  });
  test("should be not a valid device because have invalid name", () => {
    const device = new Device({
      name: "",
      actors: [],
      sensors: [],
      macAddress: "01-23-45-67-89-ab",
    });

    expect(device.isValid()).toBeFalsy();
    const validation = device.validation();
    expect(validation).toContainEqual(new Error(`name is required`));
    expect(validation).toHaveLength(1);
  });
});
