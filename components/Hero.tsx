import React from 'react';
import { Search } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onQuickFilter: (filter: string) => void;
}

const Hero: React.FC<HeroProps> = ({ searchQuery, setSearchQuery, onQuickFilter }) => {
  const quickFilters = [
    { name: "Angola", color: "#1db4ab" },
    { name: "Benin", color: "#b2a942" },
    { name: "Ghana", color: "#1db4ab" },
    { name: "Kenya", color: "#b2a942" },
    { name: "South Africa", color: "#7970af" },
    { name: "Uganda", color: "#7970af" }
  ];

  return (
    <div className="bg-[#282e3e] pt-16 pb-20 sm:pt-24 sm:pb-32 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1db4ab]/10 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7970af]/10 rounded-full blur-[120px] -ml-48 -mb-48" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h1 className="serif-font text-3xl sm:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
          Discover Farmed Animal Advocacy Organisations in Africa.
        </h1>
        <p className="text-sm sm:text-base text-[#e1e9de]/70 mb-12 max-w-xl mx-auto font-medium tracking-wide">
          <span className="serif-font italic opacity-80">A centralised hub to foster collaboration and transparency within the movement.</span>
        </p>
        
        <div className="relative max-w-2xl mx-auto mb-10 group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#282e3e]/40 group-focus-within:text-[#1db4ab] transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-4 py-5 bg-white border-2 border-transparent rounded-full shadow-2xl shadow-black/20 text-[#282e3e] text-base focus:ring-0 focus:border-[#1db4ab] focus:outline-none transition-all placeholder:text-gray-400 font-medium"
            placeholder="Search by organisation name, animal species, or country"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mr-2">Quick Access:</span>
          <div className="flex flex-wrap justify-center gap-2 max-w-lg">
            {quickFilters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => onQuickFilter(filter.name)}
                className="px-5 py-2 bg-white/5 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-[#282e3e] hover:border-white transition-all active:scale-95"
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;