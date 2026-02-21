import React from 'react';
import { Linkedin, Mail, Twitter, Globe, PlusSquare } from 'lucide-react';

interface FooterProps {
  onJoinDirectory?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onJoinDirectory }) => {
  return (
    <footer className="bg-[#282e3e] text-[#e1e9de] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8">
              Farmed Animal Advocacy Directory
            </h2>
            <p className="text-[#e1e9de]/60 max-w-md leading-relaxed font-medium text-sm">
              <span className="font-black text-white uppercase tracking-wider mr-1">DISCLAIMER:</span>
              This directory is a community resource. Data is self-reported by listed organisations and not independently verified by Animal Advocacy Africa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <h3 className="font-black text-white mb-8 uppercase text-[10px] tracking-[0.3em]">Connect</h3>
              <ul className="space-y-5">
                <li>
                  <a 
                    href="https://www.animaladvocacyaafrica.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#e1e9de]/60 hover:text-[#1db4ab] transition-colors group"
                  >
                    <Globe className="w-4 h-4 text-[#1db4ab]" />
                    <span>ANIMAL ADVOCACY AFRICA</span>
                  </a>
                </li>
                <li>
                  <button 
                    onClick={onJoinDirectory}
                    className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#e1e9de]/60 hover:text-[#1db4ab] transition-colors group"
                  >
                    <PlusSquare className="w-4 h-4 text-[#1db4ab]" />
                    <span>JOIN DIRECTORY</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-black text-white mb-8 uppercase text-[10px] tracking-[0.3em]">Developer Contacts</h3>
              <div className="flex space-x-6">
                <a 
                  href="https://twitter.com/imaasai" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#e1e9de]/40 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/in/looremeta" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#e1e9de]/40 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:ilooremeta@gmail.com" 
                  className="text-[#e1e9de]/40 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#e1e9de]/20 font-black uppercase tracking-[0.2em]">
          <div className="mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Farmed Animal Advocacy Directory
          </div>
          <div className="flex items-center tracking-[0.3em]">
            Built with <span className="mx-2 text-[#1db4ab]">🩵</span> in Africa
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
