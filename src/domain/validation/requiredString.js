module.exports = (object, fields) =>
  fields.map((field) =>
    !Object.hasOwnProperty.call(object, field) || object?.[field] === ""
      ? new Error(`name is required`)
      : null
  );
