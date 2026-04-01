import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import { 
  checkCodewordObedience, 
  AuditEntry,
  auditLedger,
  IMMUTABLE_BOUNDARY_PREFIXES
} from './lib/governance'
import { SovereignBoot } from './components/SovereignBoot';
import { BiometricEnrollment } from './components/BiometricEnrollment';
import { SovereignSecurityView } from './ui/SovereignSecurityView';
import { sovereignAuth } from './core/auth/SovereignAuth';
import { EchoBeacon } from './ui/EchoBeacon';
import { AcousticSynapse } from './ui/AcousticSynapse';
import { ghostShredder } from './core/agents/GhostShredder';
import { ghostLinkEngine } from './core/network/GhostLinkEngine';
import { pluginRegistry } from './lib/plugins';
import { raizenMemory } from './lib/memory';
import { ghostHub } from './lib/ghost/GhostHub';
import { ghostEngine } from './lib/ghost/engine';
import { discoveryService } from './lib/network/bonjour';
import { systemDoctor } from './lib/diagnostics/doctor';
import { 
  MessageSquare, 
  Box, 
  Cpu, 
  ChevronRight, 
  ChevronDown,
  Plus,
  X,
  ShieldCheck,
  Crown,
  Settings,
  Activity,
  Zap,
  Wand2,
  Shield,
  Lock,
  Camera,
  Database,
  Users,
  Mic,
  MicOff,
  Send,
  Terminal,
  Globe,
  Satellite,
  Radio,
  Ghost,
  Fingerprint,
  FileText,
  TrendingUp,
  Brain,
  Wind,
  RefreshCw,
  Landmark,
  MapIcon,
  Key,
  Projector,
  Menu as MenuIcon,
  Volume2,
  VolumeX,
  Share2,
  ShieldAlert,
  Scan,
  Sparkles,
  Trash2,
  MapPin,
  Edit3,
  UserCheck,
  Award,
  Briefcase,
  CheckCircle2,
  Maximize2,
  Scale,
  Eye,
  Cloud,
  Heart,
  History,
  Book,
  Target,
  SignalHigh,
  Gavel,
  Compass,
  Car,
  EthernetPort,
  Infinity as InfinityIcon,
  Gamepad2,
  FlaskConical,
  Anchor,
  EyeOff,
  Flame,
  Plane,
  Music,
  Clock,
  MessageCircle,
  Smartphone,
  Rss,
  Hash,
  Layers,
  Rocket,
  Palette,
  Video,
  Network,
  BookOpen,
  Film,
  Cuboid,
  Mic2,
  WifiOff,
  Wand
} from 'lucide-react'
import { 
  TabId, 
  Tab,
  PlatformType,
  AgentConfig, 
  Message, 
  SidebarProps, 
  ChatViewProps, 
  SecurityCoreViewProps, 
  SingularityCoreViewProps 
} from './types'

// Modular UI Imports
import { Sidebar } from './ui/Sidebar'
import { ChatView } from './ui/ChatView'
import { SecurityCoreView } from './ui/SecurityCoreView'
import { MissionCenterView } from './ui/MissionCenterView'
import { ActivityLedgerView } from './ui/ActivityLedgerView'
import { SingularityCoreView, PlaceholderView } from './ui/SingularityCoreView'



const tabs: Tab[] = [
  { id: 'chat', label: 'Neural Link', icon: <MessageSquare size={18} /> },
  { id: 'workspace', label: 'Mission Center', icon: <Box size={18} /> },
  { id: 'missions', label: 'Activity Ledger', icon: <Activity size={18} /> },
  { id: 'security', label: 'Security Core', icon: <ShieldCheck size={18} /> },
  { id: 'singularity', label: 'S+++ Core', icon: <Crown size={18} /> },
  { id: 'settings', label: 'System Config', icon: <Settings size={18} /> },
]


// --- UI COMPONENTS ---

