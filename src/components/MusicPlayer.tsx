import { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, X, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

const sampleTracks: Track[] = [
  { id: '1', title: 'Ambient Slideshow', artist: 'Nature Sounds', duration: '3:24' },
  { id: '2', title: 'Peaceful Moments', artist: 'Instrumental', duration: '4:12' },
  { id: '3', title: 'Memory Lane', artist: 'Acoustic', duration: '2:58' },
  { id: '4', title: 'Gentle Breeze', artist: 'Piano Solo', duration: '3:45' },
];

interface MusicPlayerProps {
  onClose: () => void;
}

export const MusicPlayer = ({ onClose }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState([0]);
  const [volume, setVolume] = useState([75]);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, you would control actual audio playback here
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % sampleTracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + sampleTracks.length) % sampleTracks.length);
  };

  const currentTrackInfo = sampleTracks[currentTrack];

  return (
    <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-elegant p-4 w-80 animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <Music className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-medium text-sm">Music Player</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="w-8 h-8">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Current Track Info */}
      <div className="text-center mb-4">
        <h3 className="font-semibold text-foreground truncate">{currentTrackInfo.title}</h3>
        <p className="text-sm text-muted-foreground truncate">{currentTrackInfo.artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <Slider
          value={progress}
          onValueChange={setProgress}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0:00</span>
          <span>{currentTrackInfo.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <Button variant="ghost" size="icon" onClick={prevTrack}>
          <SkipBack className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </Button>
        
        <Button variant="ghost" size="icon" onClick={nextTrack}>
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="w-4 h-4 text-muted-foreground" />
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
          className="flex-1"
        />
      </div>

      {/* Playlist Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowPlaylist(!showPlaylist)}
        className="w-full"
      >
        {showPlaylist ? 'Hide' : 'Show'} Playlist ({sampleTracks.length})
      </Button>

      {/* Playlist */}
      {showPlaylist && (
        <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
          {sampleTracks.map((track, index) => (
            <div
              key={track.id}
              onClick={() => setCurrentTrack(index)}
              className={`p-2 rounded-lg cursor-pointer transition-colors ${
                index === currentTrack
                  ? 'bg-primary/10 border border-primary/20'
                  : 'hover:bg-accent'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{track.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </div>
                <span className="text-xs text-muted-foreground ml-2">{track.duration}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};