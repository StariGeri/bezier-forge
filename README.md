<p align="center">
  <h1 align="center">BezierForge</h1>
  <p align="center">
    <strong>The generative SVG logo engine for developers, designers and everyone</strong>
  </p>
  <p align="center">
    Stop dragging pixels. Start forging parameters.
  </p>
</p>

---

BezierForge is an open-source, browser-based tool for creating unique, algorithmically-generated SVG logos and graphics. Every shape is computed in real-time using mathematical formulas—no static assets, no clipart, just pure parametric design.

## ✨ Features

- **80+ Generative Shape Types** — From geometric patterns to organic blobs, cosmic effects to cultural motifs
- **Real-Time Parameter Control** — Adjust colors, stroke width, rotation, complexity, and more with instant visual feedback
- **Seeded Randomization** — Generate infinite variations while maintaining reproducibility
- **Export to SVG & PNG** — Download at resolutions from 32×32 to 4096×4096
- **Zero Backend Required** — Everything runs client-side in the browser
- **Dark Mode Interface** — A developer-friendly, IDE-inspired UI

## 🎨 Shape Categories

| Category | Examples |
|----------|----------|
| **Geometric** | Polygon, Concentric, Spiral, Burst, Mosaic, Symmetry |
| **Organic** | Flower, Wave, Liquid Drop, Amoeba, Cloud, Vine |
| **Tech** | Circuit, Glitch, Data Bars, Network, Pixel Grid, Orbit |
| **3D** | Isometric Cube, Pyramid, Cylinder, Hex Stack, Torus |
| **Architectural** | Arch, Pillar, Maze, Knot, Weave, Arrow |
| **Abstract** | Crescent, Ripple, Fragment, Stripe, Dot Matrix, Crosshatch |
| **Nature** | Leaf, Coral, Seed, Mountain, Feather, Shell |
| **Retro/Deco** | Sunburst, Diamond, Chevron, Badge, Rosette, Scallop |
| **Space/Cosmic** | Star Cluster, Galaxy, Eclipse, Asteroid, Nebula, Constellation |
| **Motion** | Vortex, Shatter, Trail, Bounce, Propeller, Morph |
| **Audio** | Waveform, Equalizer, Sound Rings |
| **Scientific** | DNA, Atom, Crystal, Molecule |
| **Symbols** | Infinity, Shield, Lightning, Target, Heart, Eye |
| **Cultural** | Mandala, Celtic, Seigaiha, Arabesque |
| **Industrial** | Gear, Turbine, Sprocket, Piston |
| **Light/Optical** | Lens Flare, Bokeh |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/StariGeri/bezier-forge.git
cd bezier-forge

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **SVG Generation:** [d3-shape](https://github.com/d3/d3-shape), [@georgedoescode/spline](https://github.com/georgedoescode/spline)
- **Color Manipulation:** [colord](https://github.com/omgovich/colord)

## 📁 Project Structure

```
bezier-forge/
├── app/
│   ├── page.tsx              # Landing page
│   ├── gallery/page.tsx      # Shape gallery browser
│   └── editor/[shapeId]/     # Parametric shape editor
├── components/
│   ├── shapes/               # 80+ generative shape components
│   │   ├── ShapeRegistry.tsx # Central shape registration
│   │   ├── BlobGenerator.tsx
│   │   ├── RadialGenerator.tsx
│   │   └── ...
│   ├── editor-ui/            # Editor interface components
│   │   ├── Canvas.tsx
│   │   └── ControlPanel.tsx
│   ├── landing/              # Landing page sections
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── geometry.ts           # Math utilities (points, rotations)
│   ├── spline.ts             # Catmull-Rom spline generation
│   ├── random.ts             # Seeded pseudo-random number generator
│   └── download.ts           # SVG/PNG export functions
├── store/
│   └── use-store.ts          # Zustand global state
└── docs/                     # Design documentation
```

## 🎯 How It Works

BezierForge treats SVGs as **parametric components** rather than static images:

1. **State-Driven:** Shape parameters (colors, count, rotation, seed) are stored in Zustand
2. **Math-Based Generation:** Shapes are computed using geometric algorithms, not static paths
3. **Spline Smoothing:** Catmull-Rom splines create organic curves from point arrays
4. **Client-Side Export:** SVG serialization and canvas rendering happen entirely in the browser

```tsx
// Example: A radial shape generator
export const RadialGenerator = () => {
  const { config } = useEditorStore();
  const { count, radius, rotation, primaryColor } = config;
  
  const items = Array.from({ length: count });

  return (
    <svg viewBox="0 0 100 100">
      <g transform={`translate(50, 50) rotate(${rotation})`}>
        {items.map((_, i) => (
          <ellipse
            key={i}
            cx={radius}
            cy="0"
            rx="10"
            ry="4"
            fill={primaryColor}
            transform={`rotate(${(360 / count) * i})`}
          />
        ))}
      </g>
    </svg>
  );
};
```

## ➕ Adding New Shapes

1. Create a new generator component in `components/shapes/`:

```tsx
// components/shapes/MyShapeGenerator.tsx
"use client";

import { useEditorStore } from "@/store/use-store";

export const MyShapeGenerator = () => {
  const { config } = useEditorStore();
  // Use config values to generate your shape
  
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Your generative SVG elements */}
    </svg>
  );
};
```

2. Register it in `components/shapes/ShapeRegistry.tsx`:

```tsx
import { MyShapeGenerator } from './MyShapeGenerator';

export const SHAPE_REGISTRY: Record<string, React.ComponentType> = {
  // ...existing shapes
  myshape: MyShapeGenerator,
};
```

3. The shape will automatically appear in the gallery and be accessible at `/editor/myshape`.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-shape`
3. **Commit** your changes: `git commit -m 'Add amazing new shape generator'`
4. **Push** to the branch: `git push origin feature/amazing-shape`
5. **Open** a Pull Request

### Contribution Ideas

- Add new shape generators
- Improve existing shape algorithms
- Enhance the editor UI/UX
- Add new export formats (JSX, CSS, etc.)
- Improve mobile responsiveness
- Add shape presets/templates

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [georgedoescode](https://github.com/georgedoescode) for the spline library
- [shadcn](https://github.com/shadcn) for the beautiful UI components
- The D3.js team for d3-shape

---

<p align="center">
  <sub>Built with Next.js, Tailwind CSS, and Zustand</sub>
</p>
