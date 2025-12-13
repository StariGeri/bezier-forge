import { RadialGenerator } from './RadialGenerator';
import { BlobGenerator } from './BlobGenerator';
import { GridGenerator } from './GridGenerator';
// Batch A
import { PolygonGenerator } from './PolygonGenerator';
import { ConcentricGenerator } from './ConcentricGenerator';
import { SpiralGeometricGenerator } from './SpiralGeometricGenerator';
import { BurstGenerator } from './BurstGenerator';
import { MosaicGenerator } from './MosaicGenerator';
import { SymmetryMirrorGenerator } from './SymmetryMirrorGenerator';
// Batch B
import { FlowerGenerator } from './FlowerGenerator';
import { WaveCircleGenerator } from './WaveCircleGenerator';
import { LiquidDropGenerator } from './LiquidDropGenerator';
import { AmoebaGenerator } from './AmoebaGenerator';
import { CloudGenerator } from './CloudGenerator';
import { VineGenerator } from './VineGenerator';
// Batch C
import { CircuitGenerator } from './CircuitGenerator';
import { GlitchGenerator } from './GlitchGenerator';
import { DataBarsGenerator } from './DataBarsGenerator';
import { NetworkGenerator } from './NetworkGenerator';
import { PixelGridGenerator } from './PixelGridGenerator';
import { OrbitGenerator } from './OrbitGenerator';
// Batch D
import { IsoCubeGenerator } from './IsoCubeGenerator';
import { PyramidGenerator } from './PyramidGenerator';
import { CylinderGenerator } from './CylinderGenerator';
import { HexStackGenerator } from './HexStackGenerator';
import { TorusGenerator } from './TorusGenerator';
// Batch E
import { ArchGenerator } from './ArchGenerator';
import { PillarGenerator } from './PillarGenerator';
import { MazeGenerator } from './MazeGenerator';
import { KnotGenerator } from './KnotGenerator';
import { WeaveGenerator } from './WeaveGenerator';
import { ArrowHeadGenerator } from './ArrowHeadGenerator';
// Batch F - Abstract/Minimalist
import { CrescentGenerator } from './CrescentGenerator';
import { RippleGenerator } from './RippleGenerator';
import { FragmentGenerator } from './FragmentGenerator';
import { StripeGenerator } from './StripeGenerator';
import { DotMatrixGenerator } from './DotMatrixGenerator';
import { CrosshatchGenerator } from './CrosshatchGenerator';
// Batch G - Nature/Botanical
import { LeafGenerator } from './LeafGenerator';
import { CoralGenerator } from './CoralGenerator';
import { SeedGenerator } from './SeedGenerator';
import { MountainGenerator } from './MountainGenerator';
import { FeatherGenerator } from './FeatherGenerator';
import { ShellGenerator } from './ShellGenerator';
// Batch H - Retro/Deco
import { SunburstGenerator } from './SunburstGenerator';
import { DiamondGenerator } from './DiamondGenerator';
import { ChevronGenerator } from './ChevronGenerator';
import { BadgeGenerator } from './BadgeGenerator';
import { RosetteGenerator } from './RosetteGenerator';
import { ScallopGenerator } from './ScallopGenerator';
// Batch I - Space/Cosmic
import { StarClusterGenerator } from './StarClusterGenerator';
import { GalaxyGenerator } from './GalaxyGenerator';
import { EclipseGenerator } from './EclipseGenerator';
import { AsteroidGenerator } from './AsteroidGenerator';
import { NebulaGenerator } from './NebulaGenerator';
import { ConstellationGenerator } from './ConstellationGenerator';
// Batch J - Motion/Dynamic
import { VortexGenerator } from './VortexGenerator';
import { ShatterGenerator } from './ShatterGenerator';
import { TrailGenerator } from './TrailGenerator';
import { BounceGenerator } from './BounceGenerator';
import { PropellerGenerator } from './PropellerGenerator';
import { MorphGenerator } from './MorphGenerator';
// Batch K - Audio/Sound
import { WaveformGenerator } from './WaveformGenerator';
import { EqualizerGenerator } from './EqualizerGenerator';
import { SoundRingsGenerator } from './SoundRingsGenerator';
// Batch L - Scientific
import { DNAGenerator } from './DNAGenerator';
import { AtomGenerator } from './AtomGenerator';
import { CrystalGenerator } from './CrystalGenerator';
import { MoleculeGenerator } from './MoleculeGenerator';
// Batch M - Symbols
import { InfinityGenerator } from './InfinityGenerator';
import { ShieldGenerator } from './ShieldGenerator';
import { LightningGenerator } from './LightningGenerator';
import { TargetGenerator } from './TargetGenerator';
import { HeartGenerator } from './HeartGenerator';
import { EyeGenerator } from './EyeGenerator';
// Batch N - Cultural
import { MandalaGenerator } from './MandalaGenerator';
import { CelticGenerator } from './CelticGenerator';
import { SeigaihaGenerator } from './SeigaihaGenerator';
import { ArabesqueGenerator } from './ArabesqueGenerator';
// Batch O - Industrial
import { GearGenerator } from './GearGenerator';
import { TurbineGenerator } from './TurbineGenerator';
import { SprocketGenerator } from './SprocketGenerator';
import { PistonGenerator } from './PistonGenerator';
// Batch P - Light/Optical
import { LensFlareGenerator } from './LensFlareGenerator';
import { BokehGenerator } from './BokehGenerator';
// Batch Q - New Shapes
import { AnchorGenerator } from './AnchorGenerator';
import { SnowflakeGenerator } from './SnowflakeGenerator';
import { CompassGenerator } from './CompassGenerator';
import { HourglassGenerator } from './HourglassGenerator';
import { CrownGenerator } from './CrownGenerator';
import { EditorConfig } from '@/store/use-store';

