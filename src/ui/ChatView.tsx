import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Plus, 
  X, 
  Zap, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2,
  Cpu,
  Brain,
  Shield,
  MessageCircle,
  Mic,
  MicOff,
  Send,
  Hash,
  Smartphone,
  Globe,
  Rss,
  Cloud,
  Wand2,
  History,
  Lock,
  Activity,
  Satellite,
  Book,
  Search,
  Scan,
  MapPin,
  Wind,
  HardDrive as Hardware,
  AlertTriangle,
  RefreshCcw,
  Zap as ZapIcon
} from 'lucide-react'
import { ChatViewProps, Message } from '../types'
import { pluginRegistry } from '../lib/plugins'
import { checkCodewordObedience } from '../lib/governance'
import { raizenMemory } from '../lib/memory'
import { processMessage } from '../core/engine'
import { ContextOptions } from '../core/contextBuilder'

export function ChatView({ 
  isMobile,
  platform,
  config, 
  voiceMode, 
  securityError, 
  setSecurityError, 
  currentSessionId, 
  setCurrentSessionId, 
  sessions, 
  setSessions, 
  messages, 
  setMessages,
  setVoiceMode,
  patriarch,
  layoutMode,
  setLayoutMode,
  isTransitioning,
  setIsTransitioning,
  oracleSet,
  setOracleSet,
  showOracleModal,
  setShowOracleModal,
  isLearning,
  setIsLearning,
  learningTopic,
  setLearningTopic,
  chaosScore,
  setChaosScore,
  overclockUrgency,
  setOverclockUrgency,
  emotion,
  swarmCount,
  setSwarmCount,
  proactiveSolutions,
  setProactiveSolutions,
  persona,
  setPersona,
  isWithinSafeZone,
  isFirewallActive,
  setIsFirewallActive,
  isAtomicShredReady,
  setIsAtomicShredReady
}: ChatViewProps) {
  const [inputValue, setInputValue] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [isGhostMode, setIsGhostMode] = useState(!navigator.onLine)
  const chatEndRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const speechRef = useRef<any>(null);

  useEffect(() => {
    const handleOnline = () => {
       setIsGhostMode(false);
       pluginRegistry.executeAction('system.ghost', 'reconnect_hub', {}).then(res => {
          if (res.success) {
             setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: `**📻 [SYSTEM] CONNECTIVITY RESTORED**\nGlobal data mesh re-synchronized. Pushed ${res.data.syncedDeltas} offline mission deltas.`,
                sender: 'raizen',
                timestamp: new Date(),
                isSovereign: true
             }]);
          }
       });
    };
    const handleOffline = () => {
       setIsGhostMode(true);
       pluginRegistry.executeAction('system.ghost', 'engage_ghost_mode', {}).then(res => {
          if (res.success) {
             setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: `**📻 [SYSTEM] SHROUD DISRUPTED: GHOST MODE ACTIVE**\nInternet dependency severed. Local autonomy engines [ONLINE]. Model: ${res.data.model}.`,
                sender: 'raizen',
                timestamp: new Date(),
                isSovereign: true
             }]);
          }
       });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
       window.removeEventListener('online', handleOnline);
       window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const triggerPulse = async () => {
       const pulseRes = await pluginRegistry.executeAction('intelligence.sixth_sense', 'get_ambient_pulse', {});
       if (pulseRes.success) {
          setChaosScore(pulseRes.data.chaosLevel);
          
          if (pulseRes.data.proactiveWarnings && pulseRes.data.proactiveWarnings.length > 0) {
             pulseRes.data.proactiveWarnings.forEach((warning: string) => {
                setMessages(prev => [...prev, {
                   id: `WARN-${Date.now()}-${Math.random()}`,
                   text: `**⛈️ [AMBIENT_WARNING] ${warning}**`,
                   sender: 'raizen',
                   timestamp: new Date(),
                   isSovereign: true
                }]);
             });
          }

          if (pulseRes.data.chaosLevel > 0.8) {
             setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: `**⛈️ [CRITICAL_PULSE] High Environmental Chaos Detected**\nWorld events are currently volatile. I have pivoted to **FOCUS_MODE**. Communication will be concise and mission-priority only.`,
                sender: 'raizen',
                timestamp: new Date(),
                isSovereign: true
             }]);
          }
       }
    };

    const pulseInterval = setInterval(triggerPulse, 5 * 60 * 1000); // Every 5 mins
    triggerPulse(); // Initial load
    return () => clearInterval(pulseInterval);
  }, []);

  useEffect(() => {
    const handleLocalWake = (e: any) => {
      console.log('[App] Raizen Wake-word detected:', e.detail);
      setVoiceMode(true);
      startVoiceListening();
    };
    window.addEventListener('raizen:wake', handleLocalWake);

    const handleRemoteWake = () => {
      console.log("[App] Raizen activated via background trigger.");
      setVoiceMode(true);
    }

    if ((window as any).ipcRenderer) {
      (window as any).ipcRenderer.on('wake-word-detected', handleRemoteWake);
    }

    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      if (!speechRef.current) {
        speechRef.current = new SpeechRecognition();
        speechRef.current.continuous = true;
        speechRef.current.interimResults = false;
        speechRef.current.lang = 'en-US';
      }

      speechRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        console.log('[VOICE] Captured:', transcript);
        
        if (transcript.toLowerCase().includes('raizen')) {
          const command = transcript.replace(/raizen/i, '').trim();
          if (command) {
            handleSend(command);
          } else {
             speak("Yes, Patriarch. I am listening.");
          }
        }
      };

      speechRef.current.onend = () => {
        if (voiceMode) {
          console.log('[VOICE] Restarting continuous link...');
          try { speechRef.current.start(); } catch (e) {}
        }
      };

      speechRef.current.onerror = (event: any) => {
        console.error('[VOICE ERROR]', event.error);
      };

      if (voiceMode) {
        try { speechRef.current.start(); } catch (e) {}
      } else {
        try { speechRef.current.stop(); } catch (e) {}
      }
    }

    return () => {
      window.removeEventListener('raizen:wake', handleLocalWake);
      if ((window as any).ipcRenderer) {
        (window as any).ipcRenderer.off('wake-word-detected', handleRemoteWake);
      }
    };
  }, [config, voiceMode]);

  const startVoiceListening = () => {
    if (speechRef.current) {
      try {
        speechRef.current.start();
        console.log('[VOICE] Listening started...');
      } catch (err) {
        console.error('[VOICE] Failed to start speech recognition:', err);
      }
    }
  };

  const speak = (text: string) => {
    if (!voiceMode) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.pitch = 0.9;
    utterance.rate = 1.0;
    utterance.volume = 1.0;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    const triggerGreeting = async () => {
      const res = await pluginRegistry.executeAction('intelligence.persona_engine', 'generate_greeting', { recentAchievement: 'Sovereign Core Integration' });
      if (res.success) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: res.data.greeting,
          sender: 'raizen',
          timestamp: new Date(),
          isSovereign: true
        }]);
      }
    };
    if (messages.length === 0) triggerGreeting();
  }, []);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return

    const userMsg: Message = { 
      id: Date.now().toString(), 
      text, 
      sender: 'user', 
      timestamp: new Date() 
    }

    // --- Immediate Feedback ---
    setMessages(prev => [...prev, userMsg]);
    setInputValue(''); // Clear input immediately
    setIsThinking(true);

    try {
      if (isFirewallActive) {
        const psychRes = await pluginRegistry.executeAction('security.neural_firewall', 'analyze_message_intent', { text });
        if (psychRes.success && psychRes.data.riskLevel === 'CRITICAL') {
          const missionResult = `**🧠 NEURAL FIREWALL INTERCEPT**\n- **Status**: [BLOCKED]\n- **Intent**: [${psychRes.data.intentDetected}]\n- **Probability**: [${(psychRes.data.manipulationProbability * 100).toFixed(1)}%]\n\n*Raizen has detected psychological manipulation patterns in this message. Execution halted for Patriarch safety.*`;
          setMessages(prev => [...prev, {
            id: `INTERCEPT-${Date.now()}`,
            text: missionResult,
            sender: 'raizen',
            timestamp: new Date(),
            isSovereign: true
          }]);
          return;
        }
      }

      let lowerInput = text.toLowerCase()
      let cleanInput = text.trim()
      
      if (lowerInput.includes('mission') || lowerInput.includes('status')) {
        const missionResult = await pluginRegistry.executeAction('security.adversary_model', 'evaluate_mission_status', { text })
        if (missionResult.success) {
          setMessages(prev => [...prev, {
            id: `MISSION-${Date.now()}`,
            text: missionResult.data.report || missionResult.data,
            sender: 'raizen',
            timestamp: new Date(),
            isSovereign: true
          }]);
          return;
        }
      }

      const oracleResult = await pluginRegistry.executeAction('intelligence.predictive', 'precompute_solutions', { input: text });
      if (oracleResult.success && oracleResult.data.oracleSet) {
        const set = oracleResult.data.oracleSet;
        
        if (set.risk === 'CRITICAL' && !text.includes('::')) {
          setOracleSet(set);
          setShowOracleModal(true);
          return;
        }
        
        setOracleSet(set);
      }

      const policyResult = await checkCodewordObedience(text)
      if (!policyResult.allowed) {
        setSecurityError(policyResult.reason || 'Unauthorized operation.')
        setTimeout(() => setSecurityError(null), 4000)
        return
      }

      cleanInput = policyResult.cleanText
      lowerInput = cleanInput.toLowerCase()

      // --- Specialized Protocol Handlers ---
      if (lowerInput.includes('failover') || lowerInput.includes('constellation')) {
        const constellation = pluginRegistry.getPlugin('constellation-network');
        if (constellation) {
          setMessages(prev => [...prev, { 
            id: `constellation-sync-${Date.now()}`,
            text: 'Initiating Constellation synchronization. Establishing mesh redundancy across secondary nodes.', 
            sender: 'raizen', 
            timestamp: new Date() 
          }]);
          constellation.execute('sync-constellation', {}).then(res => {
            if (res.success) {
              setMessages(prev => [...prev, { 
                id: `constellation-done-${Date.now()}`,
                text: 'Constellation synchronized. Secondary nodes (iPhone, iPad) are now in standby for auto-failover.', 
                sender: 'raizen', 
                timestamp: new Date() 
              }]);
            }
          });
          return;
        }
      }

      if (lowerInput.includes('layout') || lowerInput.includes('morph')) {
        const flux = pluginRegistry.getPlugin('flux-ui-morphology');
        if (flux) {
          setMessages(prev => [...prev, { 
            id: `flux-morph-${Date.now()}`,
            text: 'Analyzing mission context for interface evolution...', 
            sender: 'raizen', 
            timestamp: new Date() 
          }]);
          flux.execute('morph-interface', { task: cleanInput }).then(res => {
            if (res.success) {
              setMessages(prev => [...prev, { 
                id: `flux-done-${Date.now()}`,
                text: `Interface evolved to ${res.data.mode}. Optimization complete.`, 
                sender: 'raizen', 
                timestamp: new Date() 
              }]);
              if (res.data.mode === 'focus_mode') setLayoutMode('focus_mode');
            }
          });
          return;
        }
      }

      if (lowerInput.includes('learn') || lowerInput.includes('research') || lowerInput.includes('scholar')) {
        const scholar = pluginRegistry.getPlugin('scholar-protocol');
        if (scholar) {
          const topic = cleanInput.split('learn ')[1] || cleanInput.split('research ')[1] || 'Unknown Concept';
          setIsLearning(true);
          setLearningTopic(topic);
          setMessages(prev => [...prev, { 
            id: `scholar-init-${Date.now()}`,
            text: `Initiating Scholar Protocol. Branching out to master '${topic}' via optimized multi-source synthesis.`, 
            sender: 'raizen', 
            timestamp: new Date() 
          }]);
          scholar.execute('research-concept', { topic }).then(res => {
            if (res.success) {
              setMessages(prev => [...prev, { 
                id: `scholar-done-${Date.now()}`,
                text: `Mastery attained. Synthesized data from ${res.data.sources.join(', ')} with ${res.data.confidence * 100}% fidelity. Briefing ready in Mission Center.`, 
                sender: 'raizen', 
                timestamp: new Date() 
              }]);
              setIsLearning(false);
            }
          });
          return;
        }
      }

      // --- AI Call Logic (Central Core Engine) ---
      if (!config || !config.apiKey) {
        throw new Error("Neural Hub Disconnected: Please configure an AI agent and API key in the Mission Center (Neural Hub).");
      }

      const context: ContextOptions = {
        chaosScore,
        overclockUrgency,
        emotion,
        activePlugins: Array.from(pluginRegistry.getAll()).map(p => p?.id).filter(Boolean) as string[]
      };

      const result = await processMessage(text, config, messages, context);
      
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        text: result.text, 
        sender: 'assistant', 
        timestamp: new Date() 
      }
      
      setMessages(prev => {
        const updated = [...prev, aiMsg];
        setSessions(s => {
          const newMap = new Map(s);
          newMap.set(currentSessionId, updated);
          return newMap;
        });
        return updated;
      });

      raizenMemory.add(cleanInput, { role: 'user', session: currentSessionId }).catch(() => {})
      raizenMemory.add(aiMsg.text, { role: 'assistant', session: currentSessionId }).catch(() => {})

      if (voiceMode) speak(aiMsg.text)
    } catch (err: any) {
      console.error('[CHAT_ERROR]', err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'raizen',
        text: `[SYSTEM_ERROR] ${err.message || 'The Neural Link has entered a recursive feedback loop. Check your connection.'}`,
        timestamp: new Date(),
        isSovereign: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false)
    }
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
            placeholder={voiceMode ? "Listening for 'Raizen'..." : "Message Raizen..."} 
          />
          <button 
            className={`voice-btn ${voiceMode ? 'active' : ''}`} 
            onClick={() => setVoiceMode(!voiceMode)}
            aria-label={voiceMode ? "Disable voice mode" : "Enable voice mode"}
            title={voiceMode ? "Disable voice mode" : "Enable voice mode"}
          >
            {voiceMode ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <button 
            className="send-btn" 
            onClick={() => handleSend()}
            aria-label="Send message"
            title="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showOracleModal && oracleSet && (
          <div className="modal-overlay" style={{ zIndex: 3000 }}>
            <motion.div 
              className="modal-content oracle-gatekeeper"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="gatekeeper-header">
                <ShieldAlert size={32} className="text-red-500" />
                <h2>ARBITER: CRITICAL MISSION GATING</h2>
              </div>
              <div className="gatekeeper-body">
                <p>{oracleSet.reason}</p>
                <button onClick={() => setShowOracleModal(false)}>Acknowledge</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
