import React from 'react';
import { PlusSquare, Map, LayoutGrid } from 'lucide-react';

interface NavbarProps {
  onGetListed: () => void;
  currentView: 'directory' | 'map';
  onViewChange: (view: 'directory' | 'map') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGetListed, currentView, onViewChange }) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#282e3e] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <button 
              onClick={() => onViewChange('directory')}
              className="text-sm sm:text-base font-black tracking-tight flex items-center hover:opacity-80 transition-opacity"
            >
              <span className="text-white">Farmed</span>
              <span className="text-[#1db4ab] ml-1">Animal</span>
              <span className="text-[#b2a942] ml-1">Advocacy</span>
              <span className="uppercase text-[10px] font-bold tracking-[0.1em] text-white/40 ml-2">Directory</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onViewChange(currentView === 'directory' ? 'map' : 'directory')}
              className="flex items-center px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
            >
              {currentView === 'directory' ? (
                <>
                  <Map className="w-3.5 h-3.5 mr-2 text-[#1db4ab]" />
                  Movement Map
                </>
              ) : (
                <>
                  <LayoutGrid className="w-3.5 h-3.5 mr-2 text-[#1db4ab]" />
                  Directory
                </>
              )}
            </button>

            <button 
              onClick={onGetListed}
              className="flex items-center px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
            >
              <PlusSquare className="w-3.5 h-3.5 mr-2 text-[#1db4ab]" />
              Get Listed
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
