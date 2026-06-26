import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { Activity } from 'lucide-react';
import type { StepEvent } from '../api';
import { TimelineItem } from './TimelineItem';

export interface TimelineProps {
  steps: StepEvent[];
}

export const Timeline: FC<TimelineProps> = ({ steps }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Auto-scroll to the newest entry
    if (listRef.current && steps.length > 0) {
      const lastItem = listRef.current.lastElementChild;
      if (lastItem) {
        lastItem.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [steps.length]);

  return (
    <div className="timeline" ref={timelineRef}>
      <div className="timeline-header">
        <h3 className="timeline-title">
          <Activity size={18} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
          Execution Timeline
        </h3>
      </div>

      {steps.length === 0 ? (
        <div className="timeline-empty">
          <Activity size={48} className="timeline-empty-icon" />
          <p className="timeline-empty-text">No steps yet. Start a task to begin.</p>
        </div>
      ) : (
        <ul className="timeline-list" ref={listRef}>
          {steps.map((step, index) => (
            <TimelineItem key={index} step={step} />
          ))}
        </ul>
      )}
    </div>
  );
};
