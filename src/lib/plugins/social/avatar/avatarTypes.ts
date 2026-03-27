export interface Niche {
  id: string;
  name: string;
  description: string;
  targetKeywords: string[];
  idealCustomerProfile: string;
}

export interface Prospect {
  id: string;
  name: string;
  company: string;
  role: string;
  source: string;
  score: number;
  tags: string[];
  status: 'new' | 'qualified' | 'outreached' | 'converted' | 'ignored';
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  platform: string;
  url: string;
  detectedAt: string;
}

export interface OutreachDraft {
  id: string;
  prospectId: string;
  content: string;
  tone: string;
  status: 'pending' | 'approved' | 'sent';
}

export interface AvatarSession {
  id: string;
  activeNicheId: string;
  dailyGoal: number;
  leadsFound: number;
  outreachSent: number;
}
