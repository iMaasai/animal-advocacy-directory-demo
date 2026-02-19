import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import OrgCard from './components/OrgCard';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import { ShareModal, FeedbackModal, OrgDetailModal, GetListedModal } from './components/Modals';
import { ORGANISATIONS } from './constants';
import { FilterState, Organisation } from './types';
import { SearchX, LayoutGrid } from 'lucide-react';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    regions: [],
    foci: [],
    species: []
  });

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isGetListedOpen, setIsGetListedOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organisation | null>(null);
  const [isBlueprint, setIsBlueprint] = useState(false);

  const filteredOrgs = useMemo(() => {
    return ORGANISATIONS.filter(org => {
      const matchesSearch = org.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                            org.country.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                            org.focus.some(f => f.toLowerCase().includes(filters.searchQuery.toLowerCase()));
      
      const matchesRegion = filters.regions.length === 0 || filters.regions.some(r => org.country.includes(r));
      
      const matchesFocus = filters.foci.length === 0 || org.focus.some(f => 
        filters.foci.some(sf => f.toLowerCase().includes(sf.toLowerCase()))
      );
      const matchesSpecies = filters.species.length === 0 || org.species.some(s => 
        filters.species.some(ss => s.toLowerCase().includes(ss.toLowerCase()))
      );

      return matchesSearch && matchesRegion && matchesFocus && matchesSpecies;
    });
  }, [filters]);

  const handleQuickFilter = (q: string) => {
    if (["Ghana", "Uganda", "Benin", "Angola", "Nigeria", "South Africa"].includes(q)) {
      setFilters(prev => ({ ...prev, regions: [q] }));
    } else {
      setFilters(prev => ({ ...prev, searchQuery: q }));
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#fcfdfc] transition-all duration-500 ${isBlueprint ? 'blueprint-mode' : ''}`}>
      <style>{`
        .blueprint-mode {
          filter: grayscale(1) contrast(1.1);
        }
        .blueprint-mode * {
          border-color: #282e3e !important;
          box-shadow: none !important;
          border-radius: 0px !important;
        }
        .blueprint-mode img {
          opacity: 0.15;
          filter: contrast(0.5);
        }
        .blueprint-mode .bg-[#1db4ab], 
        .blueprint-mode .bg-[#7970af], 
        .blueprint-mode .bg-[#b2a942] {
          background-color: #282e3e !important;
        }
        .blueprint-mode .text-[#1db4ab], 
        .blueprint-mode .text-[#7970af], 
        .blueprint-mode .text-[#b2a942] {
          color: #282e3e !important;
        }
      `}</style>

      <Navbar 
        onGetListed={() => setIsGetListedOpen(true)}
      />
      
      <Hero 
        searchQuery={filters.searchQuery} 
        setSearchQuery={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))} 
        onQuickFilter={handleQuickFilter}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <Sidebar 
            filters={filters} 
            onFilterChange={setFilters} 
          />

          <div className="flex-grow">
            <div className="flex items-center justify-between mb-8 border-b border-[#e1e9de] pb-6">
              <div className="flex items-center">
                <LayoutGrid className="w-5 h-5 text-[#282e3e]/20 mr-2" />
                <h2 className="text-xl font-bold text-[#282e3e]">
                  Found <span className="text-[#1db4ab]">{filteredOrgs.length}</span> Results
                </h2>
              </div>
              
              <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-[#282e3e]/30">
                <span>Sort by:</span>
                <select className="bg-transparent border-0 focus:ring-0 text-[#1db4ab] font-black cursor-pointer uppercase">
                  <option>Featured</option>
                  <option>Newest</option>
                  <option>A-Z</option>
                </select>
              </div>
            </div>

            {filteredOrgs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredOrgs.map((org) => (
                  <OrgCard 
                    key={org.id} 
                    org={org} 
                    onViewDetails={() => setSelectedOrg(org)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border-2 border-dashed border-[#e1e9de] py-20 px-10 text-center">
                <div className="w-20 h-20 bg-[#e1e9de]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchX className="w-10 h-10 text-[#282e3e]/10" />
                </div>
                <h3 className="text-xl font-bold text-[#282e3e] mb-2">No matching organisations</h3>
                <p className="text-[#282e3e]/50 max-sm mx-auto font-medium">
                  We couldn't find any results matching your filters. Try adjusting your search or resetting filters.
                </p>
                <button 
                  onClick={() => setFilters({ searchQuery: '', regions: [], foci: [], species: [] })}
                  className="mt-8 px-8 py-3 bg-[#282e3e] text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#1db4ab] transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <Assistant organizations={ORGANISATIONS as any} />

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
      />
      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        isBlueprint={isBlueprint}
        onToggleBlueprint={() => setIsBlueprint(!isBlueprint)}
      />
      <GetListedModal
        isOpen={isGetListedOpen}
        onClose={() => setIsGetListedOpen(false)}
      />
      <OrgDetailModal
        org={selectedOrg}
        isOpen={!!selectedOrg}
        onClose={() => setSelectedOrg(null)}
      />
    </div>
  );
};

export default App;