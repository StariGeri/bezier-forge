import { useEffect } from 'react';
import { useEditorStore } from '@/store/use-store';

export const useKeyboardShortcuts = (handlers: {
  onDownload?: () => void;
  onCopy?: () => void;
  onRandomize?: () => void;
}) => {
  const { randomize, updateConfig, config } = useEditorStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // R - Randomize
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handlers.onRandomize?.() || randomize();
      }

      // E - Export/Download
      if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        handlers.onDownload?.();
      }

      // Arrow keys - Fine-tune rotation
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        updateConfig('rotation', Math.max(0, config.rotation - (e.shiftKey ? 10 : 1)));
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        updateConfig('rotation', Math.min(360, config.rotation + (e.shiftKey ? 10 : 1)));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers, randomize, updateConfig, config]);
};
