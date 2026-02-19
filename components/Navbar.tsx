import React from 'react';
import { Globe } from 'lucide-react';

interface NavbarProps {
  onGetListed: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGetListed }) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#282e3e] border-b border-white/5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1">
              <span className="text-white">Farmed</span>
              <span className="text-[#1db4ab]">Animal</span>
              <span className="text-[#b2a942]">Advocacy</span>
              <span className="ml-1 uppercase text-[10px] sm:text-xs font-bold tracking-[0.1em] text-white/40">Directory</span>
            </span>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={onGetListed}
              className="flex items-center px-4 py-2 sm:px-6 sm:py-2.5 bg-[#1db4ab] text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-black/20 hover:bg-[#169d95] transition-all transform hover:-translate-y-0.5"
            >
              <Globe className="w-4 h-4 mr-2" />
              Get Listed
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;