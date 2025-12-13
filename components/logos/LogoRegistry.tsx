import { ChevronStackLogo } from './ChevronStackLogo';
import { QuadPetalLogo } from './QuadPetalLogo';
import { DoubleCircleLogo } from './DoubleCircleLogo';
import { BoldELogo } from './BoldELogo';
import { RoundedXLogo } from './RoundedXLogo';
import { DonutRingLogo } from './DonutRingLogo';
import { TargetDotLogo } from './TargetDotLogo';
import { BullseyeRingsLogo } from './BullseyeRingsLogo';
import { DiamondStarLogo } from './DiamondStarLogo';
// Batch 2
import { PinwheelLogo } from './PinwheelLogo';
import { CrossCurveLogo } from './CrossCurveLogo';
import { StarSparkLogo } from './StarSparkLogo';
import { HexArrowLogo } from './HexArrowLogo';
import { ExpandArrowsLogo } from './ExpandArrowsLogo';
import { LinkSquareLogo } from './LinkSquareLogo';
// Batch 3 - SVG Variations
import { SpinnerQuadLogo } from './SpinnerQuadLogo';
import { SpinnerDuoLogo } from './SpinnerDuoLogo';
import { StarFrameLogo } from './StarFrameLogo';
import { StarCutoutLogo } from './StarCutoutLogo';
import { WaveCurveLogo } from './WaveCurveLogo';
// Batch 4 - Variations
import { WaveCurveSingleLogo } from './WaveCurveSingleLogo';
import { WaveCurveTripleLogo } from './WaveCurveTripleLogo';
import { StarFrameDoubleLogo } from './StarFrameDoubleLogo';
import { StarFrameTightLogo } from './StarFrameTightLogo';
import { PillStackLogo } from './PillStackLogo';
import { PillFanLogo } from './PillFanLogo';
// Batch 5 - Chain/Curve Variations
import { ChainLinkLogo } from './ChainLinkLogo';
import { ChainSingleLogo } from './ChainSingleLogo';
import { EightLogo } from './EightLogo';
import { SerpentLogo } from './SerpentLogo';
import { WaveBarsLogo } from './WaveBarsLogo';
import { HelixLogo } from './HelixLogo';
// Batch 6 - Bolt/Diagonal Variations
import { BoltStackLogo } from './BoltStackLogo';
import { BoltSingleLogo } from './BoltSingleLogo';
import { BoltTripleLogo } from './BoltTripleLogo';
import { ArrowDualLogo } from './ArrowDualLogo';
import { DiagonalBarsLogo } from './DiagonalBarsLogo';
import { ZigzagLogo } from './ZigzagLogo';
import { LayerStackLogo } from './LayerStackLogo';

import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const LOGO_REGISTRY: Record<string, React.ComponentType<ShapeGeneratorProps>> = {
  // Batch 1
  chevronstack: ChevronStackLogo,
  quadpetal: QuadPetalLogo,
  doublecircle: DoubleCircleLogo,
  bolde: BoldELogo,
  roundedx: RoundedXLogo,
  donutring: DonutRingLogo,
  targetdot: TargetDotLogo,
  bullseyerings: BullseyeRingsLogo,
  diamondstar: DiamondStarLogo,
  
  // Batch 2
  pinwheel: PinwheelLogo,
  crosscurve: CrossCurveLogo,
  starspark: StarSparkLogo,
  hexarrow: HexArrowLogo,
  expandarrows: ExpandArrowsLogo,
  linksquare: LinkSquareLogo,
  
  // Batch 3 - SVG Variations
  spinnerquad: SpinnerQuadLogo,
  spinnerduo: SpinnerDuoLogo,
  starframe: StarFrameLogo,
  starcutout: StarCutoutLogo,
  wavecurve: WaveCurveLogo,
  
  // Batch 4 - Variations
  wavecurvesingle: WaveCurveSingleLogo,
  wavecurvetriple: WaveCurveTripleLogo,
  starframedouble: StarFrameDoubleLogo,
  starframetight: StarFrameTightLogo,
  pillstack: PillStackLogo,
  pillfan: PillFanLogo,
  
  // Batch 5 - Chain/Curve Variations
  chainlink: ChainLinkLogo,
  chainsingle: ChainSingleLogo,
  eight: EightLogo,
  serpent: SerpentLogo,
  wavebars: WaveBarsLogo,
  helix: HelixLogo,
  
  // Batch 6 - Bolt/Diagonal Variations
  boltstack: BoltStackLogo,
  boltsingle: BoltSingleLogo,
  bolttriple: BoltTripleLogo,
  arrowdual: ArrowDualLogo,
  diagonalbars: DiagonalBarsLogo,
  zigzag: ZigzagLogo,
  layerstack: LayerStackLogo,
};

export const getLogoComponent = (id: string): React.ComponentType<ShapeGeneratorProps> | undefined => {
  return LOGO_REGISTRY[id];
};
