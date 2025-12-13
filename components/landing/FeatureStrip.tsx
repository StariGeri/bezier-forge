import { Variable, ClipboardCopy, SlidersHorizontal } from "lucide-react";

export function FeatureStrip() {
  const features = [
    {
      icon: Variable,
      title: "Pure Math, No Clipart",
      description: "Every curve is calculated in real-time. Infinite resolution, zero artifacts."
    },
    {
      icon: ClipboardCopy,
      title: "Copy as JSX",
      description: "Export directly to a React component. Paste it into your codebase and go."
    },
    {
      icon: SlidersHorizontal,
      title: "Parametric Control",
      description: "Fine-tune tension, roundness, and chaos. You are the conductor."
    }
  ];

  return (
    <section className="bg-zinc-900 border-y border-white/10 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
            {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4 p-4 rounded-2xl hover:bg-zinc-800/50 transition-colors">
                    <div className="p-3 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-400">
                        <f.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">{f.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{f.description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
