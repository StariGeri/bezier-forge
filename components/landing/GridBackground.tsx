import React from "react";

export function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-zinc-950">
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
    </div>
  );
}
