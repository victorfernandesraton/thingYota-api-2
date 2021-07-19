const Sensor = require("../entities/sensor");

describe("Sensor", () => {
  test("shoud be a valid sensor", () => {
    const sensor = new Sensor({
      name: "sensor de volume n1",
      port: "12",
      type: "volume-sensor",
      value: {
        value: 12,
        unit: "meters",
        type: "number",
      },
    });

    expect(sensor.validation()).toHaveLength(0);
    expect(sensor.isValid()).toBeTruthy();
  });
});
