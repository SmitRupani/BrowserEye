import type { FC } from 'react';

export interface StatusBadgeProps {
  status: 'idle' | 'running' | 'completed' | 'error';
}

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  return (
    <div className={`header-status ${status}`}>
      <div className={`status-indicator ${status === 'running' ? 'pulse' : ''}`} />
      <span>
        {status === 'idle' && 'Idle'}
        {status === 'running' && 'Running'}
        {status === 'completed' && 'Completed'}
        {status === 'error' && 'Error'}
      </span>
    </div>
  );
};
