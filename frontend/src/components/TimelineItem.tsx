import type { FC } from 'react';
import {
  Sparkles,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react';
import type { StepEvent } from '../api';

export interface TimelineItemProps {
  step: StepEvent;
}

export const TimelineItem: FC<TimelineItemProps> = ({ step }) => {
  const getIcon = () => {
    switch (step.type) {
      case 'reasoning':
        return <Sparkles size={16} />;
      case 'step':
        return <LoaderCircle size={16} className="animate-spin" />;
      case 'done':
        return <CheckCircle2 size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      default:
        return <LoaderCircle size={16} />;
    }
  };

  const getIconClass = () => {
    switch (step.type) {
      case 'reasoning':
        return 'planning';
      case 'step':
        return 'running';
      case 'done':
        return 'completed';
      case 'error':
        return 'error';
      default:
        return 'running';
    }
  };

  const formatTimestamp = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        fractionalSecondDigits: 3
      });
    } catch {
      return isoString;
    }
  };

  return (
    <li className="timeline-item">
      <div className="timeline-item-header">
        <div className={`timeline-item-icon ${getIconClass()}`}>
          {getIcon()}
        </div>
        <div className="timeline-item-meta">
          <p className="timeline-item-message">
            {step.message || (
              <>
                <span className="timeline-item-badge tool">
                  {step.tool || 'system'}
                </span>
              </>
            )}
          </p>
          <p className="timeline-item-timestamp">{formatTimestamp(step.timestamp)}</p>
        </div>
      </div>

      {step.tool && !step.message && (
        <div className="timeline-item-details">
          <div className="timeline-item-tool">
            <span className="timeline-item-tool-label">Tool</span>
            <span className="timeline-item-tool-value">{step.tool}</span>
          </div>
        </div>
      )}

      {step.args && (
        <div className="timeline-item-details">
          <div className="timeline-item-tool">
            <span className="timeline-item-tool-label">Arguments</span>
            <span className="timeline-item-tool-value">
              {JSON.stringify(step.args, null, 2)}
            </span>
          </div>
        </div>
      )}

      {step.result && (
        <div className="timeline-item-details">
          <div className="timeline-item-tool">
            <span className="timeline-item-tool-label">Result</span>
            <span className="timeline-item-tool-value">
              {typeof step.result === 'string' 
                ? step.result 
                : JSON.stringify(step.result, null, 2)}
            </span>
          </div>
        </div>
      )}

      {step.screenshotUrl && (
        <div style={{ marginTop: 'var(--spacing-md)' }}>
          <span className="timeline-item-badge screenshot">
            <ImageIcon size={12} />
            Screenshot
          </span>
        </div>
      )}
    </li>
  );
};
