"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, Bell, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-primary/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 rounded-sm overflow-hidden shadow-lg group-hover:rotate-3 transition-transform">
             <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block">Goodreads</span>
        </Link>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books..." 
            className="w-full bg-primary-dark/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white placeholder-gray-400"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-primary-light" />
        </form>

        <div className="flex items-center gap-4 sm:gap-6">
          <button className="text-primary-light hover:text-white"><Bell className="w-5 h-5" /></button>
          <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center ring-2 ring-transparent hover:ring-white/20 transition-all cursor-pointer">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
}