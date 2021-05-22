/**
 * @description Rdeturn values is not exist in object
 * @param {any} object
 * @param {Array<String>} requires
 * @returns
 */

const validaionBodyEmpty = (object, requires) =>
  requires.filter((key) => !trimObjctt(object).hasOwnProperty(key));

/**
 * @description Trim undefuned and null propety in object
 * @param {*} obj
 * @returns
 */
const trimObjctt = (obj) => {
  for (let key in obj) {
    switch (obj[key]) {
      case null:
      case NaN:
      case undefined:
      case "":
      case {}:
        delete obj[key];
        break;
    }
    // verify is NaN
    if (obj[key] !== obj[key]) {
      delete obj[key];
    }
    if (typeof obj[key] === "object") {
      if (!Object.keys(obj[key]).length) {
        delete obj[key];
      }
    }

    if (Array.isArray(obj[key])) {
      console.log(obj[key].length);
      if (!obj[key].length) {
        delete obj[key];
      }
    }
  }
  return obj;
};

module.exports = {
  validaionBodyEmpty,
  trimObjctt,
};
