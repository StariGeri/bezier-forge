import { EditorConfig } from '@/store/use-store';
import { compress, decompress } from 'lz-string';

// Legacy compressed format
export const encodeState = (shapeId: string, config: EditorConfig): string => {
  const state = { s: shapeId, c: config };
  return compress(JSON.stringify(state));
};

export const decodeState = (encoded: string): { shapeId: string; config: Partial<EditorConfig> } | null => {
  try {
    const decoded = decompress(encoded);
    if (!decoded) return null;
    const state = JSON.parse(decoded);
    return { shapeId: state.s, config: state.c };
  } catch {
    return null;
  }
};

// New user-friendly format
export const configToUrl = (baseUrl: string, config: EditorConfig): string => {
  const url = new URL(baseUrl);
  
  // Clear any existing params
  url.search = '';
  
  // Add config params
  Object.entries(config).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });
  
  return url.toString();
};

export const parseConfigFromUrl = (searchParams: URLSearchParams): Partial<EditorConfig> => {
  const config: Partial<EditorConfig> = {};
  
  // List of numeric keys
  const numberKeys = [
    'strokeWidth', 'scale', 'rotation', 'roundness', 
    'radius', 'count', 'seed'
  ];

  // List of string/color keys
  const stringKeys = ['primaryColor', 'secondaryColor'];

  searchParams.forEach((value, key) => {
    if (numberKeys.includes(key)) {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        (config as Record<string, number>)[key] = num;
      }
    } else if (stringKeys.includes(key)) {
      (config as Record<string, string>)[key] = value;
    }
  });

  return config;
};
