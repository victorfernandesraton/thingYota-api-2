const { trimObjctt } = require("./common");

describe("trimObject", () => {
  test("have values", () => {
    const data = trimObjctt({ teste: "teste" });
    expect(data).toStrictEqual({ teste: "teste" });
  });

  test("have values and once is 0", () => {
    const data = trimObjctt({ teste: "teste", value: 0 });
    expect(data).toStrictEqual({ teste: "teste", value: 0 });
  });

  test("have values and once is negative", () => {
    const data = trimObjctt({ teste: "teste", value: -1 });
    expect(data).toStrictEqual({ teste: "teste", value: -1 });
  });

  test("have values and once is undefined", () => {
    const data = trimObjctt({ teste: "teste", value: undefined });
    expect(data).toStrictEqual({ teste: "teste" });
  });

  test("have values and once is null", () => {
    const data = trimObjctt({ teste: "teste", value: null });
    expect(data).toStrictEqual({ teste: "teste" });
  });

  test("have values and once is void string", () => {
    const data = trimObjctt({ teste: "teste", value: "" });
    expect(data).toStrictEqual({ teste: "teste" });
  });

  test("have values and once is NaM", () => {
    const data = trimObjctt({ teste: "teste", value: NaN });
    expect(data).toStrictEqual({ teste: "teste" });
  });

  test("have values and once is empty json", () => {
    const data = trimObjctt({ teste: "teste", value: {} });
    expect(data).toStrictEqual({ teste: "teste" });
  });

  test("have values and once is empty array", () => {
    const data = trimObjctt({ teste: "teste", value: [] });
    expect(data).toStrictEqual({ teste: "teste" });
  });
});
