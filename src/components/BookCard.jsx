"use client";

import Image from 'next/image';
import { Star } from 'lucide-react';

export default function BookCard({ book, onOpen }) {
  // Handle Cover URL logic:
  // 1. If it's a direct string (from our local JSON/Firebase), use it.
  // 2. If it's from Strapi (object), grab the .url.
  // 3. Fallback to placeholder.
  let coverImage = "/placeholder.jpg";
  if (typeof book.CoverUrl === 'string') {
    coverImage = book.CoverUrl;
  } else if (book.CoverUrl?.url) {
    coverImage = `http://localhost:1337${book.CoverUrl.url}`;
  }

  return (
    <div 
      onClick={() => onOpen && onOpen(book)}
      className="group cursor-pointer flex flex-col bg-primary-dark rounded-lg overflow-hidden border border-white/5 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-full"
    >
      {/* Image Container - Constrained to 2:3 Aspect Ratio for standard book look */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-black">
        <Image 
          src={coverImage} 
          alt={book.Title || "Book Cover"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          sizes="(max-width: 768px) 50vw, 20vw"
        />
        
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />

        {/* Genre Tag Overlay (Top Left) */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
             {book.Genre}
           </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-bold text-sm text-white leading-tight mb-1 line-clamp-2 group-hover:text-accent transition-colors">
          {book.Title}
        </h3>
        
        {/* Author */}
        <p className="text-xs text-primary-light mb-2 line-clamp-1">
          {book.Author}
        </p>
        
        {/* Rating Footer */}
        <div className="mt-auto flex items-center gap-1 text-yellow-500">
          <Star className="w-3 h-3 fill-current" />
          <span className="font-bold text-xs text-white">{book.Rating}</span>
        </div>
      </div>
    </div>
  );
}