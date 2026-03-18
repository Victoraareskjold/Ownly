import { Screenshot } from "@/lib/types/product";
import Image from "next/image";

interface ScreenshotSectionProps {
  screenshots: Screenshot[];
  activeScreenshot: number;
  setActiveScreenshot: (index: number) => void;
}

export default function ScreenshotSection({
  screenshots,
  activeScreenshot,
  setActiveScreenshot,
}: ScreenshotSectionProps) {
  return (
    <div>
      {/* Main image */}
      <div
        className="relative w-full rounded-xl border border-[#1A1A1A]/[0.07] bg-white/60 overflow-hidden mb-2"
        style={{ aspectRatio: "16/9" }}
      >
        <Image
          src={screenshots[activeScreenshot].url}
          alt={`Screenshot ${activeScreenshot + 1}`}
          fill
          className="object-contain"
        />
      </div>

      {/* Thumbnails */}
      {screenshots.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {screenshots.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveScreenshot(i)}
              className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-150 ${
                activeScreenshot === i
                  ? "border-[#2D5BE3]"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <div className="relative w-full h-full">
                <Image src={s.url} alt="" fill className="object-contain" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
