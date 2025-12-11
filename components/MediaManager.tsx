import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Trash2, Search, Grid, List, Image as ImageIcon, File } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface MediaManagerProps {
  onSelectImage?: (imageUrl: string) => void;
  isModal?: boolean;
  onClose?: () => void;
}

const MediaManager: React.FC<MediaManagerProps> = ({ 
  onSelectImage, 
  isModal = false, 
  onClose 
}) => {
  const { media, addMedia, deleteMedia } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'document'>('all');

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleImageUpload = (imageUrl: string) => {
    const newMedia = {
      id: Date.now().toString(),
      name: `image-${Date.now()}.jpg`,
      url: imageUrl,
      type: 'image' as const,
      size: 0, // We can't get actual size from base64
      uploadDate: new Date().toISOString()
    };
    addMedia(newMedia);
  };

  const handleSelectImage = (imageUrl: string) => {
    if (onSelectImage) {
      onSelectImage(imageUrl);
      if (onClose) onClose();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return 'Taille inconnue';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Gestionnaire de médias</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      {/* Upload Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <ImageUpload
          onImageChange={handleImageUpload}
          label="Ajouter une nouvelle image"
        />
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les fichiers</option>
            <option value="image">Images</option>
            <option value="document">Documents</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSelectImage(item.url)}
            >
              {item.type === 'image' ? (
                <div className="aspect-square">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center bg-gray-100">
                  <File className="h-8 w-8 text-gray-400" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  {onSelectImage && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectImage(item.url);
                      }}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                    >
                      <ImageIcon size={16} />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMedia(item.id);
                    }}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-2">
                <p className="text-xs text-gray-600 truncate">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => handleSelectImage(item.url)}
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                  <File className="h-6 w-6 text-gray-400" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(item.size)} • {new Date(item.uploadDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {onSelectImage && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectImage(item.url);
                    }}
                    className="text-blue-600 hover:text-blue-700 p-1"
                  >
                    <ImageIcon size={16} />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMedia(item.id);
                  }}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun média trouvé</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Aucun résultat pour votre recherche' : 'Commencez par uploader des images'}
          </p>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
          <div className="relative bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return <div className="max-w-7xl mx-auto">{content}</div>;
};

export default MediaManager;