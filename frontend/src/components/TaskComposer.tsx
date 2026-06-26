import React, { useState } from 'react';
import { Play } from 'lucide-react';

export interface TaskComposerProps {
  onStart: (task: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const TaskComposer: React.FC<TaskComposerProps> = ({ onStart, disabled = false, loading = false }) => {
  const [task, setTask] = useState('');

  const handleSubmit = () => {
    if (task.trim()) {
      onStart(task);
      setTask('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="card task-composer">
      <div className="task-composer-header">
        <h3 className="task-composer-title">New Task</h3>
        <p className="task-composer-description">What should the browser do?</p>
      </div>

      <div className="task-input-group">
        <textarea
          className="task-textarea"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the task for the autonomous browser agent..."
          disabled={disabled || loading}
        />
      </div>

      <button
        className="task-button"
        onClick={handleSubmit}
        disabled={disabled || loading || !task.trim()}
      >
        <Play size={18} />
        Start Agent
      </button>
    </div>
  );
};
