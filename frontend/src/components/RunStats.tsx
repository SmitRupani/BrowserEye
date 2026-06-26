import React from 'react';
import type { StepEvent } from '../api';

export interface RunStatsProps {
  steps: StepEvent[];
  startTime?: number;
}

export const RunStats: React.FC<RunStatsProps> = ({ steps, startTime }) => {
  const calculateStats = () => {
    const screenshots = steps.filter(s => s.screenshotUrl).length;
    const errors = steps.filter(s => s.type === 'error').length;
    const runtime = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
    
    return {
      runtime,
      steps: steps.length,
      screenshots,
      errors
    };
  };

  const stats = calculateStats();

  return (
    <div className="card run-stats">
      <div className="run-stats-header">
        <h3 className="run-stats-title">Run Statistics</h3>
      </div>
      
      {stats.steps === 0 ? (
        <div className="stats-empty">
          <p className="stats-empty-text">No run data available</p>
        </div>
      ) : (
        <div className="stats-grid">
          <div className="stat-row">
            <span className="stat-label">Runtime</span>
            <span className="stat-value">{stats.runtime}s</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Steps</span>
            <span className="stat-value">{stats.steps}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Screenshots</span>
            <span className="stat-value">{stats.screenshots}</span>
          </div>
          <div className={`stat-row ${stats.errors > 0 ? 'highlight' : ''}`}>
            <span className="stat-label">Errors</span>
            <span className="stat-value">{stats.errors}</span>
          </div>
        </div>
      )}
    </div>
  );
};
