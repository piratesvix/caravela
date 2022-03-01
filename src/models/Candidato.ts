import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class Candidato extends bookshelf.Model<Candidato> {
  static fetchAll() {
    throw new Error('Method not implemented.');
  }
  get requireFetch(): boolean {
    return false;
  }

  get tableName(): string {
    return Table.CANDIDATOS;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default Candidato;