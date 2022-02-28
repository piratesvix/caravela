/**
 * transforme todos detalhes fornecidos como retorno de chamada.
 *
 * @param  {T[]} data
 * @param  {(info:T)=>T} transformCallback
 * @returns T
 */
 export default function transform<T>(
  data: T[],
  transformCallback: (info: T) => T
): T[] {
  return data.map(transformCallback);
}