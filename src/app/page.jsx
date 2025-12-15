import { getBooks } from '@/lib/firebase';
import HomeFeed from '@/components/HomeFeed'; 

export const revalidate = 60; // Refresh data every 60 seconds

export default async function Home() {
  // Fetch data on the server
  const books = await getBooks();

  return (
    <main className="min-h-screen bg-primary">
      {/* Immersive Header */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden border-b border-white/5">
         <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/90 to-primary z-0" />
         {/* Background Texture */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-[2px]" />
         
         <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-8">
            <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent border border-accent/20 text-xs font-bold tracking-widest uppercase mb-4">
              2025 Reading Challenge
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
              Find your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-500">obsession.</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
              Track your books, find hidden gems, and join the conversation.
            </p>
         </div>
      </section>

      {/* The Dashboard Layout (Client Component) */}
      <Suspense fallback={<div className="p-8 text-white">Loading…</div>}>
        <HomeFeed books={books} />
      </Suspense>

    </main>
  );
}