export interface ShapeGeneratorProps {
  config?: EditorConfig;
}

export const SHAPE_REGISTRY: Record<string, React.ComponentType<ShapeGeneratorProps>> = {
  // Classics
  radial: RadialGenerator,
  blob: BlobGenerator,
  grid: GridGenerator,
  
  // Geometric
  polygon: PolygonGenerator,
  concentric: ConcentricGenerator,
  spiral: SpiralGeometricGenerator,
  burst: BurstGenerator,
  mosaic: MosaicGenerator,
  symmetry: SymmetryMirrorGenerator,
  
  // Organic
  flower: FlowerGenerator,
  wave: WaveCircleGenerator,
  liquid: LiquidDropGenerator,
  amoeba: AmoebaGenerator,
  cloud: CloudGenerator,
  vine: VineGenerator,
  
  // Tech
  circuit: CircuitGenerator,
  glitch: GlitchGenerator,
  databars: DataBarsGenerator,
  network: NetworkGenerator,
  pixel: PixelGridGenerator,
  orbit: OrbitGenerator,
  
  // 3D
  isocube: IsoCubeGenerator,
  pyramid: PyramidGenerator,
  cylinder: CylinderGenerator,
  hexstack: HexStackGenerator,
  torus: TorusGenerator,
  
  // Architectural
  arch: ArchGenerator,
  pillar: PillarGenerator,
  maze: MazeGenerator,
  knot: KnotGenerator,
  weave: WeaveGenerator,
  arrow: ArrowHeadGenerator,
  
  // Abstract/Minimalist
  crescent: CrescentGenerator,
  ripple: RippleGenerator,
  fragment: FragmentGenerator,
  stripe: StripeGenerator,
  dotmatrix: DotMatrixGenerator,
  crosshatch: CrosshatchGenerator,
  
  // Nature/Botanical
  leaf: LeafGenerator,
  coral: CoralGenerator,
  seed: SeedGenerator,
  mountain: MountainGenerator,
  feather: FeatherGenerator,
  shell: ShellGenerator,
  
  // Retro/Deco
  sunburst: SunburstGenerator,
  diamond: DiamondGenerator,
  chevron: ChevronGenerator,
  badge: BadgeGenerator,
  rosette: RosetteGenerator,
  scallop: ScallopGenerator,
  
  // Space/Cosmic
  starcluster: StarClusterGenerator,
  galaxy: GalaxyGenerator,
  eclipse: EclipseGenerator,
  asteroid: AsteroidGenerator,
  nebula: NebulaGenerator,
  constellation: ConstellationGenerator,
  
  // Motion/Dynamic
  vortex: VortexGenerator,
  shatter: ShatterGenerator,
  trail: TrailGenerator,
  bounce: BounceGenerator,
  propeller: PropellerGenerator,
  morph: MorphGenerator,
  
  // Audio/Sound
  waveform: WaveformGenerator,
  equalizer: EqualizerGenerator,
  soundrings: SoundRingsGenerator,
  
  // Scientific
  dna: DNAGenerator,
  atom: AtomGenerator,
  crystal: CrystalGenerator,
  molecule: MoleculeGenerator,
  
  // Symbols
  infinity: InfinityGenerator,
  shield: ShieldGenerator,
  lightning: LightningGenerator,
  target: TargetGenerator,
  heart: HeartGenerator,
  eye: EyeGenerator,
  
  // Cultural
  mandala: MandalaGenerator,
  celtic: CelticGenerator,
  seigaiha: SeigaihaGenerator,
  arabesque: ArabesqueGenerator,
  
  // Industrial
  gear: GearGenerator,
  turbine: TurbineGenerator,
  sprocket: SprocketGenerator,
  piston: PistonGenerator,
  
  // Light/Optical
  lensflare: LensFlareGenerator,
  bokeh: BokehGenerator,
  
  // New Shapes
  anchor: AnchorGenerator,
  snowflake: SnowflakeGenerator,
  compass: CompassGenerator,
  hourglass: HourglassGenerator,
  crown: CrownGenerator,
};

