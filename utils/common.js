/**
 * @description Rdeturn values is not exist in object
 * @param {any} object
 * @param {Array<String>} requires
 * @returns
 */

exports.validaionBodyEmpty = (object, requires) => requires.filter(key => !object.hasOwnProperty(key))
