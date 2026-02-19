import React from 'react';
import { MapPin, ExternalLink, Globe, Instagram, Mail, Facebook, Linkedin, Twitter, Share2 } from 'lucide-react';
import { Organisation } from '../types';
import { getDirectDriveUrl } from '../constants';

interface OrgCardProps {
  org: Organisation;
  onViewDetails: () => void;
}

const OrgCard: React.FC<OrgCardProps> = ({ org, onViewDetails }) => {
  const getSocialIcon = (url: string) => {
    const u = url.toLowerCase();
    if (u.includes('instagram.com')) return <Instagram className="w-4 h-4" />;
    if (u.includes('facebook.com') || u.includes('web.facebook')) return <Facebook className="w-4 h-4" />;
    if (u.includes('linkedin.com')) return <Linkedin className="w-4 h-4" />;
    if (u.includes('twitter.com') || u.includes('x.com')) return <Twitter className="w-4 h-4" />;
    return <Share2 className="w-4 h-4" />;
  };

  const logoUrl = getDirectDriveUrl(org.logo);

  // Parse countries for shortening to keep the UI clean
  const countries = org.country.split(',').map(c => c.trim());
  const isMultiCountry = countries.length > 3;
  const countryDisplay = isMultiCountry 
    ? `${countries.slice(0, 2).join(', ')} +${countries.length - 2} more`
    : org.country;

  return (
    <div className="group bg-white rounded-2xl border border-[#e1e9de] p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#1db4ab]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-start mb-6">
        <div className="w-14 h-14 rounded-xl bg-gray-50 overflow-hidden border border-[#e1e9de] flex-shrink-0 flex items-center justify-center text-[#1db4ab] font-black text-xl">
          {org.logo ? (
            <img 
              src={logoUrl} 
              alt={`${org.name} logo`} 
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = `<span class="text-xl font-black">${org.name.charAt(0)}</span>`;
                }
              }}
            />
          ) : (
            <span>{org.name.charAt(0)}</span>
          )}
        </div>
        <div className="ml-4 flex-grow min-w-0">
          <h3 className="font-bold text-[#282e3e] text-sm leading-tight group-hover:text-[#1db4ab] transition-colors mb-1">
            {org.name}
          </h3>
          <div className="flex items-center text-[10px] uppercase font-black tracking-widest text-[#282e3e]/50">
            <MapPin className="w-3 h-3 mr-1 text-[#1db4ab] shrink-0" />
            <span className="truncate" title={org.country}>{countryDisplay}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {org.species.slice(0, 2).map(s => (
          <span key={s} className="px-2.5 py-1 bg-[#b2a942]/10 text-[#b2a942] text-[9px] font-black uppercase tracking-widest rounded-md">
            {s.split('(')[0].trim()}
          </span>
        ))}
        {org.species.length > 2 && (
          <span className="px-2.5 py-1 bg-[#282e3e]/5 text-[#282e3e]/40 text-[9px] font-black uppercase tracking-widest rounded-md">
            +{org.species.length - 2}
          </span>
        )}
      </div>

      <div className="mb-6 flex-grow">
        <p className="text-[10px] font-black text-[#282e3e]/40 uppercase tracking-widest mb-2">Key Interventions:</p>
        <ul className="space-y-1.5">
          {org.focus.slice(0, 3).map((f, i) => (
            <li key={i} className="text-xs font-bold text-[#282e3e]/70 flex items-start">
              <span className="w-1.5 h-1.5 bg-[#1db4ab] rounded-full mt-1.5 mr-2.5 flex-shrink-0" />
              <span className="leading-tight">{f.split('(')[0].trim()}</span>
            </li>
          ))}
          {org.focus.length > 3 && (
            <li className="text-[10px] text-[#1db4ab] font-black uppercase tracking-widest mt-1 pl-4">
              + {org.focus.length - 3} more programmes
            </li>
          )}
        </ul>
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex gap-2">
          {org.website && (
            <a href={org.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#e1e9de]/30 rounded-lg text-[#282e3e]/60 hover:text-[#1db4ab] hover:bg-[#1db4ab]/10 transition-all">
              <Globe className="w-4 h-4" />
            </a>
          )}
          {org.social && (
            <a href={org.social.startsWith('http') ? org.social : `https://${org.social}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#e1e9de]/30 rounded-lg text-[#282e3e]/60 hover:text-[#1db4ab] hover:bg-[#1db4ab]/10 transition-all">
              {getSocialIcon(org.social)}
            </a>
          )}
          {org.email && (
            <a href={`mailto:${org.email}`} className="p-2 bg-[#e1e9de]/30 rounded-lg text-[#282e3e]/60 hover:text-[#1db4ab] hover:bg-[#1db4ab]/10 transition-all" title={`Email ${org.name}`}>
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
        <button 
          onClick={onViewDetails}
          className="w-full py-3 border-2 border-[#e1e9de] text-[#1db4ab] font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center justify-center hover:border-[#1db4ab] hover:bg-[#1db4ab]/5 transition-all"
        >
          Full Profile
          <ExternalLink className="w-3.5 h-3.5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default OrgCard;