import isPlainObject from './isPlainObject';

/**
 * Converts any types to string that is actually rendered.
 *
 * when we want to convert null and undefined to a string, we often want it to return an empty string.
 * when we turn an array and a plain object into a string, we often want to use JSON.stringify.
 * If the object’s toString method is overridden, then we want to use String().
 * In other cases, String() is used to convert the value to a String.
 *
 * @param {any} val
 * @returns {string}
 */
export default function toString(val: any): string {
  if (val === null || val === undefined) return '';
  if (Array.isArray(val)) return JSON.stringify(val);
  if (isPlainObject(val) && val.toString === Object.prototype.toString)
    return JSON.stringify(val);
  // other cases
  return String(val);
}
