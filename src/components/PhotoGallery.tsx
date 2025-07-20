import { useState } from 'react';
import { Play, Plus, Music, Grid, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slideshow } from './Slideshow';
import { PhotoUpload } from './PhotoUpload';
import { MusicPlayer } from './MusicPlayer';

export interface Photo {
  id: string;
  url: string;
  title: string;
  description?: string;
  album: string;
}

const initialPhotos: Photo[] = [
  // Nature Album
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
    title: 'Mountain Sunset',
    description: 'Beautiful sunset over the mountains',
    album: 'Nature'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    title: 'Wildlife',
    description: 'Deer in their natural habitat',
    album: 'Nature'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop',
    title: 'Ocean Wave',
    description: 'Powerful ocean waves at the beach',
    album: 'Nature'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop',
    title: 'Orange Flowers',
    description: 'Vibrant orange wildflowers',
    album: 'Nature'
  },
  
  // Portraits Album
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    title: 'Portrait Session',
    description: 'Natural light portrait photography',
    album: 'Portraits'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1494790108755-2616b612b7e3?w=800&h=600&fit=crop',
    title: 'Studio Portrait',
    description: 'Professional studio lighting',
    album: 'Portraits'
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    title: 'Candid Moment',
    description: 'Natural expression captured',
    album: 'Portraits'
  },
  
  // Home Album
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
    title: 'Modern Living',
    description: 'Contemporary interior design',
    album: 'Home'
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    title: 'Cozy Bedroom',
    description: 'Minimalist bedroom design',
    album: 'Home'
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    title: 'Kitchen Space',
    description: 'Modern kitchen with island',
    album: 'Home'
  },
  
  // Pets Album
  {
    id: '11',
    url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop',
    title: 'Feline Friend',
    description: 'Peaceful cat moment',
    album: 'Pets'
  },
  {
    id: '12',
    url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop',
    title: 'Golden Retriever',
    description: 'Happy dog in the park',
    album: 'Pets'
  },
  {
    id: '13',
    url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop',
    title: 'Playful Kitten',
    description: 'Kitten playing with toys',
    album: 'Pets'
  },
  
  // Travel Album
  {
    id: '14',
    url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    title: 'City Skyline',
    description: 'Urban architecture at dusk',
    album: 'Travel'
  },
  {
    id: '15',
    url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d0da27?w=800&h=600&fit=crop',
    title: 'Beach Paradise',
    description: 'Tropical beach vacation',
    album: 'Travel'
  },
  
  // Events Album
  {
    id: '16',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    title: 'Wedding Celebration',
    description: 'Beautiful wedding ceremony',
    album: 'Events'
  },
  {
    id: '17',
    url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop',
    title: 'Birthday Party',
    description: 'Fun birthday celebration',
    album: 'Events'
  },
];

export const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<string>('All');
  const [viewingPhoto, setViewingPhoto] = useState<Photo | null>(null);

  const albums = ['All', ...Array.from(new Set(photos.map(photo => photo.album)))];
  const filteredPhotos = selectedAlbum === 'All' ? photos : photos.filter(photo => photo.album === selectedAlbum);

  const handleAddPhoto = (newPhoto: Photo) => {
    setPhotos(prev => [...prev, newPhoto]);
  };

  const handleStartSlideshow = () => {
    setShowSlideshow(true);
    setShowMusicPlayer(true);
  };

  const handleCloseSlideshow = () => {
    setShowSlideshow(false);
  };

  const handleViewPhoto = (photo: Photo, event: React.MouseEvent) => {
    event.stopPropagation();
    setViewingPhoto(photo);
  };

  if (showSlideshow) {
    return (
      <Slideshow 
        photos={filteredPhotos} 
        onClose={handleCloseSlideshow}
        startIndex={selectedPhoto || 0}
      />
    );
  }

  if (viewingPhoto) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
          <img
            src={viewingPhoto.url}
            alt={viewingPhoto.title}
            className="w-full h-full object-contain rounded-lg"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewingPhoto(null)}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
          >
            <X className="w-6 h-6" />
          </Button>
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-white font-semibold text-lg">{viewingPhoto.title}</h3>
            {viewingPhoto.description && (
              <p className="text-white/80 text-sm mt-1">{viewingPhoto.description}</p>
            )}
            <p className="text-white/60 text-xs mt-2">Album: {viewingPhoto.album}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Grid className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Photo Flow</h1>
                <p className="text-sm text-muted-foreground">{filteredPhotos.length} photos in {selectedAlbum}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowMusicPlayer(!showMusicPlayer)}
                className="gap-2"
              >
                <Music className="w-4 h-4" />
                Music
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowUpload(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Photos
              </Button>
              <Button
                onClick={handleStartSlideshow}
                className="gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                Slideshow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Music Player */}
      {showMusicPlayer && (
        <div className="fixed top-20 right-6 z-20">
          <MusicPlayer onClose={() => setShowMusicPlayer(false)} />
        </div>
      )}

      {/* Album Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {albums.map((album) => (
            <Button
              key={album}
              variant={selectedAlbum === album ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedAlbum(album)}
              className="whitespace-nowrap"
            >
              {album}
            </Button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelectedPhoto(index)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-semibold text-white text-sm mb-1">{photo.title}</h3>
                  {photo.description && (
                    <p className="text-white/80 text-xs">{photo.description}</p>
                  )}
                </div>
                
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleViewPhoto(photo, e)}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Eye className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <PhotoUpload
          onAddPhoto={handleAddPhoto}
          onClose={() => setShowUpload(false)}
          albums={albums.filter(album => album !== 'All')}
        />
      )}
    </div>
  );
};