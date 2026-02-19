import React from 'react';
import { Heart, Linkedin, Mail, Twitter, Globe, ArrowUpRight, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onJoinDirectory: () => void;
}

const Footer: React.FC<FooterProps> = ({ onJoinDirectory }) => {
  return (
    <footer className="bg-[#282e3e] text-[#e1e9de] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="max-w-md">
            <h2 className="text-xl font-black mb-6 tracking-tight flex items-center gap-1">
              <span className="text-white uppercase text-sm font-black tracking-[0.2em]">Farmed Animal Advocacy Directory</span>
            </h2>
            <p className="text-[#e1e9de]/60 mb-6 leading-relaxed font-medium">
              An initiative supported by Animal Advocacy Africa to map and connect the movement across the continent. Together, we can build a more compassionate future.
            </p>
            
            {/* Global Disclaimer in Footer */}
            <div className="mt-8 pt-8 border-t border-white/5 flex gap-3">
              <ShieldAlert className="w-4 h-4 text-[#b2a942] shrink-0" />
              <p className="text-[10px] text-[#e1e9de]/40 font-medium leading-relaxed italic">
                Disclaimer: This directory is a community resource. Data is self-reported by listed organisations and not independently verified by Animal Advocacy Africa.
              </p>
            </div>
          </div>
          
          <div className="min-w-[280px]">
            <h3 className="font-black text-white mb-6 uppercase text-[10px] tracking-[0.3em]">Connect</h3>
            <ul className="space-y-5 text-xs text-[#e1e9de]/60 font-black uppercase tracking-widest">
              <li>
                <a 
                  href="https://www.animaladvocacyafrica.org/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#1db4ab] transition-colors flex items-center gap-3 group"
                >
                  <Globe className="w-4 h-4 text-[#1db4ab]" />
                  <span>Animal Advocacy Africa</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <button 
                  onClick={onJoinDirectory}
                  className="hover:text-[#1db4ab] transition-colors uppercase font-black tracking-widest text-left flex items-center gap-3 group"
                >
                  <span className="w-4 h-4 border border-[#e1e9de]/20 rounded-sm flex items-center justify-center text-[8px] font-black group-hover:border-[#1db4ab] transition-colors">+</span>
                  Join Directory
                </button>
              </li>
              
              <li className="pt-8 border-t border-white/5">
                <p className="text-[8px] text-white/20 mb-4 tracking-[0.2em] font-black">DEVELOPER CONTACTS</p>
                <div className="flex space-x-6">
                  <a 
                    href="https://twitter.com/imaasai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#e1e9de]/40 hover:text-[#1db4ab] transition-colors"
                    title="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/looremeta" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#e1e9de]/40 hover:text-[#1db4ab] transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="mailto:ilooremeta@gmail.com" 
                    className="text-[#e1e9de]/40 hover:text-[#1db4ab] transition-colors"
                    title="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </li>
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