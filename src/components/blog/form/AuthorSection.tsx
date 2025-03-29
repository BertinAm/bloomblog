'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AuthorSectionProps {
  author: {
    name: string;
    bio: string;
    imageUrl: string;
  };
  onChange: (field: string, value: string) => void;
  onImageChange: (file: File) => void;
}

const DEFAULT_AUTHOR_IMAGE = "https://images.pexels.com/photos/1590549/pexels-photo-1590549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

export default function AuthorSection({ author, onChange, onImageChange }: AuthorSectionProps) {
  const [previewUrl, setPreviewUrl] = useState(author.imageUrl || DEFAULT_AUTHOR_IMAGE);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Author Information</h3>
      
      {/* Author Image Upload */}
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-accent-rose/20 ring-2 ring-background ring-offset-2 ring-offset-background-secondary shadow-lg transition-transform hover:scale-105">
            <Image
              src={previewUrl}
              alt=""
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <div className="w-full space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="block w-full text-sm text-foreground-secondary
                file:mr-4 file:py-2.5 file:px-6
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-accent-rose/10 file:text-accent-rose
                hover:file:bg-accent-rose/20
                cursor-pointer transition-colors"
            />
            <p className="text-xs text-foreground-secondary/80 text-center">
              Recommended: Square image, at least 400x400px
            </p>
          </div>
        </div>
      </div>

      {/* Author Name */}
      <div className="space-y-2">
        <label htmlFor="authorName" className="block text-sm font-medium text-foreground-secondary">
          Author Name <span className="text-accent-rose">*</span>
        </label>
        <input
          type="text"
          id="authorName"
          value={author.name}
          onChange={(e) => onChange('author.name', e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg bg-background-secondary/30 border border-accent-rose/20 focus:border-accent-rose focus:ring-1 focus:ring-accent-rose outline-none transition-colors"
          placeholder="Enter your name"
        />
      </div>

      {/* Author Bio */}
      <div className="space-y-2">
        <label htmlFor="authorBio" className="block text-sm font-medium text-foreground-secondary">
          Author Bio <span className="text-accent-rose">*</span>
        </label>
        <textarea
          id="authorBio"
          value={author.bio}
          onChange={(e) => onChange('author.bio', e.target.value)}
          required
          rows={3}
          className="w-full px-4 py-2 rounded-lg bg-background-secondary/30 border border-accent-rose/20 focus:border-accent-rose focus:ring-1 focus:ring-accent-rose outline-none transition-colors resize-none"
          placeholder="Write a brief bio about yourself"
        />
      </div>
    </div>
  );
} 