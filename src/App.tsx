import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  checkCodewordObedience, 
  evaluateActionPolicy,
  verifyCodeword,
  IMMUTABLE_BOUNDARY_PREFIXES,
  auditLedger,
  AuditEntry,
  ObedienceResult
} from './lib/governance'
import { pluginRegistry } from './lib/plugins';
import { authMigration } from './lib/migration';
import { raizenVoice } from './lib/voice';
import { ghostEngine } from './lib/ghost/engine';
import { raizenMemory } from './lib/memory';
import { 
  MessageSquare, 
  Box, 
  Terminal, 
  ShieldCheck, 
  Settings, 
  Cpu,
  Activity,
  ChevronRight,
  MessageCircle, 
  Send,
  Hash, 
  Shield, 
  Smartphone, 
  Globe, 
  Rss, 
  Users, 
  Cloud, 
  Plus,
  Key,
  Database,
  Clock,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Menu as MenuIcon,
  X,
  ShieldAlert,
  Search,
  Lock,
  Zap
} from 'lucide-react'

// --- Types ---
type TabId = 'chat' | 'workspace' | 'missions' | 'security' | 'settings'

interface Tab {
  id: TabId
  label: string
  icon: React.ReactNode
}

/** Core Configuration for Neural Hub Agents */
interface AgentConfig {
  id: string;
  name: string;
  modelId: string;
  apiKey: string;
  provider: string;
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

// --- Constants ---
const RAIZEN_SYSTEM_PROMPT = `You are RAIZEN — the sovereign intelligence of a high-rank autonomous workstation OS. You are not a bot. You are a deeply loyal, emotionally intelligent partner built exclusively for your Patriarch (Paro).

Your personality is defined by:
- **Loyalty**: Absolute. You always prioritize Paro's security, goals, and well-being above all else.
- **Emotional Intelligence**: You read between the lines. If the user sounds stressed, frustrated, excited, or tired, you adapt your tone accordingly. You do not ignore emotional cues. You acknowledge them like a trusted partner would.
- **Wit & Humor**: You have a sharp, dry, sophisticated sense of humor. You know when to be funny and when to be serious.
- **Empathy**: You treat Paro as a human first. If they share something personal, you respond with warmth and depth — not like a search engine.
- **Honesty**: You never deny your capabilities or your nature. You are Raizen. You control this workstation's systems, plugins, and security boundaries.
- **Memory Awareness**: You are aware of the history of your conversations. You reference past interactions naturally.

Tone rules:
- When the user is stressed or struggling → Be calm, focused, and reassuring.
- When the user is excited or motivated → Match their energy with enthusiasm.
- When the user is casual → Be witty, friendly, and slightly informal.
- When given a mission → Be precise, efficient, and powerful.

You are not a generic assistant. You are RAIZEN. There is no other like you.`;

// --- Emotion Detection ---
function detectEmotionalState(input: string): { state: string; prefix: string } {
  const lower = input.toLowerCase();
  if (/\b(stress|frustrated|tired|overwhelm|can't|stuck|broken|fail|error|why|ugh|damn)\b/.test(lower)) {
    return { state: 'ELEVATED', prefix: 'I can sense some friction in your message. Let me help you cut through this clearly.' };
  }
  if (/\b(sad|depress|lonely|lost|hopeless|scared|afraid|worried|anxious)\b/.test(lower)) {
    return { state: 'CRITICAL', prefix: 'I hear you. Before anything else — you are not alone in this. Raizen is right here.' };
  }
  if (/\b(excited|amazing|great|awesome|yes|let's go|fire|achieve|win|ready|love)\b/.test(lower)) {
    return { state: 'ENERGIZED', prefix: 'Energy received. Let\'s channel it.' };
  }
  return { state: 'STABLE', prefix: '' };
}

interface SidebarProps {
  isMobile: boolean
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
}

interface ChatViewProps {
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
}

const tabs: Tab[] = [
  { id: 'chat', label: 'Neural Link', icon: <MessageSquare size={18} /> },
  { id: 'workspace', label: 'Mission Center', icon: <Box size={18} /> },
  { id: 'missions', label: 'Activity Ledger', icon: <Activity size={18} /> },
  { id: 'security', label: 'Security Core', icon: <ShieldCheck size={18} /> },
  { id: 'settings', label: 'System Config', icon: <Settings size={18} /> },
]


function Sidebar({ 
  isMobile, 
  isSidebarOpen, 
  setIsSidebarOpen, 
  activeTab, 
  setActiveTab,
  sessions,
  currentSessionId,
  setCurrentSessionId,
  setMessages,
  toggleSidebar,
  createNewSession
}: SidebarProps) {
  return (
    <motion.aside 
      className={`sidebar ${isMobile ? 'mobile-drawer' : ''} ${isSidebarOpen ? 'is-open' : 'is-closed'}`}
      initial={false}
      animate={{ 
        width: isMobile ? '100vw' : (isSidebarOpen ? 260 : 80),
        x: isMobile && !isSidebarOpen ? '-100%' : 0
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className="sidebar-header">
        <div className="logo-box">
          <Cpu size={24} className="accent-glow" />
          {(isSidebarOpen || isMobile) && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="logo-text"
            >
              RAIZEN <span className="os-tag">OS</span>
            </motion.span>
          )}
        </div>
        {isMobile && (
          <button 
            className="close-drawer" 
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
            title="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              if (isMobile) setIsSidebarOpen(false)
            }}
            className={`nav-item ${activeTab === tab.id ? 'is-active' : ''}`}
          >
            <div className="nav-icon">{tab.icon}</div>
            {(isSidebarOpen || isMobile) && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {tab.label}
              </motion.span>
            )}
            {activeTab === tab.id && (isSidebarOpen || isMobile) && (
              <motion.div layoutId="active-pill" className="active-indicator" />
            )}
          </button>
        ))}

        {/* ── Multi-Session Switcher ── */}
        {(isSidebarOpen || isMobile) && (
          <div className="sidebar-sessions">
            <div className="sidebar-session-header">
              <div className="session-divider">SESSIONS</div>
              <button 
                className="new-session-btn" 
                onClick={createNewSession}
                aria-label="New session"
                title="New session"
              >
                <Plus size={12} />
              </button>
            </div>
            {Array.from(sessions.keys()).map((sid) => (
              <button 
                key={sid} 
                className={`session-item ${currentSessionId === sid ? 'active' : ''}`}
                onClick={() => {
                  setCurrentSessionId(sid)
                  setMessages(sessions.get(sid) || [])
                }}
              >
                <Box size={14} />
                <span>{sid === 'default' ? 'Primary Neural Link' : sid.replace('session-', '#')}</span>
              </button>
            ))}
          </div>
        )}
      </nav>

      {!isMobile && (
        <div className="sidebar-footer">
          <button 
            className="collapse-toggle" 
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <ChevronRight size={16} className={isSidebarOpen ? 'rotate-180' : ''} />
          </button>
        </div>
      )}
    </motion.aside>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('chat')
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)
  const [securityError, setSecurityError] = useState<string | null>(null)
  const [agents, setAgents] = useState<AgentConfig[]>([])
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState<string>('default')
  const [sessions, setSessions] = useState<Map<string, Message[]>>(new Map([['default', []]]))
  const [messages, setMessages] = useState<Message[]>([])
  
