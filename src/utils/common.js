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
  if (obj[key] == null || obj[key] =={} || (!obj[key] && typeof obj[key] != 'number')) {
      delete obj[key]
    }
  }
  return obj;
};

module.exports = {
  validaionBodyEmpty,
  trimObjctt,
};
