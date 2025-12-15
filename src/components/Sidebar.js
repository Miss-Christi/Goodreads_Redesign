import { Trophy, BookOpen, UserPlus, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-8 w-80 shrink-0">
      
      {/* Currently Reading */}
      <div className="bg-primary-dark/50 border border-white/10 rounded-xl p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-accent" /> Currently Reading
        </h3>
        <div className="flex gap-4 items-center mb-4">
          <div className="w-12 h-16 bg-gray-700 rounded shadow-md relative overflow-hidden">
             {/* Placeholder for current book cover */}
             <div className="absolute inset-0 bg-teal/20"></div>
          </div>
          <div>
            <div className="text-sm font-bold text-white">The Coming Wave</div>
            <div className="text-xs text-primary-light">Mustafa Suleyman</div>
            <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
              <div className="bg-teal h-full w-[65%]"></div>
            </div>
            <div className="text-[10px] text-primary-light mt-1">Page 142 of 220</div>
          </div>
        </div>
        <button className="w-full text-xs text-center text-accent hover:underline">Update Progress</button>
      </div>

      {/* Reading Challenge */}
      <div className="bg-primary-dark/50 border border-white/10 rounded-xl p-6">
        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" /> 2025 Challenge
        </h3>
        <div className="text-3xl font-extrabold text-white mb-1">12<span className="text-base font-normal text-primary-light">/50 books</span></div>
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-4">
           <div className="bg-yellow-500 h-full w-[24%]"></div>
        </div>
        <p className="text-xs text-primary-light leading-relaxed">
          You are 2 books behind schedule. Time to pick up a short sci-fi!
        </p>
      </div>

      {/* Friend Updates (Mock) */}
      <div className="bg-primary-dark/50 border border-white/10 rounded-xl p-6">
        <h3 className="font-bold text-white mb-4 flex items-center justify-between">
          <span className="flex gap-2 items-center"><UserPlus className="w-4 h-4 text-teal" /> Friends</span>
          <span className="text-xs text-primary-light cursor-pointer hover:text-white">View All</span>
        </h3>
        <ul className="space-y-4">
          {[
            { name: "Sarah J.", action: "rated", book: "Dune", rating: 5 },
            { name: "Mike T.", action: "want to read", book: "Project Hail Mary", rating: 0 },
            { name: "Jessica", action: "finished", book: "Atomic Habits", rating: 4 },
          ].map((update, i) => (
            <li key={i} className="text-sm text-primary-light pb-3 border-b border-white/5 last:border-0">
              <span className="font-bold text-white">{update.name}</span> {update.action} <span className="italic text-teal">{update.book}</span>
              {update.rating > 0 && <span className="block text-yellow-500 text-xs">{"★".repeat(update.rating)}</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Links */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-primary-light/50 px-2">
        <a href="#" className="hover:text-white">About</a>
        <a href="#" className="hover:text-white">Press</a>
        <a href="#" className="hover:text-white">Authors</a>
        <a href="#" className="hover:text-white">Advertise</a>
        <a href="#" className="hover:text-white">Privacy</a>
        <span>© 2025 Goodreads Redesign</span>
      </div>
    </aside>
  );
}