import { getBook, getBooks } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowLeft, BookOpen, MessageSquare, ThumbsUp, Share2 } from 'lucide-react';

export async function generateMetadata({ params }) {
  const book = await getBook(params.id);
  return { title: book ? `${book.Title} | Goodreads` : 'Book Not Found' };
}

export default async function BookDetails({ params }) {
  const book = await getBook(params.id);
  const allBooks = await getBooks();
  
  if (!book) return <div className="p-20 text-white text-center">Book not found</div>;

  // --- IDEA 3: RECOMMENDATION LOGIC ---
  // 1. Filter by same genre
  // 2. Exclude the current book
  // 3. Slice the first 4 results
  let relatedBooks = allBooks.filter(b => b.Genre === book.Genre && b.id !== book.id);
  
  // Fallback: If no books in same genre, just show random others
  if (relatedBooks.length === 0) {
    relatedBooks = allBooks.filter(b => b.id !== book.id);
  }
  const recommendations = relatedBooks.slice(0, 4);

  return (
    <main className="min-h-screen pb-20 bg-primary">
       {/* Backdrop Blur Effect */}
       <div className="relative h-[40vh] w-full overflow-hidden border-b border-white/5">
          <Image src={book.CoverUrl} alt="bg" fill className="object-cover opacity-20 blur-3xl scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
       </div>

       <div className="container mx-auto px-4 -mt-48 relative z-10">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors backdrop-blur-md bg-black/20 px-4 py-2 rounded-full font-medium"><ArrowLeft className="w-4 h-4 mr-2"/> Back to Feed</Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             {/* Left Column: Cover & Sticky Actions */}
             <div className="lg:col-span-3 flex flex-col gap-6">
               <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
                 <Image src={book.CoverUrl} fill alt={book.Title} className="object-cover" />
               </div>
               
               <div className="flex flex-col gap-3">
                 <button className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent/20">
                    <BookOpen className="w-5 h-5" /> Want to Read
                 </button>
                 <div className="flex gap-2">
                    <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-lg border border-white/10 transition-colors">
                        Preview
                    </button>
                    <button className="bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-lg border border-white/10 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                 </div>
               </div>
             </div>

             {/* Right Column: Content */}
             <div className="lg:col-span-9 pt-4 lg:pt-12">
                <div className="flex items-center gap-4 mb-4">
                   <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">{book.Title}</h1>
                </div>
                <p className="text-2xl text-gray-300 mb-6 font-light">by <span className="text-white font-bold border-b border-accent/50 pb-1">{book.Author}</span></p>
                
                {/* Stats Row */}
                <div className="flex items-center gap-8 mb-8 border-y border-white/10 py-4 bg-white/5 px-6 rounded-xl backdrop-blur-sm">
                   <div className="flex items-center gap-2">
                      <div className="flex text-yellow-500"><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="w-5 h-5"/></div>
                      <span className="text-xl font-bold text-white">{book.Rating}</span>
                   </div>
                   <div className="w-px h-8 bg-white/10"></div>
                   <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Genre</span>
                      <span className="text-teal font-medium">{book.Genre}</span>
                   </div>
                   <div className="w-px h-8 bg-white/10"></div>
                   <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Pages</span>
                      <span className="text-white font-medium">342</span>
                   </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none mb-12">
                   <h3 className="text-white font-bold mb-2">Synopsis</h3>
                   <p className="text-gray-300 leading-relaxed">{book.Summary}</p>
                </div>

                {/* --- IDEA 3: READERS ALSO ENJOYED SECTION --- */}
                {recommendations.length > 0 && (
                  <div className="mb-12">
                     <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-accent pl-4">Readers also enjoyed</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {recommendations.map(rb => (
                           <Link key={rb.id} href={`/book/${rb.id}`} className="group block bg-primary-dark rounded-xl p-3 hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                              <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3 shadow-lg group-hover:scale-105 transition-transform">
                                 <Image src={rb.CoverUrl} fill alt={rb.Title} className="object-cover" />
                              </div>
                              <h4 className="text-sm font-bold text-white truncate group-hover:text-accent">{rb.Title}</h4>
                              <p className="text-xs text-gray-500 truncate">{rb.Author}</p>
                           </Link>
                        ))}
                     </div>
                  </div>
                )}

                {/* Reviews Section Placeholder */}
                <div className="border-t border-white/10 pt-8">
                   <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      Community Reviews <span className="text-sm font-normal text-gray-500">(128)</span>
                   </h3>
                   <div className="bg-primary-dark p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">JD</div>
                            <div>
                                <div className="text-white font-bold text-sm">Jane Doe</div>
                                <div className="flex text-yellow-500 w-16"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
                            </div>
                        </div>
                        <span className="text-xs text-gray-500">October 24, 2025</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">"One of the best books I've read this year. Highly recommend! The character development was top notch."</p>
                      <div className="mt-4 flex gap-4 text-xs text-gray-400">
                        <span className="hover:text-white cursor-pointer flex items-center gap-1 transition-colors"><ThumbsUp className="w-3 h-3"/> Like (42)</span>
                        <span className="hover:text-white cursor-pointer flex items-center gap-1 transition-colors"><MessageSquare className="w-3 h-3"/> Reply</span>
                      </div>
                   </div>
                </div>

             </div>
          </div>
       </div>
    </main>
  );
}

// Generate static params for static export support
export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({ id: book.id }));
}