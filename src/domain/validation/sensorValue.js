module.exports = ({ value, type, unit }) => {
  switch (type) {
    case "string":
    case "boolean":
    case "number":
      return typeof value === type &&
        Object.hasOwnProperty.call(validUnits, type)
        ? !validUnits?.[type]?.includes?.(unit)
          ? new Error(`unit ${unit} has not valid for type ${type}`)
          : null
        : null;

    default:
      return new Error("not have matching");
  }
};

const validUnits = {
  string: ["name"],
  boolean: ["status"],
  number: [
    "celsius",
    "firehight",
    "meters",
    "centimeters",
    "pol",
    "inches",
    "feet",
    "kg",
    "g",
  ],
};
