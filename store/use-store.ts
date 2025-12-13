import { create } from 'zustand';
import { getShapeDefaults, getShapeControls, SliderControlDef } from '@/components/shapes/ShapeDefinitions';

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

// Base defaults used when no shape-specific defaults exist
const BASE_DEFAULTS: EditorConfig = {
  primaryColor: '#000000',
  secondaryColor: '#ffffff',
  strokeWidth: 2,
  scale: 1,
  rotation: 0,
  roundness: 0,
  radius: 30,
  count: 12,
  seed: 12345,
};

// Generate a random hex color with proper 6-digit padding
const randomHexColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

// Generate a random value within slider bounds
const randomInRange = (min: number, max: number, step: number): number => {
  const range = max - min;
  const steps = Math.floor(range / step);
  const randomSteps = Math.floor(Math.random() * (steps + 1));
  const value = min + randomSteps * step;
  // Round to avoid floating point issues
  return Math.round(value * 1000) / 1000;
};

interface EditorState {
  // Identification
  selectedShapeId: string | null;
  
  // Visual Attributes
  config: EditorConfig;
  
  // Export Settings
  exportSize: ExportSize;
  
  // Actions
  setShape: (id: string) => void;
  updateConfig: <K extends keyof EditorConfig>(key: K, value: EditorConfig[K]) => void;
  setExportSize: (size: ExportSize) => void;
  randomize: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  selectedShapeId: 'radial',
  config: {
    ...BASE_DEFAULTS,
    ...getShapeDefaults('radial'),
  },
  exportSize: 1024,
  
  setShape: (id) => {
    const shapeDefaults = getShapeDefaults(id);
    set((state) => ({
      selectedShapeId: id,
      config: {
        ...BASE_DEFAULTS,
        ...shapeDefaults,
        // Preserve current colors if switching shapes (feels more natural)
        primaryColor: state.config.primaryColor,
        secondaryColor: state.config.secondaryColor,
      },
    }));
  },
  
  updateConfig: (key, value) => 
    set((state) => ({ config: { ...state.config, [key]: value } })),
  
  setExportSize: (size) => set({ exportSize: size }),
  
  randomize: () => {
    const state = get();
    const shapeId = state.selectedShapeId || 'radial';
    const controls = getShapeControls(shapeId);
    
    // Build randomized config based on shape's controls
    // Use Record type for dynamic key assignment
    const randomizedConfig: Record<string, string | number> = {};
    
    for (const control of controls) {
      if (control.type === 'color') {
        randomizedConfig[control.key] = randomHexColor();
      } else if (control.type === 'slider') {
        const sliderControl = control as SliderControlDef;
        randomizedConfig[control.key] = randomInRange(
          sliderControl.min,
          sliderControl.max,
          sliderControl.step
        );
      }
    }
    
    set((prevState) => ({
      config: {
        ...prevState.config,
        ...(randomizedConfig as Partial<EditorConfig>),
      },
    }));
  },
}));
