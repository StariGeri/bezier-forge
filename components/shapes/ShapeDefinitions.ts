import type { EditorConfig } from '@/store/use-store';

// ────────────────────────────────────────────────────────────────────────────
// Control Types
// ────────────────────────────────────────────────────────────────────────────

export type ControlType = 'color' | 'slider';

interface BaseControlDef {
  key: keyof EditorConfig;
  label: string;
}

export interface ColorControlDef extends BaseControlDef {
  type: 'color';
}

export interface SliderControlDef extends BaseControlDef {
  type: 'slider';
  min: number;
  max: number;
  step: number;
}

export type ControlDef = ColorControlDef | SliderControlDef;

// ────────────────────────────────────────────────────────────────────────────
// Shape Definition
// ────────────────────────────────────────────────────────────────────────────

export interface ShapeDefinition {
  id: string;
  label: string;
  category: string;
  controls: ControlDef[];
  defaults: Partial<EditorConfig>;
}

// ────────────────────────────────────────────────────────────────────────────
// Reusable Control Presets
// ────────────────────────────────────────────────────────────────────────────

const primaryColor: ColorControlDef = { type: 'color', key: 'primaryColor', label: 'Primary Color' };
const secondaryColor: ColorControlDef = { type: 'color', key: 'secondaryColor', label: 'Secondary Color' };

const count = (min = 3, max = 50, step = 1): SliderControlDef => ({
  type: 'slider', key: 'count', label: 'Count', min, max, step,
});

const radius = (min = 10, max = 50, step = 1): SliderControlDef => ({
  type: 'slider', key: 'radius', label: 'Radius', min, max, step,
});

const rotation: SliderControlDef = {
  type: 'slider', key: 'rotation', label: 'Rotation', min: 0, max: 360, step: 1,
};

const strokeWidth = (min = 0.5, max = 10, step = 0.5): SliderControlDef => ({
  type: 'slider', key: 'strokeWidth', label: 'Stroke Width', min, max, step,
});

const seed: SliderControlDef = {
  type: 'slider', key: 'seed', label: 'Seed', min: 0, max: 99999, step: 1,
};

const roundness: SliderControlDef = {
  type: 'slider', key: 'roundness', label: 'Roundness', min: 0, max: 100, step: 1,
};

const scale: SliderControlDef = {
  type: 'slider', key: 'scale', label: 'Scale', min: 0.1, max: 2, step: 0.1,
};

// ────────────────────────────────────────────────────────────────────────────
// Shape Definitions (by category)
// ────────────────────────────────────────────────────────────────────────────

