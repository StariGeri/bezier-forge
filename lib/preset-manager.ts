import { Preset } from './presets';
import { EditorConfig } from '@/store/use-store';

const STORAGE_KEY = 'bezierforge_user_presets';

export const presetManager = {
  getUserPresets: (): Preset[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },
  
  saveUserPreset: (name: string, config: EditorConfig): Preset => {
    const preset: Preset = {
      id: `user_${Date.now()}`,
      name,
      config,
      isBuiltIn: false,
    };
    const presets = presetManager.getUserPresets();
    presets.push(preset);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
    return preset;
  },
  
  deleteUserPreset: (id: string) => {
    const presets = presetManager.getUserPresets().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  },
};

