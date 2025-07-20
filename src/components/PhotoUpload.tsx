import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Photo } from './PhotoGallery';

interface PhotoUploadProps {
  onAddPhoto: (photo: Photo) => void;
  onClose: () => void;
  albums: string[];
}

export const PhotoUpload = ({ onAddPhoto, onClose, albums }: PhotoUploadProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(albums[0] || 'Personal');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
        if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ''));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (!previewUrl.trim()) return;
    
    const newPhoto: Photo = {
      id: Date.now().toString(),
      url: previewUrl,
      title: title || 'Untitled Photo',
      description: description || undefined,
      album: selectedAlbum,
    };
    
    onAddPhoto(newPhoto);
    onClose();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
        if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ''));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-card rounded-2xl shadow-elegant max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Add New Photo</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Upload Area */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Upload Photo</Label>
            
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-accent/20'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {previewUrl ? (
                <div className="space-y-4">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full max-h-48 mx-auto object-contain rounded-lg"
                  />
                  <p className="text-sm text-muted-foreground">Click to change image</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Drag and drop an image here, or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Supports JPG, PNG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-sm font-medium">
                Or paste image URL
              </Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={previewUrl.startsWith('data:') ? '' : previewUrl}
                onChange={(e) => setPreviewUrl(e.target.value)}
              />
            </div>
          </div>

          {/* Photo Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter photo title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description (optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Add a description for your photo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="album" className="text-sm font-medium">Album</Label>
              <select
                id="album"
                value={selectedAlbum}
                onChange={(e) => setSelectedAlbum(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {albums.map((album) => (
                  <option key={album} value={album}>
                    {album}
                  </option>
                ))}
                <option value="new">+ Create New Album</option>
              </select>
              {selectedAlbum === 'new' && (
                <Input
                  placeholder="Enter new album name"
                  onChange={(e) => setSelectedAlbum(e.target.value)}
                  className="mt-2"
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleUrlSubmit}
              disabled={!previewUrl}
              className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Add Photo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};