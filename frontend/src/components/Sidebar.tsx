import React from 'react';
import { TaskComposer } from './TaskComposer';
import { RunStats } from './RunStats';
import type { StepEvent } from '../api';

export interface SidebarProps {
  onStart: (task: string) => void;
  disabled?: boolean;
  steps: StepEvent[];
  runStartTime?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ onStart, disabled = false, steps, runStartTime }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-container">
        <TaskComposer onStart={onStart} disabled={disabled} />
        <RunStats steps={steps} startTime={runStartTime} />
      </div>
    </aside>
  );
};
