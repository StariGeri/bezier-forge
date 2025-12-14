import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getShapeDefinition } from "@/components/shapes/ShapeDefinitions"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shapeIdToComponentName(shapeId: string): string {
    const def = getShapeDefinition(shapeId);
    // Use label if available, otherwise capitalize the ID
    const nameSource = def?.label || shapeId;
    
    // Convert "Wave Curve", "wave-curve", "Wave_Curve" to "WaveCurve"
    // Split by any non-alphanumeric character
    const parts = nameSource.split(/[^a-zA-Z0-9]+/);
    
    const pascalCase = parts
        .filter(part => part.length > 0)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join('');
        
    // Ensure it's a valid identifier (starts with letter) - simplistic check
    if (/^[0-9]/.test(pascalCase)) {
        return `Shape${pascalCase}`;
    }
    
    return pascalCase || "Logo";
}