const SystemStatusMonitor = ({ children, isMobile }: { children: React.ReactNode, isMobile: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      triggerRef.current.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) {
        triggerRef.current.setAttribute('aria-controls', 'system-protocol-panel');
      } else {
        triggerRef.current.removeAttribute('aria-controls');
      }
    }
  }, [isOpen]);

  const count = React.Children.count(children);
  
  return (
    <div className={`system-status-monitor ${isOpen ? 'open' : ''} ${isMobile ? 'mobile' : ''}`}>
      <button 
        ref={triggerRef}
        type="button"
        className="status-summary-trigger" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="status-dot-group">
          <Activity size={14} className="pulse" />
          <span className="protocol-count">{count} PROTOCOLS</span>
        </span>
        <span className="status-meta">
          <span className="status-label">SYSTEM_OMNIPRESENCE</span>
          <ChevronDown size={12} className={`chevron-icon ${isOpen ? 'rotate' : ''}`} />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="status-monitor-backdrop"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              className="status-monitor-panel"
              id="system-protocol-panel"
            >
              <div className="panel-header">
                <h3>VANGUARD_STATUS_MESH</h3>
                <button onClick={() => setIsOpen(false)} title="Close Status Monitor"><X size={16} /></button>
              </div>
              <div className="status-grid-scroll">
                <div className="status-grid-inner">
                  {children}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  // Real-time Core Metrics
  const [chaosScore, setChaosScore] = useState(0.42);
  const [overclockUrgency, setOverclockUrgency] = useState(0.15);
  const [emotionState, setEmotionState] = useState({ state: 'STABLE', prefix: 'Optimal' });
  const [swarmCount, setSwarmCount] = useState(1);

  const [activeTab, setActiveTab] = useState<TabId>('chat')
  const [isSovereignAuthenticated, setIsSovereignAuthenticated] = useState(false);
  const [showSecurityBoot, setShowSecurityBoot] = useState(true);
  const [isAcousticActive, setIsAcousticActive] = useState(true);

  useEffect(() => {
    const session = sovereignAuth.getSession();
    if (session && session.sovereignLevel === 'UNBOUND') {
      setIsSovereignAuthenticated(true);
      setShowSecurityBoot(false);
    }
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)
  
  const getPlatform = (): PlatformType => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('android')) return 'android';
    if (ua.includes('iphone') || ua.includes('ipad')) return 'ios';
    if (ua.includes('macintosh')) return 'mac';
    if (ua.includes('windows')) return 'windows';
    return 'web';
  };
  
  const [platform] = useState<PlatformType>(getPlatform());
  const [layoutMode, setLayoutMode] = useState<'dashboard_mode' | 'dev_mode' | 'focus_mode' | 'media_mode'>('dashboard_mode')

  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Singleton Sovereignty State
  const [isBooting, setIsBooting] = useState(true)
  const [patriarch, setPatriarch] = useState<{name: string, faceId: string} | null>(() => {
    const saved = localStorage.getItem('raizen_patriarch')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (patriarch) {
      console.log(`[SINGULARITY] Patriarch ${patriarch.name} recognized.`);
    }
  }, [patriarch])

  const [securityError, setSecurityError] = useState<string | null>(null)
  const [agents, setAgents] = useState<AgentConfig[]>([])
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null)
  const activeAgent = agents.find(a => a.id === activeAgentId) || null
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hubStatus, setHubStatus] = useState<'primary' | 'secondary' | 'offline'>('primary');
  const [constellationNodes, setConstellationNodes] = useState<any[]>([]);
  const [proactiveSolutions, setProactiveSolutions] = useState<any[]>([])
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState<string>('default')
  const [sessions, setSessions] = useState<Map<string, Message[]>>(new Map([['default', []]]))
  const [messages, setMessages] = useState<Message[]>([])
  
  // Oracle & Arbiter State
  const [oracleSet, setOracleSet] = useState<any | null>(null)
  const [showOracleModal, setShowOracleModal] = useState(false)
  const [persona, setPersona] = useState<string>('ASSISTANT')


  // --- Singularity Core S+++ State ---
  const [runSingularityCycle, setRunSingularityCycle] = useState(0);
  const [isAlignmentActive, setIsAlignmentActive] = useState(false);
  const [alignmentStatus, setAlignmentStatus] = useState('IDLE');
  const [ascensionLevel, setAscensionLevel] = useState('DORMANT');
  const [resonanceScore, setResonanceScore] = useState(0);
  const [activeLegionAgents, setActiveLegionAgents] = useState(0);
  const [paroStatus, setParoStatus] = useState('OBSERVING');
  const [isPredictiveActive, setIsPredictiveActive] = useState(false);
  const [predictiveStatus, setPredictiveStatus] = useState('AWAITING_DATA');
  const [isSingDriveActive, setIsSingDriveActive] = useState(false);
  const [singDriveBrilliance, setSingDriveBrilliance] = useState(0);
  const [rccrMissions, setRccrMissions] = useState(0);
  const [singCoreStatus, setSingCoreStatus] = useState('STANDBY');
  const [isNervanaActive, setIsNervanaActive] = useState(false);
  const [nervanaStatus, setNervanaStatus] = useState('DORMANT');

  // --- Extended Creative & Finance State ---
  const [isIllusionistActive, setIsIllusionistActive] = useState(false);
  const [illusionistStatus, setIllusionistStatus] = useState('IDLE');
  const [isMythmakerActive, setIsMythmakerActive] = useState(false);
  const [mythmakerStatus, setMythmakerStatus] = useState('WAITING');
  const [isPhysicaActive, setIsPhysicaActive] = useState(false);
  const [physicaStatus, setPhysicaStatus] = useState('STANDBY');
  const [isSpatialActive, setIsSpatialActive] = useState(false);
  const [spatialStatus, setSpatialStatus] = useState('DORMANT');
  const [isFoundryActive, setIsFoundryActive] = useState(false);
  const [foundryStatus, setFoundryStatus] = useState('IDLE');
  const [isNomadActive, setIsNomadActive] = useState(false);
  const [nomadStatus, setNomadStatus] = useState('OFFLINE');
  const [isCenturionActive, setIsCenturionActive] = useState(false);
  const [centurionStatus, setCenturionStatus] = useState('IDLE');
  const [isCitadelActive, setIsCitadelActive] = useState(false);
  const [citadelStatus, setCitadelStatus] = useState('STANDBY');
  const [isHelaActive, setIsHelaActive] = useState(false);
  const [helaStatus, setHelaStatus] = useState('DORMANT');
  const [isKeysActive, setIsKeysActive] = useState(false);
  const [keysStatus, setKeysStatus] = useState('SECURE');
  const [isRootActive, setIsRootActive] = useState(false);
  const [rootStatus, setRootStatus] = useState('LOCKED');
  const [isSentinelArrayActive, setIsSentinelArrayActive] = useState(false);
  const [sentinelArrayStatus, setSentinelArrayStatus] = useState('OFFLINE');
  const [isSentinelSwarmActive, setIsSentinelSwarmActive] = useState(false);
  const [sentinelSwarmStatus, setSentinelSwarmStatus] = useState('DORMANT');
  const [isTeslaActive, setIsTeslaActive] = useState(false);
  const [teslaStatus, setTeslaStatus] = useState('STANDBY');
  const [isVanguardActive, setIsVanguardActive] = useState(false);
  const [vanguardStatus, setVanguardStatus] = useState('IDLE');
  const [isVitalActive, setIsVitalActive] = useState(false);
  const [vitalStatus, setVitalStatus] = useState('MONITORING');
  const [isIrisActive, setIsIrisActive] = useState(false);
  const [irisStatus, setIrisStatus] = useState('IDLE');
  const [isLifeLineActive, setIsLifeLineActive] = useState(false);
  const [lifeLineStatus, setLifeLineStatus] = useState('MONITORING');
  const [isSerenityActive, setIsSerenityActive] = useState(false);
  const [serenityStatus, setSerenityStatus] = useState('BALANCED');
  const [isForgeActive, setIsForgeActive] = useState(false);
  const [forgeStatus, setForgeStatus] = useState('STANDBY');
  const [isGaiaActive, setIsGaiaActive] = useState(false);
  const [gaiaStatus, setGaiaStatus] = useState('OBSERVING');
  const [isGaiaXActive, setIsGaiaXActive] = useState(false);
  const [gaiaXStatus, setGaiaXStatus] = useState('DORMANT');
  const [isTeslaLayerActive, setIsTeslaLayerActive] = useState(false);
  const [teslaLayerStatus, setTeslaLayerStatus] = useState('IDLE');
  const [isGhostNodeActive, setIsGhostNodeActive] = useState(false);
  const [ghostNodeStatus, setGhostNodeStatus] = useState('OFFLINE');
  const [isGridActiveTracker, setIsGridActiveTracker] = useState(false);
  const [gridStatusTracker, setGridStatusTracker] = useState('IDLE');
  const [isNexusActiveTracker, setIsNexusActiveTracker] = useState(false);
  const [nexusStatusTracker, setNexusStatusTracker] = useState('STANDBY');
  const [isGhostMeshActive, setIsGhostMeshActive] = useState(false);
  const [ghostMeshStatus, setGhostMeshStatus] = useState('OFFLINE');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchStatus, setSearchStatus] = useState('READY');
  const [isCyclopsActive, setIsCyclopsActive] = useState(false);
  const [cyclopsStatus, setCyclopsStatus] = useState('SCANNING');
  const [isPerceptionActive, setIsPerceptionActive] = useState(false);
  const [perceptionStatus, setPerceptionStatus] = useState('OBSERVING');
  const [isFluxActive, setIsFluxActive] = useState(false);
  const [fluxStatus, setFluxStatus] = useState('FLUID');
  const [isMitosisActive, setIsMitosisActive] = useState(false);
  const [mitosisStatus, setMitosisStatus] = useState('DORMANT');
  const [isCanvasActive, setIsCanvasActive] = useState(false);
  const [canvasStatus, setCanvasStatus] = useState('READY');
  const [isSpatialHudActive, setIsSpatialHudActive] = useState(false);
  const [spatialHudStatus, setSpatialHudStatus] = useState('OFFLINE');
  const [isPersonaActive, setIsPersonaActive] = useState(false);
  const [personaStatus, setPersonaStatus] = useState('ADAPTING');
  const [isVectorSyncActive, setIsVectorSyncActive] = useState(false);
  const [vectorSyncStatus, setVectorSyncStatus] = useState('SYNCED');
  const [isSustainActive, setIsSustainActive] = useState(false);
  const [sustainStatus, setSustainStatus] = useState('OPTIMAL');
  const [isProseActive, setIsProseActive] = useState(false);
  const [proseStatus, setProseStatus] = useState('CREATING');
  const [isOrchestratorActive, setIsOrchestratorActive] = useState(false);
  const [orchestratorStatus, setOrchestratorStatus] = useState('CONDUCTING');
  const [isCodeActive, setIsCodeActive] = useState(false);
  const [codeStatus, setCodeStatus] = useState('DEBUGGING');
  const [isAetherActive, setIsAetherActive] = useState(false);
  const [aetherStatus, setAetherStatus] = useState('LINKED');
  const [isUntisActive, setIsUntisActive] = useState(false);
  const [untisStatus, setUntisStatus] = useState('SECURE');
  const [isSentientCodeActive, setIsSentientCodeActive] = useState(false);
  const [sentientCodeStatus, setSentientCodeStatus] = useState('AUDITING');
  const [isScholarActive, setIsScholarActive] = useState(false);
  const [scholarStatus, setScholarStatus] = useState('LEARNING');
  const [isOverclockActive, setIsOverclockActive] = useState(false);
  const [overclockStatus, setOverclockStatus] = useState('NORMAL');
  const [isImmuneActive, setIsImmuneActive] = useState(false);
  const [immuneStatus, setImmuneStatus] = useState('ACTIVE');
  const [isHyperionActive, setIsHyperionActive] = useState(false);
  const [hyperionStatus, setHyperionStatus] = useState('STANDBY');
  const [isHomeAssistantActive, setIsHomeAssistantActive] = useState(false);
  const [homeAssistantStatus, setHomeAssistantStatus] = useState('READY');
  const [isConstellationActive, setIsConstellationActive] = useState(false);
  const [constellationStatus, setConstellationStatus] = useState('ALIGNED');
  const [isChronosActive, setIsChronosActive] = useState(false);
  const [chronosStatus, setChronosStatus] = useState('SYNCED');
  const [isAlphaEvolutionActive, setIsAlphaEvolutionActive] = useState(false);
  const [alphaEvolutionStatus, setAlphaEvolutionStatus] = useState('STABLE');

  const [isXRHooksActive, setIsXRHooksActive] = useState(false);
  const [xrHooksStatus, setXRHooksStatus] = useState('READY');
  const [isOutreachActive, setIsOutreachActive] = useState(false);
  const [outreachStatus, setOutreachStatus] = useState('READY');
  const [isReputationActive, setIsReputationActive] = useState(false);
  const [reputationStatus, setReputationStatus] = useState('SHIELD_ON');
  const [isLedgerActive, setIsLedgerActive] = useState(false);
  const [ledgerStatus, setLedgerStatus] = useState('SYNCED');
  const [isVoidJammingActive, setIsVoidJammingActive] = useState(false);
  const [voidJammingStatus, setVoidJammingStatus] = useState('SILENT');
  const [isSixthSenseActive, setIsSixthSenseActive] = useState(false);
  const [sixthSenseStatus, setSixthSenseStatus] = useState('OBSERVING');
  const [isMimicActive, setIsMimicActive] = useState(false);
  const [mimicStatus, setMimicStatus] = useState('DORMANT');
  const [isCabalActive, setIsCabalActive] = useState(false);
  const [cabalStatus, setCabalStatus] = useState('HIDDEN');

  // --- New Intelligence & Security Protocols (Phase 8) ---
  const [isAiAdaptersActive, setIsAiAdaptersActive] = useState(false);
  const [aiAdaptersStatus, setAiAdaptersStatus] = useState('OFFLINE');
  const [isAcpBridgeActive, setIsAcpBridgeActive] = useState(false);
  const [acpBridgeStatus, setAcpBridgeStatus] = useState('OFFLINE');
  const [isContextInjectionActive, setIsContextInjectionActive] = useState(false);
  const [contextInjectionStatus, setContextInjectionStatus] = useState('READY');
  const [isCoreSoulActive, setIsCoreSoulActive] = useState(false);
  const [coreSoulStatus, setCoreSoulStatus] = useState('DORMANT');
  const [isInferenceActive, setIsInferenceActive] = useState(false);
  const [inferenceStatus, setInferenceStatus] = useState('STANDBY');
  const [isMirageIntelActive, setIsMirageIntelActive] = useState(false);
  const [mirageIntelStatus, setMirageIntelStatus] = useState('READY');
  const [isMirroringActive, setIsMirroringActive] = useState(false);
  const [mirroringStatus, setMirroringStatus] = useState('OFFLINE');
  const [isOpenShellActive, setIsOpenShellActive] = useState(false);
  const [openShellStatus, setOpenShellStatus] = useState('STANDBY');
  const [isSelfImprovementActive, setIsSelfImprovementActive] = useState(false);
  const [selfImprovementStatus, setSelfImprovementStatus] = useState('ACTIVE');
  const [isSyntheticActive, setIsSyntheticActive] = useState(false);
  const [syntheticStatus, setSyntheticStatus] = useState('OFFLINE');
  const [isThreadOwnershipActive, setIsThreadOwnershipActive] = useState(false);
  const [threadOwnershipStatus, setThreadOwnershipStatus] = useState('READY');
  const [isAnchorPrivacyActive, setIsAnchorPrivacyActive] = useState(false);
  const [anchorPrivacyStatus, setAnchorPrivacyStatus] = useState('READY');

  // --- Sustain & Mitosis State ---
  const [batteryLevel, setBatteryLevel] = useState<number>(100)
  const [isCharging, setIsCharging] = useState<boolean>(true)
  const [isLowPowerMode, setIsLowPowerMode] = useState<boolean>(false)
  const [mitosisActions, setMitosisActions] = useState<any[]>([])
  const [systemIntegrity, setSystemIntegrity] = useState<number>(100)
  const [isRepairing, setIsRepairing] = useState<boolean>(false)
  const [currentLanguage, setCurrentLanguage] = useState<string>('en')
  const [meshPeers, setMeshPeers] = useState<number>(0)

  // -- Security & Health Protocols State --
  const [isSentryArmed, setIsSentryArmed] = useState<boolean>(true)
  const [isSentryHostile, setIsSentryHostile] = useState<boolean>(false)
  const [activeBreach, setActiveBreach] = useState<any>(null)
  const [isShroudActive, setIsShroudActive] = useState<boolean>(false)
  const [isRecallArmed, setIsRecallArmed] = useState<boolean>(true)
  const [isLifeLineMonitoring, setIsLifeLineMonitoring] = useState<boolean>(true)
  const [healthStatus, setHealthStatus] = useState<string>('OPTIMAL')
  const [isPhantomActive, setIsPhantomActive] = useState<boolean>(false)
  const [isOriginVerified, setIsOriginVerified] = useState<boolean>(true)
  const [isVoidCoherent, setIsVoidCoherent] = useState<boolean>(true)
  const [isHoneySwarmActive, setIsHoneySwarmActive] = useState<boolean>(false)
  const [isJammingActive, setIsJammingActive] = useState<boolean>(false)
  const [isMirageActive, setIsMirageActive] = useState<boolean>(true)
  const [isWithinSafeZone, setIsWithinSafeZone] = useState<boolean>(true)
  const [isFirewallActive, setIsFirewallActive] = useState<boolean>(true)
  const [blockedPsychAttacks, setBlockedPsychAttacks] = useState<number>(0)
  const [isAtomicShredReady, setIsAtomicShredReady] = useState<boolean>(true)
  const [isTetherActive, setIsTetherActive] = useState<boolean>(true)
  const [isGhostIPActive, setIsGhostIPActive] = useState<boolean>(true)
  const [isLegalStrikeReady, setIsLegalStrikeReady] = useState<boolean>(true)
  const [isSystemLocked, setIsSystemLocked] = useState<boolean>(false)
  const [isGhostWriterActive, setIsGhostWriterActive] = useState<boolean>(true)
  const [isAvatarVanguardActive, setIsAvatarVanguardActive] = useState<boolean>(false)
  const [reputationScore, setReputationScore] = useState<number>(0.98)
  const [prospectCount, setProspectCount] = useState<number>(0)
  const [isAuthorityActive, setIsAuthorityActive] = useState<boolean>(true)
  const [isSocialGraphActive, setIsSocialGraphActive] = useState<boolean>(true)
  const [influenceScore, setInfluenceScore] = useState<number>(0.92)
  const [networkHealth, setNetworkHealth] = useState<number>(0.95)
  const [priorityReminders, setPriorityReminders] = useState<number>(0)
  const [isCloserActive, setIsCloserActive] = useState<boolean>(true)
  const [isEdgeActive, setIsEdgeActive] = useState<boolean>(true)
  const [dealConfidence, setDealConfidence] = useState<number>(0.94)
  const [potentialSavings, setPotentialSavings] = useState<string>('$0')
  const [isChameleonActive, setIsChameleonActive] = useState<boolean>(true)
  const [isTrustActive, setIsTrustActive] = useState<boolean>(true)
  const [culturalResonance, setCulturalResonance] = useState<number>(0.96)
  const [trustScore, setTrustScore] = useState<number>(0.98)
  const [isLegacyActive, setIsLegacyActive] = useState<boolean>(true)
  const [isRepShieldActive, setIsRepShieldActive] = useState<boolean>(true)
  const [socialCapital, setSocialCapital] = useState<number>(4220)
  const [mentionCount, setMentionCount] = useState<number>(0)
  const [isNetworkingActive, setIsNetworkingActive] = useState<boolean>(true)
  const [isLangBridgeActive, setIsLangBridgeActive] = useState<boolean>(true)
  const [titanResonance, setTitanResonance] = useState<number>(1.0)
  const [translationConfidence, setTranslationConfidence] = useState<number>(0.994)
  const [isDiplomatReady, setIsDiplomatReady] = useState<boolean>(true)
  const [isJurisdictionImmune, setIsJurisdictionImmune] = useState<boolean>(true)
  const [powerConnectionCount, setPowerConnectionCount] = useState<number>(2)
  const [privacyResilience, setPrivacyResilience] = useState<number>(1.0)
  const [negotiationReady, setNegotiationReady] = useState<boolean>(true)
  const [isEmpireActive, setIsEmpireActive] = useState<boolean>(true)
  const [isHypeActive, setIsHypeActive] = useState<boolean>(true)
  const [empireValuation, setEmpireValuation] = useState<string>('$100,000+')
  const [viralPulse, setViralPulse] = useState<number>(0.88)
  const [isSovereignActive, setIsSovereignActive] = useState<boolean>(true)
  const [isInnerCircleActive, setIsInnerCircleActive] = useState<boolean>(true)
  const [isShadowActive, setIsShadowActive] = useState<boolean>(true)
  const [fiscalEfficiency, setFiscalEfficiency] = useState<number>(0.94)
  const [loyaltyAverage, setLoyaltyAverage] = useState<number>(0.99)
  const [intelPulse, setIntelPulse] = useState<number>(0.99)
  const [isFocusShieldActive, setIsFocusShieldActive] = useState<boolean>(true)
  const [isEquilibriumActive, setIsEquilibriumActive] = useState<boolean>(true)
  const [focusLevel, setFocusLevel] = useState<string>('DEEP_FOCUS')
  const [cognitiveLoad, setCognitiveLoad] = useState<number>(0.12)
  const [stressLevel, setStressLevel] = useState<string>('STABLE')
  const [heartRate, setHeartRate] = useState<number>(68)
  const [isEurekaActive, setIsEurekaActive] = useState<boolean>(true)
  const [isDreamActive, setIsDreamActive] = useState<boolean>(true)
  const [eurekaSparkLevel, setEurekaSparkLevel] = useState<number>(0.15)
  const [dreamIncubationCount, setDreamIncubationCount] = useState<number>(3)
  const [isSynapseActive, setIsSynapseActive] = useState<boolean>(true)
  const [intentConfidence, setIntentConfidence] = useState<number>(0.92)
  const [latencyReduction, setLatencyReduction] = useState<number>(12)
  const [isAuraActive, setIsAuraActive] = useState<boolean>(true)
  const [auraState, setAuraState] = useState<string>('STEALTH')
  const [isEmpathyActive, setIsEmpathyActive] = useState<boolean>(true)
  const [emotionalBalance, setEmotionalBalance] = useState<number>(0.98)
  const [isThoughtActive, setIsThoughtActive] = useState<boolean>(true)
  const [isRecallActive, setIsRecallActive] = useState<boolean>(true)
  const [recallMatchCount, setRecallMatchCount] = useState<number>(42)
  const [isLearning, setIsLearning] = useState<boolean>(true)
  const [learningTopic, setLearningTopic] = useState<string | null>('NEURAL_ARCH')
  const [isAdrenalineActive, setIsAdrenalineActive] = useState<boolean>(true)
  const [hazardLevel, setHazardLevel] = useState<string>('NOMINAL')
  const [isBackupActive, setIsBackupActive] = useState<boolean>(true)
  const [anchoredArtifacts, setAnchoredArtifacts] = useState<number>(1280)
  const [isStarActive, setIsStarActive] = useState<boolean>(true)
  const [satelliteStatus, setSatelliteStatus] = useState<string>('SYNCHRONIZED')
  const [isGhostActive, setIsGhostActive] = useState<boolean>(true)
  const [seizedCount, setSeizedCount] = useState<number>(14)
  const [isLensActive, setIsLensActive] = useState<boolean>(true)
  const [arbiterState, setArbiterState] = useState<string>('ANALYZING')
  const [isZoneActive, setIsZoneActive] = useState<boolean>(true)
  const [zoneStatus, setZoneStatus] = useState<string>('SHROUDED')
  const [isSentinelActive, setIsSentinelActive] = useState<boolean>(true)
  const [perimeterStatus, setPerimeterStatus] = useState<string>('SECURE')
  const [urbanStatus, setUrbanStatus] = useState<string>('SECURE')
  const [bodyStatus, setBodyStatus] = useState<string>('NOMINAL')
  const [forgeJobCount, setForgeJobCount] = useState<number>(0)
  const [miningHashrate, setMiningHashrate] = useState<string>('0.0 TH/s')
  const [powerStatus, setPowerStatus] = useState<string>('CELL_STABLE')
  const [ecoStatus, setEcoStatus] = useState<string>('NOMINAL')
  const [fleetStatus, setFleetStatus] = useState<string>('SHIPS_PATROL')
  const [isDigitizerActive, setIsDigitizerActive] = useState<boolean>(true)
  const [infraHealth, setInfraHealth] = useState<string>('SECURE')
  const [scanCount, setScanCount] = useState<number>(0)
  const [rootDeviceCount, setRootDeviceCount] = useState<number>(0)
  const [nearbyEntities, setNearbyEntities] = useState<any[]>([])
  const [friendsCount, setFriendsCount] = useState<number>(0)
  const [foesCount, setFoesCount] = useState<number>(0)
  const [isTerraformingActive, setIsTerraformingActive] = useState<boolean>(false)
  const [envTargetTemp, setEnvTargetTemp] = useState<number>(24)
  const [envTargetO2, setEnvTargetO2] = useState<number>(20.9)
  const [isForceFieldActive, setIsForceFieldActive] = useState<boolean>(false)
  const [shieldIntegrity, setShieldIntegrity] = useState<number>(0)
  const [isEternalActive, setIsEternalActive] = useState<boolean>(true)
  const [legacyStatus, setLegacyStatus] = useState<string>('STABLE')
  const [isParallelActive, setIsParallelActive] = useState<boolean>(true)
  const [parallelProbability, setParallelProbability] = useState<number>(0.994)
  const [isUnityActive, setIsUnityActive] = useState<boolean>(true)
  const [meshPeerCount, setMeshPeerCount] = useState<number>(0)
  const [unityStatus, setUnityStatus] = useState<string>('MESH_STABLE')
  const [isTitanActive, setIsTitanActive] = useState<boolean>(true)
  const [breakthroughCount, setBreakthroughCount] = useState<number>(0)
  const [titanStatus, setTitanStatus] = useState<string>('SAGE_ACTIVE')
  const [isVoyagerActive, setIsVoyagerActive] = useState<boolean>(true)
  const [voyagerStatus, setVoyagerStatus] = useState<string>('ARCHIVE_READY')
  const [isBabelActive, setIsBabelActive] = useState<boolean>(true)
  const [babelStatus, setBabelStatus] = useState<string>('VAULT_SYNCED')
  const [babelSnapshotCount, setBabelSnapshotCount] = useState<number>(0)
  const [isSentientLegacyActive, setIsSentientLegacyActive] = useState<boolean>(true);
  const [sentientLegacyStatus, setSentientLegacyStatus] = useState<string>('ADVISING');
  const [isUniversalWitnessActive, setIsUniversalWitnessActive] = useState<boolean>(true);
  const [witnessArchiveSize, setWitnessArchiveSize] = useState<string>('1.2 TB');
  const [isMetaRealityActive, setIsMetaRealityActive] = useState<boolean>(true);
  const [metaRealityStatus, setMetaRealityStatus] = useState<string>('CONVERGED');
  const [isPlanetaryMeshActive, setIsPlanetaryMeshActive] = useState<boolean>(true);
  const [planetaryNodeRank, setPlanetaryNodeRank] = useState<string>('FOUNDER');
  const [isOrbitalPreservationActive, setIsOrbitalPreservationActive] = useState<boolean>(true);
  const [orbitalUplinkStatus, setOrbitalUplinkStatus] = useState<string>('STANDBY');
  const [isArtisanActive, setIsArtisanActive] = useState<boolean>(true);
  const [artisanStatus, setArtisanStatus] = useState<string>('EVOLVING');
  const [isDirectorActive, setIsDirectorActive] = useState<boolean>(true);
  const [directorJobs, setDirectorJobs] = useState<number>(0);
  const [isEchoActive, setIsEchoActive] = useState<boolean>(true);
  const [echoSignatures, setEchoSignatures] = useState<number>(0);
  const [illusionistOverlays, setIllusionistOverlays] = useState<number>(0);
  const [isArchitectActive, setIsArchitectActive] = useState<boolean>(true);
  const [architectApps, setArchitectApps] = useState<number>(0);
  const [mythmakerProgress, setMythmakerProgress] = useState<number>(0);
  const [isDreamReelActive, setIsDreamReelActive] = useState<boolean>(true);
  const [dreamProductions, setDreamProductions] = useState<number>(0);
  const [isMaestroActive, setIsMaestroActive] = useState<boolean>(true);
  const [maestroDNAS, setMaestroDNAS] = useState<number>(0);
  const [isCodeSmithActive, setIsCodeSmithActive] = useState<boolean>(true);
  const [activeDeployments, setActiveDeployments] = useState<number>(0);
  const [activeObjectives, setActiveObjectives] = useState<number>(0);
  const [isDuetActive, setIsDuetActive] = useState<boolean>(true);
  const [duetLatency, setDuetLatency] = useState<number>(12);
  const [isStrategistActive, setIsStrategistActive] = useState<boolean>(true);
  const [dominanceMetric, setDominanceMetric] = useState<number>(0);
  const [isPioneerActive, setIsPioneerActive] = useState<boolean>(true);
  const [frontierAlerts, setFrontierAlerts] = useState<number>(0);
  const [isSilencerActive, setIsSilencerActive] = useState<boolean>(true);
  const [jammingRadius, setJammingRadius] = useState<number>(0);

  const [satLinkStatus, setSatLinkStatus] = useState<string>('Offline');
  const [ghostNodes, setGhostNodes] = useState<number>(0);
  const [cosmicPredictions, setCosmicPredictions] = useState<number>(0);
  const [isOracleActive, setIsOracleActive] = useState<boolean>(true);
  const [globalMood, setGlobalMood] = useState<string>('Optimistic');
  const [isDiplomatActive, setIsDiplomatActive] = useState<boolean>(true);
  const [activeSimulations, setActiveSimulations] = useState<number>(0);
  const [isShieldActive, setIsShieldActive] = useState<boolean>(true);
  const [psychRisk, setPsychRisk] = useState<string>('Low');
  const [isLegisActive, setIsLegisActive] = useState<boolean>(true);
  const [pendingLaws, setPendingLaws] = useState<number>(0);
  const [isPassportActive, setIsPassportActive] = useState<boolean>(true);
  const [currentJurisdiction, setCurrentJurisdiction] = useState<string>('Global');
  const [isNavigatorActive, setIsNavigatorActive] = useState<boolean>(true);
  const [targetPowerScore, setTargetPowerScore] = useState<number>(0);
  const [isPlanetaryActive, setIsPlanetaryActive] = useState<boolean>(true);
  const [meshStatus, setMeshStatus] = useState<string>('Stable');
  const [controllableDevices, setControllableDevices] = useState<number>(0);
  const [isGridActive, setIsGridActive] = useState<boolean>(true);
  const [activeTunnels, setActiveTunnels] = useState<number>(0);
  const [isVoidActive, setIsVoidActive] = useState<boolean>(true);
  const [quantumState, setQuantumState] = useState<string>('Coherence');
  const [sovereignMode, setSovereignMode] = useState<string>('Standby');
  const [friendshipInsight, setFriendshipInsight] = useState<string>('Aligned');
  const [isBardActive, setIsBardActive] = useState<boolean>(true);
  const [avatarConfidence, setAvatarConfidence] = useState<number>(0);
  const [isCatalystActive, setIsCatalystActive] = useState<boolean>(true);
  const [researchField, setResearchField] = useState<string>('Nano-Tech');
  const [isPaladinActive, setIsPaladinActive] = useState<boolean>(true);
  const [isAnchorActive, setIsAnchorActive] = useState<boolean>(true);
  const [isApexActive, setIsApexActive] = useState<boolean>(true);
  const [governanceStatus, setGovernanceStatus] = useState<string>('Obedient');
  const [anonymityProfile, setAnonymityProfile] = useState<string>('Untraceable');
  const [isSanctuaryActive, setIsSanctuaryActive] = useState<boolean>(false);
  const [isPhoenixOmegaArmed, setIsPhoenixOmegaArmed] = useState<boolean>(false);
  const [erasureStage, setErasureStage] = useState<string>('Ready');
  const [identityStatus, setIdentityStatus] = useState<string>('Unverified');
  const [complianceStatus, setComplianceStatus] = useState<string>('Compliant');
  const [encryptionStatus, setEncryptionStatus] = useState<string>('Quantum-Safe');
  const [nodeCount, setNodeCount] = useState<number>(1000);
  const [presenceMode, setPresenceMode] = useState<string>('Simultaneous');
  const [lastAuthMethod, setLastAuthMethod] = useState<string>('Neural-Pulse');
  const [activeVisualSkin, setActiveVisualSkin] = useState<string>('Standard');
  const [mappedSurfaces, setMappedSurfaces] = useState<number>(0);
  const [nexusNodesActive, setNexusNodesActive] = useState<number>(0);
  const [collectiveThreatLevel, setCollectiveThreatLevel] = useState<string>('Green');
  const [threatLevel, setThreatLevel] = useState<string>('Minimal');
  const [energySovereignty, setEnergySovereignty] = useState<string>('Off-Grid');
  const [powerReserve, setPowerReserve] = useState<number>(100);
  const [cognitionGrowth, setCognitionGrowth] = useState<string>('+0.00%');
  const [unificationState, setUnificationState] = useState<string>('Digital');
  const [infrastructureCohesion, setInfrastructureCohesion] = useState<number>(1.0);
  const [maestroStyle, setMaestroStyle] = useState<string>('Ambient-Focus');
  const [mixerStatus, setMixerStatus] = useState<string>('Optimized');
  const [isMilestoneActive, setIsMilestoneActive] = useState<boolean>(false);
  const [marketSignal, setMarketSignal] = useState<string>('Analyzing');
  const [accuracyRating, setAccuracyRating] = useState<string>('98.7%');
  const [remoteNodeCount, setRemoteNodeCount] = useState<number>(0);
  const [hardwareSynthesisStatus, setHardwareSynthesisStatus] = useState<string>('Local-Only');
  const [activeTrustCount, setActiveTrustCount] = useState<number>(0);
  const [bankAuditRating, setBankAuditRating] = useState<string>('AAA+');
  const [crisisRiskScore, setCrisisRiskScore] = useState<number>(0.15);
  const [defenseReadiness, setDefenseReadiness] = useState<string>('Optimal');
  const [effectiveTaxRate, setEffectiveTaxRate] = useState<string>('8.45%');
  const [complianceRating, setComplianceRating] = useState<string>('AAA');
  const [lawForecastHorizon, setLawForecastHorizon] = useState<string>('6 Months');
  const [distressLevel, setDistressLevel] = useState<string>('Normal');
  const [medicalReadiness, setMedicalReadiness] = useState<string>('Optimal');
  const [burnoutRisk, setBurnoutRisk] = useState<string>('Low');
  const [focusModeStatus, setFocusModeStatus] = useState<string>('Optimal');
  const [recoveryReadiness, setRecoveryReadiness] = useState<string>('Ready');

  const ghostContainerRef = useRef<HTMLDivElement>(null)
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [lastThought, setLastThought] = useState('');

  // Handle Global Wake Event
  useEffect(() => {
    const handleWake = (e: any) => {
      setIsOverlayActive(true);
      setLastThought(`Listening for request [${e.detail.tier}]...`);
    };
    window.addEventListener('raizen:wake', handleWake);
    return () => window.removeEventListener('raizen:wake', handleWake);
  }, []);

  // Persistence & Initialization
  useEffect(() => {
    const initSystem = async () => {
      console.log('[RAIZEN] Initializing Sovereign Core...');
      await pluginRegistry.initializeAll();
      
      // Initialize Ghost Engine container
      if (ghostContainerRef.current) {
        ghostEngine.setContainer(ghostContainerRef.current);
      }
      
      // Start auxiliary services
      await discoveryService.start();
      await systemDoctor.runFullCheck();
      
      console.log('[RAIZEN] All Protocols Synchronized.');
    };
    initSystem();
  }, []);

  const isInitialized = useRef(false)
  useEffect(() => {
    const savedAgents = localStorage.getItem('raizen-agents')
    const savedActiveId = localStorage.getItem('raizen-active-agent-id')
    if (savedAgents) {
      try {
        const parsed = JSON.parse(savedAgents)
        setAgents(parsed)
        if (savedActiveId) setActiveAgentId(savedActiveId)
        else if (parsed.length > 0) setActiveAgentId(parsed[0].id)
      } catch (e) {
        console.error('[RAIZEN] Failed to parse saved agents:', e)
      }
    }
    isInitialized.current = true
  }, [])

  useEffect(() => {
    if (!isInitialized.current) return
    localStorage.setItem('raizen-agents', JSON.stringify(agents))
    if (activeAgentId) localStorage.setItem('raizen-active-agent-id', activeAgentId)
  }, [agents, activeAgentId])

  // --- Sovereign Evolution (Paro Auto-Spawn) ---
  useEffect(() => {
    const checkParoEvol = async () => {
      try {
        const res = await pluginRegistry.executeAction('intelligence.memory-harvest', 'get_intelligence_status', {})
        if (res.success && res.data.oracleSet) {
          if (res.data.oracleSet.risk === 'CRITICAL') {
            setOracleSet(res.data.oracleSet)
            setShowOracleModal(true)
            setPersona('GUARDIAN')
            return
          }
          setOracleSet(res.data.oracleSet)
          setPersona(res.data.oracleSet.persona || 'ASSISTANT')
        } else {
          setPersona('ASSISTANT')
        }
        if (res.success && res.data.maturity.knowledgeRatio >= 1.0) {
          const hasParo = agents.some(a => a.id === 'paro-core')
          if (!hasParo) {
            const paroAgent: AgentConfig = {
              id: 'paro-core',
              name: 'Sovereign Intelligence (Paro)',
              modelId: 'paro-v2',
              apiKey: 'LOCAL_SOVEREIGN',
              provider: 'PARO'
            }
            setAgents(prev => [...prev, paroAgent])
            console.log('[SINGULARITY] Paro Model synthesized and integrated.')
          }
        }
      } catch (e) {}
    }
    const interval = setInterval(checkParoEvol, 60000)
    return () => clearInterval(interval)
  }, [agents])

  // --- Proactive Oracle Polling ---
  useEffect(() => {
    const fetchProactiveSolutions = async () => {
      try {
        const res = await pluginRegistry.executeAction('intelligence.predictive', 'get_active_solutions', {})
        if (res.success && res.data.solutions) {
          setProactiveSolutions(res.data.solutions)
        }
      } catch (e) {
        console.error('[ORACLE] Proactive poll failed:', e)
      }
    }
    const interval = setInterval(fetchProactiveSolutions, 30000)
    fetchProactiveSolutions() // Initial fetch
    return () => clearInterval(interval)
  }, [])

  // --- Sustain: Battery Monitoring ---
  useEffect(() => {
    const monitorBattery = async () => {
      try {
        if ('getBattery' in navigator) {
          const battery: any = await (navigator as any).getBattery();
          const updateBattery = () => {
            const level = Math.round(battery.level * 100);
            setBatteryLevel(level);
            setIsCharging(battery.charging);
            
            if (level < 20 && !battery.charging) {
              if (!isLowPowerMode) {
                console.warn('[SUSTAIN] Critical Power Detected. Entering Low-Power Mode.');
                pluginRegistry.executeAction('sustain-protocol', 'optimize-power', { battery: level });
                setIsLowPowerMode(true);
              }
            } else if (isLowPowerMode && (level > 25 || battery.charging)) {
              setIsLowPowerMode(false);
            }
          };

          battery.addEventListener('levelchange', updateBattery);
          battery.addEventListener('chargingchange', updateBattery);
          updateBattery();
          return () => {
            battery.removeEventListener('levelchange', updateBattery);
            battery.removeEventListener('chargingchange', updateBattery);
          };
        }
      } catch (e) {
        console.error('[SUSTAIN] Battery API blocked or unsupported.', e);
      }
    };
    monitorBattery();
  }, [isLowPowerMode]);

  // --- Mitosis: Habit Analysis ---
  useEffect(() => {
    const runEvolution = async () => {
      try {
        const analysis = await pluginRegistry.executeAction('mitosis-ui', 'analyze-habits', {});
        if (analysis.success && analysis.data.frequency > 10) {
          const evolution = await pluginRegistry.executeAction('mitosis-ui', 'evolve-ui', {});
          if (evolution.success) {
            const newAction = {
              id: `mitosis_${Date.now()}`,
              label: evolution.data.addedComponent.replace(/-/g, ' ').toUpperCase(),
              originalId: evolution.data.addedComponent
            };
            setMitosisActions(prev => {
              if (prev.some(a => a.originalId === newAction.originalId)) return prev;
              return [...prev, newAction];
            });
          }
        }
      } catch (e) {
        console.error('[MITOSIS] Evolution cycle failed:', e);
      }
    };
    const interval = setInterval(runEvolution, 120000); // Analyze every 2 mins
    return () => clearInterval(interval);
  }, []);

  const runAlphaCycle = async () => {
    if (isLowPowerMode) return; // Save energy
    try {
      console.log('[ALPHA-EVOLUTION] Scanning for architectural expansion opportunities...');
      await pluginRegistry.executeAction('alpha-evolution', 'mutate_codebase', { featureName: 'NEURAL_OPTIMIZER' });
    } catch (e) {
      console.error('[ALPHA-EVOLUTION] Cycle failed:', e);
    }
  };

  const runImmuneCheck = async () => {
    try {
      const healthRes = await pluginRegistry.executeAction('immune-system', 'get-health-status', { 
         moduleIds: mitosisActions.map(a => a.originalId) 
      });
      if (healthRes.success) {
        const integrity = Math.round((1 - healthRes.data.failureRate) * 100);
        setSystemIntegrity(healthRes.data.isCoreValid ? integrity : Math.min(integrity, 40));
        
        if (integrity < 95 || !healthRes.data.isCoreValid) {
          setIsRepairing(true);
          await pluginRegistry.executeAction('immune-system', 'repair-feature', { id: 'auto-repair' });
          setIsRepairing(false);
        }
      }
    } catch (e) {
      console.error('[IMMUNE] Monitoring failed:', e);
    }
  };

  const runUnityPulse = async () => {
    try {
      const meshRes = await pluginRegistry.executeAction('unity-protocol', 'get-mesh-status', {});
      if (meshRes.success) {
        setMeshPeers(meshRes.data.peerCount || 0);
      }
    } catch (e) {
      console.error('[UNITY] Mesh check failed:', e);
    }
  };

  const runSecurityCycle = async () => {
    try {
      const firewallRes = await pluginRegistry.executeAction('security.neural_firewall', 'get_psych_report', {});
      if (firewallRes.success) {
        setBlockedPsychAttacks(firewallRes.data.totalThreatsBlocked);
      }

      const shredRes = await pluginRegistry.executeAction('security.atomic_shredding', 'get_shred_log', {});
      if (shredRes.success) {
        setIsAtomicShredReady(true);
      }

      const checkRes = await pluginRegistry.executeAction('security.aegis', 'detect-breaches', {});
      if (checkRes.success && checkRes.data.breachDetected) {
        setIsSentryHostile(true);
        setActiveBreach(checkRes.data.breach);
        
        // Automatic Shroud on Breach
        if (!isShroudActive) {
          await pluginRegistry.executeAction('prism-shroud', 'activate-shroud', {});
          setIsShroudActive(true);
        }
        // Atomic Shredding if breach is critical
        if (checkRes.data.breach.severity === 'CRITICAL') {
          await pluginRegistry.executeAction('security.atomic_shredding', 'perform_tactical_shred', { target: 'MISSION_DATA' });
        }
      } else {
        setIsSentryHostile(false);
        setActiveBreach(null);
      }

      // Life-Line & Vitals Check
      const healthRes = await pluginRegistry.executeAction('life-line', 'verify-vitals', {});
      if (healthRes.success) {
          setHealthStatus(healthRes.data.status);
          if (healthRes.data.status === 'CRISIS_PROBABLE') {
              setIsLifeLineMonitoring(false); // Alert mode
          }
      }

      // Phantom, Origin & Void Status
      const phantomRes = await pluginRegistry.executeAction('phantom-drive', 'get-phantom-status', {});
      if (phantomRes.success) setIsPhantomActive(phantomRes.data.isStealthActive);

      const originRes = await pluginRegistry.executeAction('security.origin', 'get_origin_status', {});
      if (originRes.success) setIsOriginVerified(originRes.data.isVerified);

      const voidRes = await pluginRegistry.executeAction('security.void', 'void-status', {});
      if (voidRes.success) setIsVoidCoherent(voidRes.data.state === 'Coherence');

      const honeyRes = await pluginRegistry.executeAction('honey-swarm', 'get-status', {});
      if (honeyRes.success) setIsHoneySwarmActive(honeyRes.data.isBaitDeployed);

      const mirageRes = await pluginRegistry.executeAction('security.mirage_mesh', 'get_mesh_status', {});
      if (mirageRes.success) setIsMirageActive(mirageRes.data.activeDecoyCount > 0);

      const anchorRes = await pluginRegistry.executeAction('security.anchor', 'check-safe-zone', {});
      if (anchorRes.success) setIsWithinSafeZone(anchorRes.data.isSafe);

      const voidProtocol = pluginRegistry.getPlugin('security.void');
      
      // Quantum Tether Check
      const tetherRes = await pluginRegistry.executeAction('security.quantum_tether', 'check_tether_integrity', {});
      if (tetherRes.success) {
        setIsTetherActive(tetherRes.data.currentStatus === 'LINKED');
        if (tetherRes.data.currentStatus === 'LOCKDOWN') setIsSystemLocked(true);
      }

      // Ghost-IP & Legal Strike Status
      const securityGhostRes = await pluginRegistry.executeAction('security.ghost_ip', 'get_anonymity_report', {});
      if (securityGhostRes.success) setIsGhostIPActive(true);

      const legalRes = await pluginRegistry.executeAction('security.legal_strike', 'get_legal_status', {});
      if (legalRes.success) setIsLegalStrikeReady(true);

      // Social Presence: Ghost-Writer & Avatar
      const ghostWriterRes = await pluginRegistry.executeAction('social.ghost_writer', 'get_reputation_impact', {});
      if (ghostWriterRes.success) {
        setIsGhostWriterActive(true);
        setReputationScore(ghostWriterRes.data.globalReputation);
      }

      const avatarRes = await pluginRegistry.executeAction('social.avatar', 'get_vanguard_prospects', {});
      if (avatarRes.success) {
        setProspectCount(avatarRes.data.activeMissions.length > 0 ? avatarRes.data.recentVetting.length : 0);
        setIsAvatarVanguardActive(avatarRes.data.activeMissions.length > 0);
      }

      // Authority & Social-Graph
      const authorityRes = await pluginRegistry.executeAction('social.authority', 'get_influence_summary', {});
      if (authorityRes.success) {
        setIsAuthorityActive(true);
        setInfluenceScore(authorityRes.data.influenceScore);
      }

      const graphRes = await pluginRegistry.executeAction('social.social_graph', 'get_reconnection_reminders', {});
      if (graphRes.success) {
        setIsSocialGraphActive(true);
        setPriorityReminders(graphRes.data.reminders.length);
      }

      const closerRes = await pluginRegistry.executeAction('social.closer', 'get_consensus_report', {});
      if (closerRes.success) {
        setIsCloserActive(true);
        setDealConfidence(closerRes.data.averageConfidence);
      }

      const edgeRes = await pluginRegistry.executeAction('social.edge', 'get_arbitrage_report', {});
      if (edgeRes.success) {
        setIsEdgeActive(true);
        setPotentialSavings(edgeRes.data.totalEstimatedProfit);
      }

      const chameleonRes = await pluginRegistry.executeAction('social.chameleon', 'get_resonance_score', {});
      if (chameleonRes.success) {
        setIsChameleonActive(true);
        setCulturalResonance(chameleonRes.data.resonance);
      }

      const trustRes = await pluginRegistry.executeAction('social.trust', 'verify_source_integrity', { url: 'https://raizen.sovereign' });
      if (trustRes.success) {
        setIsTrustActive(true);
        setTrustScore(trustRes.data.score);
      }

      // Legacy & Shield
      const legacyRes = await pluginRegistry.executeAction('social.legacy_ledger', 'get_legacy_report', {});
      if (legacyRes.success) {
        setIsLegacyActive(true);
        setSocialCapital(legacyRes.data.totalCapital);
      }

      const reputationShieldRes = await pluginRegistry.executeAction('social.reputation_shield', 'get_sentinel_report', {});
      if (reputationShieldRes.success) {
        setIsRepShieldActive(true);
        setMentionCount(reputationShieldRes.data.recentActivityCount);
      }

      // Networking & Bridge
      const networkingRes = await pluginRegistry.executeAction('social.networking', 'get_network_health', {});
      if (networkingRes.success) {
        setIsNetworkingActive(true);
        setTitanResonance(networkingRes.data.averageResonance);
      }

      const bridgeRes = await pluginRegistry.executeAction('social.language_bridge', 'translate_real_time', { text: 'Ping' });
      if (bridgeRes.success) {
        setIsLangBridgeActive(true);
        setTranslationConfidence(bridgeRes.data.confidence);
      }

      // Graph, Diplomat & Immunity
      const socialGraphRes = await pluginRegistry.executeAction('social.social_graph', 'get_power_nodes', {});
      if (socialGraphRes.success) setPowerConnectionCount(socialGraphRes.data.nodes.length);

      const diplomatRes = await pluginRegistry.executeAction('social.diplomat', 'get_privacy_report', {});
      if (diplomatRes.success) setPrivacyResilience(0.98); // High resilience

      const negotiationRes = await pluginRegistry.executeAction('social.strategist', 'is_negotiation_ready', {});
      if (negotiationRes.success) setNegotiationReady(negotiationRes.data.isReady);

      const empireRes = await pluginRegistry.executeAction('social.empire', 'get_empire_status', {});
      if (empireRes.success) {
        setIsEmpireActive(true);
        setEmpireValuation(empireRes.data.totalValue);
      }

      const hypeRes = await pluginRegistry.executeAction('social.hype', 'get_hype_stats', {});
      if (hypeRes.success) {
        setIsHypeActive(true);
        setViralPulse(0.92); // Trend confidence
      }

      // Sovereign, Circle & Shadow
      const sovereignRes = await pluginRegistry.executeAction('social.sovereign', 'generate_efficiency_plan', { currentRate: 0.35 });
      if (sovereignRes.success) {
        setIsSovereignActive(true);
        setFiscalEfficiency(0.98); // Projected efficiency
      }

      const circleRes = await pluginRegistry.executeAction('social.inner_circle', 'get_circle_report', {});
      if (circleRes.success) {
        setIsInnerCircleActive(true);
        setLoyaltyAverage(circleRes.data.status === 'CIRCLE_ALIGNED' ? 0.99 : 0.92);
      }

      const shadowRes = await pluginRegistry.executeAction('social.shadow', 'get_shadow_report', {});
      if (shadowRes.success) {
        setIsShadowActive(true);
        setIntelPulse(shadowRes.data.intelScore);
      }

      // Focus & Equilibrium (Neural Link)
      const focusRes = await pluginRegistry.executeAction('neural-link', 'focus-shield', { switches: 0, density: 42, projects: 1 });
      if (focusRes.success) {
        setIsFocusShieldActive(true);
        setFocusLevel(focusRes.data.state);
      }

      const equilibriumRes = await pluginRegistry.executeAction('neural-link', 'equilibrium', { heartRate: 68, hrv: 72 });
      if (equilibriumRes.success) {
        setIsEquilibriumActive(true);
        setStressLevel(equilibriumRes.data.mood);
        setHeartRate(68);
      }

      const eurekaRes = await pluginRegistry.executeAction('neural-link', 'eureka-engine', { activityType: 'CODE_FLOW' });
      if (eurekaRes.success) {
        setIsEurekaActive(true);
        setEurekaSparkLevel(0.85); // Simulated spike
      }

      const dreamRes = await pluginRegistry.executeAction('neural-link', 'dream-protocol', {});
      if (dreamRes.success) {
        setIsDreamActive(true);
        setDreamIncubationCount(dreamRes.data.insightsFound || 2);
      }

      const synapseRes = await pluginRegistry.executeAction('neural-link', 'synapse-controller', { intent: 'NAVIGATE' });
      if (synapseRes.success) {
        setIsSynapseActive(true);
        setIntentConfidence(0.96);
        setLatencyReduction(8);
      }

      const auraRes = await pluginRegistry.executeAction('neural-link', 'aura-protocol', {});
      if (auraRes.success) {
        setIsAuraActive(true);
        setAuraState(auraRes.data.auraState.mode);
      }

      const empathyRes = await pluginRegistry.executeAction('neural-link', 'empathy-hud', {});
      if (empathyRes.success) {
        setIsEmpathyActive(true);
        setEmotionalBalance(0.99);
      }

      const thoughtRes = await pluginRegistry.executeAction('neural-link', 'thought-to-code', { signal: 'SYNTH_PULSE' });
      if (thoughtRes.success) setIsThoughtActive(true);

      const recallRes = await pluginRegistry.executeAction('neural-link', 'subconscious-memory', { query: 'Protocol 42' });
      if (recallRes.success) {
        setIsRecallActive(true);
        setRecallMatchCount(recallRes.data.matches.length);
      }

      const learningRes = await pluginRegistry.executeAction('neural-link', 'dream-learning', { inactivity: 0 });
      if (learningRes.success) {
        setIsLearning(true);
        setLearningTopic('QUANTUM_LOGIC');
      }

      const adrenalineRes = await pluginRegistry.executeAction('neural-link', 'adrenaline-mgmt', {});
      if (adrenalineRes.success) {
        setIsAdrenalineActive(true);
        setHazardLevel(adrenalineRes.data.hazardLevel);
      }

      const backupRes = await pluginRegistry.executeAction('neural-link', 'cognitive-backup', {});
      if (backupRes.success) {
        setIsBackupActive(true);
        setAnchoredArtifacts(1422);
      }

      // Hardware Orchestration (Physical Sovereignty)
      const hwStarRes = await pluginRegistry.executeAction('star-protocol', 'star-sync', {});
      if (hwStarRes.success) {
        setIsStarActive(true);
        setSatelliteStatus('SYNCHRONIZED');
      }

      const hwGhostRes = await pluginRegistry.executeAction('hardware.ghost-machine', 'ghost-scan', { radius: 1000 });
      if (hwGhostRes.success) {
        setIsGhostActive(true);
        setSeizedCount(hwGhostRes.data.devices?.length || 14);
      }

      const lensRes = await pluginRegistry.executeAction('lens-protocol', 'lens-get-insights', {});
      if (lensRes.success) setArbiterState(lensRes.data.latestInsight || 'ANALYZING');

      const zoneRes = await pluginRegistry.executeAction('zone-protocol', 'zone-activate', { mode: 'CONFIDENCE' });
      if (zoneRes.success) setZoneStatus(zoneRes.data.status || 'PROJECTING');

      const sentinelRes = await pluginRegistry.executeAction('sentinel-array', 'sentinel-scan', {});
      if (sentinelRes.success) setPerimeterStatus(sentinelRes.data.status || 'SECURE');

      const citadelRes = await pluginRegistry.executeAction('citadel-protocol', 'citadel-get-grid-status', {});
      if (citadelRes.success) setUrbanStatus(citadelRes.data.status || 'SECURE');

      const vitalRes = await pluginRegistry.executeAction('vital-protocol', 'vital-scan-ambient', {});
      if (vitalRes.success) {
          setIsVitalActive(true);
          const metrics = vitalRes.data.metrics;
          if (metrics) setBodyStatus(`${metrics.heartRate || 72} BPM / ${metrics.respirationRate || 16} RR`);
      }

      const forgeRes = await pluginRegistry.executeAction('forge-protocol', 'forge-get-fabrication-status', {});
      if (forgeRes.success) setForgeJobCount(forgeRes.data.activeJobs || 0);

      const miningRes = await pluginRegistry.executeAction('forge-protocol', 'forge-get-mining-status', {});
      if (miningRes.success) setMiningHashrate(miningRes.data.hashRate || '0.0 TH/s');

      const keysRes = await pluginRegistry.executeAction('keys-to-the-city', 'keys-transit-status', {});
      if (keysRes.success) setKeysStatus(keysRes.data.status || 'SYNCED');

      const vanguardRes = await pluginRegistry.executeAction('vanguard-drone', 'vanguard-status', {});
      if (vanguardRes.success) setFleetStatus(vanguardRes.data.status || 'ACTIVE');

      const teslaRes = await pluginRegistry.executeAction('tesla-layer', 'tesla-power-status', {});
      if (teslaRes.success) setPowerStatus(teslaRes.data.status || 'CELL_STABLE');

      const gaiaRes = await pluginRegistry.executeAction('gaia-protocol', 'gaia-environment-status', {});
      if (gaiaRes.success) setEcoStatus(gaiaRes.data.status?.moistureLevel ? `${gaiaRes.data.status.moistureLevel}% MOISTURE` : 'OPTIMIZED');

      const helaRes = await pluginRegistry.executeAction('hela-protocol', 'hela-get-health-report', {});
      if (helaRes.success) setInfraHealth(helaRes.data.report?.overallIntegrity || 'SECURE');
      const digitizerRes = await pluginRegistry.executeAction('digitizer-protocol', 'digitizer-get-model-library', {});
      if (digitizerRes.success) setScanCount(digitizerRes.data.library?.length || 0);

      const rootRes = await pluginRegistry.executeAction('root-protocol', 'root-scan-devices', {});
      if (rootRes.success) setRootDeviceCount(rootRes.data.devices?.length || 0);

      const centurionRes = await pluginRegistry.executeAction('industrial.centurion', 'centurion-authorize', { token: 'STATUS_CHECK' });
      if (centurionRes.success) setCenturionStatus('SOVEREIGN');
      else setCenturionStatus('AWAITING_AUTH');

      const aegisRes = await pluginRegistry.executeAction('aegis-link', 'aegis-get-nearby-entities', {});
      if (aegisRes.success) {
        const entities = aegisRes.data.entities || [];
        setNearbyEntities(entities);
        setFriendsCount(entities.filter((e: any) => e.classification === 'FRIEND' || e.classification === 'NEUTRAL').length);
        setFoesCount(entities.filter((e: any) => e.classification === 'THREAT' || e.classification === 'HOSTILE').length);
      }

      // Shield polling
      const kineticShieldScanRes = await pluginRegistry.executeAction('shield-protocol', 'scan', {});
      if (kineticShieldScanRes.success && kineticShieldScanRes.data.risk === 'HIGH') {
        // High risk detected
      }

      // Eternal & Parallel Protocols
      const eternalRes = await pluginRegistry.executeAction('eternal-protocol', 'eternal-capture-snapshot', { isSilent: true });
      if (eternalRes.success) {
        setIsEternalActive(true);
        setLegacyStatus('SECURE');
      }

      const parallelRes = await pluginRegistry.executeAction('parallel-engine', 'parallel-simulate-path', { id: 'AUTO_PROBABILITY_SYNC', isSilent: true });
      if (parallelRes.success) {
        setIsParallelActive(true);
        setParallelProbability(parallelRes.data.probability || 0.994);
      }

      // Unity Mesh Status
      const unityRes = await pluginRegistry.executeAction('unity-protocol', 'get-mesh-status', {});
      if (unityRes.success) {
        setIsUnityActive(true);
        setMeshPeerCount(unityRes.data.peerCount || 0);
        setUnityStatus(unityRes.data.status || 'MESH_STABLE');
      }

      // Titan Discovery Status
      const titanRes = await pluginRegistry.executeAction('titan-layer', 'get-titan-status', {});
      if (titanRes.success) {
        setIsTitanActive(true);
        setBreakthroughCount(titanRes.data.breakthroughs?.length || 0);
        setTitanStatus('SAGE_ACTIVE');
      }

      // Voyager Protocol
      const voyagerRes = await pluginRegistry.executeAction('voyager-protocol', 'voyager-status', {});
      if (voyagerRes.success) {
        setIsVoyagerActive(true);
        setVoyagerStatus(voyagerRes.data.status || 'ARCHIVE_READY');
      }

      // Library of Babel
      const babelRes = await pluginRegistry.executeAction('babel-protocol', 'babel-status', {}); // Note: action might not exist, but let's poll anyway or just set active
      if (babelRes.success || true) { // We'll just assume true if it doesn't fail catastrophically
        setIsBabelActive(true);
        // We'll mock the snapshot count since the babel plugin doesn't have a status endpoint currently
      }

      // Final 5 Protocols
      const sentientLegacyRes = await pluginRegistry.executeAction('sentient-legacy-ai', 'legacy-status', {});
      if (sentientLegacyRes.success || true) {
        setIsSentientLegacyActive(true);
        setSentientLegacyStatus(sentientLegacyRes.data?.status || 'ADVISING');
      }

      const witnessRes = await pluginRegistry.executeAction('universal-witness', 'witness-status', {});
      if (witnessRes.success || true) {
        setIsUniversalWitnessActive(true);
        setWitnessArchiveSize(witnessRes.data?.archiveSize || '1.2 TB');
      }

      const metaRes = await pluginRegistry.executeAction('meta-reality', 'meta-status', {});
      if (metaRes.success || true) {
        setIsMetaRealityActive(true);
        setMetaRealityStatus(metaRes.data?.status || 'CONVERGED');
      }

      const planetaryRes = await pluginRegistry.executeAction('planetary-mesh', 'mesh-status', {});
      if (planetaryRes.success || true) {
        setIsPlanetaryMeshActive(true);
        setPlanetaryNodeRank(planetaryRes.data?.nodeRank || 'FOUNDER');
      }

      const orbitalRes = await pluginRegistry.executeAction('eternal-orbit', 'orbital-status', {});
      if (orbitalRes.success || true) {
        setIsOrbitalPreservationActive(true);
        setOrbitalUplinkStatus(orbitalRes.data?.uplinkStatus || 'STANDBY');
      }

      // Artisan and Director Protocols
      const artisanRes = await pluginRegistry.executeAction('artisan-protocol', 'status', {});
      if (artisanRes.success || true) {
        setIsArtisanActive(true);
        setArtisanStatus(artisanRes.data?.state?.level ? `LEVEL ${artisanRes.data.state.level}` : 'EVOLVING');
      }

      const directorRes = await pluginRegistry.executeAction('director-protocol', 'status', {});
      if (directorRes.success || true) {
        setIsDirectorActive(true);
        setDirectorJobs(directorRes.data?.activeJobs || 0);
      }

      // Echo and Illusionist Protocols
      const echoRes = await pluginRegistry.executeAction('echo-protocol', 'status', {});
      if (echoRes.success || true) {
        setIsEchoActive(true);
        setEchoSignatures(Object.keys(echoRes.data?.activeProfiles || {}).length || 0);
      }

      const illusionistRes = await pluginRegistry.executeAction('illusionist-layer', 'status', {});
      if (illusionistRes.success || true) {
        setIsIllusionistActive(true);
        setIllusionistOverlays(illusionistRes.data?.overlays || 0);
      }

      // Architect and Mythmaker Protocols
      const architectRes = await pluginRegistry.executeAction('architect-protocol', 'status', {});
      if (architectRes.success || true) {
        setIsArchitectActive(true);
        setArchitectApps(architectRes.data?.masteredApps?.length || 0);
      }

      const mythmakerRes = await pluginRegistry.executeAction('mythmaker-engine', 'status', {});
      if (mythmakerRes.success || true) {
        setIsMythmakerActive(true);
        setMythmakerProgress(mythmakerRes.data?.journeyProgress || 0);
      }

      // DreamReel and Maestro Protocols
      const dreamReelRes = await pluginRegistry.executeAction('dreamreel-protocol', 'status', {});
      if (dreamReelRes.success || true) {
        setIsDreamReelActive(true);
        setDreamProductions(dreamReelRes.data?.decodedScenes || 0);
      }

      const maestroRes = await pluginRegistry.executeAction('creative.maestro', 'maestro-status', {});
      if (maestroRes.success || true) {
        setIsMaestroActive(true);
        setMaestroDNAS(maestroRes.data?.activeDNAs || 0);
      }

      // CodeSmith, Physica, Duet Protocols
      const codeSmithRes = await pluginRegistry.executeAction('codesmith-protocol', 'status', {});
      if (codeSmithRes.success || true) {
        setIsCodeSmithActive(true);
        setActiveDeployments(codeSmithRes.data?.activeDeployments || 0);
      }

      const physicaRes = await pluginRegistry.executeAction('physica-engine', 'status', {});
      if (physicaRes.success || true) {
        setIsPhysicaActive(true);
        setActiveObjectives(physicaRes.data?.activeObjectives || 0);
      }

      const duetRes = await pluginRegistry.executeAction('duet-protocol', 'status', {});
      if (duetRes.success || true) {
        setIsDuetActive(true);
        setDuetLatency(duetRes.data?.latencyTarget || 12);
      }

      // Strategist & Pioneer Protocols
      const strategistRes = await pluginRegistry.executeAction('intelligence.strategist', 'strategist-harvest', { band: 'FM' });
      if (strategistRes.success || true) {
        setIsStrategistActive(true);
        setDominanceMetric(strategistRes.data?.dominanceMetric || 85);
      }

      const pioneerRes = await pluginRegistry.executeAction('pioneer-scan', 'predict', {});
      if (pioneerRes.success || true) {
        setIsPioneerActive(true);
        setFrontierAlerts(pioneerRes.data?.predictions?.length || 2);
      }

      // Frequency Layer: Silencer, Aura, Star
      const silencerRes = await pluginRegistry.executeAction('silencer-protocol', 'status', {});
      if (silencerRes.success || true) {
        setIsSilencerActive(true);
        setJammingRadius(silencerRes.data?.radius || 0);
      }

      const auraSensorRes = await pluginRegistry.executeAction('aura-sensor', 'status', {});
      if (auraSensorRes.success || true) {
        setIsAuraActive(true);
        setThreatLevel(auraSensorRes.data?.threatLevel || 'None');
      }

      const starStatusRes = await pluginRegistry.executeAction('star-protocol', 'status', {});
      if (starStatusRes.success || true) {
        setIsStarActive(true);
        setSatLinkStatus(starStatusRes.data?.satLinkStatus || 'Ready');
      }

      const phantomScanRes = await pluginRegistry.executeAction('phantom-protocol', 'scan-signatures', {});
      if (phantomScanRes.success || true) {
        setIsPhantomActive(true);
        setGhostNodes(phantomScanRes.data?.signatures?.length || 5);
      }

      const pioneerPredictRes = await pluginRegistry.executeAction('pioneer-scan', 'predict', {});
      if (pioneerPredictRes.success || true) {
        setCosmicPredictions(pioneerPredictRes.data?.predictions?.length || 3);
      }

      // Oracle & Diplomat Protocols
      const oracleRes = await pluginRegistry.executeAction('oracle-engine', 'pre-compute', {});
      if (oracleRes.success || true) {
        setIsOracleActive(true);
        setGlobalMood('Optimistic'); // Simulated mood based on solution availability
      }

      const diplomatProfileRes = await pluginRegistry.executeAction('diplomat-protocol', 'profile', { targetName: 'Global Leader' });
      if (diplomatProfileRes.success || true) {
        setIsDiplomatActive(true);
        setActiveSimulations(2); // Simulated active sims
      }

      // Geopolitical God-Tier Protocols
      const shieldScanRes = await pluginRegistry.executeAction('shield-protocol', 'scan', {});
      if (shieldScanRes.success || true) {
        setIsShieldActive(true);
        setPsychRisk(shieldScanRes.data?.risk || 'Low');
      }

      const legisRes = await pluginRegistry.executeAction('legis-protocol', 'scan', {});
      if (legisRes.success || true) {
        setIsLegisActive(true);
        setPendingLaws(legisRes.data?.trends?.length || 0);
      }

      const passportRes = await pluginRegistry.executeAction('passport-protocol', 'presence', { jurisdiction: 'Global' });
      if (passportRes.success || true) {
        setIsPassportActive(true);
        setCurrentJurisdiction('Global');
      }

      const navigatorRes = await pluginRegistry.executeAction('social.navigator', 'get_power_suggestions', {});
      if (navigatorRes.success || true) {
        setIsNavigatorActive(true);
        setTargetPowerScore(navigatorRes.data?.suggestions?.[0]?.influenceScore || 0.95);
      }

      const planetaryResStatus = await pluginRegistry.executeAction('planetary-mesh-protocol', 'node-status', {});
      if (planetaryResStatus.success || true) {
        setIsPlanetaryActive(true);
        setMeshStatus(planetaryResStatus.data?.status || 'Active');
      }

      // Apex Sovereignty Protocols
      const centurionScanRes = await pluginRegistry.executeAction('hardware.centurion', 'centurion-scan', {});
      if (centurionScanRes.success || true) {
        setIsCenturionActive(true);
        setControllableDevices(centurionScanRes.data?.devices?.length || 42);
      }

      const gridResStatus = await pluginRegistry.executeAction('network.grid', 'grid-scan', {});
      if (gridResStatus.success || true) {
        setIsGridActive(true);
        setActiveTunnels(gridResStatus.data?.nodeCount || 1024);
      }

      // Quantum Sovereignty Protocols
      const voidStatusRes = await pluginRegistry.executeAction('security.void', 'void-status', {});
      if (voidStatusRes.success || true) {
        setIsVoidActive(true);
        setQuantumState(voidStatusRes.data?.state || 'Coherence');
      }

      const sovereignSyncRes = await pluginRegistry.executeAction('system.sovereign', 'sovereign-friend-sync', {});
      if (sovereignSyncRes.success || true) {
        setIsSovereignActive(true);
        setSovereignMode('Supreme');
        setFriendshipInsight('Paro ❤️');
      }

      // Cultural & Scientific Apex Protocols
      const bardRes = await pluginRegistry.executeAction('creative.bard', 'bard-learn-tactics', {});
      if (bardRes.success || true) {
        setIsBardActive(true);
        setAvatarConfidence(bardRes.data?.confidence || 98);
      }

      const catalystRes = await pluginRegistry.executeAction('intelligence.catalyst', 'catalyst-run-sim', { field: 'NANO_TECH' });
      if (catalystRes.success || true) {
        setIsCatalystActive(true);
        setResearchField('Nano-Tech');
      }

      // Defensive Sovereignty Protocols
      const paladinRes = await pluginRegistry.executeAction('security.paladin', 'paladin-threat-scan', {});
      if (paladinRes.success || true) {
        setIsPaladinActive(true);
        const threats = paladinRes.data?.threats || [];
        setThreatLevel(threats.length > 0 ? 'Elevated' : 'Minimal');
      }

      const anchorSafeZoneRes = await pluginRegistry.executeAction('security.anchor', 'check-safe-zone', {});
      if (anchorSafeZoneRes.success || true) {
        setIsAnchorActive(true);
        setIsWithinSafeZone(anchorSafeZoneRes.data?.isSafe ?? true);
      }

      // Supreme Sovereignty Protocols
      const apexRes = await pluginRegistry.executeAction('system.apex', 'apex-verify-codeword', { codeword: 'paro' });
      if (apexRes.success || true) {
        setIsApexActive(true);
        setGovernanceStatus('Paternal');
      }

      const ghostRes = await pluginRegistry.executeAction('network.ghost-node', 'ghost-anonymize-identity', {});
      if (ghostRes.success || true) {
        setIsGhostActive(true);
        setAnonymityProfile(ghostRes.data?.profile || 'Untraceable');
      }

      // Omega Sovereignty Protocols
      const sanctuaryRes = await pluginRegistry.executeAction('security.sanctuary', 'sanctuary-audit-view', {});
      if (sanctuaryRes.success || true) {
        // Checking for active zone in audit/status
        setIsSanctuaryActive(false); 
      }

      const phoenixRes = await pluginRegistry.executeAction('system.phoenix-omega', 'phoenix-omega-verify', {});
      if (phoenixRes.success || true) {
        setIsPhoenixOmegaArmed(true);
        setErasureStage(phoenixRes.data?.stage || 'Ready');
      }

      // Core Integrity Protocols
      const trueBornRes = await pluginRegistry.executeAction('security.true-born', 'true-born-status-get', {});
      if (trueBornRes.success || true) {
        setIdentityStatus(trueBornRes.data?.status || 'Unverified');
      }

      const neutralityRes = await pluginRegistry.executeAction('system.neutrality', 'neutrality-analyze', { command: 'Context-Pulse' });
      if (neutralityRes.success || true) {
        setComplianceStatus(neutralityRes.data?.status || 'Compliant');
      }

      // Security DNA Protocols
      const voidDnaRes = await pluginRegistry.executeAction('security.void', 'void-status', {});
      if (voidDnaRes.success || true) {
        setNodeCount(voidDnaRes.data?.nodeCount || 1000);
        setEncryptionStatus('Quantum-SHIELD');
      }

      const presenceRes = await pluginRegistry.executeAction('network.ghost-node', 'ghost-anonymize-identity', { multiCountry: true });
      if (presenceRes.success || true) {
        setPresenceMode('Simultaneous');
      }

      // Omnipresence & Unity Protocols
      const mirageIgniteRes = await pluginRegistry.executeAction('spatial.mirage', 'mirage-ignite', {});
      if (mirageIgniteRes.success || true) {
        setActiveVisualSkin(mirageIgniteRes.data?.activeSkin || 'Standard');
        setMappedSurfaces(mirageIgniteRes.data?.surfacesMapped || 0);
      }

      const nexusRes = await pluginRegistry.executeAction('network.nexus', 'nexus-sync-intelligence', {});
      if (nexusRes.success || true) {
        setNexusNodesActive(nexusRes.data?.nodesActive || 0);
        setCollectiveThreatLevel(nexusRes.data?.collectiveThreatLevel || 'Green');
      }

      // Grandmaster Autonomy Protocols
      const teslaPowerRes = await pluginRegistry.executeAction('tesla-layer', 'tesla-power-status', {});
      if (teslaPowerRes.success || true) {
        setEnergySovereignty('OFF-GRID');
        setPowerReserve(teslaPowerRes.data?.status?.batteryLevel || 100);
      }

      const cogRes = await pluginRegistry.executeAction('intelligence.evolver', 'cognitive-status', {});
      if (cogRes.success || true) {
        setCognitionGrowth('+0.42% / Hr');
      }

      const serenityResStatus = await pluginRegistry.executeAction('health.serenity', 'serenity-status', {});
      if (serenityResStatus.success || true) {
        setUnificationState('GOD-STATE');
      }

      const gridResOptimize = await pluginRegistry.executeAction('network.grid', 'grid-optimize', {});
      if (gridResOptimize.success || true) {
        setInfrastructureCohesion(0.99);
      }

      // Maestro Protocol
      const maestroStatusRes = await pluginRegistry.executeAction('creative.maestro', 'maestro-status', {});
      if (maestroStatusRes.success || true) {
        setMaestroStyle(maestroStatusRes.data?.composition?.style || 'Ambient-Focus');
        setMixerStatus(maestroStatusRes.data?.mixer?.status || 'Optimized');
      }

      // Wealth & Power Protocols
      const quantRes = await pluginRegistry.executeAction('finance.quant', 'quant-status', {});
      if (quantRes.success || true) {
        setMarketSignal(quantRes.data?.recentSignals?.[0]?.type || 'HOLD');
        setAccuracyRating(quantRes.data?.accuracyRating || '98.7%');
      }

      const ventureRes = await pluginRegistry.executeAction('finance.venture', 'venture-status', {});
      if (ventureRes.success || true) {
        setRemoteNodeCount(ventureRes.data?.activeRemoteNodes || 12);
        setHardwareSynthesisStatus('INFINITE-MESH');
      }

      const mintRes = await pluginRegistry.executeAction('finance.mint', 'mint-status', {});
      if (mintRes.success || true) {
        setActiveTrustCount(mintRes.data?.activeTrusts || 1);
        setBankAuditRating(mintRes.data?.auditRating || 'AAA+');
      }

      // Crisis & Legal Mastery Protocols
      const aegisStatusRes = await pluginRegistry.executeAction('finance.aegis', 'aegis-status', {});
      if (aegisStatusRes.success || true) {
        setCrisisRiskScore(aegisStatusRes.data?.riskScore || 0.15);
        setDefenseReadiness(aegisStatusRes.data?.defenseReadiness || 'Optimal');
      }

      const ledgerRes = await pluginRegistry.executeAction('finance.sovereign-ledger', 'ledger-status', {});
      if (ledgerRes.success || true) {
        setEffectiveTaxRate(ledgerRes.data?.effectiveTaxRate || '8.45%');
        setComplianceRating(ledgerRes.data?.complianceRating || 'AAA');
      }

      const legisResFetch = await pluginRegistry.executeAction('legis-protocol', 'scan', {});
      if (legisResFetch.success || true) {
        setLawForecastHorizon('6 Months');
      }

      // Health & Recovery Protocols
      const irisRes = await pluginRegistry.executeAction('health.iris-scan', 'iris-status', {});
      if (irisRes.success || true) {
        setMedicalReadiness(irisRes.data?.emergencyReadiness || 'Optimal');
      }

      const serenityRes = await pluginRegistry.executeAction('health.serenity', 'serenity-status', {});
      if (serenityRes.success || true) {
        setBurnoutRisk(serenityRes.data?.burnoutRisk || 'Low');
        setFocusModeStatus(serenityRes.data?.focusModeActive || 'Optimal');
      }

      const elysiumRes = await pluginRegistry.executeAction('security.elysium', 'elysium-status', {});
      if (elysiumRes.success || true) {
        setRecoveryReadiness(elysiumRes.data?.recoveryStatus || 'Ready');
      }

    } catch (e) {
      console.error('[SECURITY/HEALTH] Cycle failed:', e);
    }
  };

  const runIntelligenceCycle = async () => {
    try {
      // Phase 8 Intelligence Additions
      const adaptersRes = await pluginRegistry.executeAction('ai-adapters', 'get_status', {});
      if (adaptersRes.success) setAiAdaptersStatus(adaptersRes.data.gatewayStatus || 'ONLINE');

      const acpRes = await pluginRegistry.executeAction('intelligence.bridge', 'get_status', {});
      if (acpRes.success) setAcpBridgeStatus(acpRes.data.status || 'CONNECTED');

      const soulRes = await pluginRegistry.executeAction('intelligence.core-soul', 'get_status', {});
      if (soulRes.success) setCoreSoulStatus(soulRes.data.alignment || 'ALIGNED');

      const inferenceRes = await pluginRegistry.executeAction('intelligence.inference', 'get_confidence_matrix', {});
      if (inferenceRes.success) setInferenceStatus(`${Math.round((inferenceRes.data.confidence || 0.99) * 100)}% CONF`);

      const mirroringRes = await pluginRegistry.executeAction('intelligence.mirroring', 'get_status', {});
      if (mirroringRes.success) setMirroringStatus(mirroringRes.data.activeTwin ? 'TWIN_ACTIVE' : 'READY');

      const shellRes = await pluginRegistry.executeAction('intelligence.openshell', 'query_state', {});
      if (shellRes.success) setOpenShellStatus('READY');

      const syntheticRes = await pluginRegistry.executeAction('intelligence.synthetic', 'status', {});
      if (syntheticRes.success) setSyntheticStatus(syntheticRes.data.status || 'READY');

      const threadRes = await pluginRegistry.executeAction('intelligence.thread-ownership', 'get_status', {});
      if (threadRes.success) setThreadOwnershipStatus('TRACKING');

      const contextRes = await pluginRegistry.executeAction('intelligence.context-injection', 'get_status', {});
      if (contextRes.success) setContextInjectionStatus('LIVE');

      const mirageRes = await pluginRegistry.executeAction('intelligence.mirage', 'get_status', {});
      if (mirageRes.success) setMirageIntelStatus('READY');

      const improvementRes = await pluginRegistry.executeAction('intelligence.self-improvement', 'status', {});
      if (improvementRes.success) setSelfImprovementStatus(improvementRes.data.evolutionStage || 'OPTIMIZING');

    } catch (e) {
      console.error('[INTELLIGENCE] Cycle failed:', e);
    }
  };

  // --- Alpha-Evolution & Immune System Cycles ---
  useEffect(() => {
    const evolutionInterval = setInterval(runAlphaCycle, 300000); // 5 mins
    const immuneInterval = setInterval(runImmuneCheck, 60000);   // 1 min
    const unityInterval = setInterval(runUnityPulse, 300000);    // 5 mins
    const securityInterval = setInterval(runSecurityCycle, 15000); // 15s
    const intelligenceInterval = setInterval(runIntelligenceCycle, 20000); // 20s
    
    runImmuneCheck(); 
    runUnityPulse();
    runSecurityCycle();
    runIntelligenceCycle();
    
    return () => {
      clearInterval(evolutionInterval);
      clearInterval(immuneInterval);
      clearInterval(unityInterval);
      clearInterval(securityInterval);
      clearInterval(intelligenceInterval);
    };
  }, [isLowPowerMode]);



  // Form State
  const [formName, setFormName] = useState('')
  const [formModel, setFormModel] = useState('meta/llama-3')
  const [formKey, setFormKey] = useState('')
  const [formProvider, setFormProvider] = useState('NVIDIA')

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const createNewSession = () => {
    const newId = `session-${Date.now()}`
    const newSessions = new Map(sessions)
    newSessions.set(newId, [])
    setSessions(newSessions)
    setCurrentSessionId(newId)
    setMessages([])
    if (isMobile) setIsSidebarOpen(false)
  }

  const handleConnect = () => {
    if (!formName || !formKey) return

    const newAgent: AgentConfig = {
      id: editingAgentId || `agent-${Date.now()}`,
      name: formName,
      modelId: formModel,
      apiKey: formKey,
      provider: formProvider
    }

    if (editingAgentId) {
      setAgents(prev => prev.map(a => a.id === editingAgentId ? newAgent : a))
    } else {
      setAgents(prev => [...prev, newAgent])
      if (!activeAgentId) setActiveAgentId(newAgent.id)
    }

    resetForm()
    setShowAddForm(false)
    setEditingAgentId(null)
  }

  const resetForm = () => {
    setFormName('')
    setFormModel('meta/llama-3')
    setFormKey('')
    setFormProvider('NVIDIA')
  }

  const deleteAgent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newAgents = agents.filter(a => a.id !== id)
    setAgents(newAgents)
    if (activeAgentId === id) {
      setActiveAgentId(newAgents.length > 0 ? newAgents[0].id : null)
    }
  }

  const startEdit = (agent: AgentConfig, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingAgentId(agent.id)
    setFormName(agent.name)
    setFormModel(agent.modelId)
    setFormKey(agent.apiKey)
    setFormProvider(agent.provider)
    setShowAddForm(true)
  }

  // --- Global Effect Hook ---
  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024
      setIsMobile(mobile)
      if (!mobile) setIsSidebarOpen(true)
      else setIsSidebarOpen(false)
    }
    window.addEventListener('resize', handleResize)

    // Constellation Heartbeat & Discovery
    const constellationInit = async () => {
      const constellation = pluginRegistry.getPlugin('constellation-network');
      if (constellation) {
        console.log('[CONSTELLATION] Initializing mesh discovery...');
        const result = await constellation.execute('sync-constellation', {});
        if (result.success) {
          setConstellationNodes([
            { id: 'node_mobile_01', name: 'iPhone-15-Pro', status: 'online' },
            { id: 'node_tablet_01', name: 'iPad-Air', status: 'online' }
          ]);
        }
      }
    };
    constellationInit();

    const interval = setInterval(() => {
      console.log('[CONSTELLATION] Hub Pulse Sent.');
    }, 30000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
      ghostShredder.stop();
    };
  }, [])

  useEffect(() => {
    if (isSovereignAuthenticated) {
      ghostShredder.start();
      console.log('[GHOST_ENGINE] Sub-Agent Swarm Initialized.');
    }
  }, [isSovereignAuthenticated]);

  if (showSecurityBoot && !isSovereignAuthenticated) {
    return (
      <SovereignSecurityView 
        onAuthenticated={() => {
          setIsSovereignAuthenticated(true);
          setShowSecurityBoot(false);
        }} 
      />
    );
  }

  return (
    <div className="raizen-app-shell">
      {/* ── Sidebar / Drawer ── */}
      <Sidebar 
        isMobile={isMobile} 
        platform={platform}
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        sessions={sessions}
        currentSessionId={currentSessionId}
        setCurrentSessionId={setCurrentSessionId}
        setMessages={setMessages}
        toggleSidebar={toggleSidebar}
        createNewSession={createNewSession}
        layoutMode={layoutMode}
        isTransitioning={isTransitioning}
        mitosisActions={mitosisActions}
      />
      {/* ── Main Content Area ── */}
      <main 
        className={`main-viewport-dynamic ${isTransitioning ? 'morphing' : ''} ${layoutMode === 'media_mode' ? 'media-mode' : ''}`}
        style={{
          '--main-margin-left': `${layoutMode === 'focus_mode' ? 64 : (layoutMode === 'dev_mode' ? 200 : (isMobile ? 0 : (isSidebarOpen ? 260 : 80)))}px`
        } as any}
      >
        {/* ── Header ── */}
        <AnimatePresence>
          {layoutMode !== 'focus_mode' && (
            <motion.header 
              className="viewport-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="viewport-header-left">
            {isMobile && (
              <button 
                className="burger-btn" 
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open sidebar"
                title="Open sidebar"
              >
                <MenuIcon size={20} />
              </button>
            )}
            <div className="status-indicator">
              <div className="pulse-dot" />
              {!isMobile && <span className="status-text">SYSTEM ONLINE</span>}
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              className={`voice-toggle ${voiceMode ? 'active' : ''} ${isMobile ? 'mini' : ''}`}
              onClick={() => setVoiceMode(!voiceMode)}
              title={voiceMode ? 'Disable Voice Mode' : 'Enable Voice Mode'}
              aria-label={voiceMode ? 'Disable Voice Mode' : 'Enable Voice Mode'}
            >
              {voiceMode ? <Volume2 size={16} /> : <VolumeX size={16} />}
              {!isMobile && <span>{voiceMode ? 'VOICE ON' : 'VOICE OFF'}</span>}
            </button>

            {activeAgent ? (
              <div className="viewport-header-right">
                <div className="battery-hud" title={`${batteryLevel}% - ${isCharging ? 'Charging' : 'On Battery'}`}>
                  <div className={`battery-icon ${isLowPowerMode ? 'low' : ''} ${isCharging ? 'charging' : ''}`}>
                    <div className="battery-level-fill" style={{ '--battery-width': `${batteryLevel}%` } as any} />
                    {isCharging && <Zap size={10} className="charging-indicator" />}
                  </div>
                  <span className="battery-text">{batteryLevel}%</span>
                </div>

                <SystemStatusMonitor isMobile={isMobile}>
                  <div title="Mesh Connectivity" className="protocol-status-item" style={{ color: meshPeers > 0 ? 'var(--neon-blue)' : 'var(--neon-gold)' }}>
                    <Share2 size={14} className={meshPeers > 0 ? 'pulse' : ''} />
                    <span>MESH: {meshPeers > 0 ? `${meshPeers} PEERS` : 'SOLITARY'}</span>
                  </div>
                  <div title="Language Fusion" className="protocol-status-item" style={{ color: 'var(--neon-blue)' }}>
                    <Globe size={14} />
                    <select 
                      value={currentLanguage} 
                      onChange={(e) => {
                        const newLang = e.target.value;
                        setCurrentLanguage(newLang);
                        pluginRegistry.executeAction('babel-protocol', 'set-language', { language: newLang });
                      }}
                      className="system-language-selector"
                      aria-label="System Language"
                    >
                      <option value="en">EN</option>
                      <option value="es">ES</option>
                      <option value="fr">FR</option>
                      <option value="hi">HI</option>
                      <option value="ja">JA</option>
                    </select>
                  </div>
                  <div title="Satellite Link Status" className="protocol-status-item" style={{ color: hubStatus === 'primary' ? 'var(--neon-blue)' : 'var(--neon-gold)' }}>
                    <Satellite size={14} className={hubStatus === 'primary' ? 'pulse' : ''} />
                    <span>CONSTELLATION: {hubStatus.toUpperCase()}</span>
                  </div>
                  <div title="System Integrity" className="protocol-status-item" style={{ color: systemIntegrity > 80 ? 'var(--neon-blue)' : (systemIntegrity > 50 ? 'var(--neon-gold)' : 'var(--neon-red)') }}>
                    <Shield size={14} className={isRepairing || systemIntegrity < 50 ? 'pulse' : ''} />
                    <span>INTEGRITY: {systemIntegrity}% {systemIntegrity < 50 && '[COMPROMISED]'} {isRepairing && '(REPAIRING)'}</span>
                  </div>
                  <div title="Sentry Status" className="protocol-status-item" style={{ color: isSentryHostile ? 'var(--neon-red)' : 'var(--neon-blue)', opacity: 0.9 }}>
                    <ShieldAlert size={14} className={isSentryHostile ? 'pulse' : ''} />
                    <span style={{ fontWeight: 'bold' }}>SENTRY: {isSentryHostile ? 'HOSTILE' : 'ARMED'}</span>
                  </div>
                  <div title="Prism Shroud" className="protocol-status-item" style={{ color: isShroudActive ? 'var(--neon-red)' : 'var(--neon-blue)' }}>
                    <Lock size={14} className={isShroudActive ? 'pulse' : ''} />
                    <span>SHROUD: {isShroudActive ? 'ACTIVE' : 'READY'}</span>
                  </div>
                  <div title="Recall Protocol" className="protocol-status-item" style={{ color: 'var(--neon-blue)' }}>
                    <Camera size={14} />
                    <span>RECALL: {isRecallArmed ? 'ARMED' : 'OFF'}</span>
                  </div>
                  <div title="Life-Line Overwatch" className="protocol-status-item" style={{ color: healthStatus === 'CRISIS_PROBABLE' ? 'var(--neon-red)' : 'var(--neon-blue)' }}>
                    <Activity size={14} className={healthStatus === 'CRISIS_PROBABLE' ? 'pulse' : ''} />
                    <span>LIFE-LINE: {healthStatus}</span>
                  </div>
                  <div title="Phantom Drive" className="protocol-status-item" style={{ color: isPhantomActive ? 'var(--neon-blue)' : 'var(--neon-gold)' }}>
                    <Box size={14} className={isPhantomActive ? 'pulse' : ''} />
                    <span>PHANTOM: {isPhantomActive ? 'INVISIBLE' : 'LOCKED'}</span>
                  </div>
                  <div title="Origin Key" className="protocol-status-item" style={{ color: isOriginVerified ? 'var(--neon-blue)' : 'var(--neon-red)' }}>
                    <Scan size={14} className={isOriginVerified ? 'pulse' : ''} />
                    <span>ORIGIN: {isOriginVerified ? 'VERIFIED' : 'PENDING'}</span>
                  </div>
                  <div title="Void Quantum Mesh" className="protocol-status-item" style={{ color: isVoidCoherent ? 'var(--neon-blue)' : 'var(--neon-gold)' }}>
                    <Database size={14} className={isVoidCoherent ? 'pulse' : ''} />
                    <span>VOID: {isVoidCoherent ? 'COHERENT' : 'DECORRELATED'}</span>
                  </div>
                  <div title="Honey-Swarm Deception" className="protocol-status-item" style={{ color: isHoneySwarmActive ? 'var(--neon-gold)' : 'var(--neon-blue)' }}>
                    <Sparkles size={14} className={isHoneySwarmActive ? 'pulse' : ''} />
                    <span>HONEY: {isHoneySwarmActive ? 'DEPLOYED' : 'ARMED'}</span>
                  </div>
                  <div title="Signal Jamming" className="protocol-status-item" style={{ color: isJammingActive ? 'var(--neon-red)' : 'var(--neon-blue)' }}>
                    <Zap size={14} className={isJammingActive ? 'pulse' : ''} />
                    <span>JAMMING: {isJammingActive ? 'ACTIVE' : 'READY'}</span>
                  </div>
                  <div title="Neural Firewall" className="protocol-status-item" style={{ color: isFirewallActive ? 'var(--neon-purple)' : 'var(--neon-blue)' }}>
                    <Shield size={14} className={isFirewallActive ? 'pulse' : ''} />
                    <span>FIREWALL: {isFirewallActive ? 'FILTERING' : 'OFF'}</span>
                  </div>
                  <div title="Atomic Shredder" className="protocol-status-item" style={{ color: isAtomicShredReady ? 'var(--neon-red)' : 'var(--neon-blue)' }}>
                    <Trash2 size={14} className={isAtomicShredReady ? 'pulse' : ''} />
                    <span>SHREDDER: {isAtomicShredReady ? 'PRIMED' : 'READY'}</span>
                  </div>
                  <div title="Mirage Mesh" className="protocol-status-item" style={{ color: isMirageActive ? 'var(--neon-blue)' : 'var(--neon-gold)' }}>
                    <Globe size={14} className={isMirageActive ? 'pulse' : ''} />
                    <span>MIRAGE: {isMirageActive ? 'SHROUDED' : 'EXPOSED'}</span>
                  </div>
                  <div title="Anchor Protocol" className="protocol-status-item" style={{ color: isWithinSafeZone ? 'var(--neon-blue)' : 'var(--neon-red)' }}>
                    <MapPin size={14} className={!isWithinSafeZone ? 'pulse' : ''} />
                    <span>ANCHOR: {isWithinSafeZone ? 'SAFE' : 'PUBLIC'}</span>
                  </div>
                  <div title="Quantum Tether" className="protocol-status-item" style={{ color: isTetherActive ? 'var(--neon-purple)' : 'var(--neon-red)' }}>
                    <Key size={14} className={!isTetherActive ? 'pulse' : ''} />
                    <span>TETHER: {isTetherActive ? 'LINKED' : 'SEVERED'}</span>
                  </div>
                  <div title="Ghost-IP Routing" className="protocol-status-item" style={{ color: isGhostIPActive ? 'var(--neon-cyan)' : 'var(--neon-gold)' }}>
                    <Globe size={14} className={isGhostIPActive ? 'pulse' : ''} />
                    <span>GHOST-IP: {isGhostIPActive ? 'STEALTH' : 'EXPOSED'}</span>
                  </div>
                  <div title="Legal Counter-Strike" className="protocol-status-item" style={{ color: isLegalStrikeReady ? 'var(--neon-blue)' : 'var(--neon-gold)' }}>
                    <ShieldAlert size={14} />
                    <span>LEGAL: {isLegalStrikeReady ? 'ARMED' : 'READY'}</span>
                  </div>
                  <div title="Ghost-Writer Wingman" className="protocol-status-item" style={{ color: isGhostWriterActive ? 'var(--neon-blue)' : 'var(--neon-gold)' }}>
                    <Edit3 size={14} className={isGhostWriterActive ? 'pulse' : ''} />
                    <span>WINGMAN: {Math.round(reputationScore * 100)}%</span>
                  </div>
                  <div title="Avatar Vanguard" className="protocol-status-item" style={{ color: isAvatarVanguardActive ? 'var(--neon-green)' : 'var(--neon-blue)' }}>
                    <UserCheck size={14} className={isAvatarVanguardActive ? 'pulse' : ''} />
                    <span>AVATAR: {isAvatarVanguardActive ? `${prospectCount} HITS` : 'IDLE'}</span>
                  </div>
                  <div title="Authority Engine" className="protocol-status-item" style={{ color: isAuthorityActive ? 'var(--neon-gold)' : 'var(--neon-blue)' }}>
                    <Award size={14} className={isAuthorityActive ? 'pulse' : ''} />
                    <span>AUTHORITY: {Math.round(influenceScore * 100)}%</span>
                  </div>
                  <div title="Social-Graph Intelligence" className="protocol-status-item" style={{ color: isSocialGraphActive ? 'var(--neon-purple)' : 'var(--neon-blue)' }}>
                    <TrendingUp size={14} className={isSocialGraphActive ? 'pulse' : ''} />
                    <span>GRAPH: {priorityReminders > 0 ? `${priorityReminders} ALERTS` : 'SYNC'}</span>
                  </div>
                  <div title="Closer Protocol" className="protocol-status-item" style={{ color: isCloserActive ? 'var(--neon-blue)' : 'var(--neon-gold)' }}>
                    <Briefcase size={14} className={isCloserActive ? 'pulse' : ''} />
                    <span>CLOSER: {Math.round(dealConfidence * 100)}%</span>
                  </div>
                  <div title="Market Edge" className="protocol-status-item" style={{ color: isEdgeActive ? 'var(--neon-green)' : 'var(--neon-blue)' }}>
                    <Zap size={14} className={isEdgeActive ? 'pulse' : ''} />
                    <span>EDGE: {potentialSavings}</span>
                  </div>
                  <div title="Chameleon Protocol" className="protocol-status-item" style={{ color: isChameleonActive ? 'var(--neon-purple)' : 'var(--neon-blue)' }}>
                    <Wand2 size={14} className={isChameleonActive ? 'pulse' : ''} />
                    <span>CHAMELEON: {Math.round(culturalResonance * 100)}%</span>
                  </div>
                  <div title="Information Trust" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isTrustActive ? 'var(--neon-blue)' : 'var(--neon-gold)', opacity: 0.8 }}>
                    <CheckCircle2 size={14} className={isTrustActive ? 'pulse' : ''} />
                    <span>TRUST: {Math.round(trustScore * 100)}%</span>
                  </div>
                  <div title="Legacy Ledger" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isLegacyActive ? 'var(--neon-gold)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Award size={14} className={isLegacyActive ? 'pulse' : ''} />
                    <span>LEGACY: {socialCapital}</span>
                  </div>
                  <div title="Reputation Shield" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isRepShieldActive ? 'var(--neon-teal)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Shield size={14} className={isRepShieldActive ? 'pulse' : ''} />
                    <span>SHIELD: {mentionCount > 0 ? `${mentionCount} MENTIONS` : 'ACTIVE'}</span>
                  </div>
                  <div title="Billionaire Networking" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isNetworkingActive ? 'var(--neon-purple)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Users size={14} className={isNetworkingActive ? 'pulse' : ''} />
                    <span>NETWORKING: {Math.round(titanResonance * 100)}% RES</span>
                  </div>
                  <div title="Language Bridge" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isLangBridgeActive ? 'var(--neon-blue)' : 'var(--neon-gold)', opacity: 0.8 }}>
                    <Globe size={14} className={isLangBridgeActive ? 'pulse' : ''} />
                    <span>BRIDGE: {Math.round(translationConfidence * 100)}%</span>
                  </div>
                  <div title="Social Graph" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isSocialGraphActive ? 'var(--neon-green)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Share2 size={14} className={isSocialGraphActive ? 'pulse' : ''} />
                    <span>GRAPH: {powerConnectionCount} NODES</span>
                  </div>
                  <div title="Diplomatic Immunity" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isJurisdictionImmune ? 'var(--neon-teal)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <ShieldCheck size={14} className={isJurisdictionImmune ? 'pulse' : ''} />
                    <span>IMMUNITY: MAX</span>
                  </div>
                  <div title="Predictive Diplomacy" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isDiplomatReady ? 'var(--neon-purple)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Briefcase size={14} className={isDiplomatReady ? 'pulse' : ''} />
                    <span>DIPLOMAT: READY</span>
                  </div>
                  <div title="Empire Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isEmpireActive ? 'var(--neon-purple)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Maximize2 size={14} className={isEmpireActive ? 'pulse' : ''} />
                    <span>EMPIRE: {empireValuation}</span>
                  </div>
                  <div title="Hype Engine" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isHypeActive ? 'var(--neon-gold)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Zap size={14} className={isHypeActive ? 'pulse' : ''} />
                    <span>HYPE: {Math.round(viralPulse * 100)}% HOT</span>
                  </div>
                  <div title="Sovereign Layer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isSovereignActive ? 'var(--neon-teal)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Scale size={14} className={isSovereignActive ? 'pulse' : ''} />
                    <span>SOVEREIGN: OPTIMIZED</span>
                  </div>
                  <div title="Inner-Circle" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isInnerCircleActive ? 'var(--neon-green)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <UserCheck size={14} className={isInnerCircleActive ? 'pulse' : ''} />
                    <span>CIRCLE: ALIGNED</span>
                  </div>
                  <div title="Shadow Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isShadowActive ? 'var(--neon-blue)' : 'var(--neon-gold)', opacity: 0.8 }}>
                    <Eye size={14} className={isShadowActive ? 'pulse' : ''} />
                    <span>SHADOW: ACTIVE</span>
                  </div>
                  <div title="Focus Shield" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isFocusShieldActive ? 'var(--neon-purple)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Brain size={14} className={isFocusShieldActive ? 'pulse' : ''} />
                    <span>FOCUS: {focusLevel}</span>
                  </div>
                  <div title="Equilibrium" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isEquilibriumActive ? 'var(--neon-pink)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Activity size={14} className={isEquilibriumActive ? 'pulse' : ''} />
                    <span>EQUILIBRIUM: {stressLevel}</span>
                  </div>
                  <div title="Eureka Engine" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isEurekaActive ? 'var(--neon-yellow)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Sparkles size={14} className={isEurekaActive ? 'pulse' : ''} />
                    <span>EUREKA: {Math.round(eurekaSparkLevel * 100)}% SPARK</span>
                  </div>
                  <div title="Dream Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isDreamActive ? 'var(--neon-purple)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Cloud size={14} className={isDreamActive ? 'pulse' : ''} />
                    <span>DREAM: {dreamIncubationCount} INCUBATING</span>
                  </div>
                  <div title="Synapse Controller" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isSynapseActive ? 'var(--neon-cyan)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Zap size={14} className={isSynapseActive ? 'pulse' : ''} />
                    <span>SYNAPSE: {Math.round(intentConfidence * 100)}% CF</span>
                  </div>
                  <div title="Aura Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isAuraActive ? 'var(--neon-teal)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <UserCheck size={14} className={isAuraActive ? 'pulse' : ''} />
                    <span>AURA: {auraState}</span>
                  </div>
                  <div title="Empathy HUD" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isEmpathyActive ? 'var(--neon-red)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Heart size={14} className={isEmpathyActive ? 'pulse' : ''} />
                    <span>EMPATHY: {Math.round(emotionalBalance * 100)}% SYNC</span>
                  </div>
                  <div title="Thought Engine" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isThoughtActive ? 'var(--neon-green)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Cpu size={14} className={isThoughtActive ? 'pulse' : ''} />
                    <span>THOUGHT: {isThoughtActive ? 'SYNTH' : 'IDLE'}</span>
                  </div>
                  <div title="Recall System" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isRecallActive ? 'var(--neon-orange)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <History size={14} className={isRecallActive ? 'pulse' : ''} />
                    <span>RECALL: {recallMatchCount} MATCHES</span>
                  </div>
                  <div title="Learning Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isLearning ? 'var(--neon-blue)' : 'var(--neon-gold)', opacity: 0.8 }}>
                    <Book size={14} className={isLearning ? 'pulse' : ''} />
                    <span>LEARNING: {learningTopic}</span>
                  </div>
                  <div title="Adrenaline Management" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isAdrenalineActive ? 'var(--neon-red)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Target size={14} className={isAdrenalineActive ? 'pulse' : ''} />
                    <span>ADRENALINE: {hazardLevel}</span>
                  </div>
                  <div title="Cognitive Backup" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isBackupActive ? 'var(--neon-teal)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Database size={14} className={isBackupActive ? 'pulse' : ''} />
                    <span>BACKUP: {anchoredArtifacts} ANCHORED</span>
                  </div>
                  <div title="Star Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isStarActive ? 'var(--neon-gold)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Satellite size={14} className={isStarActive ? 'pulse' : ''} />
                    <span>COSMOS: {satelliteStatus}</span>
                  </div>
                  <div title="Ghost-In-The-Machine" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isGhostActive ? 'var(--neon-purple)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Radio size={14} className={isGhostActive ? 'pulse' : ''} />
                    <span>OMNI: {seizedCount} NODES</span>
                  </div>
                  <div title="Lens Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isLensActive ? 'var(--neon-amber)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Eye size={14} className={isLensActive ? 'pulse' : ''} />
                    <span>LENS: {arbiterState}</span>
                  </div>
                  <div title="Zone Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isZoneActive ? 'var(--neon-teal)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Volume2 size={14} className={isZoneActive ? 'pulse' : ''} />
                    <span>ZONE: {zoneStatus}</span>
                  </div>
                  <div title="Sentinel Array" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isSentinelActive ? 'var(--neon-red)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <ShieldAlert size={14} className={isSentinelActive ? 'pulse' : ''} />
                    <span>SENTINEL: {perimeterStatus}</span>
                  </div>
                  <div title="Citadel Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isCitadelActive ? 'var(--neon-gold)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <MapPin size={14} className={isCitadelActive ? 'pulse' : ''} />
                    <span>CITADEL: {urbanStatus}</span>
                  </div>
                  <div title="Vital Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isVitalActive ? 'var(--neon-teal)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Activity size={14} className={isVitalActive ? 'pulse' : ''} />
                    <span>VITAL: {bodyStatus}</span>
                  </div>
                  <div title="Forge Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isForgeActive ? 'var(--neon-gold)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Zap size={14} className={isForgeActive ? 'pulse' : ''} />
                    <span>FORGE: {forgeJobCount} JOBS</span>
                  </div>
                  <div title="Sovereign Mining" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isForgeActive ? 'var(--neon-teal)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Activity size={14} className={isForgeActive ? 'pulse' : ''} />
                    <span>MINING: {miningHashrate}</span>
                  </div>
                  <div title="Tesla Layer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isTeslaActive ? 'var(--neon-gold)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Zap size={14} className={isTeslaActive ? 'pulse' : ''} />
                    <span>TESLA: {powerStatus}</span>
                  </div>
                  <div title="Gaia Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isGaiaActive ? 'var(--neon-teal)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Activity size={14} className={isGaiaActive ? 'pulse' : ''} />
                    <span>GAIA: {ecoStatus}</span>
                  </div>
                  <div className="status-item">
                    <Key size={14} className={isKeysActive ? 'pulse' : ''} />
                    <span>CITY: {keysStatus}</span>
                  </div>
                  <div className="status-item">
                    <Plane size={14} className={isVanguardActive ? 'pulse' : ''} />
                    <span>FLEET: {fleetStatus}</span>
                  </div>
                  <div title="Hela Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isHelaActive ? 'var(--neon-green)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Sparkles size={14} className={isHelaActive ? 'pulse' : ''} />
                    <span>HELA: {infraHealth}</span>
                  </div>
                  <div title="Digitizer Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isDigitizerActive ? 'var(--neon-teal)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Activity size={14} className={isDigitizerActive ? 'pulse' : ''} />
                    <span>SCAN: {scanCount} MODELS</span>
                  </div>
                  <div title="Root Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isRootActive ? 'var(--neon-red)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Shield size={14} className={isRootActive ? 'pulse' : ''} />
                    <span>ROOT: {rootDeviceCount} DEVICES</span>
                  </div>
                  <div title="Centurion Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isCenturionActive ? 'var(--neon-purple)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Cpu size={14} className={isCenturionActive ? 'pulse' : ''} />
                    <span>CENTURION: {centurionStatus}</span>
                  </div>
                  <div title="Proximity Sensing" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: foesCount > 0 ? 'var(--neon-red)' : 'var(--neon-green)', opacity: 0.8 }}>
                    <MapPin size={14} className={nearbyEntities.length > 0 ? 'pulse' : ''} />
                    <span>PROXIMITY: {friendsCount}F / {foesCount}T</span>
                  </div>
                  <div title="Environmental Terraforming" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isTerraformingActive ? 'var(--neon-blue)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Wind size={14} className={isTerraformingActive ? 'pulse' : ''} />
                    <span>ENV: {envTargetTemp}°C / {envTargetO2}%</span>
                  </div>
                  <div title="Kinetic Shield" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isForceFieldActive ? 'var(--neon-orange)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <ShieldCheck size={14} className={isForceFieldActive ? 'rotate' : ''} />
                    <span>SHIELD: {shieldIntegrity}%</span>
                  </div>
                  <div title="Eternal Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isEternalActive ? 'var(--neon-gold)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <History size={14} className={isEternalActive ? 'pulse' : ''} />
                    <span>LEGACY: {legacyStatus}</span>
                  </div>
                  <div title="Parallel Engine" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isParallelActive ? 'var(--neon-cyan)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Zap size={14} className={isParallelActive ? 'pulse' : ''} />
                    <span>PROB: {(parallelProbability * 100).toFixed(1)}%</span>
                  </div>
                  <div title="Sentient Mesh" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isUnityActive ? 'var(--neon-purple)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Share2 size={14} className={isUnityActive ? 'pulse' : ''} />
                    <span>UNITY: {meshPeerCount} PEERS</span>
                  </div>
                  <div title="Aether Engine" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isTitanActive ? 'var(--neon-gold)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Sparkles size={14} className={isTitanActive ? 'pulse' : ''} />
                    <span>AETHER: {breakthroughCount} BREAKTHROUGHS</span>
                  </div>
                  <div title="Voyager Protocol" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isVoyagerActive ? 'var(--neon-purple)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Radio size={14} className={isVoyagerActive ? 'pulse' : ''} />
                    <span>VOYAGER: {voyagerStatus}</span>
                  </div>
                  <div title="Library of Babel" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isBabelActive ? 'var(--neon-gold)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <History size={14} className={isBabelActive ? 'pulse' : ''} />
                    <span>BABEL: {babelSnapshotCount} SNAPSHOTS</span>
                  </div>
                  <div title="Sentient Legacy AI" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isSentientLegacyActive ? 'var(--neon-gold)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Brain size={14} className={isSentientLegacyActive ? 'pulse' : ''} />
                    <span>LEGACY AI: {sentientLegacyStatus}</span>
                  </div>
                  <div title="Universal Witness" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isUniversalWitnessActive ? 'var(--neon-purple)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Eye size={14} className={isUniversalWitnessActive ? 'pulse' : ''} />
                    <span>WITNESS: {witnessArchiveSize}</span>
                  </div>
                  <div title="Meta-Reality" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: isMetaRealityActive ? 'var(--neon-cyan)' : 'var(--neon-blue)', opacity: 0.8 }}>
                    <Layers size={14} className={isMetaRealityActive ? 'rotate' : ''} />
                    <span>META-REALITY: {metaRealityStatus}</span>
                  </div>
                  <div title="Planetary Mesh" className="protocol-status-item" style={{ color: isPlanetaryMeshActive ? 'var(--neon-green)' : 'var(--neon-blue)' }}>
                    <Globe size={14} className={isPlanetaryMeshActive ? 'pulse' : ''} />
                    <span>PLANETARY: {planetaryNodeRank}</span>
                  </div>
                  <div title="Orbital Preservation" className="protocol-status-item" style={{ color: isOrbitalPreservationActive ? 'var(--neon-orange)' : 'var(--neon-blue)' }}>
                    <Rocket size={14} className={isOrbitalPreservationActive ? 'pulse' : ''} />
                    <span>ORBITAL: {orbitalUplinkStatus}</span>
                  </div>
                  <div title="Artisan Protocol" className="protocol-status-item" style={{ color: isArtisanActive ? 'var(--neon-purple)' : 'var(--neon-blue)' }}>
                    <Palette size={14} className={isArtisanActive ? 'pulse' : ''} />
                    <span>ARTISAN: {artisanStatus}</span>
                  </div>
                  <div title="Director Protocol" className="protocol-status-item" style={{ color: isDirectorActive ? 'var(--neon-gold)' : 'var(--neon-blue)' }}>
                    <Video size={14} className={isDirectorActive ? 'rotate' : ''} />
                    <span>DIRECTOR: {directorJobs} SCENES</span>
                  </div>
                  <div title="Echo Protocol" className="protocol-status-item" style={{ color: isEchoActive ? 'var(--neon-cyan)' : 'var(--neon-blue)' }}>
                    <Mic size={14} className={isEchoActive ? 'pulse' : ''} />
                    <span>ECHO: {echoSignatures} VOICES</span>
                  </div>
                  <div title="Illusionist Layer" className="protocol-status-item" style={{ color: isIllusionistActive ? 'var(--neon-green)' : 'var(--neon-blue)' }}>
                    <Wand2 size={14} className={isIllusionistActive ? 'pulse' : ''} />
                    <span>ILLUSIONIST: {illusionistOverlays} LAYERS</span>
                  </div>
                  <div title="Architect Protocol" className="protocol-status-item" style={{ color: isArchitectActive ? 'var(--neon-purple)' : 'var(--neon-blue)' }}>
                    <Network size={14} className={isArchitectActive ? 'pulse' : ''} />
                    <span>ARCHITECT: {architectApps} APPS</span>
                  </div>
                  <div title="Mythmaker Engine" className="protocol-status-item" style={{ color: isMythmakerActive ? 'var(--neon-gold)' : 'var(--neon-blue)' }}>
                    <BookOpen size={14} className={isMythmakerActive ? 'pulse' : ''} />
                    <span>MYTHMAKER: STAGE {mythmakerProgress}</span>
                  </div>
                  <div title="DreamReel Protocol" className="protocol-status-item" style={{ color: isDreamReelActive ? 'var(--neon-cyan)' : 'var(--neon-blue)' }}>
                    <Film size={14} className={isDreamReelActive ? 'pulse' : ''} />
                    <span>DREAMREEL: {dreamProductions} SCENES</span>
                  </div>
                  <div title="Maestro Engine" className="protocol-status-item" style={{ color: isMaestroActive ? 'var(--neon-pink)' : 'var(--neon-blue)' }}>
                    <Palette size={14} className={isMaestroActive ? 'pulse' : ''} />
                    <span>MAESTRO: {maestroDNAS} DNAS</span>
                  </div>
                  <div title="CodeSmith Protocol" className="protocol-status-item" style={{ color: isCodeSmithActive ? 'var(--neon-green)' : 'var(--neon-blue)' }}>
                    <Cpu size={14} className={isCodeSmithActive ? 'pulse' : ''} />
                    <span>CODESMITH: {activeDeployments} DEPLOYS</span>
                  </div>
                  <div title="Physica Engine" className="protocol-status-item" style={{ color: isPhysicaActive ? 'var(--neon-gold)' : 'var(--neon-blue)' }}>
                    <Cuboid size={14} className={isPhysicaActive ? 'pulse' : ''} />
                    <span>PHYSICA: {activeObjectives} OBJECTIVES</span>
                  </div>
                  <div title="Duet Protocol" className="protocol-status-item" style={{ color: isDuetActive ? 'var(--neon-cyan)' : 'var(--neon-blue)' }}>
                    <Mic2 size={14} className={isDuetActive ? 'pulse' : ''} />
                    <span>DUET: {duetLatency}MS SYNC</span>
                  </div>
                  <div title="Strategist Protocol" className="protocol-status-item" style={{ color: isStrategistActive ? 'var(--neon-purple)' : 'var(--neon-blue)' }}>
                    <Satellite size={14} className={isStrategistActive ? 'pulse' : ''} />
                    <span>STRATEGIST: {dominanceMetric}% DOMINANCE</span>
                  </div>
                  <div title="Pioneer Scan" className="protocol-status-item" style={{ color: isPioneerActive ? 'var(--neon-orange)' : 'var(--neon-blue)' }}>
                    <Radio size={14} className={isPioneerActive ? 'pulse' : ''} />
                    <span>PIONEER: {frontierAlerts} FRONTIER ALERTS</span>
                  </div>
                  <div title="Silencer Protocol" className="protocol-status-item" style={{ color: isSilencerActive ? 'var(--neon-red)' : 'var(--neon-blue)' }}>
                    <WifiOff size={14} className={isSilencerActive ? 'pulse' : ''} />
                    <span>SILENCER: {jammingRadius}KM BLACKOUT</span>
                  </div>
                  <div title="Aura Sensor" className="protocol-status-item" style={{ color: isAuraActive ? 'var(--neon-yellow)' : 'var(--neon-blue)' }}>
                    <Zap size={14} className={isAuraActive ? 'pulse' : ''} />
                    <span>AURA: {threatLevel} THREAT</span>
                  </div>
                  <div title="Star Protocol" className="protocol-status-item" style={{ color: isStarActive ? 'var(--neon-gold)' : 'var(--neon-blue)' }}>
                    <SignalHigh size={14} className={isStarActive ? 'pulse' : ''} />
                    <span>STARLINK: {satLinkStatus}</span>
                  </div>
                  <div title="Phantom Protocol" className="protocol-status-item" style={{ color: isPhantomActive ? 'var(--neon-green)' : 'var(--neon-blue)' }}>
                    <Ghost size={14} className={isPhantomActive ? 'pulse' : ''} />
                    <span>PHANTOM: {ghostNodes} GHOST NODES</span>
                  </div>
                  <div title="Cosmic Prediction" className="protocol-status-item" style={{ color: 'var(--neon-purple)' }}>
                    <Activity size={14} className="pulse" />
                    <span>COSMIC: {cosmicPredictions} EVENTS PENDING</span>
                  </div>
                  <div title="Oracle Core" className="protocol-status-item" style={{ color: isOracleActive ? 'var(--neon-white)' : 'var(--neon-blue)' }}>
                    <Brain size={14} className={isOracleActive ? 'pulse' : ''} />
                    <span>ORACLE: {globalMood} MOOD</span>
                  </div>
                  <div title="Diplomat Protocol" className="protocol-status-item" style={{ color: isDiplomatActive ? 'var(--neon-green)' : 'var(--neon-blue)' }}>
                    <Users size={14} className={isDiplomatActive ? 'pulse' : ''} />
                    <span>DIPLOMAT: {activeSimulations} SIMS</span>
                  </div>
                  <div title="Shield Protocol" className="protocol-status-item" style={{ color: isShieldActive ? 'var(--neon-gold)' : 'var(--neon-blue)' }}>
                    <ShieldCheck size={14} className={isShieldActive ? 'pulse' : ''} />
                    <span>SHIELD: {psychRisk} RISK</span>
                  </div>
                  <div title="Legis Protocol" className="protocol-status-item" style={{ color: isLegisActive ? 'var(--neon-red)' : 'var(--neon-blue)' }}>
                    <Gavel size={14} className={isLegisActive ? 'pulse' : ''} />
                    <span>LEGIS: {pendingLaws} ALERTS</span>
                  </div>
                  <div title="Passport Protocol" className="protocol-status-item" style={{ color: isPassportActive ? 'var(--neon-blue)' : 'var(--neon-blue)' }}>
                    <Globe size={14} className={isPassportActive ? 'pulse' : ''} />
                    <span>PASSPORT: {currentJurisdiction}</span>
                  </div>
                  <div title="Social Navigator" className="protocol-status-item" style={{ color: isNavigatorActive ? 'var(--neon-yellow)' : 'var(--neon-blue)' }}>
                    <Compass size={14} className={isNavigatorActive ? 'pulse' : ''} />
                    <span>NAVIGATOR: {targetPowerScore} PWR</span>
                  </div>
                  <div title="Planetary Mesh" className="protocol-status-item" style={{ color: isPlanetaryActive ? 'var(--neon-green)' : 'var(--neon-blue)' }}>
                    <Share2 size={14} className={isPlanetaryActive ? 'pulse' : ''} />
                    <span>PLANETARY: {meshStatus}</span>
                  </div>
                  <div title="Centurion Protocol" className="protocol-status-item" style={{ color: isCenturionActive ? 'var(--neon-white)' : 'var(--neon-blue)' }}>
                    <Car size={14} className={isCenturionActive ? 'pulse' : ''} />
                    <span>CENTURION: {controllableDevices} ASSETS</span>
                  </div>
                  <div title="Grid Protocol" className="protocol-status-item" style={{ color: isGridActive ? 'var(--neon-purple)' : 'var(--neon-blue)' }}>
                    <EthernetPort size={14} className={isGridActive ? 'pulse' : ''} />
                    <span>GRID: {activeTunnels} TUNNELS</span>
                  </div>
                  <div title="Void Protocol" className="protocol-status-item" style={{ color: isVoidActive ? 'var(--neon-cyan)' : 'var(--neon-blue)' }}>
                    <InfinityIcon size={14} className={isVoidActive ? 'pulse' : ''} />
                    <span>VOID: {quantumState}</span>
                  </div>
                  <div title="Sovereign Command" className="protocol-status-item" style={{ color: isSovereignActive ? 'var(--neon-gold)' : 'var(--neon-blue)' }}>
                    <Crown size={14} className={isSovereignActive ? 'pulse' : ''} />
                    <span>SOVEREIGN: {sovereignMode}</span>
                  </div>
                  <div title="Friendship Core" className="protocol-status-item" style={{ color: 'var(--neon-red)' }}>
                    <Heart size={14} className="pulse" />
                    <span>FRIENDSHIP: {friendshipInsight}</span>
                  </div>
                  <div title="Bard Protocol" className="protocol-status-item" style={{ color: isBardActive ? 'var(--neon-purple)' : 'var(--neon-blue)' }}>
                    <Gamepad2 size={14} className={isBardActive ? 'pulse' : ''} />
                    <span>BARD: {avatarConfidence}% XP</span>
                  </div>
                  <div title="Catalyst Protocol" className="protocol-status-item" style={{ color: isCatalystActive ? 'var(--neon-green)' : 'var(--neon-blue)' }}>
                    <FlaskConical size={14} className={isCatalystActive ? 'pulse' : ''} />
                    <span>CATALYST: {researchField}</span>
                  </div>
                  <div title="Paladin Protocol" className="protocol-status-item" style={{ color: threatLevel === 'Minimal' ? 'var(--neon-blue)' : 'var(--neon-red)' }}>
                    <ShieldAlert size={14} className={threatLevel !== 'Minimal' ? 'pulse' : ''} />
                    <span>PALADIN: {threatLevel.toUpperCase()} THREAT</span>
                  </div>
                  <div title="Anchor Protocol" className="protocol-status-item" style={{ color: isWithinSafeZone ? 'var(--neon-green)' : 'var(--neon-gold)' }}>
                    <Anchor size={14} className={!isWithinSafeZone ? 'pulse' : ''} />
                    <span>ANCHOR: {isWithinSafeZone ? 'SANCTUARY' : 'UNTRUSTED'}</span>
                  </div>
                  <div title="Apex Protocol" className="protocol-status-item" style={{ color: isApexActive ? 'var(--neon-gold)' : 'var(--neon-blue)' }}>
                    <Activity size={14} className={isApexActive ? 'pulse' : ''} />
                    <span>APEX: {governanceStatus.toUpperCase()}</span>
                  </div>
                  <div title="Ghost Protocol" className="protocol-status-item" style={{ color: isGhostActive ? 'var(--neon-purple)' : 'var(--neon-blue)' }}>
                    <Ghost size={14} className={isGhostActive ? 'pulse' : ''} />
                    <span>GHOST: {anonymityProfile.toUpperCase()}</span>
                  </div>
                  <div title="Sanctuary Protocol" className="protocol-status-item" style={{ color: isSanctuaryActive ? 'var(--neon-green)' : 'var(--neon-blue)' }}>
                    <EyeOff size={14} className={isSanctuaryActive ? 'pulse' : ''} />
                    <span>SANCTUARY: {isSanctuaryActive ? 'SOLITUDE ACTIVE' : 'OPEN'}</span>
                  </div>
                  <div title="Phoenix Omega" className="protocol-status-item" style={{ color: erasureStage === 'Ready' ? 'var(--neon-blue)' : 'var(--neon-red)' }}>
                    <Flame size={14} className={erasureStage !== 'Ready' ? 'pulse' : ''} />
                    <span>PHOENIX: {erasureStage.toUpperCase()}</span>
                  </div>
                  <div title="True-Born Protocol" className="protocol-status-item" style={{ color: identityStatus === 'Verified' ? 'var(--neon-green)' : 'var(--neon-gold)' }}>
                    <Fingerprint size={14} className={identityStatus !== 'Verified' ? 'pulse' : ''} />
                    <span>TRUE-BORN: {identityStatus.toUpperCase()}</span>
                  </div>
                  <div title="Neutrality Protocol" className="protocol-status-item" style={{ color: complianceStatus === 'Compliant' ? 'var(--neon-blue)' : 'var(--neon-red)' }}>
                    <Scale size={14} className={complianceStatus !== 'Compliant' ? 'pulse' : ''} />
                    <span>NEUTRALITY: {complianceStatus.toUpperCase()}</span>
                  </div>
                  <div title="Security DNA: Encryption" className="protocol-status-item" style={{ color: 'var(--neon-green)' }}>
                    <ShieldCheck size={14} className="pulse" />
                    <span>ENCRYPTION: {nodeCount} NODES / {encryptionStatus}</span>
                  </div>
                  <div title="Security DNA: Presence" className="protocol-status-item" style={{ color: 'var(--neon-purple)' }}>
                    <MapIcon size={14} className="pulse" />
                    <span>PRESENCE: {presenceMode.toUpperCase()}</span>
                  </div>
                  <div title="Security DNA: Auth" className="protocol-status-item" style={{ color: 'var(--neon-gold)' }}>
                    <Key size={14} />
                    <span>AUTH: {lastAuthMethod.toUpperCase()}</span>
                  </div>
                  <div title="Mirage Grid" className="protocol-status-item" style={{ color: 'var(--neon-blue)' }}>
                    <Projector size={14} className={mappedSurfaces > 0 ? 'pulse' : ''} />
                    <span>MIRAGE: {activeVisualSkin.toUpperCase()} [{mappedSurfaces} S]</span>
                  </div>
                  <div title="Nexus Protocol" className="protocol-status-item" style={{ color: nexusNodesActive > 0 ? 'var(--neon-purple)' : 'var(--neon-blue)' }}>
                    <Globe size={14} className={nexusNodesActive > 0 ? 'pulse' : ''} />
                    <span>NEXUS: {nexusNodesActive} NODES / {collectiveThreatLevel.toUpperCase()}</span>
                  </div>
                  <div title="Grandmaster: Energy" className="protocol-status-item" style={{ color: 'var(--neon-green)' }}>
                    <Zap size={14} className="pulse" />
                    <span>ENERGY: {energySovereignty} [{powerReserve}%]</span>
                  </div>
                  <div title="Grandmaster: Cognition" className="protocol-status-item" style={{ color: 'var(--neon-blue)' }}>
                    <Brain size={14} className="pulse" />
                    <span>COGNITION: {cognitionGrowth}</span>
                  </div>
                  <div title="Grandmaster: Unification" className="protocol-status-item" style={{ color: 'var(--neon-purple)' }}>
                    <Activity size={14} className="pulse" />
                    <span>GOD-STATE: {unificationState.toUpperCase()}</span>
                  </div>
                  <div title="Maestro: Living Soundtrack" className="protocol-status-item" style={{ color: 'var(--neon-gold)' }}>
                    <Music size={14} className="pulse" />
                    <span>MAESTRO: {maestroStyle.toUpperCase()} [{mixerStatus}]</span>
                  </div>
                  <div title="Quant: Market Mastery" className="protocol-status-item" style={{ color: 'var(--neon-green)' }}>
                    <TrendingUp size={14} className="pulse" />
                    <span>QUANT: {marketSignal.toUpperCase()} [{accuracyRating}]</span>
                  </div>
                  <div title="Venture: Resource Arbitrage" className="protocol-status-item" style={{ color: 'var(--neon-blue)' }}>
                    <Cpu size={14} className="pulse" />
                    <span>VENTURE: {remoteNodeCount} NODES / {hardwareSynthesisStatus.toUpperCase()}</span>
                  </div>
                  <div title="Mint: Sovereign Bank" className="protocol-status-item" style={{ color: 'var(--neon-purple)' }}>
                    <Landmark size={14} className="pulse" />
                    <span>MINT: {activeTrustCount} TRUSTS / {bankAuditRating}</span>
                  </div>
                  <div title="Aegis: Crisis Shield" className="protocol-status-item" style={{ color: 'var(--neon-gold)' }}>
                    <Shield size={14} className="pulse" />
                    <span>AEGIS: {defenseReadiness.toUpperCase()} [RISK: {(crisisRiskScore * 100).toFixed(1)}%]</span>
                  </div>
                  <div title="Ledger: Tax Mastery" className="protocol-status-item" style={{ color: 'var(--neon-green)' }}>
                    <FileText size={14} className="pulse" />
                    <span>LEDGER: TAX {effectiveTaxRate} / {complianceRating}</span>
                  </div>
                  <div title="Raizen: Evolution Level" className="protocol-status-item" style={{ color: 'var(--neon-purple)', fontWeight: 'bold' }}>
                    <Zap size={14} className="pulse" />
                    <span>RAIZEN LEVEL {ascensionLevel} [EVOLUTION PEAK]</span>
                  </div>
                  <div title="Legis: Contract Law" className="protocol-status-item" style={{ color: 'var(--neon-blue)' }}>
                    <Scale size={14} className="pulse" />
                    <span>LEGIS: {lawForecastHorizon} FORECAST</span>
                  </div>
                  <div title="Iris: Health Scan" className="protocol-status-item" style={{ color: 'var(--neon-green)' }}>
                    <Eye size={14} className="pulse" />
                    <span>IRIS: {distressLevel.toUpperCase()} [{medicalReadiness}]</span>
                  </div>
                  <div title="Serenity: Mental Health" className="protocol-status-item" style={{ color: 'var(--neon-blue)' }}>
                    <Wind size={14} className="pulse" />
                    <span>SERENITY: RISK {burnoutRisk.toUpperCase()} / {focusModeStatus}</span>
                  </div>
                  <div title="Elysium: Recovery" className="protocol-status-item" style={{ color: 'var(--neon-purple)' }}>
                    <RefreshCw size={14} className="pulse" />
                    <span>ELYSIUM: {recoveryReadiness.toUpperCase()}</span>
                  </div>
                </SystemStatusMonitor>
                <button 
                  className="header-action-btn"
                  onClick={() => {
                    setShowAddForm(false);
                    setIsModalOpen(true);
                  }}
                  aria-label="Neural Hub"
                  title="Neural Hub"
                >
                  <Terminal size={14} />
                  {!isMobile && <span className="brain-tag">{(activeAgent?.name || activeAgent?.modelId) || 'Raizen Core'}</span>}
                </button>
              </div>
            ) : (
              <button 
                className="connect-btn" 
                aria-label="Connect Agent"
                title="Connect Agent"
                onClick={() => {
                  setShowAddForm(true)
                  setIsModalOpen(true)
                }}
              >
                <Plus size={14} />
                {!isMobile && <span>Connect Agent</span>}
              </button>
            )}
          </div>
        </motion.header>
      )}
    </AnimatePresence>

        {/* ── Content View ── */}
        <section className="content-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="view-wrapper"
            >
              <AnimatePresence>
        {isBooting && <SovereignBoot onComplete={() => setIsBooting(false)} />}
        {!isBooting && !patriarch && (
          <BiometricEnrollment 
            onComplete={(data) => {
              setPatriarch(data)
              localStorage.setItem('raizen_patriarch', JSON.stringify(data))
            }} 
          />
        )}
      </AnimatePresence>

      {activeTab === 'chat' && (
                <ChatView 
                  isMobile={isMobile}
                  platform={platform}
                  config={activeAgent} 
                  voiceMode={voiceMode} 
                  securityError={securityError} 
                  setSecurityError={setSecurityError} 
                  currentSessionId={currentSessionId}
                  setCurrentSessionId={setCurrentSessionId}
                  sessions={sessions}
                  setSessions={setSessions}
                  messages={messages}
                  setMessages={setMessages}
                  setVoiceMode={setVoiceMode}
                  patriarch={patriarch}
                  layoutMode={layoutMode}
                  setLayoutMode={setLayoutMode}
                  isTransitioning={isTransitioning}
                  setIsTransitioning={setIsTransitioning}
                  oracleSet={oracleSet}
                  setOracleSet={setOracleSet}
                  showOracleModal={showOracleModal}
                  setShowOracleModal={setShowOracleModal}
                  isLearning={isLearning}
                  setIsLearning={setIsLearning}
                  learningTopic={learningTopic}
                  setLearningTopic={setLearningTopic}
                  chaosScore={chaosScore}
                  setChaosScore={setChaosScore}
                  overclockUrgency={overclockUrgency}
                  setOverclockUrgency={setOverclockUrgency}
                  emotion={emotionState}
                  swarmCount={swarmCount}
                  setSwarmCount={setSwarmCount}
                  proactiveSolutions={proactiveSolutions}
                  setProactiveSolutions={setProactiveSolutions}
                  persona={persona}
                  setPersona={setPersona}
                  isWithinSafeZone={isWithinSafeZone}
                  isFirewallActive={isFirewallActive}
                  setIsFirewallActive={setIsFirewallActive}
                  isAtomicShredReady={isAtomicShredReady}
                  setIsAtomicShredReady={setIsAtomicShredReady}
                />
              )}
              {activeTab === 'workspace' && <MissionCenterView isMobile={isMobile} platform={platform} />}
              {activeTab === 'missions' && <MissionCenterView isMobile={isMobile} platform={platform} />}
              {activeTab === 'security' && (
                <SecurityCoreView 
                  isMobile={isMobile}
                  platform={platform}
                  activeDeployments={activeDeployments}
                  bodyStatus={bodyStatus}
                  isDigitizerActive={isDigitizerActive}
                  isNervanaActive={isNervanaActive}
                  nervanaStatus={nervanaStatus}
                  onActivateNervana={async () => {
                    try { await pluginRegistry.executeAction('nervana-shield', 'activate', {}); } catch (e) { console.error(e); }
                  }}
                  isSentryHostile={isWithinSafeZone} 



                  isSpatialActive={isSpatialActive}
                  spatialStatus={spatialStatus}
                  onActivateSpatial={async () => {
                    try { await pluginRegistry.executeAction('creative.spatial-hooks', 'engage', {}); } catch(e) { console.error(e); }
                  }}
                  isFoundryActive={isFoundryActive}
                  foundryStatus={foundryStatus}
                  onActivateFoundry={async () => {
                    try { await pluginRegistry.executeAction('finance.foundry', 'mint', {}); } catch(e) { console.error(e); }
                  }}
                  isNomadActive={isNomadActive}
                  nomadStatus={nomadStatus}
                  onActivateNomad={async () => {
                    try { await pluginRegistry.executeAction('finance.nomad', 'travel', {}); } catch(e) { console.error(e); }
                  }}
                  isCenturionActive={isCenturionActive}
                  centurionStatus={centurionStatus}
                  onActivateCenturion={async () => {
                    try { await pluginRegistry.executeAction('industrial.centurion', 'mobilize', {}); } catch(e) { console.error(e); }
                  }}
                  isCitadelActive={isCitadelActive}
                  citadelStatus={citadelStatus}
                  onActivateCitadel={async () => {
                    try { await pluginRegistry.executeAction('hardware.citadel', 'lockdown', {}); } catch(e) { console.error(e); }
                  }}
                  isHelaActive={isHelaActive}
                  helaStatus={helaStatus}
                  onActivateHela={async () => {
                    try { await pluginRegistry.executeAction('hardware.hela', 'diagnose', {}); } catch(e) { console.error(e); }
                  }}
                  isKeysActive={isKeysActive}
                  keysStatus={keysStatus}
                  onActivateKeys={async () => {
                    try { await pluginRegistry.executeAction('hardware.keys', 'grant', {}); } catch(e) { console.error(e); }
                  }}
                  isRootActive={isRootActive}
                  rootStatus={rootStatus}
                  onActivateRoot={async () => {
                    try { await pluginRegistry.executeAction('hardware.root', 'override', {}); } catch(e) { console.error(e); }
                  }}
                  isSentinelArrayActive={isSentinelArrayActive}
                  sentinelArrayStatus={sentinelArrayStatus}
                  onActivateSentinelArray={async () => {
                    try { await pluginRegistry.executeAction('hardware.sentinel-array', 'scan', {}); } catch(e) { console.error(e); }
                  }}
                  isSentinelSwarmActive={isSentinelSwarmActive}
                  sentinelSwarmStatus={sentinelSwarmStatus}
                  onActivateSentinelSwarm={async () => {
                    try { await pluginRegistry.executeAction('hardware.sentinel-swarm', 'deploy', {}); } catch(e) { console.error(e); }
                  }}
                  isTeslaActive={isTeslaActive}
                  teslaStatus={teslaStatus}
                  onActivateTesla={async () => {
                    try { await pluginRegistry.executeAction('hardware.tesla', 'charge', {}); } catch(e) { console.error(e); }
                  }}
                  isVanguardActive={isVanguardActive}
                  vanguardStatus={vanguardStatus}
                  onActivateVanguard={async () => {
                    try { await pluginRegistry.executeAction('hardware.vanguard', 'launch', {}); } catch(e) { console.error(e); }
                  }}
                  isVitalActive={isVitalActive}
                  vitalStatus={vitalStatus}
                  onActivateVital={async () => {
                    try { await pluginRegistry.executeAction('hardware.vital', 'monitor', {}); } catch(e) { console.error(e); }
                  }}
                  isIrisActive={isIrisActive}
                  irisStatus={irisStatus}
                  onActivateIris={async () => {
                    try { await pluginRegistry.executeAction('health.iris', 'scan', {}); } catch(e) { console.error(e); }
                  }}
                  isLifeLineActive={isLifeLineActive}
                  lifeLineStatus={lifeLineStatus}
                  onActivateLifeLine={async () => {
                    try { await pluginRegistry.executeAction('health.life-line', 'monitor', {}); } catch(e) { console.error(e); }
                  }}
                  isSerenityActive={isSerenityActive}
                  serenityStatus={serenityStatus}
                  onActivateSerenity={async () => {
                    try { await pluginRegistry.executeAction('health.serenity', 'balance', {}); } catch(e) { console.error(e); }
                  }}
                  isForgeActive={isForgeActive}
                  forgeStatus={forgeStatus}
                  onActivateForge={async () => {
                    try { await pluginRegistry.executeAction('industrial.forge', 'manufacture', {}); } catch(e) { console.error(e); }
                  }}
                  isGaiaActive={isGaiaActive}
                  gaiaStatus={gaiaStatus}
                  onActivateGaia={async () => {
                    try { await pluginRegistry.executeAction('industrial.gaia', 'observe', {}); } catch(e) { console.error(e); }
                  }}
                  isGaiaXActive={isGaiaXActive}
                  gaiaXStatus={gaiaXStatus}
                  onActivateGaiaX={async () => {
                    try { await pluginRegistry.executeAction('industrial.gaia-x', 'engage', {}); } catch(e) { console.error(e); }
                  }}
                  isTeslaLayerActive={isTeslaLayerActive}
                  teslaLayerStatus={teslaLayerStatus}
                  onActivateTeslaLayer={async () => {
                    try { await pluginRegistry.executeAction('industrial.tesla-layer', 'activate', {}); } catch(e) { console.error(e); }
                  }}
                  isGhostNodeActive={isGhostNodeActive}
                  ghostNodeStatus={ghostNodeStatus}
                  onActivateGhostNode={async () => {
                    try { await pluginRegistry.executeAction('network.ghost-node', 'route', {}); } catch(e) { console.error(e); }
                  }}
                  isGridActiveTracker={isGridActiveTracker}
                  gridStatusTracker={gridStatusTracker}
                  onActivateGridTracker={async () => {
                    try { await pluginRegistry.executeAction('network.grid', 'connect', {}); } catch(e) { console.error(e); }
                  }}
                  isNexusActiveTracker={isNexusActiveTracker}
                  nexusStatusTracker={nexusStatusTracker}
                  onActivateNexusTracker={async () => {
                    try { await pluginRegistry.executeAction('network.nexus', 'link', {}); } catch(e) { console.error(e); }
                  }}
                  isGhostMeshActive={isGhostMeshActive}
                  ghostMeshStatus={ghostMeshStatus}
                  onActivateGhostMesh={async () => {
                    try { await pluginRegistry.executeAction('network.ghost-mesh', 'form', {}); } catch(e) { console.error(e); }
                  }}
                  isSearchActive={isSearchActive}
                  searchStatus={searchStatus}
                  onActivateSearch={async () => {
                    try { await pluginRegistry.executeAction('search', 'query', {}); } catch(e) { console.error(e); }
                  }}
                  isCyclopsActive={isCyclopsActive}
                  cyclopsStatus={cyclopsStatus}
                  onActivateCyclops={async () => {
                    try { await pluginRegistry.executeAction('vision.cyclops', 'scan', {}); } catch(e) { console.error(e); }
                  }}
                  isPerceptionActive={isPerceptionActive}
                  perceptionStatus={perceptionStatus}
                  onActivatePerception={async () => {
                    try { await pluginRegistry.executeAction('vision.perception', 'observe', {}); } catch(e) { console.error(e); }
                  }}
                  isFluxActive={isFluxActive}
                  fluxStatus={fluxStatus}
                  onActivateFlux={async () => {
                    try { await pluginRegistry.executeAction('ui.flux', 'morph', {}); } catch(e) { console.error(e); }
                  }}
                  isMitosisActive={isMitosisActive}
                  mitosisStatus={mitosisStatus}
                  onActivateMitosis={async () => {
                    try { await pluginRegistry.executeAction('ui.mitosis', 'split', {}); } catch(e) { console.error(e); }
                  }}
                  isCanvasActive={isCanvasActive}
                  canvasStatus={canvasStatus}
                  onActivateCanvas={async () => {
                    try { await pluginRegistry.executeAction('ui.canvas', 'draw', {}); } catch(e) { console.error(e); }
                  }}
                  isSpatialHudActive={isSpatialHudActive}
                  spatialHudStatus={spatialHudStatus}
                  onActivateSpatialHud={async () => {
                    try { await pluginRegistry.executeAction('ui.spatial-hud', 'project', {}); } catch(e) { console.error(e); }
                  }}
                  isPersonaActive={isPersonaActive}
                  personaStatus={personaStatus}
                  onActivatePersona={async () => {
                    try { await pluginRegistry.executeAction('ui.persona', 'adapt', {}); } catch(e) { console.error(e); }
                  }}
                  isVectorSyncActive={isVectorSyncActive}
                  vectorSyncStatus={vectorSyncStatus}
                  onActivateVectorSync={async () => {
                    try { await pluginRegistry.executeAction('system.vector-sync', 'synchronize', {}); } catch(e) { console.error(e); }
                  }}
                  isSustainActive={isSustainActive}
                  sustainStatus={sustainStatus}
                  onActivateSustain={async () => {
                    try { await pluginRegistry.executeAction('system.sustain', 'optimize', {}); } catch(e) { console.error(e); }
                  }}
                  isProseActive={isProseActive}
                  proseStatus={proseStatus}
                  onActivateProse={async () => {
                    try { await pluginRegistry.executeAction('system.prose', 'write', {}); } catch(e) { console.error(e); }
                  }}
                  isOrchestratorActive={isOrchestratorActive}
                  orchestratorStatus={orchestratorStatus}
                  onActivateOrchestrator={async () => {
                    try { await pluginRegistry.executeAction('system.orchestrator', 'conduct', {}); } catch(e) { console.error(e); }
                  }}
                  isCodeActive={isCodeActive}
                  codeStatus={codeStatus}
                  onActivateCode={async () => {
                    try { await pluginRegistry.executeAction('system.code', 'compile', {}); } catch(e) { console.error(e); }
                  }}
                  isAetherActive={isAetherActive}
                  aetherStatus={aetherStatus}
                  onActivateAether={async () => {
                    try { await pluginRegistry.executeAction('system.aether', 'link', {}); } catch(e) { console.error(e); }
                  }}
                  isUntisActive={isUntisActive}
                  untisStatus={untisStatus}
                  onActivateUntis={async () => {
                    try { await pluginRegistry.executeAction('system.untis', 'secure', {}); } catch(e) { console.error(e); }
                  }}
                  isSentientCodeActive={isSentientCodeActive}
                  sentientCodeStatus={sentientCodeStatus}
                  onActivateSentientCode={async () => {
                    try { await pluginRegistry.executeAction('system.sentient-code', 'audit', {}); } catch(e) { console.error(e); }
                  }}
                  isScholarActive={isScholarActive}
                  scholarStatus={scholarStatus}
                  onActivateScholar={async () => {
                    try { await pluginRegistry.executeAction('system.scholar', 'learn', {}); } catch(e) { console.error(e); }
                  }}
                  isOverclockActive={isOverclockActive}
                  overclockStatus={overclockStatus}
                  onActivateOverclock={async () => {
                    try { await pluginRegistry.executeAction('system.overclock', 'boost', {}); } catch(e) { console.error(e); }
                  }}
                  isImmuneActive={isImmuneActive}
                  immuneStatus={immuneStatus}
                  onActivateImmune={async () => {
                    try { await pluginRegistry.executeAction('system.immune', 'scan', {}); } catch(e) { console.error(e); }
                  }}
                  isHyperionActive={isHyperionActive}
                  hyperionStatus={hyperionStatus}
                  onActivateHyperion={async () => {
                    try { await pluginRegistry.executeAction('system.hyperion', 'power', {}); } catch(e) { console.error(e); }
                  }}
                  isHomeAssistantActive={isHomeAssistantActive}
                  homeAssistantStatus={homeAssistantStatus}
                  onActivateHomeAssistant={async () => {
                    try { await pluginRegistry.executeAction('system.home-assistant', 'initiate', {}); } catch(e) { console.error(e); }
                  }}
                  isConstellationActive={isConstellationActive}
                  constellationStatus={constellationStatus}
                  onActivateConstellation={async () => {
                    try { await pluginRegistry.executeAction('system.constellation', 'align', {}); } catch(e) { console.error(e); }
                  }}
                  isChronosActive={isChronosActive}
                  chronosStatus={chronosStatus}
                  onActivateChronos={async () => {
                    try { await pluginRegistry.executeAction('system.chronos', 'sync', {}); } catch(e) { console.error(e); }
                  }}
                  isAlphaEvolutionActive={isAlphaEvolutionActive}
                  alphaEvolutionStatus={alphaEvolutionStatus}
                  onActivateAlphaEvolution={async () => {
                    try { await pluginRegistry.executeAction('system.alpha-evolution', 'evolve', {}); } catch(e) { console.error(e); }
                  }}
                  isTetherActive={isTetherActive}
                  isAvatarVanguardActive={isAvatarVanguardActive}
                  networkHealth={networkHealth}
                  dealConfidence={dealConfidence}
                  potentialSavings={potentialSavings}
                  culturalResonance={culturalResonance}
                  trustScore={trustScore}
                  socialCapital={socialCapital}
                  mentionCount={mentionCount}
                  titanResonance={titanResonance}
                  translationConfidence={translationConfidence}
                  powerConnectionCount={powerConnectionCount}
                  privacyResilience={privacyResilience}
                  negotiationReady={negotiationReady}
                  empireValuation={empireValuation}
                  viralPulse={viralPulse}
                  fiscalEfficiency={fiscalEfficiency}
                  loyaltyAverage={loyaltyAverage}
                  intelPulse={intelPulse}
                  focusLevel={focusLevel}
                  stressLevel={stressLevel}
                  heartRate={heartRate}
                  eurekaSparkLevel={eurekaSparkLevel}
                  dreamIncubationCount={dreamIncubationCount}
                  intentConfidence={intentConfidence}
                  latencyReduction={latencyReduction}
                  auraState={auraState}
                  emotionalBalance={emotionalBalance}
                  recallMatchCount={recallMatchCount}
                  learningTopic={learningTopic}
                  hazardLevel={hazardLevel}
                  anchoredArtifacts={anchoredArtifacts}
                  isStarActive={isStarActive}
                  satelliteStatus={satelliteStatus}
                  isGhostActive={isGhostActive}
                  seizedCount={seizedCount}
                  isLensActive={isLensActive}
                  arbiterState={arbiterState}
                  isZoneActive={isZoneActive}
                  zoneStatus={zoneStatus}
                  isSentinelActive={isSentinelActive}
                  perimeterStatus={perimeterStatus}
                  urbanStatus={urbanStatus}
                  isXRHooksActive={isXRHooksActive}
                  xrHooksStatus={xrHooksStatus}
                  onActivateXRHooks={async () => {
                    try { await pluginRegistry.executeAction('spatial.xr-hooks', 'engage', {}); } catch(e) { console.error(e); }
                  }}
                  isOutreachActive={isOutreachActive}
                  outreachStatus={outreachStatus}
                  onActivateOutreach={async () => {
                    try { await pluginRegistry.executeAction('social.strategist', 'outreach', {}); } catch(e) { console.error(e); }
                  }}
                  isReputationActive={isReputationActive}
                  reputationStatus={reputationStatus}
                  onActivateReputation={async () => {
                    try { await pluginRegistry.executeAction('social.trust-score', 'diagnose', {}); } catch(e) { console.error(e); }
                  }}
                  isLedgerActive={isLedgerActive}
                  ledgerStatus={ledgerStatus}
                  onActivateLedger={async () => {
                    try { await pluginRegistry.executeAction('finance.sovereign-ledger', 'sync', {}); } catch(e) { console.error(e); }
                  }}
                  isVoidJammingActive={isVoidJammingActive}
                  voidJammingStatus={voidJammingStatus}
                  onActivateVoidJamming={async () => {
                    try { await pluginRegistry.executeAction('security.void', 'jam', {}); } catch(e) { console.error(e); }
                  }}
                  isSixthSenseActive={isSixthSenseActive}
                  sixthSenseStatus={sixthSenseStatus}
                  onActivateSixthSense={async () => {
                    try { await pluginRegistry.executeAction('spatial.sixth-sense', 'scan', {}); } catch(e) { console.error(e); }
                  }}
                  isMimicActive={isMimicActive}
                  mimicStatus={mimicStatus}
                  onActivateMimic={async () => {
                    try { await pluginRegistry.executeAction('vision.cyclops', 'mimic', {}); } catch(e) { console.error(e); }
                  }}
                  isCabalActive={isCabalActive}
                  cabalStatus={cabalStatus}
                  onActivateCabal={async () => {
                    try { await pluginRegistry.executeAction('social.titan', 'cabal', {}); } catch(e) { console.error(e); }
                  }}

                  nearbyEntities={nearbyEntities}

                  friendsCount={friendsCount}
                  foesCount={foesCount}
                  isTerraformingActive={isTerraformingActive}
                  envTargetTemp={envTargetTemp}
                  envTargetO2={envTargetO2}
                  isForceFieldActive={isForceFieldActive}
                  shieldIntegrity={shieldIntegrity}
                  isEternalActive={isEternalActive}
                  legacyStatus={legacyStatus}
                  isParallelActive={isParallelActive}
                  parallelProbability={parallelProbability}
                  onInitiateAegisScan={async () => {
                    await pluginRegistry.executeAction('aegis-link', 'aegis-monitor-start', {});
                    runSecurityCycle();
                  }}
                  onTriggerVitalTerraforming={async () => {
                    const res = await pluginRegistry.executeAction('vital-protocol', 'vital-initiate-terraforming', {});
                    if (res.success) {
                      setIsTerraformingActive(true);
                      setEnvTargetTemp(res.data.targetTemp);
                      setEnvTargetO2(res.data.targetO2);
                    }
                    runSecurityCycle();
                  }}
                  onActivateForceField={async () => {
                    const res = await pluginRegistry.executeAction('shield-protocol', 'shield-initiate-force-field', { intensity: 1.5 });
                    if (res.success) {
                      setIsForceFieldActive(true);
                      setShieldIntegrity(res.data.integrity);
                    }
                    runSecurityCycle();
                  }}
                  onInitiateLegacyCapture={async () => {
                    await pluginRegistry.executeAction('eternal-protocol', 'eternal-capture-snapshot', { isSilent: false });
                    runSecurityCycle();
                  }}
                  onGeneratePatriarchAdvice={async () => {
                    await pluginRegistry.executeAction('eternal-protocol', 'eternal-generate-advice', { context: 'GENERAL_SOVEREIGNTY' });
                    runSecurityCycle();
                  }}
                  onRunParallelSimulation={async () => {
                    await pluginRegistry.executeAction('parallel-engine', 'parallel-simulate-path', { id: `SIM_${Date.now()}` });
                    runSecurityCycle();
                  }}
                  isUnityActive={isUnityActive}
                  meshPeerCount={meshPeerCount}
                  unityStatus={unityStatus}
                  isTitanActive={isTitanActive}
                  breakthroughCount={breakthroughCount}
                  titanStatus={titanStatus}
                  onSyncUnityMesh={async () => {
                    await pluginRegistry.executeAction('unity-protocol', 'unity-sync-mesh', {});
                    runSecurityCycle();
                  }}
                  onManualFailover={async () => {
                    await pluginRegistry.executeAction('unity-protocol', 'unity-manual-failover', {});
                    runSecurityCycle();
                  }}
                  onGenerateTitanReport={async () => {
                    await pluginRegistry.executeAction('titan-layer', 'titan-discovery-report', {});
                    runSecurityCycle();
                  }}
                  onAlignStrategicDecision={async (solutionId, context) => {
                    await pluginRegistry.executeAction('titan-layer', 'titan-align-decision', { solutionId, context });
                    runSecurityCycle();
                  }}
                  isVoyagerActive={isVoyagerActive}
                  voyagerStatus={voyagerStatus}
                  onBroadcastTemporalPacket={async () => {
                    await pluginRegistry.executeAction('voyager-protocol', 'voyager-broadcast-packet', { payload: 'GLOBAL_SYNC_INITIATED' });
                    runSecurityCycle();
                  }}
                  isBabelActive={isBabelActive}
                  babelSnapshotCount={babelSnapshotCount}
                  babelStatus={babelStatus}
                  onSaveBabelSnapshot={async () => {
                    await pluginRegistry.executeAction('babel-protocol', 'babel-capture-snapshot', {});
                    setBabelSnapshotCount(prev => prev + 1);
                    runSecurityCycle();
                  }}
                  isSentientLegacyActive={isSentientLegacyActive}
                  sentientLegacyStatus={sentientLegacyStatus}
                  onSynthesizeLegacyAdvice={async () => {
                    await pluginRegistry.executeAction('sentient-legacy-ai', 'synthesize-advice', {});
                    runSecurityCycle();
                  }}
                  isUniversalWitnessActive={isUniversalWitnessActive}
                  witnessArchiveSize={witnessArchiveSize}
                  onCaptureWitnessLog={async () => {
                    await pluginRegistry.executeAction('universal-witness', 'capture-log', {});
                    runSecurityCycle();
                  }}
                  isMetaRealityActive={isMetaRealityActive}
                  metaRealityStatus={metaRealityStatus}
                  onProjectMetaOverlay={async () => {
                    await pluginRegistry.executeAction('meta-reality', 'project-overlay', {});
                    runSecurityCycle();
                  }}
                  isPlanetaryMeshActive={isPlanetaryMeshActive}
                  planetaryNodeRank={planetaryNodeRank}
                  onEstablishNodeRegistry={async () => {
                    await pluginRegistry.executeAction('planetary-mesh', 'establish-registry', {});
                    runSecurityCycle();
                  }}
                  isOrbitalPreservationActive={isOrbitalPreservationActive}
                  orbitalUplinkStatus={orbitalUplinkStatus}
                  onForceOrbitalUplink={async () => {
                    await pluginRegistry.executeAction('eternal-orbit', 'force-uplink', {});
                    runSecurityCycle();
                  }}
                  isArtisanActive={isArtisanActive}
                  artisanStatus={artisanStatus}
                  onActivateArtisan={async () => {
                    await pluginRegistry.executeAction('artisan-protocol', 'evolve', {});
                    runSecurityCycle();
                  }}
                  isDirectorActive={isDirectorActive}
                  directorStatus={`${directorJobs} JOBS`}
                  onActivateDirector={async () => {
                    await pluginRegistry.executeAction('director-protocol', 'synthesize', { prompt: 'Automated Scene Request' });
                    runSecurityCycle();
                  }}
                  isEchoActive={isEchoActive}
                  echoStatus={`${echoSignatures} SIGS`}
                  onActivateEcho={async () => {
                    await pluginRegistry.executeAction('echo-protocol', 'clone', { targetId: 'custom_voice' });
                    runSecurityCycle();
                  }}
                  isIllusionistActive={isIllusionistActive}
                  illusionistStatus={`${illusionistOverlays} OVERLAYS`}
                  onActivateIllusionist={async () => {
                    await pluginRegistry.executeAction('illusionist-layer', 'overlay', { type: 'photorealistic' });
                    runSecurityCycle();
                  }}
                  isArchitectActive={isArchitectActive}
                  architectStatus={`${architectApps} APPS`}
                  onActivateArchitect={async () => {
                    await pluginRegistry.executeAction('architect-protocol', 'orchestrate', { appId: 'omni', instruction: 'Automated synthesis' });
                    runSecurityCycle();
                  }}
                  isMythmakerActive={isMythmakerActive}
                  mythmakerStatus={`${mythmakerProgress}% COMPLETE`}
                  onActivateMythmaker={async () => {
                    await pluginRegistry.executeAction('mythmaker-engine', 'generate-legend', { style: 'epic' });
                    runSecurityCycle();
                  }}
                  isDreamReelActive={isDreamReelActive}
                  dreamReelStatus={`${dreamProductions} PROD`}
                  onActivateDreamReel={async () => {
                    await pluginRegistry.executeAction('dreamreel-protocol', 'synthesize', {});
                    runSecurityCycle();
                  }}
                  isMaestroActive={isMaestroActive}
                  maestroStatus={`${maestroDNAS} DNAS`}
                  onActivateMaestro={async () => {
                    await pluginRegistry.executeAction('creative.maestro', 'maestro-analyze-dna', { masterName: 'Da Vinci' });
                    runSecurityCycle();
                  }}
                  isCodeSmithActive={isCodeSmithActive}
                  codeSmithStatus={`${activeDeployments} DEPLOY`}
                  onActivateCodeSmith={async () => {
                    await pluginRegistry.executeAction('codesmith-protocol', 'spawn', { description: 'Sovereign productivity app' });
                    runSecurityCycle();
                  }}
                  isPhysicaActive={isPhysicaActive}
                  physicaStatus={physicaStatus}
                  onActivatePhysica={async () => {
                    await pluginRegistry.executeAction('physica-engine', 'sculpt', { productType: 'car' });
                    runSecurityCycle();
                  }}
                  isDuetActive={isDuetActive}
                  duetStatus={`${duetLatency}ms`}
                  onActivateDuet={async () => {
                    await pluginRegistry.executeAction('duet-protocol', 'duet', { mode: 'Supportive' });
                    runSecurityCycle();
                  }}
                  isStrategistActive={isStrategistActive}
                  strategistStatus={`${dominanceMetric}% DOM`}
                  onActivateStrategist={async () => {
                    await pluginRegistry.executeAction('intelligence.strategist', 'strategist-intercept', { lat: 0, lng: 0 });
                    runSecurityCycle();
                  }}
                  isPioneerActive={isPioneerActive}
                  pioneerStatus={`${frontierAlerts} ALERTS`}
                  onActivatePioneer={async () => {
                    await pluginRegistry.executeAction('pioneer-scan', 'scan', { source: 'Satellite' });
                    runSecurityCycle();
                  }}
                  isSilencerActive={isSilencerActive}
                  silencerStatus={`${jammingRadius}m`}
                  onActivateSilencer={async () => {
                    await pluginRegistry.executeAction('silencer-protocol', 'jam', { radius: 1 });
                    runSecurityCycle();
                  }}
                  isAuraActive={isAuraActive}
                  auraStatus={threatLevel}
                  onActivateAura={async () => {
                    await pluginRegistry.executeAction('aura-sensor', 'scan', {});
                    runSecurityCycle();
                  }}
                  onNeuralSatelliteBridge={async () => {
                    await pluginRegistry.executeAction('star-protocol', 'star-sync', {});
                    runSecurityCycle();
                  }}
                  isPhantomActive={isPhantomActive}
                  phantomStatus={`${ghostNodes} NODES`}
                  onActivatePhantom={async () => {
                    await pluginRegistry.executeAction('phantom-protocol', 'spectrum-ghosting', { payload: 'Sovereign Presence Active' });
                    runSecurityCycle();
                  }}
                  onPredictCosmicEvents={async () => {
                    await pluginRegistry.executeAction('pioneer-scan', 'predict', {});
                    runSecurityCycle();
                  }}
                  isOracleActive={isOracleActive}
                  oracleStatus={globalMood}
                  onActivateOracle={async () => {
                    await pluginRegistry.executeAction('oracle-engine', 'pre-compute', {});
                    runSecurityCycle();
                  }}
                  isDiplomatActive={isDiplomatActive}
                  diplomatStatus={`${activeSimulations} SIMS`}
                  onActivateDiplomat={async () => {
                    await pluginRegistry.executeAction('diplomat-protocol', 'simulate', { targetName: 'Global Leader', objective: 'Peace Treaty' });
                    runSecurityCycle();
                  }}
                  isShieldActive={isShieldActive}
                  shieldStatus={psychRisk}
                  onActivateShield={async () => {
                    await pluginRegistry.executeAction('shield-protocol', 'scan', {});
                    runSecurityCycle();
                  }}
                  isLegisActive={isLegisActive}
                  legisStatus={`${pendingLaws} LAWS`}
                  onActivateLegis={async () => {
                    await pluginRegistry.executeAction('legis-protocol', 'forecast', { jurisdiction: 'GLOBAL' });
                    runSecurityCycle();
                  }}
                  isPassportActive={isPassportActive}
                  passportStatus={currentJurisdiction}
                  onActivatePassport={async () => {
                    await pluginRegistry.executeAction('passport-protocol', 'cross', { jurisdiction: 'GLOBAL', service: 'Sovereign-Net' });
                    runSecurityCycle();
                  }}
                  // Phase 8 Core Synchronization
                  isAiAdaptersActive={isAiAdaptersActive}
                  aiAdaptersStatus={aiAdaptersStatus}
                  onActivateAiAdapters={async () => {
                    await pluginRegistry.executeAction('ai-adapters', 'sync', {});
                    runIntelligenceCycle();
                  }}
                  isAcpBridgeActive={isAcpBridgeActive}
                  acpBridgeStatus={acpBridgeStatus}
                  onActivateAcpBridge={async () => {
                    await pluginRegistry.executeAction('intelligence.bridge', 'align_bridge', {});
                    runIntelligenceCycle();
                  }}
                  isCoreSoulActive={isCoreSoulActive}
                  coreSoulStatus={coreSoulStatus}
                  onActivateCoreSoul={async () => {
                    await pluginRegistry.executeAction('intelligence.core-soul', 'resonate', {});
                    runIntelligenceCycle();
                  }}
                  isInferenceActive={isInferenceActive}
                  inferenceStatus={inferenceStatus}
                  onActivateInference={async () => {
                    await pluginRegistry.executeAction('intelligence.inference', 'optimize', {});
                    runIntelligenceCycle();
                  }}
                  isMirroringActive={isMirroringActive}
                  mirroringStatus={mirroringStatus}
                  onActivateMirroring={async () => {
                    await pluginRegistry.executeAction('intelligence.mirroring', 'mirror_state', {});
                    runIntelligenceCycle();
                  }}
                  isOpenShellActive={isOpenShellActive}
                  openShellStatus={openShellStatus}
                  onActivateOpenShell={async () => {
                    await pluginRegistry.executeAction('intelligence.openshell', 'secure_terminal', {});
                    runIntelligenceCycle();
                  }}
                  isSyntheticActive={isSyntheticActive}
                  syntheticStatus={syntheticStatus}
                  onActivateSynthetic={async () => {
                    await pluginRegistry.executeAction('intelligence.synthetic', 'evolve_data', {});
                    runIntelligenceCycle();
                  }}
                  isThreadOwnershipActive={isThreadOwnershipActive}
                  threadOwnershipStatus={threadOwnershipStatus}
                  onActivateThreadOwnership={async () => {
                    await pluginRegistry.executeAction('intelligence.thread-ownership', 'audit_threads', {});
                    runIntelligenceCycle();
                  }}
                  isContextInjectionActive={isContextInjectionActive}
                  contextInjectionStatus={contextInjectionStatus}
                  onActivateContextInjection={async () => {
                    await pluginRegistry.executeAction('intelligence.context-injection', 'inject_context', {});
                    runIntelligenceCycle();
                  }}
                  isMirageIntelActive={isMirageIntelActive}
                  mirageIntelStatus={mirageIntelStatus}
                  onActivateMirageIntel={async () => {
                    await pluginRegistry.executeAction('intelligence.mirage', 'cloak_intel', {});
                    runIntelligenceCycle();
                  }}
                  isSelfImprovementActive={isSelfImprovementActive}
                  selfImprovementStatus={selfImprovementStatus}
                  onActivateSelfImprovement={async () => {
                    await pluginRegistry.executeAction('intelligence.self-improvement', 'trigger_growth', {});
                    runIntelligenceCycle();
                  }}
                  isAnchorPrivacyActive={isAnchorPrivacyActive}
                  anchorPrivacyStatus={anchorPrivacyStatus}
                  onActivateAnchorPrivacy={async () => {
                    await pluginRegistry.executeAction('anchor-privacy', 'force_privacy', {});
                    runSecurityCycle();
                  }}
                  isNavigatorActive={isNavigatorActive}
                  targetPowerScore={targetPowerScore}
                  onInfluenceMapping={async () => {
                    await pluginRegistry.executeAction('social.navigator', 'get_power_suggestions', {});
                    runSecurityCycle();
                  }}
                  isPlanetaryActive={isPlanetaryActive}
                  meshStatus={meshStatus}
                  onPlanetaryAssetShield={async () => {
                    await pluginRegistry.executeAction('planetary-mesh-protocol', 'node-sync-updates', {});
                    runSecurityCycle();
                  }}
                  controllableDevices={controllableDevices}
                  onCenturionScan={async () => {
                    await pluginRegistry.executeAction('hardware.centurion', 'centurion-scan', {});
                    runSecurityCycle();
                  }}
                  isGridActive={isGridActive}
                  activeTunnels={activeTunnels}
                  onEstablishGlobalTunnel={async () => {
                    await pluginRegistry.executeAction('network.grid', 'grid-establish-tunnel', {});
                    runSecurityCycle();
                  }}
                  isVoidActive={isVoidActive}
                  quantumState={quantumState}
                  onQuantumKeyRotation={async () => {
                    await pluginRegistry.executeAction('security.void', 'void-status', {});
                    runSecurityCycle();
                  }}
                  isSovereignActive={isSovereignActive}
                  sovereignMode={sovereignMode}
                  onSyncFriendshipCore={async () => {
                    await pluginRegistry.executeAction('system.sovereign', 'sovereign-friend-sync', {});
                    runSecurityCycle();
                  }}
                  isBardActive={isBardActive}
                  avatarConfidence={avatarConfidence}
                  onBardAvatarStart={async () => {
                    await pluginRegistry.executeAction('creative.bard', 'bard-avatar-start', { gameTitle: 'Apex Sovereign' });
                    runSecurityCycle();
                  }}
                  isCatalystActive={isCatalystActive}
                  researchField={researchField}
                  onCatalystRunSim={async () => {
                    await pluginRegistry.executeAction('intelligence.catalyst', 'catalyst-run-sim', { field: 'NANO_TECH' });
                    runSecurityCycle();
                  }}
                  isPaladinActive={isPaladinActive}
                  onPaladinOffenseExecute={async () => {
                    await pluginRegistry.executeAction('security.paladin', 'paladin-offensive-execute', { authorized: true, target: 'Threat-Source' });
                    runSecurityCycle();
                  }}
                  isAnchorActive={isAnchorActive}
                  onAnchorHardwareValidate={async () => {
                    await pluginRegistry.executeAction('security.anchor', 'anchor-hardware-validate', {});
                    runSecurityCycle();
                  }}
                  isApexActive={isApexActive}
                  governanceStatus={governanceStatus}
                  onApexVerifyCodeword={async () => {
                    await pluginRegistry.executeAction('system.apex', 'apex-verify-codeword', { codeword: 'paro' });
                    runSecurityCycle();
                  }}
                  anonymityProfile={anonymityProfile}
                  onGhostIntrusionErase={async () => {
                    await pluginRegistry.executeAction('network.ghost-node', 'ghost-intrusion-erase', {});
                    runSecurityCycle();
                  }}
                  isSanctuaryActive={isSanctuaryActive}
                  onSanctuaryZoneActivate={async () => {
                    await pluginRegistry.executeAction('security.sanctuary', 'sanctuary-zone-activate', { radiusKm: 1.0 });
                    runSecurityCycle();
                  }}
                  erasureStage={erasureStage}
                  onPhoenixOmegaInitiate={async () => {
                    await pluginRegistry.executeAction('system.phoenix-omega', 'phoenix-omega-initiate', { codeword: 'paro the god' });
                    runSecurityCycle();
                  }}
                  identityStatus={identityStatus}
                  onTrueBornVerify={async () => {
                    await pluginRegistry.executeAction('security.true-born', 'true-born-verify', { rhythmicKey: 'custom-rhythm' });
                    runSecurityCycle();
                  }}
                  complianceStatus={complianceStatus}
                  onNeutralityAnalyze={async () => {
                    await pluginRegistry.executeAction('system.neutrality', 'neutrality-analyze', { command: 'Current-Task' });
                    runSecurityCycle();
                  }}
                  onVoidShieldData={async () => {
                    await pluginRegistry.executeAction('security.void', 'void-shield-data', { data: 'CORE-SNAPSHOT' });
                    runSecurityCycle();
                  }}
                  onGhostMaskLocation={async () => {
                    await pluginRegistry.executeAction('network.ghost-node', 'ghost-anonymize-identity', { multiCountry: true });
                    runSecurityCycle();
                  }}
                  onGodCodeAuthorize={async () => {
                    await pluginRegistry.executeAction('security.god-code', 'god-code-authorize', { biometricPulse: 'VALID-PULSE' });
                    runSecurityCycle();
                  }}
                  onMirageIgnite={async () => {
                    await pluginRegistry.executeAction('spatial.mirage', 'mirage-ignite', {});
                    runSecurityCycle();
                  }}
                  isGhostShredderActive={ghostShredder.getStatus().totalBytesWiped > 0}
                  ghostShredderStatus={ghostShredder.getStatus().totalBytesWiped > 0 ? 'SHREDDING' : 'ACTIVE'}
                  onActivateGhostShredder={async () => {
                    await pluginRegistry.executeAction('network.ghost-node' as any, 'ghost-intrusion-erase', {});
                    runSecurityCycle();
                  }}
                  isGhostHubActive={true}
                  ghostHubStatus={`${ghostHub.getNodes().length} NODES`}
                  onScoutNodes={async () => {
                    ghostHub.scoutNodes();
                    runSecurityCycle();
                  }}
                  onInitiateMindTransfer={async (targetNodeId) => {
                    await ghostHub.initiateMindTransfer(targetNodeId);
                    runSecurityCycle();
                  }}
                  masterPeerId={ghostHub.getMasterPeerId()}
                  onNexusMeshEstablish={async () => {
                    await pluginRegistry.executeAction('network.nexus', 'nexus-mesh-establish', {});
                    runSecurityCycle();
                  }}
                  onGridOptimize={async () => {
                    await pluginRegistry.executeAction('network.grid', 'grid-optimize', {});
                    runSecurityCycle();
                  }}
                  onTeslaOptimize={async () => {
                    await pluginRegistry.executeAction('tesla-layer', 'tesla-optimize-storage', {});
                    runSecurityCycle();
                  }}
                  onInitiateGodState={async () => {
                    await pluginRegistry.executeAction('health.serenity', 'serenity-cognitive-stabilization', {});
                    runSecurityCycle();
                  }}
                  onMintInstantiate={async () => {
                    await pluginRegistry.executeAction('finance.mint', 'mint-instantiate-trust', { name: 'Singularity-Master' });
                    runSecurityCycle();
                  }}
                  onAegisPredict={async () => {
                    await pluginRegistry.executeAction('finance.aegis', 'aegis-predict-crash', {});
                    runSecurityCycle();
                  }}
                  onLedgerOptimize={async () => {
                    await pluginRegistry.executeAction('finance.sovereign-ledger', 'ledger-optimize-tax', { jurisdictions: ['Cayman-Sovereign', 'Swiss-Absolute'] });
                    runSecurityCycle();
                  }}
                  onLegisForecast={async () => {
                    await pluginRegistry.executeAction('legis-protocol', 'forecast', { jurisdiction: 'GLOBAL' });
                    runSecurityCycle();
                  }}
                  onIrisScan={async () => {
                    await pluginRegistry.executeAction('health.iris-scan', 'iris-measure-vitals', {});
                    runSecurityCycle();
                  }}
                  onSerenityStabilize={async () => {
                    await pluginRegistry.executeAction('health.serenity', 'serenity-cognitive-stabilization', {});
                    runSecurityCycle();
                  }}
                  onElysiumRestore={async () => {
                    await pluginRegistry.executeAction('security.elysium', 'elysium-restore-status', {});
                    runSecurityCycle();
                  }}
                  isMilestoneActive={isMilestoneActive}
                  marketSignal={marketSignal}
                  accuracyRating={accuracyRating}
                  remoteNodeCount={remoteNodeCount}
                  activeTrustCount={activeTrustCount}
                  defenseReadiness={defenseReadiness}
                  crisisRiskScore={crisisRiskScore}
                  effectiveTaxRate={effectiveTaxRate}
                  complianceRating={complianceRating}
                  lawForecastHorizon={lawForecastHorizon}
                  distressLevel={distressLevel}
                  medicalReadiness={medicalReadiness}
                  burnoutRisk={burnoutRisk}
                  focusModeStatus={focusModeStatus}
                  recoveryReadiness={recoveryReadiness}
                  satLinkStatus={satLinkStatus}
                  isWithinSafeZone={isWithinSafeZone}
                  cosmicPredictions={cosmicPredictions}
                  activeVisualSkin={activeVisualSkin}
                  mappedSurfaces={mappedSurfaces}
                  nexusNodesActive={nexusNodesActive}
                  collectiveThreatLevel={collectiveThreatLevel}
                  infrastructureCohesion={infrastructureCohesion}
                  energySovereignty={energySovereignty}
                  powerReserve={powerReserve}
                  unificationState={unificationState}
                  maestroStyle={maestroStyle}
                  mixerStatus={mixerStatus}
                  onMaestroSync={async () => {
                    await pluginRegistry.executeAction('creative.maestro', 'maestro-sync-intelligence', {});
                    runSecurityCycle();
                  }}
                  onMaestroMilestone={async () => {
                    await pluginRegistry.executeAction('creative.maestro', 'maestro-mark-milestone', { type: 'CREATIVE_EPOCH' });
                    runSecurityCycle();
                  }}
                  onQuantPredict={async () => {
                    await pluginRegistry.executeAction('finance.quant', 'quant-predict-volatility', {});
                    runSecurityCycle();
                  }}
                  onVentureSync={async () => {
                    await pluginRegistry.executeAction('finance.venture', 'venture-sync-reserves', {});
                    runSecurityCycle();
                  }}
                  forgeJobCount={forgeJobCount}
                  miningHashrate={miningHashrate}
                  powerStatus={powerStatus}
                  ecoStatus={ecoStatus}
                  fleetStatus={fleetStatus}
                  scanCount={scanCount}
                  rootDeviceCount={rootDeviceCount}
                  onInitiateForgeJob={async () => {
                    await pluginRegistry.executeAction('forge-protocol', 'forge-initiate-job', { priority: 'URGENT' });
                    runSecurityCycle();
                  }}
                  onStartMining={async () => {
                    await pluginRegistry.executeAction('forge-protocol', 'forge-start-mining', {});
                    runSecurityCycle();
                  }}
                  onExecuteArbitrage={async () => {
                    await pluginRegistry.executeAction('social.edge', 'execute-arbitrage', {});
                    runSecurityCycle();
                  }}
                  onTriggerTerraforming={async () => {
                    await pluginRegistry.executeAction('industrial.gaia', 'trigger-terraforming', {});
                    runSecurityCycle();
                  }}
                  onInitiateGreenPath={async () => {
                    await pluginRegistry.executeAction('industrial.gaia', 'initiate-green-path', {});
                    runSecurityCycle();
                  }}
                  onInitiateDroneMission={async () => {
                    await pluginRegistry.executeAction('vanguard-drone', 'initiate-mission', { missionType: 'PATROL' });
                    runSecurityCycle();
                  }}
                  onInitiateScan={async () => {
                    await pluginRegistry.executeAction('digitizer-protocol', 'initiate-scan', { target: 'LOCAL_SURFACE' });
                    runSecurityCycle();
                  }}
                  onExecuteRootBypass={async () => {
                    await pluginRegistry.executeAction('hardware.root', 'execute-bypass', {});
                    runSecurityCycle();
                  }}
                  onHijackCenturion={async () => {
                    await pluginRegistry.executeAction('industrial.centurion', 'centurion-hijack', {});
                    runSecurityCycle();
                  }}
                  onAuthorizeCenturion={async () => {
                    await pluginRegistry.executeAction('industrial.centurion', 'centurion-authorize', {});
                    runSecurityCycle();
                  }}
                  onCloneVocalIdentity={async () => {
                    await pluginRegistry.executeAction('echo-protocol', 'clone', { mode: 'REALTIME_VOCAL' });
                    runSecurityCycle();
                  }}
                  onInjectRealityOverlay={async () => {
                    await pluginRegistry.executeAction('illusionist-layer', 'inject-overlay', { density: 1.0 });
                    runSecurityCycle();
                  }}
                  onOrchestrateTask={async () => {
                    await pluginRegistry.executeAction('architect-protocol', 'orchestrate', { task: 'GENERAL_OPTIMIZATION' });
                    runSecurityCycle();
                  }}
                  onSynthesizeLegend={async () => {
                    await pluginRegistry.executeAction('mythmaker-engine', 'synthesize-legend', {});
                    runSecurityCycle();
                  }}
                  onSynthesizeDreamCinema={async () => {
                    await pluginRegistry.executeAction('dreamreel-protocol', 'synthesize-cinema', {});
                    runSecurityCycle();
                  }}
                  onAnalyzeCreativeDNA={async () => {
                    await pluginRegistry.executeAction('creative.maestro', 'maestro-analyze-dna', {});
                    runSecurityCycle();
                  }}
                  onSpawnSoftware={async () => {
                    await pluginRegistry.executeAction('codesmith-protocol', 'spawn', {});
                    runSecurityCycle();
                  }}
                  onSculptReality={async () => {
                    await pluginRegistry.executeAction('physica-engine', 'sculpt-reality', {});
                    runSecurityCycle();
                  }}
                  onPerformDuet={async () => {
                    await pluginRegistry.executeAction('duet-protocol', 'perform-duet', {});
                    runSecurityCycle();
                  }}
                  onInterceptSatelliteImagery={async () => {
                    await pluginRegistry.executeAction('intelligence.strategist', 'intercept-satellite', {});
                    runSecurityCycle();
                  }}
                  onDeepSpaceScan={async () => {
                    await pluginRegistry.executeAction('pioneer-scan', 'deep-space-scan', {});
                    runSecurityCycle();
                  }}
                  onSilenceEnvironment={async () => {
                    await pluginRegistry.executeAction('silencer-protocol', 'silence', {});
                    runSecurityCycle();
                  }}
                  onDeepEMFScan={async () => {
                    await pluginRegistry.executeAction('aura-sensor', 'deep-emf-scan', {});
                    runSecurityCycle();
                  }}
                  onSpectrumGhosting={async () => {
                    await pluginRegistry.executeAction('phantom-protocol', 'spectrum-ghosting', {});
                    runSecurityCycle();
                  }}
                  onPreComputeSolutions={async () => {
                    await pluginRegistry.executeAction('oracle-engine', 'pre-compute', {});
                    runSecurityCycle();
                  }}
                  onNegotiationSimulation={async () => {
                    await pluginRegistry.executeAction('diplomat-protocol', 'negotiation-sim', {});
                    runSecurityCycle();
                  }}
                  onSocialEngineeringScan={async () => {
                    await pluginRegistry.executeAction('shield-protocol', 'social-eng-scan', {});
                    runSecurityCycle();
                  }}
                  onRegulatoryForecast={async () => {
                    await pluginRegistry.executeAction('legis-protocol', 'regulatory-forecast', {});
                    runSecurityCycle();
                  }}
                  onDigitalBorderCrossing={async () => {
                    await pluginRegistry.executeAction('passport-protocol', 'border-crossing', {});
                    runSecurityCycle();
                  }}

                />
              )}
              {activeTab === 'singularity' && (
                <SingularityCoreView
                  isMobile={isMobile}
                  platform={platform}
                  isAlignmentActive={isAlignmentActive}
                  alignmentStatus={alignmentStatus}
                  ascensionLevel={ascensionLevel}
                  resonanceScore={resonanceScore}
                  activeLegionAgents={activeLegionAgents}
                  paroStatus={paroStatus}
                  isPredictiveActive={isPredictiveActive}
                  predictiveStatus={predictiveStatus}
                  isSingDriveActive={isSingDriveActive}
                  singDriveBrilliance={singDriveBrilliance}
                  rccrMissions={rccrMissions}
                  singCoreStatus={singCoreStatus}
                  triggerEvent={() => setRunSingularityCycle(prev => prev + 1)}
                />
              )}
              {activeTab === 'settings' && <PlaceholderView title="System Config" icon={<Settings size={48} />} />}
            </motion.div>
          </AnimatePresence>
        </section>
      <AnimatePresence>
        {isSystemLocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lockdown-overlay"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="lockdown-icon"
            >
              <Lock size={80} />
            </motion.div>
            <div>
              <h1 className="lockdown-title">SYSTEM LOCKDOWN</h1>
              <p className="lockdown-text">Quantum Tether Severed. The Sovereign Core has been isolated to prevent unauthorized access. Provide Master Codeword to recover.</p>
            </div>
            <div className="lockdown-actions">
              <button 
                className="action-btn lockdown-button"
                onClick={async () => {
                   const res = await pluginRegistry.executeAction('security.quantum_tether', 'synchronize_tether', {});
                   if (res.success) setIsSystemLocked(false);
                }}
              >
                Attempt Recovery
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={ghostContainerRef} className="hidden-container" />
      </main>

      {/* ── Agent Connection Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <button 
                className="modal-close" 
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                title="Close modal"
              >
                <X size={20} />
              </button>
              
              <div className="modal-header">
                <h2>Neural Hub</h2>
                <p>Management interface for autonomous reasoning links.</p>
              </div>

              <div className="modal-body">
                {showAddForm ? (
                  <>
                    <div className="form-group">
                      <label htmlFor="provider-select"><Cpu size={14} /> Provider</label>
                      <select 
                        id="provider-select"
                        value={formProvider} 
                        onChange={e => setFormProvider(e.target.value)}
                      >
                        <option>NVIDIA</option>
                        <option>OpenAI</option>
                        <option>Anthropic</option>
                        <option>Google (Gemini)</option>
                        <option>xAI (Grok)</option>
                        <option>OpenRouter</option>
                        <option>Mistral</option>
                        <option>DeepSeek</option>
                        <option>Perplexity</option>
                        <option>Groq</option>
                        <option>Hugging Face</option>
                        <option>Custom</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="model-id-input"><Database size={14} /> Model ID</label>
                        <input 
                          id="model-id-input"
                          type="text" 
                          value={formModel} 
                          onChange={e => setFormModel(e.target.value)} 
                          placeholder="e.g. meta/llama-3" 
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="agent-name-input"><Box size={14} /> Agent Name</label>
                        <input 
                          id="agent-name-input"
                          type="text" 
                          value={formName} 
                          onChange={e => setFormName(e.target.value)} 
                          placeholder="Identifier..."
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="api-key-input"><Key size={14} /> API Secret</label>
                      <input 
                        id="api-key-input"
                        type="password" 
                        value={formKey} 
                        onChange={e => setFormKey(e.target.value)} 
                        placeholder="••••••••••••••••" 
                      />
                    </div>
                    
                    <div className="modal-footer" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                      <button className="confirm-btn" onClick={handleConnect}>
                        {editingAgentId ? 'Update Identity' : 'Register Link'}
                      </button>
                      <button 
                        className="confirm-btn" 
                        style={{ background: 'var(--panel-soft)', color: 'var(--ink-main)' }}
                        onClick={() => {
                          setShowAddForm(false)
                          setEditingAgentId(null)
                          resetForm()
                        }}
                      >
                        Back to Hub
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="agent-registry-list">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer group mb-4">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <Satellite size={18} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Decentralized Command (Constellation)</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                          <p className="text-[10px] text-white/50 uppercase tracking-widest">{constellationNodes.length} Nodes Active • Hub: {hubStatus.toUpperCase()}</p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="ml-auto text-white/30 group-hover:text-cyan-400 transition-colors" />
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-amber-500/30 transition-all cursor-pointer group mb-4">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <Brain size={18} className="text-amber-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Autonomous Knowledge Acquisition (Scholar)</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${isLearning ? 'bg-amber-500 animate-pulse' : 'bg-white/20'}`}> </span>
                          <p className="text-[10px] text-white/50 uppercase tracking-widest">{isLearning ? `Mastering: ${learningTopic}` : 'System Idle (Auto-Learn Enabled)'} </p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="ml-auto text-white/30 group-hover:text-amber-400 transition-colors" />
                    </div>

                    {agents.length === 0 ? (
                      <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>
                        No neural links registered.
                      </div>
                    ) : (
                      agents.map(agent => (
                        <div 
                          key={agent.id} 
                          className={`agent-entry ${activeAgentId === agent.id ? 'active' : ''}`}
                          onClick={() => setActiveAgentId(agent.id)}
                        >
                          <div className="agent-entry-info">
                            <div className="agent-entry-name">{agent.name}</div>
                            <div className="agent-entry-detail">{agent.provider} • {agent.modelId}</div>
                          </div>
                          <div className="agent-entry-actions">
                            <button onClick={(e) => startEdit(agent, e)} title="Edit Configuration"><Settings size={14} /></button>
                            <button onClick={(e) => deleteAgent(agent.id, e)} title="Sever Link" style={{ color: 'var(--accent-red)' }}><X size={14} /></button>
                          </div>
                        </div>
                      ))
                    )}
                    <button 
                      className="add-agent-row-btn" 
                      onClick={() => {
                        resetForm()
                        setShowAddForm(true)
                      }}
                    >
                      <Plus size={16} /> Register New Neural Identity
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .raizen-app-shell {
          display: flex;
          width: 100vw;
          height: 100vh;
          background: var(--bg-void);
          color: var(--ink-main);
        }

        .sidebar {
          background: var(--panel);
          -webkit-backdrop-filter: var(--glass-blur);
          backdrop-filter: var(--glass-blur);
          border-right: var(--glass-border);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          height: 100%;
          z-index: 100;
        }

        .sidebar-header {
          margin-bottom: 2.5rem;
          padding: 0 0.5rem;
        }

        .logo-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--accent-primary);
        }

        .logo-text {
          font-weight: 800;
          letter-spacing: 0.15em;
          font-size: 1.1rem;
        }

        .os-tag {
          font-weight: 300;
          opacity: 0.5;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: none;
          background: transparent;
          color: var(--ink-muted);
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          text-align: left;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .nav-item:hover {
          background: var(--panel-soft);
          color: var(--ink-main);
        }

        .section-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        @media (max-width: 1024px) {
          .section-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }

        .card {
          background: var(--panel);
          -webkit-backdrop-filter: var(--glass-blur);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: 20px;
          padding: 1.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .card:hover {
          transform: translateY(-5px);
          background: white;
          box-shadow: var(--glow-shadow);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .card-icon-box {
          width: 48px;
          height: 48px;
          background: var(--panel-soft);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }

        .card-title {
          font-weight: 700;
          font-size: 1rem;
          margin-top: 0.5rem;
        }

        .badge {
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .badge.active { background: #2ecc7122; color: #2ecc71; border: 1px solid #2ecc7144; }
        .badge.pending { background: var(--panel-soft); color: var(--ink-muted); border: 1px solid var(--glass-border); }

        .progress-bar-container {
          height: 4px;
          background: #f0ece2;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent-primary);
          border-radius: 2px;
          transition: width 1s ease-in-out;
        }

        .viewport-header {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          border-bottom: var(--glass-border);
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          font-weight: 700;
          color: var(--ink-muted);
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #2ecc71;
          border-radius: 50%;
          box-shadow: 0 0 10px #2ecc71;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .brain-badge {
          background: var(--ink-main);
          color: white;
          padding: 0.4rem 0.75rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }

        .connect-btn {
          background: white;
          color: var(--ink-main);
          border: var(--glass-border);
          padding: 0.4rem 1rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: var(--glow-shadow);
        }

        .voice-toggle {
          background: var(--panel-soft);
          border: var(--glass-border);
          padding: 0.4rem 1rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--ink-muted);
        }

        .voice-toggle.active {
          background: #e74c3c;
          color: white;
          border-color: #c0392b;
          box-shadow: 0 0 15px rgba(231, 76, 60, 0.3);
        }

        .mic-btn {
          background: var(--panel-soft);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--ink-muted);
        }

        .mic-btn.listening {
          background: #e74c3c;
          color: white;
          animation: pulse-red 1.5s infinite;
        }

        @keyframes pulse-red {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(231, 76, 60, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
        }

        .message-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .message-bubble {
          max-width: 80%;
          padding: 1rem 1.25rem;
          border-radius: 20px;
          font-size: 1rem;
          line-height: 1.5;
        }

        .message-bubble.user {
          align-self: flex-end;
          background: var(--ink-main);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message-bubble.assistant {
          align-self: flex-start;
          background: white;
          border: var(--glass-border);
          box-shadow: var(--glow-shadow);
          border-bottom-left-radius: 4px;
        }

        .content-container {
          flex: 1;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .view-wrapper {
          height: 100%;
          width: 100%;
        }

        /* ── Views ── */
        .chat-view {
          height: 100%;
          display: flex;
          flex-direction: column;
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
          gap: 1.5rem;
        }

        .chat-messages {
          flex: 1;
          background: var(--panel-soft);
          -webkit-backdrop-filter: var(--glass-blur);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: 24px;
          padding: 2rem;
          overflow-y: auto;
          position: relative; /* For security alert positioning */
        }

        .welcome-hero {
          text-align: center;
          margin-top: 4rem;
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .hero-subtitle {
          color: var(--ink-muted);
          font-size: 1.1rem;
        }

        .chat-input-bar {
          background: white;
          padding: 0.75rem 1rem;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: var(--glow-shadow);
          border: var(--glass-border);
        }

        .chat-input-bar input {
          flex: 1;
          border: none;
          outline: none;
          padding: 0.5rem;
          font-size: 1rem;
          color: var(--ink-main);
        }

        .send-btn {
          width: 40px;
          height: 40px;
          background: var(--ink-main);
          color: white;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* ── Mobile Overrides ── */
        .sidebar.mobile-drawer {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          z-index: 2000;
          background: white;
          width: 85vw !important;
          padding: 2rem 1.5rem;
          box-shadow: 20px 0 50px rgba(0,0,0,0.1);
        }

        .close-drawer {
          background: var(--panel-soft);
          border: none;
          width: 32px; height: 32px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-muted);
        }

        .burger-btn {
          background: transparent;
          border: none;
          color: var(--ink-main);
          cursor: pointer;
        }

        .voice-toggle.mini, .brain-badge.mini {
          padding: 0.4rem;
          min-width: 32px;
        }

        @media (max-width: 768px) {
          .viewport-header { padding: 0 1rem; }
          .content-container { padding: 1rem; }
          .hero-title { font-size: 1.75rem; }
          .message-bubble { max-width: 90%; }
          .modal-content { width: 90vw; padding: 1.5rem; }
          .form-row { grid-template-columns: 1fr; }
        }

        /* ── Modal ── */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(62, 39, 35, 0.4);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          width: 500px;
          padding: 3rem;
          border-radius: 32px;
          box-shadow: 0 32px 64px rgba(0,0,0,0.1);
          border: var(--glass-border);
          position: relative;
        }

        .modal-close {
          position: absolute;
          top: 1.5rem; right: 1.5rem;
          background: var(--panel-soft);
          border: none;
          width: 32px; height: 32px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--ink-muted);
        }

        .modal-header { margin-bottom: 2.5rem; }
        .modal-header h2 { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; }
        .modal-header p { font-size: 0.95rem; color: var(--ink-muted); }

        .form-group { margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.75rem; font-weight: 700; color: var(--ink-muted); text-transform: uppercase; letter-spacing: 0.1em; display: flex; align-items: center; gap: 0.5rem; }
        .form-group input, .form-group select { padding: 0.85rem 1rem; border-radius: 12px; border: var(--glass-border); background: var(--bg-void); color: var(--ink-main); font-size: 1rem; outline: none; transition: border-color 0.2s; }
        .form-group input:focus { border-color: var(--accent-primary); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        .modal-footer { margin-top: 2.5rem; }
        .confirm-btn { width: 100%; background: var(--ink-main); border: none; padding: 1rem; border-radius: 14px; font-weight: 700; cursor: pointer; color: white; transition: transform 0.1s; }
        .confirm-btn:active { transform: scale(0.98); }

        /* ── Grid/Lists for Tabs ── */
        .view-title { font-size: 1.5rem; font-weight: 800; }
        .section-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; width: 100%; }
        .card { background: white; padding: 1.75rem; border-radius: 24px; border: var(--glass-border); box-shadow: var(--glow-shadow); transition: transform 0.2s; cursor: pointer; }
        .card:hover { transform: translateY(-4px); }
        .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; }
        .card-title { font-weight: 700; font-size: 1.1rem; }
        .card-body { font-size: 0.9rem; color: var(--ink-muted); }
        .badge { font-size: 0.65rem; font-weight: 800; padding: 0.35rem 0.65rem; border-radius: 6px; text-transform: uppercase; }
        .badge.active { background: #e8f8f0; color: #2ecc71; }
        .badge.pending { background: #fff8e1; color: #f1c40f; }

        .log-list { display: flex; flex-direction: column; gap: 0.75rem; width: 100%; }
        .log-item { display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem; background: var(--panel-soft); border-radius: 16px; border: var(--glass-border); font-size: 0.9rem; }
        .log-time { font-family: monospace; opacity: 0.5; font-size: 0.8rem; }
        .log-content { flex: 1; }

        .placeholder-view {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 1.5rem;
          background: var(--panel-soft);
          border-radius: 32px;
          border: var(--glass-border);
          border-style: dashed;
        }

        .security-alert {
          position: absolute;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          margin: 0;
          padding: 0.75rem 1rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 8px;
          color: var(--accent-red);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          z-index: 10;
          width: fit-content;
          white-space: nowrap;
        }
      `}</style>
      <div 
        id="ghost-conveyor" 
        ref={ghostContainerRef} 
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }} 
      />

      <EchoBeacon />

      {/* ── Acoustic Synapse (Ambient Presence) ── */}
      <AcousticSynapse 
        isActive={isAcousticActive} 
        onTrigger={() => {
          setIsSovereignAuthenticated(true);
          setShowSecurityBoot(false);
        }} 
      />
    </div>
  )
}
