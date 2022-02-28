/**
 * @piratesvix Pirates Vix Technologies
 * email: hi@piratesvix.io
 * 
 * CandidatoSobre Interface.
 */
 interface CandidatoSobre {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  github: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

export default CandidatoSobre;