import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Photo } from './PhotoGallery';

interface SlideshowProps {
  photos: Photo[];
  onClose: () => void;
  startIndex?: number;
}

export const Slideshow = ({ photos, onClose, startIndex = 0 }: SlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const nextPhoto = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const resetSlideshow = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  // Auto-advance slideshow
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextPhoto();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, nextPhoto]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          prevPhoto();
          break;
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextPhoto();
          break;
        case 'Escape':
          onClose();
          break;
        case 'Enter':
          setIsPlaying(!isPlaying);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPhoto, prevPhoto, onClose, isPlaying]);

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background blur */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
      
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-white hover:bg-white/10"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-4 bg-black/30 backdrop-blur-sm rounded-full px-6 py-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={resetSlideshow}
          className="text-white hover:bg-white/10"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={prevPhoto}
          className="text-white hover:bg-white/10"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white hover:bg-white/10"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextPhoto}
          className="text-white hover:bg-white/10"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        <div className="text-white text-sm ml-4">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Main image */}
      <div className="relative max-w-6xl max-h-[80vh] mx-auto">
        <img
          src={currentPhoto.url}
          alt={currentPhoto.title}
          className={`max-w-full max-h-full object-contain transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Photo info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h2 className="text-white text-xl font-semibold mb-2">{currentPhoto.title}</h2>
          {currentPhoto.description && (
            <p className="text-white/80">{currentPhoto.description}</p>
          )}
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevPhoto}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 w-12 h-12"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextPhoto}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 w-12 h-12"
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Progress indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {photos.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};