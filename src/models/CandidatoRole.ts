import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class CandidatoRole extends bookshelf.Model<CandidatoRole> {
  get requireFetch(): boolean {
    return false;
  }

  get tableName(): string {
    return Table.CANDIDATO_ROLES;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default CandidatoRole;