const SHAPE_DEFINITIONS: ShapeDefinition[] = [
  // ─── Classics ───────────────────────────────────────────────────────────────
  {
    id: 'radial',
    label: 'Radial',
    category: 'Classics',
    controls: [primaryColor, count(3, 24), radius(), rotation],
    defaults: { count: 12, radius: 30 },
  },
  {
    id: 'blob',
    label: 'Blob',
    category: 'Classics',
    controls: [primaryColor, count(3, 20), radius(), roundness, seed],
    defaults: { count: 8, radius: 35, roundness: 50 },
  },
  {
    id: 'grid',
    label: 'Grid',
    category: 'Classics',
    controls: [primaryColor, secondaryColor, count(4, 64), roundness],
    defaults: { count: 16, roundness: 0 },
  },

  // ─── Geometric ──────────────────────────────────────────────────────────────
  {
    id: 'polygon',
    label: 'Polygon',
    category: 'Geometric',
    controls: [primaryColor, count(3, 12), radius(), rotation, strokeWidth(), roundness],
    defaults: { count: 6, radius: 35, strokeWidth: 2 },
  },
  {
    id: 'concentric',
    label: 'Concentric',
    category: 'Geometric',
    controls: [primaryColor, secondaryColor, count(2, 20), radius(), strokeWidth()],
    defaults: { count: 8, radius: 40 },
  },
  {
    id: 'spiral',
    label: 'Spiral',
    category: 'Geometric',
    controls: [primaryColor, count(2, 20), radius(), rotation, strokeWidth()],
    defaults: { count: 6, radius: 40 },
  },
  {
    id: 'burst',
    label: 'Burst',
    category: 'Geometric',
    controls: [primaryColor, count(4, 24), radius(), rotation],
    defaults: { count: 12, radius: 40 },
  },
  {
    id: 'mosaic',
    label: 'Mosaic',
    category: 'Geometric',
    controls: [primaryColor, secondaryColor, count(4, 36), seed, roundness],
    defaults: { count: 16, roundness: 0 },
  },
  {
    id: 'symmetry',
    label: 'Symmetry',
    category: 'Geometric',
    controls: [primaryColor, secondaryColor, count(2, 8), radius(), rotation, seed],
    defaults: { count: 4, radius: 35 },
  },

  // ─── Organic ────────────────────────────────────────────────────────────────
  {
    id: 'flower',
    label: 'Flower',
    category: 'Organic',
    controls: [primaryColor, count(3, 16), radius(), rotation],
    defaults: { count: 6, radius: 38 },
  },
  {
    id: 'wave',
    label: 'Wave',
    category: 'Organic',
    controls: [primaryColor, count(2, 16), radius(), rotation, strokeWidth()],
    defaults: { count: 4, radius: 30 },
  },
  {
    id: 'liquid',
    label: 'Liquid',
    category: 'Organic',
    controls: [primaryColor, radius(), roundness, seed],
    defaults: { radius: 35, roundness: 80 },
  },
  {
    id: 'amoeba',
    label: 'Amoeba',
    category: 'Organic',
    controls: [primaryColor, count(4, 12), radius(), roundness, seed],
    defaults: { count: 6, radius: 35 },
  },
  {
    id: 'cloud',
    label: 'Cloud',
    category: 'Organic',
    controls: [primaryColor, count(3, 10), radius(), seed],
    defaults: { count: 5, radius: 30 },
  },
  {
    id: 'vine',
    label: 'Vine',
    category: 'Organic',
    controls: [primaryColor, secondaryColor, count(4, 16), radius(), rotation, seed],
    defaults: { count: 8, radius: 35 },
  },

  // ─── Tech ───────────────────────────────────────────────────────────────────
  {
    id: 'circuit',
    label: 'Circuit',
    category: 'Tech',
    controls: [primaryColor, count(3, 20), strokeWidth(), seed],
    defaults: { count: 8, strokeWidth: 2 },
  },
  {
    id: 'glitch',
    label: 'Glitch',
    category: 'Tech',
    controls: [primaryColor, secondaryColor, count(4, 24), seed],
    defaults: { count: 10 },
  },
  {
    id: 'databars',
    label: 'Data Bars',
    category: 'Tech',
    controls: [primaryColor, secondaryColor, count(4, 24), radius(), seed],
    defaults: { count: 12, radius: 40 },
  },
  {
    id: 'network',
    label: 'Network',
    category: 'Tech',
    controls: [primaryColor, count(3, 16), radius(), strokeWidth(), seed],
    defaults: { count: 8, radius: 35 },
  },
  {
    id: 'pixel',
    label: 'Pixel Grid',
    category: 'Tech',
    controls: [primaryColor, secondaryColor, count(4, 64), seed],
    defaults: { count: 25 },
  },
  {
    id: 'orbit',
    label: 'Orbit',
    category: 'Tech',
    controls: [primaryColor, secondaryColor, count(2, 8), radius(), rotation, strokeWidth()],
    defaults: { count: 3, radius: 35 },
  },

  // ─── 3D ─────────────────────────────────────────────────────────────────────
  {
    id: 'isocube',
    label: 'Iso Cube',
    category: '3D',
    controls: [primaryColor, secondaryColor, radius()],
    defaults: { radius: 25 },
  },
  {
    id: 'pyramid',
    label: 'Pyramid',
    category: '3D',
    controls: [primaryColor, secondaryColor, radius(), rotation],
    defaults: { radius: 30 },
  },
  {
    id: 'cylinder',
    label: 'Cylinder',
    category: '3D',
    controls: [primaryColor, secondaryColor, radius(), rotation],
    defaults: { radius: 25 },
  },
  {
    id: 'hexstack',
    label: 'Hex Stack',
    category: '3D',
    controls: [primaryColor, secondaryColor, count(2, 8), radius()],
    defaults: { count: 3, radius: 20 },
  },
  {
    id: 'torus',
    label: 'Torus',
    category: '3D',
    controls: [primaryColor, secondaryColor, count(8, 32), radius(), rotation, strokeWidth()],
    defaults: { count: 16, radius: 30 },
  },

  // ─── Architectural ──────────────────────────────────────────────────────────
  {
    id: 'arch',
    label: 'Arch',
    category: 'Architectural',
    controls: [primaryColor, secondaryColor, radius(), strokeWidth()],
    defaults: { radius: 35, strokeWidth: 3 },
  },
  {
    id: 'pillar',
    label: 'Pillar',
    category: 'Architectural',
    controls: [primaryColor, secondaryColor, count(2, 6), radius()],
    defaults: { count: 3, radius: 35 },
  },
  {
    id: 'maze',
    label: 'Maze',
    category: 'Architectural',
    controls: [primaryColor, count(3, 12), strokeWidth(), seed],
    defaults: { count: 5, strokeWidth: 2 },
  },
  {
    id: 'knot',
    label: 'Knot',
    category: 'Architectural',
    controls: [primaryColor, count(3, 8), radius(), rotation, strokeWidth()],
    defaults: { count: 4, radius: 30, strokeWidth: 3 },
  },
  {
    id: 'weave',
    label: 'Weave',
    category: 'Architectural',
    controls: [primaryColor, secondaryColor, count(2, 10), strokeWidth()],
    defaults: { count: 4, strokeWidth: 4 },
  },
  {
    id: 'arrow',
    label: 'Arrow',
    category: 'Architectural',
    controls: [primaryColor, radius(), rotation, strokeWidth()],
    defaults: { radius: 35, strokeWidth: 3 },
  },

  // ─── Abstract ───────────────────────────────────────────────────────────────
  {
    id: 'crescent',
    label: 'Crescent',
    category: 'Abstract',
    controls: [primaryColor, radius(), rotation],
    defaults: { radius: 35 },
  },
  {
    id: 'ripple',
    label: 'Ripple',
    category: 'Abstract',
    controls: [primaryColor, count(3, 12), radius(), strokeWidth()],
    defaults: { count: 5, radius: 40, strokeWidth: 2 },
  },
  {
    id: 'fragment',
    label: 'Fragment',
    category: 'Abstract',
    controls: [primaryColor, secondaryColor, count(3, 16), radius(), seed],
    defaults: { count: 8, radius: 35 },
  },
  {
    id: 'stripe',
    label: 'Stripe',
    category: 'Abstract',
    controls: [primaryColor, secondaryColor, count(2, 20), rotation],
    defaults: { count: 8 },
  },
  {
    id: 'dotmatrix',
    label: 'Dot Matrix',
    category: 'Abstract',
    controls: [primaryColor, count(4, 64), radius(1, 10), seed],
    defaults: { count: 25, radius: 3 },
  },
  {
    id: 'crosshatch',
    label: 'Crosshatch',
    category: 'Abstract',
    controls: [primaryColor, count(4, 20), rotation, strokeWidth()],
    defaults: { count: 8, strokeWidth: 1 },
  },

  // ─── Nature ─────────────────────────────────────────────────────────────────
  {
    id: 'leaf',
    label: 'Leaf',
    category: 'Nature',
    controls: [primaryColor, secondaryColor, radius(), rotation, strokeWidth()],
    defaults: { radius: 35, strokeWidth: 1.5 },
  },
  {
    id: 'coral',
    label: 'Coral',
    category: 'Nature',
    controls: [primaryColor, count(3, 12), radius(), seed],
    defaults: { count: 5, radius: 35 },
  },
  {
    id: 'seed',
    label: 'Seed',
    category: 'Nature',
    controls: [primaryColor, secondaryColor, count(2, 12), radius()],
    defaults: { count: 6, radius: 30 },
  },
  {
    id: 'mountain',
    label: 'Mountain',
    category: 'Nature',
    controls: [primaryColor, secondaryColor, count(2, 8), radius(), seed],
    defaults: { count: 3, radius: 40 },
  },
  {
    id: 'feather',
    label: 'Feather',
    category: 'Nature',
    controls: [primaryColor, secondaryColor, count(6, 24), radius(), rotation],
    defaults: { count: 12, radius: 40 },
  },
  {
    id: 'shell',
    label: 'Shell',
    category: 'Nature',
    controls: [primaryColor, secondaryColor, count(3, 10), radius(), rotation],
    defaults: { count: 5, radius: 35 },
  },
  {
    id: 'snowflake',
    label: 'Snowflake',
    category: 'Nature',
    controls: [primaryColor, count(4, 8), radius(), rotation, strokeWidth()],
    defaults: { count: 6, radius: 40, strokeWidth: 1.5 },
  },

  // ─── Retro ──────────────────────────────────────────────────────────────────
  {
    id: 'sunburst',
    label: 'Sunburst',
    category: 'Retro',
    controls: [primaryColor, secondaryColor, count(8, 36), radius(), rotation],
    defaults: { count: 16, radius: 40 },
  },
  {
    id: 'diamond',
    label: 'Diamond',
    category: 'Retro',
    controls: [primaryColor, secondaryColor, radius(), rotation, strokeWidth()],
    defaults: { radius: 35, strokeWidth: 2 },
  },
  {
    id: 'chevron',
    label: 'Chevron',
    category: 'Retro',
    controls: [primaryColor, secondaryColor, count(2, 10), radius()],
    defaults: { count: 4, radius: 35 },
  },
  {
    id: 'badge',
    label: 'Badge',
    category: 'Retro',
    controls: [primaryColor, secondaryColor, count(4, 16), radius(), strokeWidth()],
    defaults: { count: 8, radius: 38, strokeWidth: 2 },
  },
  {
    id: 'rosette',
    label: 'Rosette',
    category: 'Retro',
    controls: [primaryColor, secondaryColor, count(6, 24), radius()],
    defaults: { count: 12, radius: 38 },
  },
  {
    id: 'scallop',
    label: 'Scallop',
    category: 'Retro',
    controls: [primaryColor, count(6, 24), radius()],
    defaults: { count: 12, radius: 38 },
  },

  // ─── Cosmic ─────────────────────────────────────────────────────────────────
  {
    id: 'starcluster',
    label: 'Star Cluster',
    category: 'Cosmic',
    controls: [primaryColor, secondaryColor, count(5, 50), radius(), seed],
    defaults: { count: 20, radius: 40 },
  },
  {
    id: 'galaxy',
    label: 'Galaxy',
    category: 'Cosmic',
    controls: [primaryColor, secondaryColor, count(10, 50), radius(), rotation, seed],
    defaults: { count: 30, radius: 40 },
  },
  {
    id: 'eclipse',
    label: 'Eclipse',
    category: 'Cosmic',
    controls: [primaryColor, secondaryColor, radius()],
    defaults: { radius: 35 },
  },
  {
    id: 'asteroid',
    label: 'Asteroid',
    category: 'Cosmic',
    controls: [primaryColor, count(6, 16), radius(), roundness, seed],
    defaults: { count: 10, radius: 30, roundness: 30 },
  },
  {
    id: 'nebula',
    label: 'Nebula',
    category: 'Cosmic',
    controls: [primaryColor, secondaryColor, count(10, 60), radius(), seed],
    defaults: { count: 40, radius: 40 },
  },
  {
    id: 'constellation',
    label: 'Constellation',
    category: 'Cosmic',
    controls: [primaryColor, count(4, 16), radius(), strokeWidth(), seed],
    defaults: { count: 8, radius: 40, strokeWidth: 1 },
  },

  // ─── Motion ─────────────────────────────────────────────────────────────────
  {
    id: 'vortex',
    label: 'Vortex',
    category: 'Motion',
    controls: [primaryColor, count(3, 12), radius(), rotation, strokeWidth()],
    defaults: { count: 6, radius: 40, strokeWidth: 2 },
  },
  {
    id: 'shatter',
    label: 'Shatter',
    category: 'Motion',
    controls: [primaryColor, secondaryColor, count(6, 24), radius(), seed],
    defaults: { count: 12, radius: 40 },
  },
  {
    id: 'trail',
    label: 'Trail',
    category: 'Motion',
    controls: [primaryColor, count(3, 16), radius(), rotation],
    defaults: { count: 8, radius: 35 },
  },
  {
    id: 'bounce',
    label: 'Bounce',
    category: 'Motion',
    controls: [primaryColor, secondaryColor, count(2, 10), radius()],
    defaults: { count: 5, radius: 30 },
  },
  {
    id: 'propeller',
    label: 'Propeller',
    category: 'Motion',
    controls: [primaryColor, count(2, 8), radius(), rotation],
    defaults: { count: 3, radius: 38 },
  },
  {
    id: 'morph',
    label: 'Morph',
    category: 'Motion',
    controls: [primaryColor, secondaryColor, count(3, 12), radius(), roundness, seed],
    defaults: { count: 6, radius: 35, roundness: 50 },
  },

  // ─── Audio ──────────────────────────────────────────────────────────────────
  {
    id: 'waveform',
    label: 'Waveform',
    category: 'Audio',
    controls: [primaryColor, count(2, 16), radius(), rotation, strokeWidth(), seed],
    defaults: { count: 4, radius: 30, strokeWidth: 2 },
  },
  {
    id: 'equalizer',
    label: 'Equalizer',
    category: 'Audio',
    controls: [primaryColor, secondaryColor, count(4, 24), radius(), seed],
    defaults: { count: 12, radius: 40 },
  },
  {
    id: 'soundrings',
    label: 'Sound Rings',
    category: 'Audio',
    controls: [primaryColor, count(3, 10), radius(), strokeWidth()],
    defaults: { count: 5, radius: 40, strokeWidth: 2 },
  },

  // ─── Scientific ─────────────────────────────────────────────────────────────
  {
    id: 'dna',
    label: 'DNA',
    category: 'Scientific',
    controls: [primaryColor, secondaryColor, count(4, 16), radius(), rotation, strokeWidth()],
    defaults: { count: 8, radius: 30, strokeWidth: 2 },
  },
  {
    id: 'atom',
    label: 'Atom',
    category: 'Scientific',
    controls: [primaryColor, secondaryColor, count(2, 6), radius(), rotation, strokeWidth()],
    defaults: { count: 3, radius: 35, strokeWidth: 1.5 },
  },
  {
    id: 'crystal',
    label: 'Crystal',
    category: 'Scientific',
    controls: [primaryColor, secondaryColor, count(3, 8), radius(), rotation],
    defaults: { count: 4, radius: 35 },
  },
  {
    id: 'molecule',
    label: 'Molecule',
    category: 'Scientific',
    controls: [primaryColor, secondaryColor, count(3, 10), radius(), strokeWidth(), seed],
    defaults: { count: 5, radius: 30, strokeWidth: 2 },
  },

  // ─── Symbols ────────────────────────────────────────────────────────────────
  {
    id: 'infinity',
    label: 'Infinity',
    category: 'Symbols',
    controls: [primaryColor, radius(), rotation, strokeWidth()],
    defaults: { radius: 35, strokeWidth: 4 },
  },
  {
    id: 'shield',
    label: 'Shield',
    category: 'Symbols',
    controls: [primaryColor, secondaryColor, radius(), strokeWidth()],
    defaults: { radius: 38, strokeWidth: 2 },
  },
  {
    id: 'lightning',
    label: 'Lightning',
    category: 'Symbols',
    controls: [primaryColor, radius(), rotation],
    defaults: { radius: 40 },
  },
  {
    id: 'target',
    label: 'Target',
    category: 'Symbols',
    controls: [primaryColor, secondaryColor, count(2, 8), radius(), strokeWidth()],
    defaults: { count: 4, radius: 40, strokeWidth: 2 },
  },
  {
    id: 'heart',
    label: 'Heart',
    category: 'Symbols',
    controls: [primaryColor, secondaryColor, radius(), rotation, strokeWidth()],
    defaults: { radius: 30, strokeWidth: 2 },
  },
  {
    id: 'eye',
    label: 'Eye',
    category: 'Symbols',
    controls: [primaryColor, secondaryColor, radius(), rotation],
    defaults: { radius: 35 },
  },
  {
    id: 'anchor',
    label: 'Anchor',
    category: 'Symbols',
    controls: [primaryColor, radius(), strokeWidth()],
    defaults: { radius: 38, strokeWidth: 3 },
  },
  {
    id: 'compass',
    label: 'Compass',
    category: 'Symbols',
    controls: [primaryColor, secondaryColor, radius(), rotation, strokeWidth()],
    defaults: { radius: 40, strokeWidth: 2 },
  },
  {
    id: 'hourglass',
    label: 'Hourglass',
    category: 'Symbols',
    controls: [primaryColor, secondaryColor, radius(), rotation, strokeWidth()],
    defaults: { radius: 35, strokeWidth: 2 },
  },
  {
    id: 'crown',
    label: 'Crown',
    category: 'Symbols',
    controls: [primaryColor, secondaryColor, count(3, 7), radius()],
    defaults: { count: 5, radius: 35 },
  },

  // ─── Cultural ───────────────────────────────────────────────────────────────
  {
    id: 'mandala',
    label: 'Mandala',
    category: 'Cultural',
    controls: [primaryColor, secondaryColor, count(6, 24), radius(), rotation, strokeWidth()],
    defaults: { count: 12, radius: 40, strokeWidth: 1 },
  },
  {
    id: 'celtic',
    label: 'Celtic',
    category: 'Cultural',
    controls: [primaryColor, radius(), rotation, strokeWidth()],
    defaults: { radius: 35, strokeWidth: 3 },
  },
  {
    id: 'seigaiha',
    label: 'Seigaiha',
    category: 'Cultural',
    controls: [primaryColor, secondaryColor, count(3, 12), radius(), strokeWidth()],
    defaults: { count: 6, radius: 20, strokeWidth: 1 },
  },
  {
    id: 'arabesque',
    label: 'Arabesque',
    category: 'Cultural',
    controls: [primaryColor, count(4, 16), radius(), rotation, strokeWidth()],
    defaults: { count: 8, radius: 38, strokeWidth: 1.5 },
  },

  // ─── Industrial ─────────────────────────────────────────────────────────────
  {
    id: 'gear',
    label: 'Gear',
    category: 'Industrial',
    controls: [primaryColor, secondaryColor, count(6, 24), radius(), rotation, strokeWidth()],
    defaults: { count: 12, radius: 35, strokeWidth: 2 },
  },
  {
    id: 'turbine',
    label: 'Turbine',
    category: 'Industrial',
    controls: [primaryColor, count(4, 16), radius(), rotation],
    defaults: { count: 8, radius: 40 },
  },
  {
    id: 'sprocket',
    label: 'Sprocket',
    category: 'Industrial',
    controls: [primaryColor, secondaryColor, count(8, 24), radius(), strokeWidth()],
    defaults: { count: 16, radius: 35, strokeWidth: 2 },
  },
  {
    id: 'piston',
    label: 'Piston',
    category: 'Industrial',
    controls: [primaryColor, secondaryColor, radius(), rotation, strokeWidth()],
    defaults: { radius: 30, strokeWidth: 2 },
  },

  // ─── Optical ────────────────────────────────────────────────────────────────
  {
    id: 'lensflare',
    label: 'Lens Flare',
    category: 'Optical',
    controls: [primaryColor, secondaryColor, count(3, 12), radius(), seed],
    defaults: { count: 6, radius: 35 },
  },
  {
    id: 'bokeh',
    label: 'Bokeh',
    category: 'Optical',
    controls: [primaryColor, secondaryColor, count(5, 30), radius(), seed],
    defaults: { count: 15, radius: 40 },
  },
];

