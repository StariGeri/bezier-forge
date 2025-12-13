import { create } from 'zustand';

export type ExportSize = 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;

export interface EditorConfig {
  primaryColor: string;
  secondaryColor: string;
  strokeWidth: number;
  scale: number;
  rotation: number;
  roundness: number;
  radius: number;
  count: number;
  seed: number;
}

interface EditorState {
  // Identification
  selectedShapeId: string | null;
  
  // Visual Attributes
  config: EditorConfig;
  
  // Export Settings
  exportSize: ExportSize;
  
  // Actions
  setShape: (id: string) => void;
  updateConfig: (key: keyof EditorConfig, value: any) => void;
  setExportSize: (size: ExportSize) => void;
  randomize: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  selectedShapeId: 'radial',
  config: {
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    strokeWidth: 2,
    scale: 1,
    rotation: 0,
    roundness: 0,
    radius: 30,
    count: 12,
    seed: 12345,
  },
  exportSize: 1024,
  setShape: (id) => set({ selectedShapeId: id }),
  updateConfig: (key, value) => 
    set((state) => ({ config: { ...state.config, [key]: value } })),
  setExportSize: (size) => set({ exportSize: size }),
  randomize: () => {
     set((state) => ({
        config: {
            ...state.config,
            seed: Math.random() * 10000,
            rotation: Math.floor(Math.random() * 360),
            primaryColor: '#' + Math.floor(Math.random()*16777215).toString(16),
            secondaryColor: '#' + Math.floor(Math.random()*16777215).toString(16),
        }
     }));
  }
}));

