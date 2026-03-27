export type ActorType = 'Individual' | 'Organization' | 'ShadowGroup';

export interface CabalActor {
  id: string;
  name: string;
  type: ActorType;
  officialTitle?: string;
  realInfluenceScore: number; // 0-100
  connections: string[]; // Actor IDs
}

export interface InfluenceEdge {
  from: string;
  to: string;
  strength: number;
  direction: 'Uni' | 'Bi';
  nature: 'Financial' | 'Political' | 'Social' | 'Coercive';
}

export interface PowerMap {
  city: string;
  topBrokers: CabalActor[];
  hiddenAlliances: InfluenceEdge[];
  timestamp: number;
}

export interface CabalAction {
  type: 'analyze' | 'rank' | 'scan' | 'advise';
  payload: any;
}
