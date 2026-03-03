"use client";

import { useEffect } from "react";

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddProductModal({
  isOpen,
  onClose,
}: AddProductModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Add product</h2>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Product title"
            className="w-full border rounded-lg px-4 py-2 text-sm"
          />

          <textarea
            placeholder="Description"
            rows={4}
            className="w-full border rounded-lg px-4 py-2 text-sm"
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border rounded-lg px-4 py-2 text-sm"
          />

          <button
            type="submit"
            className="w-full bg-[#1A1A1A] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#2D5BE3] transition-colors"
          >
            Publish product
          </button>
        </form>
      </div>
    </div>
  );
}
