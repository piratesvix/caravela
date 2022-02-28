/**
 * captura a primeira letra da palavra fornecida
 *
 * @param {string} word
 * @returns string
 */
 export function capitalize(word: string): string {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`;
}

/**
 * caso a palavra ou frase é fornecida, o separador substitui por letras maiúsculas.
 * E.g. exemplo_text => exemploText.
 *
 * @param {string} text
 * @param {string} [separator='_']
 * @returns string
 */
export function camelcase(text: string, separator = '_'): string {
  if (!(typeof text === 'string')) {
    return text;
  }

  const words = text.split(separator);

  return [
    words[0],
    ...words
      .slice(1)
      .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
  ].join('');
}