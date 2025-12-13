"use client";

import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockViewerProps {
    code: string;
    language: string;
    className?: string;
}

export function CodeBlockViewer({ code, language, className }: CodeBlockViewerProps) {
  return (
    <div className={`rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-2xl ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono">
        <Highlight
            theme={themes.vsDark}
            code={code}
            language={language}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style} className={className}>
                {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                    <span className="inline-block w-8 select-none opacity-30 text-right mr-4">{i + 1}</span>
                    {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                    ))}
                </div>
                ))}
            </pre>
            )}
        </Highlight>
      </div>
    </div>
  );
}

