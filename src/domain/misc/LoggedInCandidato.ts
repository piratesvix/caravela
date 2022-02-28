import JWTPayload from './JWTPayload';

/**
 * LoggedInCandidato Interface.
 */
interface LoggedInCandidato extends JWTPayload {
  sessionId: number;
}

export default LoggedInCandidato;