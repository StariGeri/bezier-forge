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
    <div className="w-full h-full flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-lg border shadow-sm p-8">
      <svg
        ref={ref}
        viewBox="-10 -10 120 120"
        className="w-full h-full max-w-md max-h-md transition-all duration-300"
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

