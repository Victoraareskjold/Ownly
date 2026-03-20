"use client";

import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface Props {
  files: File[];
  setFiles: (files: File[]) => void;
  max?: number;
}

export default function ScreenshotUploader({
  files,
  setFiles,
  max = 5,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    const combined = [...files, ...picked].slice(0, max);
    setFiles(combined);
    e.target.value = "";
  };

  const remove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {files.map((file, i) => (
          <div
            key={i}
            className="relative w-28 h-20 rounded-lg overflow-hidden border border-[#1A1A1A]/[0.1] group"
          >
            <div className="relative w-full h-full">
              <Image
                src={URL.createObjectURL(file)}
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#1A1A1A]/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
            <span className="absolute bottom-1 left-1 text-[9px] text-white bg-[#1A1A1A]/50 px-1 rounded">
              {i + 1}
            </span>
          </div>
        ))}

        {files.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-28 h-20 rounded-lg border-2 border-dashed border-[#1A1A1A]/[0.12] flex flex-col items-center justify-center gap-1 text-[#1A1A1A]/30 hover:border-[#2D5BE3]/40 hover:text-[#2D5BE3]/60 transition-colors"
          >
            <ImagePlus className="w-5 h-5" />
            <span className="text-[10px] font-medium">Add photo</span>
          </button>
        )}
      </div>

      <p className="text-xs text-[#1A1A1A]/30 mt-2">
        {files.length}/{max} screenshots shown to buyers. JPG, PNG or WebP.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={handlePick}
      />
    </div>
  );
}
