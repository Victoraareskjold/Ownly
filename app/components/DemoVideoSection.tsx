import { getEmbedUrl } from "@/lib/helpers/getEmbedUrl";

interface DemoVideoSectionProps {
  demoUrl: string;
}

export default function DemoVideoSection({ demoUrl }: DemoVideoSectionProps) {
  return (
    <div
      className="w-full rounded-xl border border-[#1A1A1A]/[0.07] bg-[#F7F5F0] overflow-hidden mb-4 hover:border-[#2D5BE3]/30 transition-all duration-300"
      style={{ aspectRatio: "16/9" }}
    >
      <iframe
        src={getEmbedUrl(demoUrl)}
        allow="fullscreen; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
