import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class Candidato extends bookshelf.Model<Candidato> {
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