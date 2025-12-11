import React, { useState, useRef } from 'react';
import { Upload, X, Check, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  label?: string;
  className?: string;
  accept?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageChange,
  label = "Changer l'image",
  className = "",
  accept = "image/*"
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image valide');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Le fichier est trop volumineux (max 5MB)');
      return;
    }

    setError(null);
    setIsUploading(true);

    // Convert to base64 for local storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange(result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setError('Erreur lors de la lecture du fichier');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    onImageChange('');
    setError(null);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {/* Current Image Preview */}
      {currentImage && (
        <div className="relative inline-block">
          <img
            src={currentImage}
            alt="Aperçu"
            className="w-32 h-32 object-cover rounded-lg border border-gray-200"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm text-gray-600">Upload en cours...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-1">
              Cliquez pour sélectionner ou glissez une image ici
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF jusqu'à 5MB
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Success Message */}
      {!error && !isUploading && currentImage && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <Check size={16} />
          Image mise à jour avec succès
        </div>
      )}
    </div>
  );
};

export default ImageUpload;