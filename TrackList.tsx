import { Music, BookOpen } from "lucide-react";
import { Track } from "@/data/album";

interface TrackListProps {
  tracks: Track[];
  currentTrackId: number | null;
  onTrackClick: (track: Track) => void;
  onLyricsClick: (trackId: number) => void;
}

export default function TrackList({
  tracks,
  currentTrackId,
  onTrackClick,
  onLyricsClick,
}: TrackListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {tracks.map((track) => (
        <div
          key={track.id}
          className={`
            group relative overflow-hidden rounded-lg p-4 text-left
            transition-all duration-300 ease-out
            ${
              currentTrackId === track.id
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-foreground hover:bg-accent hover:shadow-md"
            }
            border border-border hover:border-primary/50
          `}
        >
          <button
            onClick={() => onTrackClick(track)}
            className="w-full text-left"
          >
            <div className="flex items-start gap-3">
              <div
                className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${
                    currentTrackId === track.id
                      ? "bg-primary-foreground text-primary"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/20"
                  }
                `}
              >
                {currentTrackId === track.id ? (
                  <Music className="w-4 h-4 animate-pulse" />
                ) : (
                  <span className="text-xs font-semibold">{track.id}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium leading-tight truncate">
                  {track.title}
                </p>
                <p
                  className={`
                    text-xs mt-1
                    ${
                      currentTrackId === track.id
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }
                  `}
                >
                  Track {track.id}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLyricsClick(track.id);
                }}
                className={`
                  flex-shrink-0 p-1.5 rounded transition-all
                  ${
                    currentTrackId === track.id
                      ? "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                `}
                title="가사 보기"
              >
                <BookOpen className="w-4 h-4" />
              </button>
            </div>
          </button>

          {/* Hover indicator */}
          <div
            className={`
              absolute inset-0 opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              pointer-events-none
              ${
                currentTrackId === track.id
                  ? "opacity-100 bg-primary-foreground/10"
                  : ""
              }
            `}
          />
        </div>
      ))}
    </div>
  );
}
