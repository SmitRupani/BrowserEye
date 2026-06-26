import type { FC } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import type { StepEvent } from '../api';

export interface FilmstripProps {
  steps: StepEvent[];
  selectedIndex?: number;
  onSelectScreenshot?: (screenshotIndex: number) => void;
}

export const Filmstrip: FC<FilmstripProps> = ({ steps, selectedIndex, onSelectScreenshot }) => {
  const screenshots = steps
    .map((step, index) => ({ step, index }))
    .filter(({ step }) => step.screenshotUrl)
    .map(({ step, index }, screenshotIndex) => ({ step, index, screenshotIndex }));

  if (screenshots.length === 0) {
    return (
      <div className="filmstrip">
        <div className="filmstrip-empty">
          <ImageIcon size={18} style={{ marginRight: '8px' }} />
          No screenshots yet
        </div>
      </div>
    );
  }

  return (
    <div className="filmstrip">
      <ul className="filmstrip-list">
        {screenshots.map(({ step, index, screenshotIndex }) => (
          <li
            key={index}
            className={`thumbnail ${selectedIndex === screenshotIndex ? 'active' : ''}`}
            onClick={() => onSelectScreenshot?.(screenshotIndex)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectScreenshot?.(screenshotIndex);
              }
            }}
          >
            <img
              src={`http://localhost:3000${step.screenshotUrl}`}
              alt={`Screenshot ${screenshotIndex + 1}`}
              className="thumbnail-image"
            />
            <div className="thumbnail-timestamp">
              {new Date(step.timestamp).toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </div>
            <div className="thumbnail-index">{screenshotIndex + 1}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
