import React from 'react';
import { Heart, Globe, Mail, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#282e3e] text-[#e1e9de] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-xl font-black mb-6 tracking-tight flex items-center gap-1">
              <span className="text-white uppercase text-sm font-black tracking-[0.2em]">Farmed Animal Advocacy Directory</span>
            </h2>
            <p className="text-[#e1e9de]/60 mb-6 max-w-md leading-relaxed font-medium">
              An initiative supported by partners like Animal Advocacy Africa to map and connect the movement across the continent. Together, we can build a more compassionate future.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-[#e1e9de]/40 hover:text-[#1db4ab] transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-[#e1e9de]/40 hover:text-[#1db4ab] transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="text-[#e1e9de]/40 hover:text-[#1db4ab] transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-black text-white mb-6 uppercase text-[10px] tracking-[0.3em]">The Mission</h3>
            <ul className="space-y-4 text-xs text-[#e1e9de]/60 font-black uppercase tracking-widest">
              <li><a href="#" className="hover:text-[#1db4ab] transition-colors">Our Vision</a></li>
              <li><a href="#" className="hover:text-[#1db4ab] transition-colors">Partner Hub</a></li>
              <li><a href="#" className="hover:text-[#1db4ab] transition-colors">Impact Reports</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-white mb-6 uppercase text-[10px] tracking-[0.3em]">Connect</h3>
            <ul className="space-y-4 text-xs text-[#e1e9de]/60 font-black uppercase tracking-widest">
              <li><a href="#" className="hover:text-[#1db4ab] transition-colors">Join Directory</a></li>
              <li><a href="#" className="hover:text-[#1db4ab] transition-colors">Support Us</a></li>
              <li><a href="#" className="hover:text-[#1db4ab] transition-colors">Newsletters</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#e1e9de]/10 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#e1e9de]/30 font-black uppercase tracking-[0.3em]">
          <div className="mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Farmed Animal Advocacy Directory
          </div>
          <div className="flex items-center">
            Built with <Heart className="w-3 h-3 mx-1 fill-[#1db4ab] text-[#1db4ab]" /> in Africa
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;