"use client";

import { useState } from 'react';
import BookCard from '@/components/BookCard';
import Sidebar from '@/components/Sidebar';
import BookModal from '@/components/BookModal';
import { Sparkles, Filter, List, Search, Info } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function HomeFeed({ books }) {
  const [activeGenre, setActiveGenre] = useState("All");
  const [selectedBook, setSelectedBook] = useState(null); // Controls the Modal
  
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  // Get unique genres from data
  const genres = ["All", ...new Set(books.map(b => b.Genre).filter(Boolean))];

  // Logic: Filter by Genre AND Search Query
  const displayBooks = books.filter(book => {
    const matchesGenre = activeGenre === "All" || book.Genre === activeGenre;
    const matchesSearch = !searchQuery || 
      book.Title.toLowerCase().includes(searchQuery) || 
      book.Author.toLowerCase().includes(searchQuery);
    return matchesGenre && matchesSearch;
  });

  // Curated Lists Data
  const listopiaCollections = [
    { title: "Best Science Fiction of 2024", count: "42 books", color: "from-purple-600 to-indigo-600" },
    { title: "Books That Made Us Cry", count: "18 books", color: "from-blue-500 to-cyan-500" },
    { title: "TikTok Trends", count: "125 books", color: "from-pink-500 to-rose-500" },
    { title: "Summer Reading Guide", count: "30 books", color: "from-orange-400 to-amber-500" },
    { title: "Underrated Thrillers", count: "15 books", color: "from-red-600 to-red-800" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 relative">
      
      {/* Mock Project Banner */}
      <div className="mb-8 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-center justify-center gap-2 text-sm text-blue-200">
        <Info className="w-4 h-4" />
        <span><strong>Note:</strong> This is a mock project for portfolio demonstration purposes only.</span>
      </div>

      <div className="flex gap-12">
        
        {/* Main Content Column */}
        <div className="flex-1 overflow-hidden">
          
          {/* Listopia - Hidden when searching */}
          {!searchQuery && (
            <div className="mb-10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <List className="w-5 h-5 text-accent" /> Curated Collections (Listopia)
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {listopiaCollections.map((list, i) => (
                  <div key={i} className={`min-w-[220px] h-36 relative rounded-2xl overflow-hidden cursor-pointer group shrink-0 bg-gradient-to-br ${list.color} shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                      <h4 className="font-bold text-white text-lg leading-tight mb-1 group-hover:underline">{list.title}</h4>
                      <span className="text-xs text-white/80 font-medium bg-black/20 w-fit px-2 py-1 rounded-full">{list.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Genre Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            <Filter className="w-4 h-4 text-primary-light shrink-0 mr-2" />
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  activeGenre === genre 
                    ? "bg-teal text-white border-teal shadow-lg shadow-teal/20 scale-105" 
                    : "bg-white/5 text-primary-light border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Results Header */}
          <div className="mb-6 flex items-center justify-between">
             <h2 className="text-xl font-bold text-white flex gap-2 items-center">
               {searchQuery 
                 ? <><Search className="w-5 h-5 text-accent" /> Results for "{searchQuery}"</>
                 : <><Sparkles className="w-5 h-5 text-yellow-400" /> {activeGenre === "All" ? "Top Picks" : `${activeGenre} Books`}</>
               }
             </h2>
             <span className="text-xs text-primary-light">{displayBooks.length} results</span>
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {displayBooks.map((book, index) => (
              <BookCard 
                key={book.id} 
                book={book} 
                index={index} 
                onOpen={(b) => setSelectedBook(b)} // Passes book to modal state
              />
            ))}
          </div>

          {/* Empty State */}
          {displayBooks.length === 0 && (
            <div className="text-center py-20 text-primary-light bg-white/5 rounded-xl border border-white/5">
              <p className="text-lg">No books found matching your criteria.</p>
              <button onClick={() => {setActiveGenre("All");}} className="mt-4 text-accent hover:underline">Reset Filters</button>
            </div>
          )}
        </div>

        {/* Right Sidebar (Sticky) */}
        <div className="hidden lg:block relative">
           <div className="sticky top-24">
              <Sidebar />
           </div>
        </div>

      </div>

      {/* Modal - Appears when selectedBook is set */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}

    </div>
  );
}