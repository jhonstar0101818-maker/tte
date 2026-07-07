import { useState } from "react";
import { Music } from "lucide-react";
import TrackList from "@/components/TrackList";
import MusicPlayer from "@/components/MusicPlayer";
import LyricsModal from "@/components/LyricsModal";
import { albumData, Track } from "@/data/album";
import { getLyricsByTrackId } from "@/data/lyrics";

/**
 * FROM MIDNIGHT TO SUNRISE 앨범 플레이어
 * 디자인: 감성적 미니멀리즘 + 인터랙티브 플레이어
 * - 앨범 커버 이미지 표시
 * - 11개 곡 목록 (클릭 가능 + 가사 보기)
 * - 하단 플레이어 (재생/일시정지/이전/다음)
 * - 가사 모달 (곡 선택 시 표시)
 */

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [showLyrics, setShowLyrics] = useState(false);
  const [selectedLyricsTrackId, setSelectedLyricsTrackId] = useState<
    number | null
  >(null);

  const handleTrackClick = (track: Track) => {
    setCurrentTrack(track);
  };

  const handleLyricsClick = (trackId: number) => {
    setSelectedLyricsTrackId(trackId);
    setShowLyrics(true);
  };

  const selectedTrack = albumData.tracks.find(
    (t) => t.id === selectedLyricsTrackId
  );
  const selectedLyrics = selectedLyricsTrackId
    ? getLyricsByTrackId(selectedLyricsTrackId)
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground pb-40">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center gap-3">
          <Music className="w-6 h-6 text-primary" />
          <h1 className="text-lg font-semibold">FROM MIDNIGHT TO SUNRISE</h1>
        </div>
      </header>

      <main className="flex flex-col">
        {/* Album Cover Section */}
        <section className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {/* Album Cover Image */}
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={albumData.coverImage}
                    alt={albumData.title}
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-center space-y-1">
                  <h2
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                  >
                    {albumData.title}
                  </h2>
                  <p className="text-sm text-primary font-medium">
                    {albumData.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {albumData.artist}
                  </p>
                </div>
              </div>
            </div>

            {/* Album Info & Track List */}
            <div className="md:col-span-2 space-y-8">
              {/* Album Description */}
              <div className="space-y-4">
                <h3
                  className="text-xl font-semibold"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  앨범 정보
                </h3>
                <p className="text-foreground/80 leading-relaxed font-light">
                  {albumData.description}
                </p>
              </div>

              {/* Track List */}
              <div className="space-y-4">
                <h3
                  className="text-xl font-semibold"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  곡 목록
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  곡 제목을 클릭하면 재생되며, 📖 버튼으로 가사를 볼 수 있습니다
                </p>
                <TrackList
                  tracks={albumData.tracks}
                  currentTrackId={currentTrack?.id ?? null}
                  onTrackClick={handleTrackClick}
                  onLyricsClick={handleLyricsClick}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="container py-12 md:py-16 border-t border-border">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3
              className="text-2xl font-semibold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              이 앨범에 대해
            </h3>
            <p className="text-foreground/80 leading-relaxed font-light">
              "FROM MIDNIGHT TO SUNRISE"는 자정부터 새벽까지의 감정의 여정을 담은
              11곡의 감성 앨범입니다. 각 곡은 일상 속의 작은 순간들과 깊은 감정들을
              섬세하게 표현하고 있습니다. ENFP의 자유로운 영혼과 Suno AI의 창의적인
              음악 제작이 만나 탄생한 이 앨범을 통해 당신의 밤을 더 특별하게 만들어
              보세요.
            </p>
          </div>
        </section>
      </main>

      {/* Music Player */}
      {currentTrack && (
        <MusicPlayer
          currentTrack={currentTrack}
          tracks={albumData.tracks}
          onTrackChange={handleTrackClick}
        />
      )}

      {/* Lyrics Modal */}
      {selectedTrack && selectedLyrics && (
        <LyricsModal
          isOpen={showLyrics}
          onClose={() => setShowLyrics(false)}
          trackTitle={selectedTrack.title}
          lyrics={selectedLyrics}
        />
      )}
    </div>
  );
}
