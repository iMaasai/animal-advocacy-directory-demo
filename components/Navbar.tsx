import React from 'react';
import { Globe, Map as MapIcon } from 'lucide-react';

interface NavbarProps {
  onGetListed: () => void;
  currentView: 'directory' | 'map';
  onViewChange: (view: 'directory' | 'map') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGetListed, currentView, onViewChange }) => {
  const buttonBaseClass = "flex items-center px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all transform hover:-translate-y-0.5 shadow-lg";
  
  return (
    <nav className="sticky top-0 z-50 bg-[#282e3e] border-b border-white/5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => onViewChange('directory')}
            >
              <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1">
                <span className="text-white group-hover:text-[#1db4ab] transition-colors">Farmed</span>
                <span className="text-[#1db4ab]">Animal</span>
                <span className="text-[#b2a942]">Advocacy</span>
                <span className="ml-1 uppercase text-[10px] sm:text-xs font-bold tracking-[0.1em] text-white/40">Directory</span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Movement Map Navigation */}
            <button 
              onClick={() => onViewChange('map')}
              className={`${buttonBaseClass} ${
                currentView === 'map' 
                ? 'bg-[#1db4ab] text-white border border-[#1db4ab] shadow-teal-950/20' 
                : 'bg-white/5 text-white border border-white/10 hover:bg-[#1db4ab] hover:border-[#1db4ab]'
              }`}
            >
              <MapIcon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Movement Map</span>
              <span className="sm:hidden">Map</span>
            </button>

            {/* Get Listed Navigation */}
            <button 
              onClick={onGetListed}
              className={`${buttonBaseClass} bg-white/5 text-white border border-white/10 hover:bg-[#1db4ab] hover:border-[#1db4ab] shadow-teal-950/20`}
            >
              <Globe className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Get Listed</span>
              <span className="sm:hidden">Join</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;