export const getShapeComponent = (id: string): React.ComponentType<ShapeGeneratorProps> => {
  return SHAPE_REGISTRY[id] || RadialGenerator;
};

export interface ShapeCategory {
  name: string;
  shapes: string[];
}

export const SHAPE_CATEGORIES: ShapeCategory[] = [
  { name: 'Classics', shapes: ['radial', 'blob', 'grid'] },
  { name: 'Geometric', shapes: ['polygon', 'concentric', 'spiral', 'burst', 'mosaic', 'symmetry'] },
  { name: 'Organic', shapes: ['flower', 'wave', 'liquid', 'amoeba', 'cloud', 'vine'] },
  { name: 'Tech', shapes: ['circuit', 'glitch', 'databars', 'network', 'pixel', 'orbit'] },
  { name: '3D', shapes: ['isocube', 'pyramid', 'cylinder', 'hexstack', 'torus'] },
  { name: 'Architectural', shapes: ['arch', 'pillar', 'maze', 'knot', 'weave', 'arrow'] },
  { name: 'Abstract', shapes: ['crescent', 'ripple', 'fragment', 'stripe', 'dotmatrix', 'crosshatch'] },
  { name: 'Nature', shapes: ['leaf', 'coral', 'seed', 'mountain', 'feather', 'shell', 'snowflake'] },
  { name: 'Retro', shapes: ['sunburst', 'diamond', 'chevron', 'badge', 'rosette', 'scallop'] },
  { name: 'Cosmic', shapes: ['starcluster', 'galaxy', 'eclipse', 'asteroid', 'nebula', 'constellation'] },
  { name: 'Motion', shapes: ['vortex', 'shatter', 'trail', 'bounce', 'propeller', 'morph'] },
  { name: 'Audio', shapes: ['waveform', 'equalizer', 'soundrings'] },
  { name: 'Scientific', shapes: ['dna', 'atom', 'crystal', 'molecule'] },
  { name: 'Symbols', shapes: ['infinity', 'shield', 'lightning', 'target', 'heart', 'eye', 'anchor', 'compass', 'hourglass', 'crown'] },
  { name: 'Cultural', shapes: ['mandala', 'celtic', 'seigaiha', 'arabesque'] },
  { name: 'Industrial', shapes: ['gear', 'turbine', 'sprocket', 'piston'] },
  { name: 'Optical', shapes: ['lensflare', 'bokeh'] },
];
