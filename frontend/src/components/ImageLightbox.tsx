'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  title?: string;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
  title,
}: ImageLightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && images.length > 1) {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight' && images.length > 1) {
        setCurrentIndex((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, images.length, onClose, setCurrentIndex]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 select-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200 z-50 focus:outline-none"
          aria-label="Close image preview"
        >
          <X size={26} strokeWidth={2.5} />
        </button>

        {/* Counter and Title */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white/90 z-50 pointer-events-none">
          {images.length > 1 && (
            <span className="text-xs sm:text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full border border-white/10">
              {currentIndex + 1} / {images.length}
            </span>
          )}
          {title && (
            <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-xs sm:max-w-md truncate">
              {title}
            </p>
          )}
        </div>

        {/* Left Arrow */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-200 z-50 focus:outline-none"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
        )}

        {/* Right Arrow */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-200 z-50 focus:outline-none"
            aria-label="Next image"
          >
            <ChevronRight size={28} strokeWidth={2.5} />
          </button>
        )}

        {/* Image Display */}
        <motion.div
          key={currentImage}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[82vh] max-w-[90vw] flex items-center justify-center"
        >
          <img
            src={currentImage}
            alt={title || 'Full size image'}
            className="max-h-[82vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />
        </motion.div>

        {/* Thumbnail Strip for Albums with > 1 image */}
        {images.length > 1 && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 max-w-[90vw] overflow-x-auto py-2 px-3 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 z-50 scrollbar-none"
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                  currentIndex === i
                    ? 'border-white scale-105 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

