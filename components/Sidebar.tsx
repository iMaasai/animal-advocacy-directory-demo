
import React, { useState } from 'react';
import { REGIONS, FOCI, SPECIES } from '../constants';
import { FilterState } from '../types';
import { Filter, Check, ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
  const [expandedGroups, setExpandedGroups] = useState({
    regions: true,
    foci: true,
    species: true
  });

  const toggleGroup = (group: keyof typeof expandedGroups) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const toggleItem = <T,>(list: T[], item: T): T[] => {
    return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
  };

  const FilterGroup = ({ 
    title, 
    items, 
    selectedItems, 
    onToggle, 
    isExpanded, 
    onToggleExpand 
  }: { 
    title: string, 
    items: string[], 
    selectedItems: string[], 
    onToggle: (val: any) => void,
    isExpanded: boolean,
    onToggleExpand: () => void
  }) => (
    <div className="mb-6">
      <button 
        onClick={onToggleExpand}
        className="w-full flex items-center justify-between group py-2"
      >
        <h3 className="text-[10px] font-black text-[#282e3e]/40 uppercase tracking-[0.2em] flex items-center group-hover:text-[#1db4ab] transition-colors">
          {title}
          {selectedItems.length > 0 && (
            <span className="ml-2 bg-[#1db4ab] text-white text-[8px] px-1.5 py-0.5 rounded-full">
              {selectedItems.length}
            </span>
          )}
        </h3>
        {isExpanded ? (
          <ChevronDown className="w-3 h-3 text-[#282e3e]/20 group-hover:text-[#1db4ab]" />
        ) : (
          <ChevronRight className="w-3 h-3 text-[#282e3e]/20 group-hover:text-[#1db4ab]" />
        )}
      </button>
      
      {isExpanded && (
        <div className="space-y-3 mt-4 animate-in fade-in slide-in-from-top-1 duration-200">
          {items.map(item => (
            <label key={item} className="flex items-center group cursor-pointer">
              <div className="relative flex items-center flex-shrink-0">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selectedItems.includes(item)}
                  onChange={() => onToggle(item)}
                />
                <div className={`w-5 h-5 border-2 rounded-md transition-all flex items-center justify-center ${
                  selectedItems.includes(item) 
                  ? 'bg-[#1db4ab] border-[#1db4ab]' 
                  : 'bg-white border-[#e1e9de] group-hover:border-[#1db4ab]/30'
                }`}>
                  {selectedItems.includes(item) && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
              <span className={`ml-3 text-xs font-bold transition-colors leading-none ${
                selectedItems.includes(item) ? 'text-[#282e3e]' : 'text-[#282e3e]/60'
              }`}>
                {item.split('(')[0].trim()}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 bg-white lg:bg-transparent rounded-2xl p-6 lg:p-0">
      <div className="flex items-center mb-8 lg:mb-10">
        <Filter className="w-5 h-5 text-[#1db4ab] mr-2" />
        <h2 className="text-lg font-bold text-[#282e3e]">Filter Results</h2>
      </div>

      <div className="space-y-4">
        <FilterGroup 
          title="Region / Country" 
          items={REGIONS} 
          selectedItems={filters.regions} 
          isExpanded={expandedGroups.regions}
          onToggleExpand={() => toggleGroup('regions')}
          onToggle={(val) => onFilterChange({ ...filters, regions: toggleItem(filters.regions, val) })} 
        />
        <div className="h-px bg-[#e1e9de]/50 my-2" />
        <FilterGroup 
          title="Interventions" 
          items={FOCI} 
          selectedItems={filters.foci} 
          isExpanded={expandedGroups.foci}
          onToggleExpand={() => toggleGroup('foci')}
          onToggle={(val) => onFilterChange({ ...filters, foci: toggleItem(filters.foci, val) })} 
        />
        <div className="h-px bg-[#e1e9de]/50 my-2" />
        <FilterGroup 
          title="Animal Species" 
          items={SPECIES} 
          selectedItems={filters.species} 
          isExpanded={expandedGroups.species}
          onToggleExpand={() => toggleGroup('species')}
          onToggle={(val) => onFilterChange({ ...filters, species: toggleItem(filters.species, val) })} 
        />
      </div>

      {(filters.regions.length > 0 || filters.foci.length > 0 || filters.species.length > 0) && (
        <button 
          onClick={() => onFilterChange({ searchQuery: filters.searchQuery, regions: [], foci: [], species: [] })}
          className="w-full mt-8 py-2 text-[10px] font-black text-[#1db4ab] border-2 border-[#1db4ab] rounded-lg hover:bg-[#1db4ab]/5 transition-colors uppercase tracking-widest"
        >
          Reset All Filters
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
