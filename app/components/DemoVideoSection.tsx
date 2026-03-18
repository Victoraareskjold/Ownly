import { getEmbedUrl } from "@/lib/helpers/getEmbedUrl";

interface DemoVideoSectionProps {
  demoUrl: string;
  playVideo: boolean;
  setPlayVideo: (value: boolean) => void;
}
export default function DemoVideoSection({
  demoUrl,
  playVideo,
  setPlayVideo,
}: DemoVideoSectionProps) {
  return (
    <div
      className="w-full rounded-xl border border-[#1A1A1A]/[0.07] bg-[#F7F5F0] flex items-center justify-center cursor-pointer group mb-4 overflow-hidden hover:border-[#2D5BE3]/30 transition-all duration-300"
      style={{ aspectRatio: "16/9" }}
      onClick={() => {
        if (!playVideo) setPlayVideo(true);
      }}
    >
      {playVideo ? (
        <iframe
          src={getEmbedUrl(demoUrl!)}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#1A1A1A] group-hover:bg-[#2D5BE3] transition-colors duration-300 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </div>
          <p className="text-[#1A1A1A]/40 text-sm font-medium group-hover:text-[#2D5BE3] transition-colors">
            Watch demo
          </p>
        </div>
      )}
    </div>
  );
}
