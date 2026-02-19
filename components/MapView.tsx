import React, { useMemo, useState, useEffect } from 'react';
import { MapPin, Info, Sparkles, Map, Users, ChevronRight, LayoutGrid, Loader2, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import * as d3 from 'https://esm.sh/d3-geo@3';
import { Organisation } from '../types';

interface MapViewProps {
  organisations: Organisation[];
  onBackToDirectory: () => void;
  onSelectCountry: (country: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ organisations, onBackToDirectory, onSelectCountry }) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPanAfricanExpanded, setIsPanAfricanExpanded] = useState(false);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/africa.geojson')
      .then(res => res.json())
      .then(data => {
        setGeoData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load map data:', err);
        setLoading(false);
      });
  }, []);

  const stats = useMemo(() => {
    const countryCounts: Record<string, { count: number; orgs: string[] }> = {};
    let panAfricanCount = 0;
    const panAfricanOrgs: string[] = [];

    organisations.forEach(org => {
      const countries = org.country.split(',').map(c => c.trim());
      countries.forEach(country => {
        if (country.toLowerCase() === 'pan-african') {
          panAfricanCount++;
          panAfricanOrgs.push(org.name);
        } else {
          // Normalize names for better matching
          const normalized = country.replace('Democratic Republic of the Congo', 'DR Congo');
          if (!countryCounts[normalized]) {
            countryCounts[normalized] = { count: 0, orgs: [] };
          }
          countryCounts[normalized].count++;
          countryCounts[normalized].orgs.push(org.name);
        }
      });
    });

    return { countryCounts, panAfricanCount, panAfricanOrgs };
  }, [organisations]);

  const getColorClass = (count: number) => {
    if (count === 0) return 'fill-[#e1e9de]/40 stroke-[#282e3e]/10';
    if (count <= 2) return 'fill-[#1db4ab]/20 stroke-[#1db4ab]/40 hover:fill-[#1db4ab]/40';
    if (count <= 5) return 'fill-[#1db4ab]/50 stroke-[#1db4ab]/60 hover:fill-[#1db4ab]/70';
    return 'fill-[#1db4ab] stroke-white/20 hover:fill-[#169d95]';
  };

  const projection = useMemo(() => {
    return d3.geoMercator()
      .center([20, 5])
      .scale(350)
      .translate([300, 350]);
  }, []);

  const pathGenerator = useMemo(() => {
    return d3.geoPath().projection(projection);
  }, [projection]);

  const normalizeGeoName = (name: string) => {
    const map: Record<string, string> = {
      'Democratic Republic of the Congo': 'DR Congo',
      'Congo, the Democratic Republic of the': 'DR Congo',
      'Congo (Kinshasa)': 'DR Congo',
      'United Republic of Tanzania': 'Tanzania',
      'Egypt, Arab Republic of': 'Egypt',
    };
    return map[name] || name;
  };

  const visiblePanAfricanOrgs = isPanAfricanExpanded 
    ? stats.panAfricanOrgs 
    : stats.panAfricanOrgs.slice(0, 3);

  return (
    <div className="bg-[#fcfdfc] animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Simplified Header with Navigation Only */}
        <div className="flex items-center justify-between mb-8 sm:mb-12 border-b border-[#e1e9de] pb-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-[#1db4ab]/10 rounded-lg text-[#1db4ab]">
                <Map className="w-4 h-4" />
              </div>
              <h2 className="text-[10px] font-black text-[#282e3e] uppercase tracking-[0.2em]">Geographic Movement Distribution</h2>
          </div>

          <button 
            onClick={onBackToDirectory}
            className="px-5 py-2.5 bg-[#282e3e] text-white rounded-xl font-black uppercase tracking-[0.2em] text-[9px] flex items-center gap-2 hover:bg-[#1db4ab] transition-all shadow-lg shadow-gray-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Directory
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Legend and Stats */}
          <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            <div className="bg-white border-2 border-[#e1e9de] rounded-3xl p-6 shadow-sm">
              <h3 className="text-[10px] font-black text-[#282e3e]/40 uppercase tracking-[0.2em] mb-6">Density Legend</h3>
              <div className="space-y-4">
                {[
                  { label: 'High Density (6+)', color: 'bg-[#1db4ab]' },
                  { label: 'Active (3-5)', color: 'bg-[#1db4ab]/50' },
                  { label: 'Emerging (1-2)', color: 'bg-[#1db4ab]/20' },
                  { label: 'No Listed Orgs', color: 'bg-[#e1e9de]/40' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-md ${item.color}`} />
                    <span className="text-[10px] font-black text-[#282e3e]/60 uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#282e3e] rounded-3xl p-8 text-white relative overflow-hidden transition-all duration-300">
              <Sparkles className="absolute -top-4 -right-4 w-24 h-24 text-white/5 rotate-12" />
              <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Pan-African Movement</h3>
              <div className="text-4xl font-black text-[#1db4ab] mb-2">{stats.panAfricanCount}</div>
              <p className="text-xs text-white/60 leading-relaxed font-medium mb-6">
                Organisations working across all regions or strictly at the policy/funding level for the entire continent.
              </p>
              <div className="space-y-2">
                {visiblePanAfricanOrgs.map((name, idx) => (
                  <div key={idx} className="flex items-center text-[10px] font-bold text-white/80 animate-in fade-in slide-in-from-left-1 duration-200">
                    <ChevronRight className="w-3 h-3 mr-1 text-[#1db4ab]" />
                    {name}
                  </div>
                ))}
                
                {stats.panAfricanOrgs.length > 3 && (
                  <button 
                    onClick={() => setIsPanAfricanExpanded(!isPanAfricanExpanded)}
                    className="flex items-center text-[9px] font-black text-[#1db4ab] mt-4 uppercase tracking-[0.1em] hover:text-white transition-colors group"
                  >
                    {isPanAfricanExpanded ? (
                      <>
                        <ChevronUp className="w-3 h-3 mr-1 group-hover:-translate-y-0.5 transition-transform" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <span className="mr-1">+ {stats.panAfricanOrgs.length - 3}</span>
                        OTHERS
                        <ChevronDown className="w-3 h-3 ml-1 group-hover:translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-6 relative order-1 lg:order-2 bg-white border-2 border-[#e1e9de] rounded-[3rem] p-4 min-h-[600px] flex items-center justify-center shadow-xl shadow-[#282e3e]/5 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center gap-4 text-[#282e3e]/40">
                <Loader2 className="w-10 h-10 animate-spin" />
                <p className="text-xs font-black uppercase tracking-widest">Rendering Map Projection...</p>
              </div>
            ) : (
              <>
                <svg viewBox="0 0 600 750" className="w-full h-auto">
                  {geoData?.features.map((feature: any) => {
                    const countryName = normalizeGeoName(feature.properties.name);
                    const count = stats.countryCounts[countryName]?.count || 0;
                    
                    return (
                      <path
                        key={feature.id || feature.properties.name}
                        d={pathGenerator(feature) || ''}
                        className={`${getColorClass(count)} stroke-1 transition-all duration-300 cursor-pointer outline-none`}
                        onMouseEnter={() => setHoveredCountry(countryName)}
                        onMouseLeave={() => setHoveredCountry(null)}
                        onClick={() => count > 0 && onSelectCountry(countryName)}
                      />
                    );
                  })}
                </svg>

                {hoveredCountry && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-[#282e3e] p-6 rounded-2xl shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200 min-w-[200px] z-10 pointer-events-none">
                    <p className="text-[10px] font-black text-[#1db4ab] uppercase tracking-[0.2em] mb-1">{hoveredCountry}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-black text-white">{stats.countryCounts[hoveredCountry]?.count || 0}</p>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Organisations</p>
                    </div>
                    { (stats.countryCounts[hoveredCountry]?.count || 0) > 0 && (
                      <p className="text-[9px] text-white/40 mt-3 font-medium italic border-t border-white/5 pt-3">
                        Click to filter directory by this region
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-3 space-y-6 order-3">
             <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-[#b2a942]" />
                <h3 className="text-sm font-black text-[#282e3e] uppercase tracking-wider">Top Regions</h3>
             </div>
             <div className="space-y-3">
                {Object.entries(stats.countryCounts)
                  .sort((a, b) => b[1].count - a[1].count)
                  .slice(0, 5)
                  .map(([name, data], idx) => (
                    <div key={idx} className="p-4 bg-white border border-[#e1e9de] rounded-2xl flex items-center justify-between group hover:border-[#1db4ab] transition-all cursor-pointer" onClick={() => onSelectCountry(name)}>
                      <div>
                        <p className="text-[10px] font-black text-[#282e3e]/30 uppercase tracking-widest mb-0.5">{name}</p>
                        <p className="text-sm font-bold text-[#282e3e]">{data.count} Organisations</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#1db4ab]/5 flex items-center justify-center text-[#1db4ab] group-hover:bg-[#1db4ab] group-hover:text-white transition-all">
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
             </div>

             <div className="p-6 bg-[#b2a942]/5 border-2 border-[#b2a942]/10 rounded-3xl mt-12">
               <h4 className="text-[10px] font-black text-[#b2a942] uppercase tracking-[0.2em] mb-2">Data Sourcing</h4>
               <p className="text-[11px] font-medium text-[#282e3e]/60 leading-relaxed italic">
                 "This directory is a community resource. Data is self-reported by listed organisations and not independently verified by Animal Advocacy Africa."
               </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MapView;