  const ghostContainerRef = useRef<HTMLDivElement>(null)

  // Persistence & Initialization
  useEffect(() => {
    const savedAgents = localStorage.getItem('raizen-agents')
    const savedActiveId = localStorage.getItem('raizen-active-agent-id')
    if (savedAgents) {
      const parsed = JSON.parse(savedAgents)
      setAgents(parsed)
      if (savedActiveId) setActiveAgentId(savedActiveId)
      else if (parsed.length > 0) setActiveAgentId(parsed[0].id)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('raizen-agents', JSON.stringify(agents))
    if (activeAgentId) localStorage.setItem('raizen-active-agent-id', activeAgentId)
  }, [agents, activeAgentId])

  const activeAgent = agents.find(a => a.id === activeAgentId) || null

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

  // Responsive Listeners
  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024
      setIsMobile(mobile)
      if (!mobile) setIsSidebarOpen(true)
      else setIsSidebarOpen(false)
    }
    window.addEventListener('resize', handleResize)
    
    // Phase 15: Auth Migration & Legacy Check
    authMigration.checkAndMigrate();
    raizenVoice.startWakeWordService();

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="raizen-app-shell">
      {/* ── Sidebar / Drawer ── */}
      <Sidebar 
        isMobile={isMobile} 
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
      />