// ────────────────────────────────────────────────────────────────────────────
// SHAPES Map and Helper Functions
// ────────────────────────────────────────────────────────────────────────────

export const SHAPES: Map<string, ShapeDefinition> = new Map(
  SHAPE_DEFINITIONS.map((def) => [def.id, def])
);

export const getShapeDefinition = (id: string): ShapeDefinition | undefined => {
  return SHAPES.get(id);
};

export const getShapeDefaults = (id: string): Partial<EditorConfig> => {
  return SHAPES.get(id)?.defaults ?? {};
};

export const getShapeControls = (id: string): ControlDef[] => {
  return SHAPES.get(id)?.controls ?? [];
};

// Derive categories from definitions
export const getShapeCategories = (): { name: string; shapes: string[] }[] => {
  const categoryMap = new Map<string, string[]>();

  for (const def of SHAPE_DEFINITIONS) {
    if (!categoryMap.has(def.category)) {
      categoryMap.set(def.category, []);
    }
    categoryMap.get(def.category)!.push(def.id);
  }

  // Return in insertion order
  const result: { name: string; shapes: string[] }[] = [];
  const seen = new Set<string>();

  for (const def of SHAPE_DEFINITIONS) {
    if (!seen.has(def.category)) {
      seen.add(def.category);
      result.push({ name: def.category, shapes: categoryMap.get(def.category)! });
    }
  }

  return result;
};

// Export shape IDs list for quick iteration
export const ALL_SHAPE_IDS = SHAPE_DEFINITIONS.map((def) => def.id);

