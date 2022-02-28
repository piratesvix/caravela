/**
 * substitua a interface de error padrão para lançar mensagens de error personalizadas.
 *
 * @class Error
 * @extends {Error}
 */
 class Error {
  /**
   * mensagem de error para ser disparada.
   *
   * @type {string}
   * @memberof Error
   */
  message: string;

  /**
   * tipo de mensagem de error. Semelhante a isBoom, isJoi etc.
   *
   * @type {boolean}
   * @memberof Error
   */
  isCustom: boolean;

  /**
   * Código de status HTTP a ser enviado como status de resposta.
   *
   * @type {number}
   * @memberof Error
   */
  statusCode: number;

  /**
   * Criar uma instância de Error.
   *
   * @param {string} message
   * @param {number} statusCode
   * @memberof Error
   */
  constructor(message: string, statusCode: number) {
    this.isCustom = true;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default Error;