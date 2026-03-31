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
  chaosScore: initialChaos,
  swarmCount: initialSwarm,
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
  const [chaosScore, setChaosScore] = useState(initialChaos)
  const [swarmCount, setSwarmCount] = useState(initialSwarm)
  const [overclockUrgency, setOverclockUrgency] = useState(0.1)
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

    if (isFirewallActive) {
      const psychRes = await pluginRegistry.executeAction('security.neural_firewall', 'analyze_message_intent', { text });
      if (psychRes.success && psychRes.data.riskLevel === 'CRITICAL') {
        const missionResult = `**🧠 NEURAL FIREWALL INTERCEPT**\n- **Status**: [BLOCKED]\n- **Intent**: [${psychRes.data.intentDetected}]\n- **Probability**: [${(psychRes.data.manipulationProbability * 100).toFixed(1)}%]\n\n*Raizen has detected psychological manipulation patterns in this message. Execution halted for Patriarch safety.*`;
        setMessages(prev => [...prev, userMsg, {
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
        setMessages(prev => [...prev, userMsg, { 
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
        setInputValue('');
        return;
      }
    }

    if (lowerInput.includes('layout') || lowerInput.includes('morph')) {
      const flux = pluginRegistry.getPlugin('flux-ui-morphology');
      if (flux) {
        setMessages(prev => [...prev, userMsg, { 
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
        setInputValue('');
        return;
      }
    }

    if (lowerInput.includes('learn') || lowerInput.includes('research') || lowerInput.includes('scholar')) {
      const scholar = pluginRegistry.getPlugin('scholar-protocol');
      if (scholar) {
        const topic = cleanInput.split('learn ')[1] || cleanInput.split('research ')[1] || 'Unknown Concept';
        setIsLearning(true);
        setLearningTopic(topic);
        setMessages(prev => [...prev, userMsg, { 
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
        setInputValue('');
        return;
      }
    }

    // --- AI Call Logic ---
    setIsThinking(true)
    try {
      // Temporary: Keeping legacy API call for now to ensure stability
      // In next phase, this will use callRaizenAI from src/core/raizen.ts
      
      const messagesWithUser = [...messages, userMsg]
      const RAIZEN_SYSTEM_PROMPT = `You are RAIZEN OS Core Intelligence. Absolute Sovereignty. Concise responses.`
      
      if (config) {
        const endpoint = 'https://openrouter.ai/api/v1/chat/completions'
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
          'HTTP-Referer': 'https://raizen.os',
          'X-Title': 'Raizen OS'
        }
        
        const history = messagesWithUser.slice(-10).map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }))

        const body = {
          model: config.modelId,
          messages: [
            { role: 'system', content: RAIZEN_SYSTEM_PROMPT },
            ...history
          ]
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify(body)
        })

        if (!response.ok) throw new Error(`Neural Link Status: ${response.status}`)
        const data = await response.json()
        const responseText = data.choices[0].message.content

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

        raizenMemory.add(cleanInput, { role: 'user', session: currentSessionId }).catch(() => {})
        raizenMemory.add(responseText, { role: 'assistant', session: currentSessionId }).catch(() => {})

        if (voiceMode) speak(aiMsg.text)
      }
    } catch (e: any) {
      console.error('[NEURAL LINK ERROR]', e)
    } finally {
      setIsThinking(false)
      setInputValue('')
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
