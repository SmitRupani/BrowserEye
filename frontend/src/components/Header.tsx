import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { StatusBadge, type StatusBadgeProps } from './StatusBadge';

export interface HeaderProps extends StatusBadgeProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ status, theme, onThemeToggle }) => {
  return (
    <div className="app-header">
      <div className="header">
        <div className="header-left">
          <div className="header-logo">
            <div className="header-logo-icon">
              <Sparkles size={18} />
            </div>
            <div className="header-logo-text">
              <h1 className="header-logo-title">BrowserMind</h1>
              <p className="header-logo-subtitle">Autonomous Browser Agent</p>
            </div>
          </div>
        </div>

        <div className="header-right">
          <StatusBadge status={status} />
          
          <button
            className="theme-toggle"
            onClick={onThemeToggle}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="user-avatar" title="User">
            B
          </div>
        </div>
      </div>
    </div>
  );
};
