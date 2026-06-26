import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { StepEvent } from '../api';

export interface ScreenshotModalProps {
  step?: StepEvent;
  index?: number;
  total?: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onClose: () => void;
}

export const ScreenshotModal: React.FC<ScreenshotModalProps> = ({
  step,
  index = 0,
  total = 1,
  onPrevious,
  onNext,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious?.();
      if (e.key === 'ArrowRight') onNext?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext]);

  if (!step?.screenshotUrl) return null;

  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-content">
        <div className="modal-image-container">
          <img
            src={`http://localhost:3000${step.screenshotUrl}`}
            alt="Screenshot"
            className="modal-image"
          />

          <div className="modal-controls">
            <button
              className="modal-nav-button"
              onClick={onPrevious}
              disabled={index === 0}
              title="Previous screenshot (←)"
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="modal-nav-button"
              onClick={onNext}
              disabled={index === total - 1}
              title="Next screenshot (→)"
              aria-label="Next screenshot"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            title="Close (Esc)"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-info">
          <span className="modal-counter">
            {index + 1} / {total}
          </span>
          <span className="modal-timestamp">{step.timestamp}</span>
        </div>
      </div>
    </div>
  );
};
