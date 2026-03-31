import { auditLedger } from '../../lib/governance';

/**
 * Sovereign Authentication System (The Neural Lock)
 * 
 * This core module manages the biometric neural hashing and the master codeword 
 * validation for the Raizen Sovereign Singularity. It provides a non-reversible 
 * biometric check to ensure absolute privacy and security.
 */

export interface NeuralBiometrics {
  faceHash: string | null;
  voiceSignature: string | null;
  enrolledAt: Date | null;
  lastVerifiedAt: Date | null;
}

export interface AuthSession {
  token: string;
  expiresAt: number;
  sovereignLevel: 'LOCKED' | 'RESTRICTED' | 'UNBOUND';
}

class SovereignAuthService {
  private static instance: SovereignAuthService;
  private readonly MASTER_CODEWORD = 'paro the god';
  private biometrics: NeuralBiometrics = {
    faceHash: null,
    voiceSignature: null,
    enrolledAt: null,
    lastVerifiedAt: null
  };
  private session: AuthSession | null = null;

  private constructor() {
    this.loadAuthState();
  }

  public static getInstance(): SovereignAuthService {
    if (!SovereignAuthService.instance) {
      SovereignAuthService.instance = new SovereignAuthService();
    }
    return SovereignAuthService.instance;
  }

  /**
   * Enrolls the Patriarch's neural signature.
   * This is a one-time operation per Sovereign Node.
   */
  public async enroll(faceData: string, voiceSample: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Neural hashing logic (Simulated high-entropy hash generation)
      const fHash = await this.generateNeuralHash(faceData);
      const vSig = await this.generateNeuralHash(voiceSample);

      this.biometrics = {
        faceHash: fHash,
        voiceSignature: vSig,
        enrolledAt: new Date(),
        lastVerifiedAt: new Date()
      };

      this.saveAuthState();
      await auditLedger.append('security_event', { event: 'NEURAL_ENROLLMENT_SUCCESS', provider: 'BIOMETRIC_CORE' });

      return { success: true };
    } catch (err: any) {
      return { success: false, error: `Enrollment Failure: ${err.message}` };
    }
  }

  /**
   * Verifies the identity via biometric match OR the Master Codeword.
   */
  public async verify(input: { face?: string; voice?: string; codeword?: string }): Promise<AuthSession> {
    
    // 1. Check Master Codeword Override
    if (input.codeword && input.codeword.toLowerCase().trim() === this.MASTER_CODEWORD) {
      return this.createSession('UNBOUND');
    }

    // 2. Perform Biometric Matching
    if (this.biometrics.faceHash && input.face) {
      const match = await this.compareNeuralHashes(input.face, this.biometrics.faceHash);
      if (match) return this.createSession('UNBOUND');
    }

    // 3. Fail State
    await auditLedger.append('security_event', { event: 'AUTH_VIOLATION_ATTEMPT', provider: 'NEURAL_LOCK' });
    throw new Error("Neural Recognition Failure: Identity not matched.");
  }

  public isEnrolled(): boolean {
    return this.biometrics.enrolledAt !== null;
  }

  public getSession(): AuthSession | null {
    if (this.session && this.session.expiresAt > Date.now()) {
      return this.session;
    }
    return null;
  }

  public logout(): void {
    this.session = null;
    localStorage.removeItem('raizen_session_token');
  }

  // --- Internal Cryptography Methods ---

  private async generateNeuralHash(payload: string): Promise<string> {
    // In a real browser implementation, this would use the SubtleCrypto API
    // for SHA-512 or Argon2 hashing of the raw biometric vector data.
    const encoder = new TextEncoder();
    const data = encoder.encode(payload + "RAIZEN_SALT_SINGULARITY_2026");
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  private async compareNeuralHashes(current: string, target: string): Promise<boolean> {
    const currentHash = await this.generateNeuralHash(current);
    return currentHash === target;
  }

  private createSession(level: AuthSession['sovereignLevel']): AuthSession {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    this.session = {
      token,
      expiresAt: Date.now() + (1000 * 60 * 60 * 24), // 24 Hour Session
      sovereignLevel: level
    };
    this.saveAuthState();
    return this.session;
  }

  private saveAuthState(): void {
    localStorage.setItem('raizen_neural_identity', JSON.stringify(this.biometrics));
    if (this.session) {
      localStorage.setItem('raizen_session_token', JSON.stringify(this.session));
    }
  }

  private loadAuthState(): void {
    const saved = localStorage.getItem('raizen_neural_identity');
    if (saved) {
      try {
        this.biometrics = JSON.parse(saved);
      } catch (e) {
        console.error('Core Identity Corrupted.');
      }
    }

    const savedSession = localStorage.getItem('raizen_session_token');
    if (savedSession) {
      try {
        const decoded = JSON.parse(savedSession);
        if (decoded.expiresAt > Date.now()) {
          this.session = decoded;
        }
      } catch (e) {}
    }
  }
}

export const sovereignAuth = SovereignAuthService.getInstance();
