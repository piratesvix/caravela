import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class CandidatoSession extends bookshelf.Model<CandidatoSession> {
  get requireFetch(): boolean {
    return false;
  }

  get tableName(): string {
    return Table.CANDIDATO_SESSIONS;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default CandidatoSession;