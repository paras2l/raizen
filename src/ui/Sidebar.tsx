import React from 'react'
import { motion } from 'framer-motion'
import { Box, ChevronRight, Plus } from 'lucide-react'
import { SidebarProps } from '../types'

export function Sidebar({ 
  isMobile, 
  platform,
  isSidebarOpen, 
  setIsSidebarOpen, 
  activeTab, 
  setActiveTab,
  sessions,
  currentSessionId,
  setCurrentSessionId,
  setMessages,
  toggleSidebar,
  createNewSession,
  layoutMode,
  isTransitioning
}: SidebarProps) {
  return (
    <motion.aside 
      className={`sidebar platform-${platform} ${isMobile ? 'mobile-drawer' : ''} ${isSidebarOpen ? 'is-open' : 'is-closed'}`}
      initial={false}
      animate={{ 
        width: layoutMode === 'focus_mode' ? 64 : (layoutMode === 'dev_mode' ? 200 : (isMobile ? '100vw' : (isSidebarOpen ? 260 : 80))),
        x: isMobile && !isSidebarOpen ? '-100%' : 0,
        opacity: isTransitioning ? 0.3 : 1
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className="sidebar-header">
        {(layoutMode !== 'focus_mode' && (isSidebarOpen || isMobile)) && (
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="sidebar-title"
          >
            RAIZEN OS
          </motion.h2>
        )}
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          {['chat', 'workspace', 'missions', 'security', 'singularity', 'settings'].map((tabId) => {
            const isActive = activeTab === tabId;
            return (
              <button
                key={tabId}
                className={`nav-item ${isActive ? 'active' : ''}`}
                aria-label={tabId.toUpperCase()}
                title={tabId.toUpperCase()}
                onClick={() => {
                  setActiveTab(tabId as any);
                  if (tabId === 'chat') {
                      // Optional: handle logic
                  }
                }}
              >
                <span className="nav-icon">
                    {/* Icons are handled by the tabs constant in App.tsx or passed in */}
                </span>
                {(isSidebarOpen || isMobile) && layoutMode !== 'focus_mode' && (
                  <span className="nav-label">{tabId.toUpperCase()}</span>
                )}
              </button>
            )
          })}
        </div>

        {(isSidebarOpen || isMobile) && layoutMode !== 'focus_mode' && (
          <div className="sessions-section">
            <div className="section-header">
              <span>NEURAL SESSIONS</span>
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
