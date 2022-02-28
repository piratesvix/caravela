/**
 * @piratesvix Pirates Vix Technologies
 * email: hi@piratesvix.io
 * 
 * CandidatoSessionSobre Interface.
 */
interface CandidatoSessionSobre {
  id: number;
  token: string;
  userId: number;
  isActive: boolean;
  updatedBy?: string;
  createdBy?: string;
}

export default CandidatoSessionSobre;