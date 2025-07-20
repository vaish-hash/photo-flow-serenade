import { useState } from 'react';
import { Play, Plus, Music, Grid, Eye } from 'lucide-react';
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
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
    title: 'Mountain Sunset',
    description: 'Beautiful sunset over the mountains',
    album: 'Nature'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    title: 'Portrait Session',
    description: 'Natural light portrait photography',
    album: 'Portraits'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
    title: 'Modern Living',
    description: 'Contemporary interior design',
    album: 'Home'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    title: 'Wildlife',
    description: 'Deer in their natural habitat',
    album: 'Nature'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop',
    title: 'Feline Friend',
    description: 'Peaceful cat moment',
    album: 'Pets'
  },
];

export const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<string>('All');

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

  if (showSlideshow) {
    return (
      <Slideshow 
        photos={filteredPhotos} 
        onClose={handleCloseSlideshow}
        startIndex={selectedPhoto || 0}
      />
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
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
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