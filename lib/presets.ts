import { EditorConfig } from '@/store/use-store';

export interface Preset {
  id: string;
  name: string;
  description?: string;
  config: Partial<EditorConfig>;
  isBuiltIn: boolean;
}

// Built-in presets (5 per category)
export const BUILT_IN_PRESETS: Record<string, Preset[]> = {
  universal: [
    {
      id: 'gallery-orange',
      name: 'Bright Orange',
      description: 'Gallery style bright orange',
      config: {
        primaryColor: '#fb923c',
        secondaryColor: '#ffffff',
      },
      isBuiltIn: true,
    },
    {
      id: 'gallery-red',
      name: 'Vivid Red',
      description: 'Gallery style vivid red',
      config: {
        primaryColor: '#ef4444',
        secondaryColor: '#ffffff',
      },
      isBuiltIn: true,
    },
    {
      id: 'gallery-amber',
      name: 'Golden Amber',
      description: 'Gallery style golden amber',
      config: {
        primaryColor: '#f59e0b',
        secondaryColor: '#ffffff',
      },
      isBuiltIn: true,
    },
    {
      id: 'gallery-crimson',
      name: 'Deep Crimson',
      description: 'Gallery style deep red',
      config: {
        primaryColor: '#dc2626',
        secondaryColor: '#ffffff',
      },
      isBuiltIn: true,
    },
    {
      id: 'gallery-rust',
      name: 'Burnt Rust',
      description: 'Gallery style burnt orange',
      config: {
        primaryColor: '#ea580c',
        secondaryColor: '#ffffff',
      },
      isBuiltIn: true,
    },
    {
      id: 'monochrome',
      name: 'Monochrome',
      description: 'Classic black and gray',
      config: {
        primaryColor: '#000000',
        secondaryColor: '#808080',
      },
      isBuiltIn: true,
    },
  ],
};
