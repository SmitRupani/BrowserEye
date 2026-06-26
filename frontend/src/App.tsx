import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Workspace } from './components/Workspace';
import { startRun, subscribeToRun } from './api';
import type { StepEvent, RunState } from './api';
import './index.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [runState, setRunState] = useState<RunState>({
    status: 'idle',
    steps: []
  });
  const [runStartTime, setRunStartTime] = useState<number | undefined>();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleStart = async (task: string) => {
    try {
      const now = Date.now();
      setRunStartTime(now);
      setRunState({ status: 'running', steps: [] });
      const runId = await startRun(task);
      
      subscribeToRun(
        runId, 
        (event: StepEvent) => {
          setRunState(prev => {
            const newState = { ...prev, steps: [...prev.steps, event] };
            if (event.type === 'error') newState.status = 'error';
            if (event.type === 'done') newState.status = 'completed';
            if (event.message) newState.finalMessage = event.message;
            return newState;
          });
        },
        () => {
          setRunState(prev => prev.status === 'running' ? { ...prev, status: 'completed' } : prev);
        }
      );
    } catch (err: any) {
      setRunState({ status: 'error', steps: [], finalMessage: err.message });
    }
  };

  return (
    <div className="app">
      <Header 
        status={runState.status} 
        theme={theme} 
        onThemeToggle={toggleTheme}
      />
      
      <div className="app-content">
        <Sidebar 
          onStart={handleStart} 
          disabled={runState.status === 'running'}
          steps={runState.steps}
          runStartTime={runStartTime}
        />
        
        <Workspace 
          steps={runState.steps}
          isLoading={runState.status === 'running'}
        />
      </div>
    </div>
  );
}

export default App;

