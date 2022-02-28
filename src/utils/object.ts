import { isArray } from './array';
import { camelcase } from './string';

/**
 * verifique se o parâmetro fornecido é objeo ou não.
 *
 * @param {any} obj
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isObject(obj: any): boolean {
  return (
    obj !== undefined &&
    obj !== null &&
    !Array.isArray(obj) &&
    obj instanceof Object
  );
}

/**
 * Data também é instância de objeto, portanto, precisa ser tratada
 *
 * @param {any} data
 * @returns {any}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function camelize(data: any): any {
  const isDate = data instanceof Date;

  if (isArray(data)) {
    return data.map((obj: any) => camelize(obj));
  }

  if (!isDate && isObject(data)) {
    return Object.keys(data).reduce((accumulator, current) => {
      const key = camelcase(current);
      const value = camelize(data[current]);

      return Object.assign(accumulator, { [key]: value });
    }, {});
  }

  return data;
}