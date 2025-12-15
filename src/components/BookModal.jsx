"use client";
import { X, Star, BookOpen, Share2, Heart } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookModal({ book, onClose }) {
  if (!book) return null;

  // Handle Cover URL
  const coverImage = book.CoverUrl?.url 
    ? `http://localhost:1337${book.CoverUrl.url}` 
    : (book.CoverUrl || "/placeholder.jpg");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-primary-dark w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/10 flex flex-col md:flex-row"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Side */}
          <div className="w-full md:w-2/5 relative h-64 md:h-auto bg-black">
            <Image 
              src={coverImage} 
              alt={book.Title} 
              fill 
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
          </div>

          {/* Content Side */}
          <div className="w-full md:w-3/5 p-8 flex flex-col">
            <div className="mb-1">
              <span className="text-teal text-xs font-bold tracking-wider uppercase bg-teal/10 px-2 py-1 rounded">
                {book.Genre}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">{book.Title}</h2>
            <p className="text-lg text-primary-light mb-6 font-medium">by <span className="text-white">{book.Author}</span></p>

            <div className="flex items-center gap-6 mb-8 bg-white/5 p-4 rounded-xl w-fit">
              <div className="flex items-center gap-2 text-yellow-500">
                <Star className="w-6 h-6 fill-current" />
                <span className="text-2xl font-bold text-white">{book.Rating}</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-xs text-primary-light">
                <div className="font-bold text-white">2.4k</div>
                Ratings
              </div>
            </div>

            <div className="prose prose-invert prose-sm mb-8 max-w-none">
              <p className="text-gray-300 leading-relaxed">{book.Summary}</p>
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <button className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent/20 hover:scale-[1.02]">
                <BookOpen className="w-5 h-5" /> Want to Read
              </button>
              <div className="flex gap-3">
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" /> Like
                </button>
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}