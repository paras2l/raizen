import React from 'react'

export type TabId = 'chat' | 'workspace' | 'missions' | 'security' | 'settings' | 'singularity'

export interface Tab {
  id: TabId
  label: string
  icon: React.ReactNode
}

/** Core Configuration for Neural Hub Agents */
export interface AgentConfig {
  id: string;
  name: string;
  modelId: string;
  apiKey: string;
  provider: string;
}

export interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant' | 'raizen'
  timestamp: Date
  isSovereign?: boolean
}

export type PlatformType = 'android' | 'ios' | 'mac' | 'windows' | 'web';

export interface SidebarProps {
  isMobile: boolean
  platform: PlatformType
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  activeTab: TabId
  setActiveTab: React.Dispatch<React.SetStateAction<TabId>>
  sessions: Map<string, Message[]>
  currentSessionId: string
  setCurrentSessionId: React.Dispatch<React.SetStateAction<string>>
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  toggleSidebar: () => void
  createNewSession: () => void
  layoutMode: 'dashboard_mode' | 'dev_mode' | 'focus_mode' | 'media_mode'
  isTransitioning: boolean
  mitosisActions?: any[]
}

export interface ChatViewProps {
  isMobile: boolean
  platform: PlatformType
  config: AgentConfig | null
  voiceMode: boolean
  securityError: string | null
  setSecurityError: React.Dispatch<React.SetStateAction<string | null>>
  currentSessionId: string
  setCurrentSessionId: React.Dispatch<React.SetStateAction<string>>
  sessions: Map<string, Message[]>
  setSessions: React.Dispatch<React.SetStateAction<Map<string, Message[]>>>
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  setVoiceMode: React.Dispatch<React.SetStateAction<boolean>>
  patriarch: {name: string, faceId: string} | null
  layoutMode: 'dashboard_mode' | 'dev_mode' | 'focus_mode' | 'media_mode'
  setLayoutMode: React.Dispatch<React.SetStateAction<'dashboard_mode' | 'dev_mode' | 'focus_mode' | 'media_mode'>>
  isTransitioning: boolean
  setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>
  oracleSet: any | null
  setOracleSet: React.Dispatch<React.SetStateAction<any | null>>
  showOracleModal: boolean
  setShowOracleModal: React.Dispatch<React.SetStateAction<boolean>>
  isLearning: boolean
  setIsLearning: React.Dispatch<React.SetStateAction<boolean>>
  learningTopic: string | null
  setLearningTopic: React.Dispatch<React.SetStateAction<string | null>>
  chaosScore: number
  swarmCount: number
  proactiveSolutions: any[]
  setProactiveSolutions: React.Dispatch<React.SetStateAction<any[]>>
  persona: string
  setPersona: React.Dispatch<React.SetStateAction<string>>
  isWithinSafeZone: boolean
  isFirewallActive: boolean
  setIsFirewallActive: React.Dispatch<React.SetStateAction<boolean>>
  isAtomicShredReady: boolean
  setIsAtomicShredReady: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SecurityCoreViewProps {
  isMobile: boolean
  platform: PlatformType
  isNervanaActive: boolean;
  nervanaStatus: string;
  onActivateNervana: () => void | Promise<void>;
  isIllusionistActive: boolean;
  illusionistStatus: string;
  onActivateIllusionist: () => void | Promise<void>;
  isMythmakerActive: boolean;
  mythmakerStatus: string;
  onActivateMythmaker: () => void | Promise<void>;
  isPhysicaActive: boolean;
  physicaStatus: string;
  onActivatePhysica: () => void | Promise<void>;
  isSpatialActive: boolean;
  spatialStatus: string;
  onActivateSpatial: () => void | Promise<void>;
  isFoundryActive: boolean;
  foundryStatus: string;
  onActivateFoundry: () => void | Promise<void>;
  isNomadActive: boolean;
  nomadStatus: string;
  onActivateNomad: () => void | Promise<void>;
  isCenturionActive: boolean;
  centurionStatus: string;
  onActivateCenturion: () => void | Promise<void>;
  isCitadelActive: boolean;
  citadelStatus: string;
  onActivateCitadel: () => void | Promise<void>;
  isHelaActive: boolean;
  helaStatus: string;
  onActivateHela: () => void | Promise<void>;
  isKeysActive: boolean;
  keysStatus: string;
  onActivateKeys: () => void | Promise<void>;
  isRootActive: boolean;
  rootStatus: string;
  onActivateRoot: () => void | Promise<void>;
  isSentinelArrayActive: boolean;
  sentinelArrayStatus: string;
  onActivateSentinelArray: () => void | Promise<void>;
  isSentinelSwarmActive: boolean;
  sentinelSwarmStatus: string;
  onActivateSentinelSwarm: () => void | Promise<void>;
  isTeslaActive: boolean;
  teslaStatus: string;
  onActivateTesla: () => void | Promise<void>;
  isVanguardActive: boolean;
  vanguardStatus: string;
  onActivateVanguard: () => void | Promise<void>;
  isVitalActive: boolean;
  vitalStatus: string;
  onActivateVital: () => void | Promise<void>;
  isIrisActive: boolean;
  irisStatus: string;
  onActivateIris: () => void | Promise<void>;
  isLifeLineActive: boolean;
  lifeLineStatus: string;
  onActivateLifeLine: () => void | Promise<void>;
  isSerenityActive: boolean;
  serenityStatus: string;
  onActivateSerenity: () => void | Promise<void>;

  // Missing Phase 8 Props
  isForgeActive?: boolean;
  forgeStatus?: string;
  onActivateForge?: () => void | Promise<void>;
  isGaiaActive?: boolean;
  gaiaStatus?: string;
  onActivateGaia?: () => void | Promise<void>;
  isGaiaXActive?: boolean;
  gaiaXStatus?: string;
  onActivateGaiaX?: () => void | Promise<void>;
  isTeslaLayerActive?: boolean;
  teslaLayerStatus?: string;
  onActivateTeslaLayer?: () => void | Promise<void>;
  isGhostNodeActive?: boolean;
  ghostNodeStatus?: string;
  onActivateGhostNode?: () => void | Promise<void>;
  isGridActiveTracker?: boolean;
  gridStatusTracker?: string;
  onActivateGridTracker?: () => void | Promise<void>;
  isNexusActiveTracker?: boolean;
  nexusStatusTracker?: string;
  onActivateNexusTracker?: () => void | Promise<void>;
  isGhostMeshActive?: boolean;
  ghostMeshStatus?: string;
  onActivateGhostMesh?: () => void | Promise<void>;
  isSearchActive?: boolean;
  searchStatus?: string;
  onActivateSearch?: () => void | Promise<void>;
  isCyclopsActive?: boolean;
  cyclopsStatus?: string;
  onActivateCyclops?: () => void | Promise<void>;
  isPerceptionActive?: boolean;
  perceptionStatus?: string;
  onActivatePerception?: () => void | Promise<void>;
  isFluxActive?: boolean;
  fluxStatus?: string;
  onActivateFlux?: () => void | Promise<void>;
  isMitosisActive?: boolean;
  mitosisStatus?: string;
  onActivateMitosis?: () => void | Promise<void>;
  isCanvasActive?: boolean;
  canvasStatus?: string;
  onActivateCanvas?: () => void | Promise<void>;
  isSpatialHudActive?: boolean;
  spatialHudStatus?: string;
  onActivateSpatialHud?: () => void | Promise<void>;
  isPersonaActive?: boolean;
  personaStatus?: string;
  onActivatePersona?: () => void | Promise<void>;
  isVectorSyncActive?: boolean;
  vectorSyncStatus?: string;
  onActivateVectorSync?: () => void | Promise<void>;
  isSustainActive?: boolean;
  sustainStatus?: string;
  onActivateSustain?: () => void | Promise<void>;
  isProseActive?: boolean;
  proseStatus?: string;
  onActivateProse?: () => void | Promise<void>;
  isOrchestratorActive?: boolean;
  orchestratorStatus?: string;
  onActivateOrchestrator?: () => void | Promise<void>;
  isCodeActive?: boolean;
  codeStatus?: string;
  onActivateCode?: () => void | Promise<void>;
  isAetherActive?: boolean;
  aetherStatus?: string;
  onActivateAether?: () => void | Promise<void>;
  isUntisActive?: boolean;
  untisStatus?: string;
  onActivateUntis?: () => void | Promise<void>;
  isSentientCodeActive?: boolean;
  sentientCodeStatus?: string;
  onActivateSentientCode?: () => void | Promise<void>;
  isScholarActive?: boolean;
  scholarStatus?: string;
  onActivateScholar?: () => void | Promise<void>;
  isOverclockActive?: boolean;
  overclockStatus?: string;
  onActivateOverclock?: () => void | Promise<void>;
  isImmuneActive?: boolean;
  immuneStatus?: string;
  onActivateImmune?: () => void | Promise<void>;
  isHyperionActive?: boolean;
  hyperionStatus?: string;
  onActivateHyperion?: () => void | Promise<void>;
  isHomeAssistantActive?: boolean;
  homeAssistantStatus?: string;
  onActivateHomeAssistant?: () => void | Promise<void>;
  isConstellationActive?: boolean;
  constellationStatus?: string;
  onActivateConstellation?: () => void | Promise<void>;
  isChronosActive?: boolean;
  chronosStatus?: string;
  onActivateChronos?: () => void | Promise<void>;
  isAlphaEvolutionActive?: boolean;
  alphaEvolutionStatus?: string;
  onActivateAlphaEvolution?: () => void | Promise<void>;
  isXRHooksActive?: boolean;
  xrHooksStatus?: string;
  onActivateXRHooks?: () => void | Promise<void>;
  isOutreachActive?: boolean;
  outreachStatus?: string;
  onActivateOutreach?: () => void | Promise<void>;
  isReputationActive?: boolean;
  reputationStatus?: string;
  onActivateReputation?: () => void | Promise<void>;
  isLedgerActive?: boolean;
  ledgerStatus?: string;
  onActivateLedger?: () => void | Promise<void>;
  isVoidJammingActive?: boolean;
  voidJammingStatus?: string;
  onActivateVoidJamming?: () => void | Promise<void>;
  isSixthSenseActive?: boolean;
  sixthSenseStatus?: string;
  onActivateSixthSense?: () => void | Promise<void>;
  isMimicActive?: boolean;
  mimicStatus?: string;
  onActivateMimic?: () => void | Promise<void>;
  isCabalActive?: boolean;
  cabalStatus?: string;
  onActivateCabal?: () => void | Promise<void>;
  isArtisanActive?: boolean;
  artisanStatus?: string;
  onActivateArtisan?: () => void | Promise<void>;
  isDirectorActive?: boolean;
  directorStatus?: string;
  onActivateDirector?: () => void | Promise<void>;
  isEchoActive?: boolean;
  echoStatus?: string;
  onActivateEcho?: () => void | Promise<void>;
  isArchitectActive?: boolean;
  architectStatus?: string;
  onActivateArchitect?: () => void | Promise<void>;
  isDreamReelActive?: boolean;
  dreamReelStatus?: string;
  onActivateDreamReel?: () => void | Promise<void>;
  isMaestroActive?: boolean;
  maestroStatus?: string;
  onActivateMaestro?: () => void | Promise<void>;
  isCodeSmithActive?: boolean;
  codeSmithStatus?: string;
  onActivateCodeSmith?: () => void | Promise<void>;
  isDuetActive?: boolean;
  duetStatus?: string;
  onActivateDuet?: () => void | Promise<void>;
  isStrategistActive?: boolean;
  strategistStatus?: string;
  onActivateStrategist?: () => void | Promise<void>;
  isPioneerActive?: boolean;
  pioneerStatus?: string;
  onActivatePioneer?: () => void | Promise<void>;
  isSilencerActive?: boolean;
  silencerStatus?: string;
  onActivateSilencer?: () => void | Promise<void>;
  isAuraActive?: boolean;
  auraStatus?: string;
  onActivateAura?: () => void | Promise<void>;
  isPhantomActive?: boolean;
  phantomStatus?: string;
  onActivatePhantom?: () => void | Promise<void>;
  isOracleActive?: boolean;
  oracleStatus?: string;
  onActivateOracle?: () => void | Promise<void>;
  isDiplomatActive?: boolean;
  diplomatStatus?: string;
  onActivateDiplomat?: () => void | Promise<void>;
  isShieldActive?: boolean;
  shieldStatus?: string;
  onActivateShield?: () => void | Promise<void>;
  isLegisActive?: boolean;
  legisStatus?: string;
  onActivateLegis?: () => void | Promise<void>;
  isPassportActive?: boolean;
  passportStatus?: string;
  onActivatePassport?: () => void | Promise<void>;

  // Phase 8 Core Synchronization Props
  isAiAdaptersActive?: boolean;
  aiAdaptersStatus?: string;
  onActivateAiAdapters?: () => void | Promise<void>;
  isAcpBridgeActive?: boolean;
  acpBridgeStatus?: string;
  onActivateAcpBridge?: () => void | Promise<void>;
  isCoreSoulActive?: boolean;
  coreSoulStatus?: string;
  onActivateCoreSoul?: () => void | Promise<void>;
  isInferenceActive?: boolean;
  inferenceStatus?: string;
  onActivateInference?: () => void | Promise<void>;
  isMirroringActive?: boolean;
  mirroringStatus?: string;
  onActivateMirroring?: () => void | Promise<void>;
  isOpenShellActive?: boolean;
  openShellStatus?: string;
  onActivateOpenShell?: () => void | Promise<void>;
  isSyntheticActive?: boolean;
  syntheticStatus?: string;
  onActivateSynthetic?: () => void | Promise<void>;
  isThreadOwnershipActive?: boolean;
  threadOwnershipStatus?: string;
  onActivateThreadOwnership?: () => void | Promise<void>;
  isContextInjectionActive?: boolean;
  contextInjectionStatus?: string;
  onActivateContextInjection?: () => void | Promise<void>;
  isMirageIntelActive?: boolean;
  mirageIntelStatus?: string;
  onActivateMirageIntel?: () => void | Promise<void>;
  isSelfImprovementActive?: boolean;
  selfImprovementStatus?: string;
  onActivateSelfImprovement?: () => void | Promise<void>;
  isAnchorPrivacyActive?: boolean;
  anchorPrivacyStatus?: string;
  onActivateAnchorPrivacy?: () => void | Promise<void>;

  onNeuralSatelliteBridge?: () => void | Promise<void>;
  onPredictCosmicEvents?: () => void | Promise<void>;

  // UI & Metrics Props
  isSentryHostile?: boolean;
  isTetherActive?: boolean;
  isAvatarVanguardActive?: boolean;
  networkHealth: number;
  nearbyEntities: any[];
  friendsCount: number;
  foesCount: number;
  dealConfidence: number;
  potentialSavings: string;
  culturalResonance: number;
  trustScore: number;
  socialCapital: number;
  mentionCount: number;
  titanResonance: number;
  translationConfidence: number;
  powerConnectionCount: number;
  privacyResilience: number;
  negotiationReady: boolean;
  empireValuation: string;
  viralPulse: number;
  fiscalEfficiency: number;
  loyaltyAverage: number;
  intelPulse: number;
  focusLevel: string;
  stressLevel: string;
  heartRate: number;
  eurekaSparkLevel: number;
  dreamIncubationCount: number;
  intentConfidence: number;
  latencyReduction: number;
  auraState: string;
  emotionalBalance: number;
  recallMatchCount: number;
  hazardLevel?: string;
  anchoredArtifacts?: number;
  learningTopic?: string | null;
  isStarActive?: boolean;
  satelliteStatus?: string;
  isGhostActive?: boolean;
  seizedCount?: number;
  isLensActive?: boolean;
  arbiterState?: string;
  isZoneActive?: boolean;
  zoneStatus?: string;
  isSentinelActive?: boolean;
  perimeterStatus?: string;
  urbanStatus?: string;
  bodyStatus?: string;
  isDigitizerActive?: boolean;
  isTerraformingActive?: boolean;
  envTargetTemp?: number;
  envTargetO2?: number;
  isForceFieldActive?: boolean;
  shieldIntegrity?: number;
  isEternalActive?: boolean;
  legacyStatus?: string;
  isParallelActive?: boolean;
  parallelProbability: number;
  onInitiateAegisScan: () => void | Promise<void>;
  onTriggerVitalTerraforming: () => void | Promise<void>;
  onActivateForceField: () => void | Promise<void>;
  onInitiateLegacyCapture: () => void | Promise<void>;
  onGeneratePatriarchAdvice: () => void | Promise<void>;
  onRunParallelSimulation: () => void | Promise<void>;
  isUnityActive: boolean;
  meshPeerCount: number;
  unityStatus: string;
  isTitanActive: boolean;
  breakthroughCount: number;
  titanStatus: string;
  onSyncUnityMesh: () => void | Promise<void>;
  onManualFailover: () => void | Promise<void>;
  onGenerateTitanReport: () => void | Promise<void>;
  onAlignStrategicDecision: (solutionId: any, context: any) => void | Promise<void>;
  isVoyagerActive: boolean;
  voyagerStatus: string;
  onBroadcastTemporalPacket: () => void | Promise<void>;
  isBabelActive: boolean;
  babelSnapshotCount: number;
  babelStatus: string;
  onSaveBabelSnapshot: () => void | Promise<void>;
  isSentientLegacyActive: boolean;
  sentientLegacyStatus: string;
  onSynthesizeLegacyAdvice: () => void | Promise<void>;
  isUniversalWitnessActive: boolean;
  witnessArchiveSize: string;
  onCaptureWitnessLog: () => void | Promise<void>;
  isMetaRealityActive: boolean;
  metaRealityStatus: string;
  onProjectMetaOverlay: () => void | Promise<void>;
  isPlanetaryMeshActive: boolean;
  planetaryNodeRank: string;
  onEstablishNodeRegistry: () => void | Promise<void>;
  isOrbitalPreservationActive: boolean;
  orbitalUplinkStatus: string;
  onForceOrbitalUplink: () => void | Promise<void>;
  isNavigatorActive: boolean;
  targetPowerScore: number;
  onInfluenceMapping: () => void | Promise<void>;
  isPlanetaryActive: boolean;
  meshStatus: string;
  onPlanetaryAssetShield: () => void | Promise<void>;
  controllableDevices: number;
  onCenturionScan: () => void | Promise<void>;
  isGridActive: boolean;
  activeTunnels: number;
  onEstablishGlobalTunnel: () => void | Promise<void>;
  isVoidActive: boolean;
  quantumState: string;
  onQuantumKeyRotation: () => void | Promise<void>;
  isSovereignActive: boolean;
  sovereignMode: string;
  onSyncFriendshipCore: () => void | Promise<void>;
  isBardActive: boolean;
  avatarConfidence: number;
  onBardAvatarStart: () => void | Promise<void>;
  isCatalystActive: boolean;
  researchField: string;
  onCatalystRunSim: () => void | Promise<void>;
  isPaladinActive: boolean;
  onPaladinOffenseExecute: () => void | Promise<void>;
  isAnchorActive: boolean;
  onAnchorHardwareValidate: () => void | Promise<void>;
  isApexActive: boolean;
  governanceStatus: string;
  onApexVerifyCodeword: () => void | Promise<void>;
  anonymityProfile: string;
  onGhostIntrusionErase: () => void | Promise<void>;
  isSanctuaryActive: boolean;
  onSanctuaryZoneActivate: () => void | Promise<void>;
  erasureStage: string;
  onPhoenixOmegaInitiate: () => void | Promise<void>;
  onNexusMeshEstablish: () => void | Promise<void>;
  onGridOptimize: () => void | Promise<void>;
  onTeslaOptimize: () => void | Promise<void>;
  onInitiateGodState: () => void | Promise<void>;
  identityStatus: string;
  onTrueBornVerify: () => void | Promise<void>;
  complianceStatus: string;
  onNeutralityAnalyze: () => void | Promise<void>;
  onVoidShieldData: () => void | Promise<void>;
  onGhostMaskLocation: () => void | Promise<void>;
  onGodCodeAuthorize: () => void | Promise<void>;
  onMintInstantiate: () => void | Promise<void>;
  onAegisPredict: () => void | Promise<void>;
  onLedgerOptimize: () => void | Promise<void>;
  onLegisForecast: () => void | Promise<void>;
  onIrisScan: () => void | Promise<void>;
  onSerenityStabilize: () => void | Promise<void>;
  onElysiumRestore: () => void | Promise<void>;
  isMilestoneActive: boolean;
  marketSignal: string;
  accuracyRating: string;
  remoteNodeCount: number;
  activeTrustCount: number;
  defenseReadiness: string;
  crisisRiskScore: number;
  effectiveTaxRate: string;
  complianceRating: string;
  lawForecastHorizon: string;
  distressLevel: string;
  medicalReadiness: string;
  burnoutRisk: string;
  focusModeStatus: string;
  recoveryReadiness: string;
  onMirageIgnite: () => void | Promise<void>;
  onMaestroSync: () => void | Promise<void>;
  onMaestroMilestone: () => void | Promise<void>;
  onQuantPredict: () => void | Promise<void>;
  onVentureSync: () => void | Promise<void>;
  satLinkStatus: string;
  isWithinSafeZone: boolean;
  cosmicPredictions: number;
  activeVisualSkin: string;
  mappedSurfaces: number;
  nexusNodesActive: number;
  collectiveThreatLevel: string;
  infrastructureCohesion: number;
  energySovereignty: string;
  powerReserve: number;
  unificationState: string;
  maestroStyle: string;
  mixerStatus: string;
  forgeJobCount: number;
  miningHashrate: string;
  powerStatus: string;
  ecoStatus: string;
  fleetStatus: string;
  scanCount: number;
  rootDeviceCount: number;
  onInitiateForgeJob: () => void | Promise<void>;
  onStartMining: () => void | Promise<void>;
  onExecuteArbitrage: () => void | Promise<void>;
  onTriggerTerraforming: () => void | Promise<void>;
  onInitiateGreenPath: () => void | Promise<void>;
  onInitiateDroneMission: () => void | Promise<void>;
  onInitiateScan: () => void | Promise<void>;
  onExecuteRootBypass: () => void | Promise<void>;
  onHijackCenturion: () => void | Promise<void>;
  onAuthorizeCenturion: () => void | Promise<void>;
  onCloneVocalIdentity: () => void | Promise<void>;
  onInjectRealityOverlay: () => void | Promise<void>;
  onOrchestrateTask: () => void | Promise<void>;
  onSynthesizeLegend: () => void | Promise<void>;
  onSynthesizeDreamCinema: () => void | Promise<void>;
  onAnalyzeCreativeDNA: () => void | Promise<void>;
  onSpawnSoftware: () => void | Promise<void>;
  onSculptReality: () => void | Promise<void>;
  onPerformDuet: () => void | Promise<void>;
  onInterceptSatelliteImagery: () => void | Promise<void>;
  onDeepSpaceScan: () => void | Promise<void>;
  onSilenceEnvironment: () => void | Promise<void>;
  onDeepEMFScan: () => void | Promise<void>;
  onSpectrumGhosting: () => void | Promise<void>;
  onPreComputeSolutions: () => void | Promise<void>;
  onNegotiationSimulation: () => void | Promise<void>;
  onSocialEngineeringScan: () => void | Promise<void>;
  onRegulatoryForecast: () => void | Promise<void>;
  onDigitalBorderCrossing: () => void | Promise<void>;
  
  // Missing Metrics & Detail Props
  frontierAlerts?: number;
  jammingRadius?: number;
  threatLevel?: string;
  ghostNodes?: number;
  globalMood?: string;
  activeSimulations?: number;
  psychRisk?: string;
  pendingLaws?: number;
  currentJurisdiction?: string;
  dominanceMetric?: number;
  echoSignatures?: number;
  illusionistOverlays?: number;
  architectApps?: number;
  mythmakerProgress?: number;
  dreamProductions?: number;
  maestroDNAS?: number;
  duetLatency?: number;
  directorJobs?: number;
  activeDeployments?: number;
}

export interface MissionCenterViewProps {
  isMobile: boolean
  platform: PlatformType
}

export interface SingularityCoreViewProps {
  isMobile: boolean
  platform: PlatformType
  isAlignmentActive: boolean;
  alignmentStatus: string;
  ascensionLevel: string;
  resonanceScore: number;
  activeLegionAgents: number;
  paroStatus: string;
  isPredictiveActive: boolean;
  predictiveStatus: string;
  isSingDriveActive: boolean;
  singDriveBrilliance: number;
  rccrMissions: number;
  singCoreStatus: string;
  triggerEvent: () => void;
}
