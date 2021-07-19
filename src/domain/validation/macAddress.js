const MAC_ADDRESS_REGEX =
  /^([0-9a-f]{2}([:-]|$)){6}$|([0-9a-f]{4}([.]|$)){3}$/i;

module.exports = (value) =>
  !MAC_ADDRESS_REGEX.test(value)
    ? new Error(`macAdresss ${value} not valid`)
    : null;
