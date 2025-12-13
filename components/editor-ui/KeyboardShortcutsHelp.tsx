import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard, HelpCircle } from "lucide-react";

export const KeyboardShortcutsHelp = () => {
  const shortcuts = [
    { key: "R", description: "Randomize current shape" },
    { key: "E", description: "Download SVG" },
    { key: "⌘+Shift+C", description: "Copy SVG to clipboard" },
    { key: "← / →", description: "Adjust rotation (Shift for 10°)" },
    { key: "+ / -", description: "Adjust scale" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-zinc-900">
          <HelpCircle size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Boost your workflow with these hotkeys.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {shortcuts.map((shortcut) => (
            <div key={shortcut.key} className="grid grid-cols-2 items-center gap-4">
              <div className="flex justify-end">
                <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-zinc-100 px-2 font-mono text-[10px] font-medium text-zinc-600 opacity-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                  {shortcut.key}
                </kbd>
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {shortcut.description}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

