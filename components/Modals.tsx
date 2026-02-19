
import React, { useState, useMemo } from 'react';
import { X, Copy, Check, Send, Loader2, MessageSquareHeart, Layout, MapPin, Globe, Instagram, Mail, Building2, Briefcase, Footprints, Facebook, Linkedin, Twitter, Share2, ClipboardList, ExternalLink, FileText, Sparkles, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Organisation } from '../types';
import { getDirectDriveUrl, ORGANISATIONS } from '../constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isBlueprint?: boolean;
  onToggleBlueprint?: () => void;
}

interface OrgDetailModalProps {
  org: Organisation | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectOrg?: (org: Organisation) => void;
}

export const GetListedModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#282e3e]/80 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="bg-[#e1e9de] rounded-[2.5rem] w-full max-w-md p-10 sm:p-12 relative shadow-2xl border border-[#282e3e]/5 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 p-2 text-[#282e3e]/30 hover:text-[#282e3e] hover:bg-white/50 rounded-full transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative z-10">
          <h2 className="serif-font text-3xl font-black text-[#282e3e] mb-2 tracking-tight">Get Listed</h2>
          <p className="text-[#282e3e]/60 font-medium mb-10 leading-relaxed text-sm">
            Submit your organisation to be featured in the directory.
          </p>

          <div className="space-y-4 mb-10">
            <div className="bg-white/50 border border-white/60 rounded-2xl p-5 flex items-start gap-4">
              <div className="p-2.5 bg-[#1db4ab]/10 rounded-xl text-[#1db4ab] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#282e3e] text-xs uppercase tracking-wider mb-1">Curation Process</h4>
                <p className="text-xs text-[#282e3e]/60 font-medium leading-relaxed">
                  We manually review all submissions to maintain the highest quality for our movement partners.
                </p>
              </div>
            </div>

            <div className="bg-white/30 border border-white/40 rounded-2xl p-5">
              <h4 className="font-bold text-[#282e3e]/40 text-[10px] uppercase tracking-[0.2em] mb-3">You will need to provide:</h4>
              <ul className="grid grid-cols-2 gap-y-2">
                {['Organisation Name', 'Email Address', 'Website/Socials', 'Active Regions', 'Intervention Types', 'Logo Upload'].map((item) => (
                  <li key={item} className="flex items-center text-[10px] font-black text-[#282e3e]/50 uppercase tracking-widest">
                    <Check className="w-3 h-3 mr-2 text-[#1db4ab]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a 
            href="https://forms.gle/VU78W93JqpMNntEL8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-5 bg-[#1db4ab] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-xl shadow-teal-900/10 hover:bg-[#169d95] transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            CONTINUE TO APPLICATION
            <ExternalLink className="w-4 h-4" />
          </a>

          <p className="mt-8 text-center text-[9px] text-[#282e3e]/30 font-black uppercase tracking-[0.3em]">
            Hosted on Google Forms
          </p>
        </div>
      </div>
    </div>
  );
};

export const OrgDetailModal: React.FC<OrgDetailModalProps> = ({ org, isOpen, onClose, onSelectOrg }) => {
  if (!isOpen || !org) return null;

  const getSocialIcon = (url: string) => {
    const u = url.toLowerCase();
    if (u.includes('instagram.com')) return <Instagram className="w-4 h-4 mr-3 text-[#E4405F]" />;
    if (u.includes('facebook.com') || u.includes('web.facebook')) return <Facebook className="w-4 h-4 mr-3 text-[#1877F2]" />;
    if (u.includes('linkedin.com')) return <Linkedin className="w-4 h-4 mr-3 text-[#0A66C2]" />;
    if (u.includes('twitter.com') || u.includes('x.com')) return <Twitter className="w-4 h-4 mr-3 text-[#1DA1F2]" />;
    return <Share2 className="w-4 h-4 mr-3 text-[#1db4ab]" />;
  };

  const getSocialLabel = (url: string) => {
    const u = url.toLowerCase();
    if (u.includes('instagram.com')) return 'Instagram';
    if (u.includes('facebook.com') || u.includes('web.facebook')) return 'Facebook';
    if (u.includes('linkedin.com')) return 'LinkedIn';
    if (u.includes('twitter.com') || u.includes('x.com')) return 'Twitter / X';
    return 'Social Media';
  };

  const logoUrl = getDirectDriveUrl(org.logo);
  const countries = org.country.split(',').map(c => c.trim()).sort();

  // Find similar organisations
  const similarOrgs = useMemo(() => {
    if (!org) return [];
    
    return ORGANISATIONS
      .filter(o => o.id !== org.id)
      .map(o => {
        let score = 0;
        // Shared Focus
        const sharedFocus = o.focus.filter(f => org.focus.includes(f));
        score += sharedFocus.length * 5;
        
        // Shared Species
        const sharedSpecies = o.species.filter(s => org.species.includes(s));
        score += sharedSpecies.length * 3;
        
        // Same main country
        if (o.country.includes(org.country.split(',')[0])) {
          score += 2;
        }

        return { org: o, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.org);
  }, [org]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#282e3e]/80 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col border border-[#e1e9de] animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header Section */}
        <div className="bg-[#fcfdfc] border-b border-[#e1e9de] p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-[#282e3e]/30 hover:text-[#282e3e] hover:bg-[#e1e9de]/30 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>

          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white border-2 border-[#e1e9de] flex-shrink-0 flex items-center justify-center text-[#1db4ab] overflow-hidden shadow-sm transition-transform duration-500 hover:scale-105">
            {org.logo ? (
              <img 
                src={logoUrl} 
                alt={`${org.name} logo`} 
                className="w-full h-full object-contain p-4" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `<span class="text-4xl font-black">${org.name.charAt(0)}</span>`;
                  }
                }}
              />
            ) : (
              <span className="text-4xl font-black">{org.name.charAt(0)}</span>
            )}
          </div>

          <div className="text-center sm:text-left flex-grow">
            <h2 className="text-2xl sm:text-3xl font-black text-[#282e3e] leading-tight mb-2 tracking-tight">{org.name}</h2>
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#282e3e]/40">
              <span className="flex items-center text-[#1db4ab]">
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                Regional Coverage
              </span>
              <span className="text-[#282e3e]/30">•</span>
              {org.address ? (
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(org.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1db4ab] transition-colors flex items-center gap-1.5 group"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#282e3e]/20 group-hover:text-[#1db4ab] transition-colors" />
                  <span>Registered HQ: {org.address}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ) : (
                <span>Registered HQ: Not Specified</span>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow overflow-y-auto p-6 sm:p-10 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column: Contact & Regions */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-[10px] font-black text-[#282e3e]/40 uppercase tracking-[0.25em] mb-4">Countries of Operation</h3>
                <div className="flex flex-wrap gap-1.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {countries.map((country, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[#1db4ab]/5 text-[#1db4ab] rounded-full border border-[#1db4ab]/10 text-[10px] font-black uppercase tracking-tighter">
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-black text-[#282e3e]/40 uppercase tracking-[0.25em] mb-4">Contact Details</h3>
                <div className="space-y-3">
                  {org.website && (
                    <a href={org.website} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-xl border border-[#e1e9de] hover:border-[#1db4ab] hover:bg-[#1db4ab]/5 transition-all text-sm font-bold text-[#282e3e]/70 group">
                      <Globe className="w-4 h-4 mr-3 text-[#1db4ab]" />
                      <span className="group-hover:text-[#1db4ab] transition-colors">Official Website</span>
                    </a>
                  )}
                  {org.social && (
                    <a href={org.social.startsWith('http') ? org.social : `https://${org.social}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-xl border border-[#e1e9de] hover:border-[#1db4ab] hover:bg-[#1db4ab]/5 transition-all text-sm font-bold text-[#282e3e]/70 group">
                      {getSocialIcon(org.social)}
                      <span className="group-hover:text-[#1db4ab] transition-colors">{getSocialLabel(org.social)}</span>
                    </a>
                  )}
                  {org.email && (
                    <a href={`mailto:${org.email}`} className="flex items-center p-3 rounded-xl border border-[#e1e9de] hover:border-[#1db4ab] hover:bg-[#1db4ab]/5 transition-all text-sm font-bold text-[#282e3e]/70 group">
                      <Mail className="w-4 h-4 mr-3 text-[#b2a942]" />
                      <span className="group-hover:text-[#1db4ab] transition-colors truncate">{org.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Focus & Species */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-4 h-4 text-[#1db4ab]" />
                  <h3 className="text-[10px] font-black text-[#282e3e]/40 uppercase tracking-[0.25em]">Programmes & Interventions</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[...org.focus].sort().map((f, i) => (
                    <span key={i} className="px-4 py-2 bg-white border-2 border-[#e1e9de] text-[#282e3e]/70 rounded-xl text-xs font-bold transition-all hover:border-[#1db4ab] hover:text-[#282e3e]">
                      {f.split('(')[0].trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Footprints className="w-4 h-4 text-[#b2a942]" />
                  <h3 className="text-[10px] font-black text-[#282e3e]/40 uppercase tracking-[0.25em]">Farmed Animal Groups</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[...org.species].sort().map((s, i) => (
                    <span key={i} className="px-4 py-2 bg-[#b2a942]/5 border-2 border-[#b2a942]/20 text-[#b2a942] rounded-xl text-xs font-black uppercase tracking-widest">
                      {s.split('(')[0].trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Organisations Section */}
          {similarOrgs.length > 0 && (
            <div className="pt-10 border-t border-[#e1e9de]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1db4ab]/10 rounded-lg text-[#1db4ab]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-black text-[#282e3e] uppercase tracking-wider">Similar Organisations</h3>
                </div>
                <p className="text-[10px] font-black text-[#282e3e]/30 uppercase tracking-[0.1em]">Found via shared focus areas</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarOrgs.map((similar) => {
                  const similarLogo = getDirectDriveUrl(similar.logo);
                  return (
                    <button
                      key={similar.id}
                      onClick={() => onSelectOrg?.(similar)}
                      className="group text-left p-4 bg-[#fcfdfc] border-2 border-[#e1e9de] rounded-2xl hover:border-[#1db4ab] hover:bg-white transition-all flex items-center gap-4"
                    >
                      <div className="w-12 h-12 bg-white border border-[#e1e9de] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {similar.logo ? (
                          <img src={similarLogo} alt="" className="w-full h-full object-contain p-2" />
                        ) : (
                          <span className="text-lg font-black text-[#1db4ab]">{similar.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#282e3e] truncate group-hover:text-[#1db4ab] transition-colors">
                          {similar.name}
                        </h4>
                        <div className="flex items-center text-[9px] font-black uppercase tracking-widest text-[#282e3e]/40 mt-1">
                          <MapPin className="w-2.5 h-2.5 mr-1" />
                          <span className="truncate">{similar.country.split(',')[0]}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 ml-auto text-[#282e3e]/10 group-hover:text-[#1db4ab] transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-6 border-t border-[#e1e9de] bg-[#fcfdfc] flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-[#282e3e] text-white rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#1db4ab] transition-all"
          >
            Done Reviewing
          </button>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e1e9de;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1db4ab;
        }
      `}</style>
    </div>
  );
};

export const ShareModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#282e3e]/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl border border-[#e1e9de]">
        <button onClick={onClose} className="absolute top-6 right-6 text-[#282e3e]/30 hover:text-[#282e3e]">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-black text-[#282e3e] uppercase tracking-wider mb-2">Share Link</h3>
        <p className="text-sm text-[#282e3e]/60 mb-8 font-medium italic">Copy this URL to share the current directory view for review.</p>
        
        <div className="flex gap-2">
          <input 
            type="text" 
            readOnly 
            value={shareUrl}
            className="flex-grow bg-[#e1e9de]/30 border-2 border-[#e1e9de] rounded-xl px-4 py-3 text-sm font-bold text-[#282e3e] truncate"
          />
          <button 
            onClick={handleCopy}
            className={`px-4 rounded-xl transition-all flex items-center justify-center ${copied ? 'bg-[#b2a942] text-white' : 'bg-[#1db4ab] text-white hover:bg-[#169d95]'}`}
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export const FeedbackModal: React.FC<ModalProps> = ({ isOpen, onClose, isBlueprint, onToggleBlueprint }) => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    setLoading(true);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `The user provided this feedback on the AAA Directory: "${feedback}". Act as a Lead UI/UX Designer. Briefly thank them and confirm you've received the note for the next sprint. 1 sentence only.`,
      });
      setResponse(res.text || "Thank you for your valuable feedback!");
    } catch (e) {
      setResponse("Thank you! Your feedback has been logged for review.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#282e3e]/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 relative shadow-2xl border border-[#e1e9de]">
        <button onClick={onClose} className="absolute top-6 right-6 text-[#282e3e]/30 hover:text-[#282e3e]">
          <X className="w-6 h-6" />
        </button>

        {!response ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#b2a942] rounded-xl flex items-center justify-center text-white">
                <MessageSquareHeart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#282e3e] uppercase tracking-wider leading-none">Stakeholder Review</h3>
                <p className="text-[10px] text-[#b2a942] font-black uppercase tracking-widest mt-1">Direct feedback portal</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-[#fcfdfc] border-2 border-[#e1e9de] rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#282e3e]/5 rounded-lg">
                  <Layout className="w-5 h-5 text-[#282e3e]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#282e3e]">Wireframe Mode</p>
                  <p className="text-[10px] text-[#282e3e]/40 font-black uppercase tracking-widest">Toggle blueprint for IA review</p>
                </div>
              </div>
              <button 
                onClick={onToggleBlueprint}
                className={`w-12 h-6 rounded-full transition-colors relative ${isBlueprint ? 'bg-[#1db4ab]' : 'bg-[#e1e9de]'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isBlueprint ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>

            <textarea 
              placeholder="What are your thoughts on the information architecture, user flow, or content?"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-[#e1e9de]/20 border-2 border-[#e1e9de] rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-[#1db4ab] text-[#282e3e] mb-6 resize-none"
            />
            <button 
              onClick={handleSubmit}
              disabled={loading || !feedback.trim()}
              className="w-full py-4 bg-[#1db4ab] text-white rounded-xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 hover:bg-[#169d95] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Submit for Review</>}
            </button>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#1db4ab]/10 text-[#1db4ab] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-[#282e3e] uppercase tracking-wider mb-4">Feedback Logged</h3>
            <p className="text-sm text-[#282e3e]/70 font-medium leading-relaxed mb-8 italic">"{response}"</p>
            <button 
              onClick={() => { setResponse(null); setFeedback(''); onClose(); }}
              className="px-8 py-3 bg-[#282e3e] text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#1db4ab] transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