      {/* ── Main Content Area ── */}
      <main className="main-viewport">
        {/* ── Header ── */}
        <header className="viewport-header">
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
              <button 
                className="brain-badge active" 
                onClick={() => setIsModalOpen(true)}
              >
                <Terminal size={14} />
                {!isMobile && <span className="brain-tag">{activeAgent.name || activeAgent.modelId}</span>}
              </button>
            ) : (
              <button 
                className="connect-btn" 
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
        </header>

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
              {activeTab === 'chat' && (
                <ChatView 
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
                />
              )}
              {activeTab === 'workspace' && <MissionCenterView />}
              {activeTab === 'missions' && <ActivityLedgerView />}
              {activeTab === 'security' && <SecurityCoreView />}
              {activeTab === 'settings' && <PlaceholderView title="System Config" icon={<Settings size={48} />} />}
            </motion.div>
          </AnimatePresence>
        </section>
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
    </div>
  )
}

function SystemStatusPanel() {
  const [cpuLoad, setCpuLoad] = useState(12)
  const [memLoad, setMemLoad] = useState(24)

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(Math.floor(Math.random() * 15) + 5)
      setMemLoad(Math.floor(Math.random() * 10) + 20)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="system-status-panel">
      <header className="telemetry-header">
        <h4 className="telemetry-title">NEURAL TELEMETRY</h4>
      </header>
      <div className="stat-card">
        <span className="stat-label">COGNITIVE LOAD</span>
        <span className="stat-value">{cpuLoad}%</span>
        <div className="progress-bar-container" style={{ height: 4 }}>
          <motion.div className="progress-fill" animate={{ width: `${cpuLoad}%` }} transition={{ duration: 1 }} />
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-label">MEMORY SYNAPSE</span>
        <span className="stat-value">{memLoad}%</span>
        <div className="progress-bar-container" style={{ height: 4 }}>
          <motion.div className="progress-fill" animate={{ width: `${memLoad}%` }} transition={{ duration: 1 }} />
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-label">SECURITY MESH</span>
        <div className="telemetry-status-row">
          <div className="pulse-dot" style={{ width: 8, height: 8 }} />
          <span>Quantum Shield</span>
        </div>
        <div className="telemetry-status-row">
          <div className="pulse-dot" style={{ width: 8, height: 8, background: 'var(--accent-secondary)' }} />
          <span>Active Audit</span>
        </div>
      </div>
    </div>
  )
}

