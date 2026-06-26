import { useState } from 'react';
import type { FC } from 'react';
import { LiveBrowser } from './LiveBrowser';
import { Timeline } from './Timeline';
import { Filmstrip } from './Filmstrip';
import { ScreenshotModal } from './ScreenshotModal';
import type { StepEvent } from '../api';

export interface WorkspaceProps {
  steps: StepEvent[];
  isLoading?: boolean;
}

export const Workspace: FC<WorkspaceProps> = ({ steps, isLoading = false }) => {
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<number | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  const latestScreenshot = steps
    .filter(s => s.screenshotUrl)
    .pop()?.screenshotUrl;

  const screenshots = steps
    .map((step, index) => ({ step, index }))
    .filter(({ step }) => step.screenshotUrl)
    .map(({ step, index }, screenshotIndex) => ({ step, index, screenshotIndex }));

  const handleSelectScreenshot = (screenshotIndex: number) => {
    setSelectedScreenshotIndex(screenshotIndex);
    setModalOpen(true);
  };

  const handlePrevious = () => {
    if (selectedScreenshotIndex !== undefined && selectedScreenshotIndex > 0) {
      setSelectedScreenshotIndex(selectedScreenshotIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedScreenshotIndex !== undefined && selectedScreenshotIndex < screenshots.length - 1) {
      setSelectedScreenshotIndex(selectedScreenshotIndex + 1);
    }
  };

  const currentScreenshot = selectedScreenshotIndex !== undefined 
    ? screenshots[selectedScreenshotIndex] 
    : undefined;

  return (
    <div className="workspace">
      <div className="browser-section">
        <LiveBrowser latestScreenshot={latestScreenshot} isLoading={isLoading} />
      </div>

      <div className="timeline-section">
        <Timeline steps={steps} />
      </div>

      <div className="filmstrip-section">
        <Filmstrip
          steps={steps}
          selectedIndex={selectedScreenshotIndex}
          onSelectScreenshot={handleSelectScreenshot}
        />
      </div>

      {modalOpen && currentScreenshot && (
        <ScreenshotModal
          step={currentScreenshot.step}
          index={selectedScreenshotIndex}
          total={screenshots.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
