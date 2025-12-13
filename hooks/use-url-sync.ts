import { useEffect, useRef } from 'react';
import { useEditorStore, EditorConfig } from '@/store/use-store';
import { decodeState, parseConfigFromUrl } from '@/lib/url-state';
import { useSearchParams } from 'next/navigation';

export const useUrlSync = () => {
  const { updateConfig, setShape } = useEditorStore();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  // Load from URL on mount
  useEffect(() => {
    if (isInitialMount.current) {
      const encoded = searchParams.get('state');
      
      if (encoded) {
        // Handle legacy compressed state
        const decoded = decodeState(encoded);
        if (decoded) {
          setShape(decoded.shapeId);
          Object.entries(decoded.config).forEach(([key, value]) => {
            updateConfig(key as keyof EditorConfig, value);
          });
        }
      } else {
        // Handle user-friendly query params
        const config = parseConfigFromUrl(searchParams);
        // Only apply if we found relevant keys
        if (Object.keys(config).length > 0) {
             Object.entries(config).forEach(([key, value]) => {
                updateConfig(key as keyof EditorConfig, value as EditorConfig[keyof EditorConfig]);
             });
        }
      }
      isInitialMount.current = false;
    }
  }, []);
};
