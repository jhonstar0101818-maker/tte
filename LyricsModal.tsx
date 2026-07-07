import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackTitle: string;
  lyrics: string;
}

export default function LyricsModal({
  isOpen,
  onClose,
  trackTitle,
  lyrics,
}: LyricsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 bg-background border-b border-border px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <DialogTitle
              className="text-xl"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              {trackTitle}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[calc(80vh-100px)]">
          <div className="px-6 py-6 space-y-4">
            {lyrics.split("\n").map((line, index) => (
              <p
                key={index}
                className={`${
                  line.trim() === ""
                    ? "h-2"
                    : "text-foreground/90 leading-relaxed font-light"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