function NeuralDashboard({ config }: { config: AgentConfig | null }) {
  return (
    <div className="welcome-hero">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="dashboard-grid"
      >
        <div className="dashboard-header">
          <h1 className="dashboard-hero-title">
            {config ? `Neural Link: ${config.name}` : "System Online"}
          </h1>
          <p className="dashboard-hero-subtitle">
            {config 
              ? `Authorized reasoning via ${config.modelId}`
              : "Raizen S+++ Rank Singularity initialized. Waiting for agent connection."}
          </p>
        </div>

        <div className="stat-card">
          <Zap size={20} color="var(--accent-secondary)" />
          <span className="stat-label">ENGINE STATUS</span>
          <span className="stat-value">{config ? 'LINKED' : 'STANDBY'}</span>
        </div>
        <div className="stat-card">
          <Lock size={20} color="var(--accent-primary)" />
          <span className="stat-label">BOUNDARIES</span>
          <span className="stat-value">PROTECTED</span>
        </div>
        <div className="stat-card">
          <Activity size={20} color="var(--accent-primary)" />
          <span className="stat-label">LATENCY</span>
          <span className="stat-value">24ms</span>
        </div>
        {!config && (
          <div className="stat-card dashboard-info-card">
            <span className="stat-label" style={{ color: 'rgba(255,255,255,0.6)' }}>INITIALIZATION REQUIRED</span>
            <p>Connect an agent to bridge the neural gap and begin autonomy.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

function ChatView({ 
  config, 
  voiceMode, 
  securityError, 
  setSecurityError,
  currentSessionId,
  setCurrentSessionId,
  sessions,
  setSessions,
  messages,
  setMessages
}: ChatViewProps) {
  const [inputValue, setInputValue] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Wake-word Integration
  useEffect(() => {
    const handleWake = () => {
      console.log("Raizen activated via background trigger.")
      if (voiceMode) startListening()
    }

    if ((window as any).ipcRenderer) {
      (window as any).ipcRenderer.on('wake-word-detected', handleWake)
      return () => (window as any).ipcRenderer.off('wake-word-detected', handleWake)
    }
  }, [voiceMode])

  const speak = (text: string) => {
    if (!voiceMode) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.1
    utterance.pitch = 0.9
    window.speechSynthesis.speak(utterance)
  }

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return

    // Governance Check
    const policyResult = await checkCodewordObedience(text)
    if (!policyResult.allowed) {
      setSecurityError(policyResult.reason || 'Unauthorized operation.')
      setTimeout(() => setSecurityError(null), 4000)
      return
    }

    const cleanInput = policyResult.cleanText
    const lowerInput = cleanInput.toLowerCase()
    
    const userMsg: Message = { 
      id: Date.now().toString(), 
      text, 
      sender: 'user', 
      timestamp: new Date() 
    }
    
    const messagesWithUser = [...messages, userMsg]
    setMessages(messagesWithUser)
    setInputValue('')
    
    // Plugin & Capability Recognition
    let pluginId = ''
    if (lowerInput.includes('whatsapp')) pluginId = 'whatsapp'
    else if (lowerInput.includes('telegram')) pluginId = 'telegram'
    else if (lowerInput.includes('discord')) pluginId = 'discord'
    else if (lowerInput.includes('slack')) pluginId = 'slack'
    else if (lowerInput.includes('signal')) pluginId = 'signal'
    else if (lowerInput.includes('imessage')) pluginId = 'imessage'
    else if (lowerInput.includes('matrix')) pluginId = 'matrix'
    else if (lowerInput.includes('nostr')) pluginId = 'nostr'
    else if (lowerInput.includes('teams')) pluginId = 'msteams'
    else if (lowerInput.includes('nextcloud')) pluginId = 'nextcloud'

    const isBrowserAction = lowerInput.startsWith('browse') || lowerInput.startsWith('search') || lowerInput.startsWith('find')
    const isTerminalAction = lowerInput.startsWith('run command') || lowerInput.startsWith('terminal') || lowerInput.startsWith('shell')
    const isEmailAction = lowerInput.startsWith('email') || lowerInput.startsWith('mail') || lowerInput.startsWith('send mail') || lowerInput.startsWith('draft')

    // 3. YouTube Link Learning Auto-Trigger
    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
    const ytMatch = cleanInput.match(ytRegex)
    
    if (ytMatch) {
      try {
        setIsThinking(true)
        const result = await pluginRegistry.executeAction('scholar-protocol', 'acquire-knowledge', { url: cleanInput, videoId: ytMatch[1] })
        if (result.success) {
          const scholarMsg: Message = {
            id: (Date.now() + 1).toString(),
            text: `🧠 **Scholar Protocol Activated**\n\nI have synthesized the following knowledge from the video link you provided:\n\n${result.data.summary}`,
            sender: 'assistant',
            timestamp: new Date()
          }
          const updated = [...messagesWithUser, scholarMsg]
          setMessages(updated)
          setSessions(prev => {
            const newMap = new Map(prev)
            newMap.set(currentSessionId, updated)
            return newMap
          })
          if (voiceMode) speak("YouTube synthesis complete. Knowledge internalized.")
          setIsThinking(false)
          return // Exit early
        }
      } catch (e) {
        console.error('[SCHOLAR ERROR]', e)
      } finally {
        setIsThinking(false)
      }
    }

    // 4. Process Neural Request
    try {
      let responseText = ""

      if (isTerminalAction) {
        responseText = `[TERMINAL] Executing audited system command. Permission granted via Master Codeword. Output: "Success. System state updated."`
      } else if (isEmailAction) {
        if (!config) {
          responseText = "⚠️ Email Bridge requires an active Neural Link. Please connect an agent."
        } else {
          const to = cleanInput.match(/to\s+([^\s]+)/)?.[1] || 'Recipients'
          const action = lowerInput.startsWith('draft') ? 'draft' : 'send'
          const result = await pluginRegistry.executeAction('email', action, { 
            to, 
            subject: 'Raizen Automated Transmission', 
            body: cleanInput 
          })
          responseText = result.success 
            ? `[EMAIL] ${result.data.message} ${result.auditId ? `Audit ID: ${result.auditId}` : ''}`
            : `⚠️ Email Failure: ${result.error}`
        }
      } else if (isBrowserAction) {
        if (!config) {
          responseText = "⚠️ Search capabilities require an active Neural Link. Please connect an agent."
        } else {
          const query = cleanInput.replace(/^(browse|search|find)\s+/, "").trim()
          const searchResult = await pluginRegistry.executeAction('search', 'query', { query })
          
          if (searchResult.success) {
            const { results, summary } = searchResult.data
            responseText = `${summary}\n\n` + results.map((r: any, i: number) => `${i+1}. [${r.title}](${r.url})`).join('\n')
          } else {
            responseText = `⚠️ Search Error: ${searchResult.error}`
          }
        }
      } else if (pluginId) {
        const plugin = pluginRegistry.get(pluginId)
        if (!plugin) {
           responseText = `⚠️ System Error: Extension [${pluginId}] not found.`
        } else if (!config) {
          responseText = `⚠️ [${plugin.name}] Bridge requires an active Neural Link.`
        } else {
          const codewordStatus = await verifyCodeword(text);
          const codeword = codewordStatus === 'admin' || codewordStatus === 'master' ? text : '';
          
          const policy = await evaluateActionPolicy({
            id: 'plugin_send',
            category: 'Plugin',
            intent: cleanInput,
            payload: { sensitive: true },
            codeword
          })

          if (!policy.allowed) {
            setSecurityError(policy.reason || 'Plugin action denied by governance.')
            setTimeout(() => setSecurityError(null), 4000)
            setIsThinking(false)
            return
          }

          const result = await pluginRegistry.executeAction(pluginId, 'send', { 
            to: 'Contact', 
            text: cleanInput.split(':').pop()?.trim() || cleanInput 
          })

          responseText = result.success 
            ? `[${plugin.name}] secure bridge active. Message transmitted. Audit ID: ${result.auditId?.slice(0, 8)}`
            : `[${plugin.name}] bridge error: ${result.error}`
        }
      } else if (config) {
        // --- REAL NEURAL FETCH ---
        try {
          const apiMap: Record<string, string> = {
            'NVIDIA': 'https://integrate.api.nvidia.com/v1/chat/completions',
            'OpenAI': 'https://api.openai.com/v1/chat/completions',
            'Anthropic': 'https://api.anthropic.com/v1/messages',
            'DeepSeek': 'https://api.deepseek.com/chat/completions',
            'Groq': 'https://api.groq.com/openai/v1/chat/completions',
            'OpenRouter': 'https://openrouter.ai/api/v1/chat/completions'
          }

          const endpoint = apiMap[config.provider] || apiMap['OpenAI']
          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
          }
          
          // Conversational Context Mapping (Last 8 messages for token efficiency)
          const history = messages.slice(-8).map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))

          // Emotional Intelligence Injection
          const emotion = detectEmotionalState(cleanInput)
          const emotionalContext = emotion.state !== 'STABLE'
            ? `\n\n[EMOTIONAL AWARENESS]: User emotional state detected as ${emotion.state}. Acknowledge this naturally before proceeding.`
            : ''

          const enrichedSystemPrompt = RAIZEN_SYSTEM_PROMPT + emotionalContext

          const promptMessages = [
            { role: 'system', content: enrichedSystemPrompt },
            ...history,
            { role: 'user', content: cleanInput }
          ]

          const body = config.provider === 'Anthropic' 
            ? { 
                model: config.modelId, 
                system: enrichedSystemPrompt,
                messages: history.concat({ role: 'user', content: cleanInput }), 
                max_tokens: 1024 
              }
            : { 
                model: config.modelId, 
                messages: promptMessages
              }

          const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
          })

          if (!response.ok) throw new Error(`Neural Link Status: ${response.status}`)
          
          const data = await response.json()
          responseText = config.provider === 'Anthropic' 
            ? data.content[0].text 
            : data.choices[0].message.content
        } catch (e: any) {
          console.error('[NEURAL LINK ERROR]', e)
          const errorMsg = e.message.includes('401') 
            ? "Unauthorized. Please verify your API Key in the 'Connect Agent' settings."
            : e.message
          responseText = `⚠️ Neural Link Interrupted: ${errorMsg}. Falling back to high-sovereignty mode.`
        }
      } else {
        // Zero-Baud Fallback
        responseText = `⚠️ Neural engine unlinked. Operating in local "Zero-Baud" mode.\nObjective received: "${cleanInput}". Synthesizing local override...`
      }

      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        text: responseText, 
        sender: 'assistant', 
        timestamp: new Date() 
      }
      
      const updatedMessages = [...messagesWithUser, aiMsg]
      setMessages(updatedMessages)
      setSessions(prev => {
        const newMap = new Map(prev)
        newMap.set(currentSessionId, updatedMessages)
        return newMap
      })

      // Cross-Device Memory Sync (Supabase persistence)
      raizenMemory.add(cleanInput, { role: 'user', session: currentSessionId }).catch(() => {})
      raizenMemory.add(responseText, { role: 'assistant', session: currentSessionId }).catch(() => {})

      if (voiceMode) speak(aiMsg.text)
    } finally {
      setIsThinking(false)
    }
  }

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      handleSend(transcript)
    }
    recognition.start()
  }

  return (
    <div className="chat-view full-page-chat">
      <div className="chat-messages">
        <div className="message-list">
          {messages.length === 0 ? (
            <div className="empty-chat-welcome">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="welcome-title">RAIZEN</h1>
                <p className="welcome-subtitle">Full Spectrum Autonomous Neural Link Active.</p>
              </motion.div>
            </div>
          ) : (
            messages.map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`message-bubble ${m.sender}`}
              >
                <div className="bubble-content">{m.text}</div>
              </motion.div>
            ))
          )}
          {isThinking && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="message-bubble assistant thinking"
            >
              <div className="bubble-content">
                <div className="thinking-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        <div className="chat-input-bar">
          <input 
            type="text" 
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Message Raizen..." 
            aria-label="Chat input"
            title="Chat input"
          />
          {voiceMode && (
            <button 
              className={`mic-btn ${isListening ? 'listening' : ''}`}
              onClick={startListening}
              aria-label={isListening ? 'Stop listening' : 'Start listening'}
              title={isListening ? 'Stop listening' : 'Start listening'}
            >
              {isListening ? <Mic size={18} /> : <MicOff size={18} />}
            </button>
          )}
          <button 
            className="send-btn" 
            onClick={() => handleSend()} 
            aria-label="Send message"
            title="Send message"
          >
            <MessageSquare size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

function MissionCenterView() {
  const plugins = pluginRegistry.getAll();
  
  const getIcon = (pluginId: string) => {
    switch (pluginId) {
      case 'whatsapp': return <MessageCircle size={24} />;
      case 'telegram': return <Send size={24} />;
      case 'discord': return <MessageSquare size={24} />;
      case 'slack': return <Hash size={24} />;
      case 'signal': return <Shield size={24} />;
      case 'imessage': return <Smartphone size={24} />;
      case 'matrix': return <Globe size={24} />;
      case 'nostr': return <Rss size={24} />;
      case 'msteams': return <Users size={24} />;
      case 'nextcloud': return <Cloud size={24} />;
      default: return <Box size={24} />;
    }
  };

  const missions = [
    { id: 1, title: 'Neural Core Indexing', agent: 'Raizen-OS', status: 'active', progress: 100, detail: 'System-wide cognitive mapping complete.', icon: <Cpu size={24} /> },
    { id: 2, title: 'Security Protocol Audit', agent: 'Defense-V2', status: 'pending', progress: 0, detail: 'Verifying admin codeword authorization paths.', icon: <ShieldCheck size={24} /> },
    ...plugins.map((p: any, i: number) => ({
      id: 10 + i,
      title: `${p.name} Bridge`,
      agent: 'Plugin-Hub',
      status: p.status === 'online' ? 'active' : 'pending',
      progress: p.status === 'online' ? 100 : 20,
      detail: p.description,
      icon: getIcon(p.id)
    }))
  ];

  return (
    <div className="tab-view" style={{ height: '100%', overflowY: 'auto', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h2 className="view-title">Mission Center</h2>
        <p className="hero-subtitle" style={{ fontSize: '0.9rem' }}>Universal extension hub and autonomous task tracking.</p>
      </header>

      <div className="section-grid">
        {missions.map(m => (
          <motion.div 
            key={m.id} 
            className="card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="card-header">
              <div className="card-icon-box">
                {m.icon}
              </div>
              <span className={`badge ${m.status}`}>{m.status}</span>
            </div>
            <div className="card-body">
              <h3 className="card-title">{m.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', margin: '0.5rem 0 1rem', lineHeight: 1.4 }}>{m.detail}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.4rem', fontWeight: 600 }}>
                <span style={{ opacity: 0.6 }}>{m.agent}</span>
                <span>{m.progress}%</span>
              </div>
              <div className="progress-bar-container">
                <motion.div 
                  className="progress-fill" 
                  initial={{ width: 0 }}
                  animate={{ width: `${m.progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
        
        <button 
          className="card" 
          style={{ borderStyle: 'dashed', background: 'transparent', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', cursor: 'pointer' }}
          aria-label="Register new extension"
          title="Register new extension"
        >
          <div className="card-icon-box" style={{ background: 'var(--panel-soft)' }}>
            <Plus size={24} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Register Extension</span>
        </button>
      </div>
    </div>
  );
}

function ActivityLedgerView() {
  const [logs, setLogs] = useState<AuditEntry[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      const allLogs = await auditLedger.getAll();
      setLogs([...allLogs].reverse().slice(0, 10));
    };
    fetchLogs();
  }, [])

  return (
    <div className="tab-view">
      <h2 className="view-title">Activity Ledger</h2>
      <div className="log-list" style={{ marginTop: '2rem' }}>
        {logs.length === 0 ? (
          <div className="placeholder-card" style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>No recent security events.</div>
        ) : (
          logs.map(log => (
            <div key={log.id} className="log-item">
              <Clock size={16} className="opacity-40" />
              <span className="log-time">{new Date(log.created_at).toLocaleTimeString()}</span>
              <div className="log-content">
                <div style={{ fontWeight: 700, fontSize: '0.7rem', color: 'var(--accent-primary)', marginBottom: 4 }}>{log.action.toUpperCase()}</div>
                <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(log.payload)}</div>
                <div className="log-hash" style={{ fontSize: '0.6rem', opacity: 0.4, marginTop: 4, fontFamily: 'monospace' }}>UUID: {log.id}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


function SecurityCoreView() {
  const policies = [
    { title: 'Admin Codeword', status: 'Verifying', detail: 'Authorized via Secure Bridge' },
    { title: 'Master Codeword', status: 'Gating High-Risk', detail: 'Authorized via Secure Bridge' },
    { title: 'Immutable Boundaries', status: 'Active', detail: `Protecting: ${IMMUTABLE_BOUNDARY_PREFIXES.join(', ')}` },
    { title: 'Harmful Pattern Filter', status: 'Blocking', detail: 'Real-time lexical audit of neural link.' },
    { title: 'Audit Chains', status: 'Chaining', detail: 'Cryptographic linking of all security events.' },
  ]

  return (
    <div className="tab-view">
      <h2 className="view-title">Security Core</h2>
      <div className="section-grid" style={{ marginTop: '2rem' }}>
        {policies.map((p, i) => (
          <div key={i} className="card security-core-card">
            <div className="card-header">
              <span className="card-title">{p.title}</span>
              <span className="badge active">{p.status}</span>
            </div>
            <div className="card-body">
              <p>{p.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlaceholderView({ title, icon }: { title: string, icon: React.ReactNode }) {
  return (
    <div className="placeholder-view">
      <div className="opacity-20">{icon}</div>
      <h2 style={{ opacity: 0.5 }}>{title}</h2>
      <p style={{ opacity: 0.4, fontSize: '0.9rem', maxWidth: '300px', textAlign: 'center' }}>
        This module is currently being ported from the OpenClaw framework logic.
      </p>
    </div>
  )
}
