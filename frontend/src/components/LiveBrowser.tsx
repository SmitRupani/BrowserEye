import type { FC } from 'react';
import { Monitor } from 'lucide-react';

export interface LiveBrowserProps {
  latestScreenshot?: string;
  isLoading?: boolean;
}

export const LiveBrowser: FC<LiveBrowserProps> = ({ latestScreenshot, isLoading = false }) => {
  return (
    <div className="browser-card">
      <div className="browser-chrome">
        <div className="browser-chrome-bar">
          <div className="browser-buttons">
            <div className="traffic-light red" title="Close" />
            <div className="traffic-light yellow" title="Minimize" />
            <div className="traffic-light green" title="Maximize" />
          </div>
          <div className="address-bar" title="Browser session address bar">
            Browser Session
          </div>
        </div>
      </div>

      <div className={`browser-viewport ${isLoading ? 'loading' : ''}`}>
        <div className="browser-viewport-content">
          {latestScreenshot ? (
            <img
              src={`http://localhost:3000${latestScreenshot}`}
              alt="Live Browser Viewport"
              className="browser-viewport-image"
            />
          ) : (
            <div className="browser-viewport-empty">
              <Monitor size={80} className="empty-icon" />
              <div className="empty-text">No Browser Session</div>
              <div className="empty-subtext">Start a task to begin.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
