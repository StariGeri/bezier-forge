"use client";

import { useEditorStore } from "@/store/use-store";
import { SHAPE_REGISTRY } from "@/components/shapes/ShapeRegistry";
import { forwardRef, useMemo } from "react";

export const Canvas = forwardRef<SVGSVGElement>((props, ref) => {
  const { selectedShapeId, config } = useEditorStore();
  const ShapeComponent = useMemo(
    () => SHAPE_REGISTRY[selectedShapeId || "radial"] || SHAPE_REGISTRY.radial,
    [selectedShapeId]
  );

  return (
    <div className="w-full h-full flex items-center justify-center rounded-lg border shadow-sm p-8 relative">
      {/* Subtle checkerboard background for transparency */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #f5f5f5 25%, transparent 25%),
            linear-gradient(-45deg, #f5f5f5 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #f5f5f5 75%),
            linear-gradient(-45deg, transparent 75%, #f5f5f5 75%)
          `,
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
          backgroundColor: '#fafafa'
        }}
      />
      <svg
        ref={ref}
        viewBox="-10 -10 120 120"
        className="w-full h-full max-w-md max-h-md transition-all duration-300 relative z-10"
        style={{
             transform: `scale(${config.scale})`,
             overflow: 'visible',
        }}
      >
        <ShapeComponent />
      </svg>
    </div>
  );
});

Canvas.displayName = "Canvas";

