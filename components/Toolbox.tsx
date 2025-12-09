import React, { useState, useMemo, useEffect } from 'react';
import { ServiceType, Vendor } from '../types';
import { MOCK_VENDORS } from '../constants';
import { VendorCard } from './VendorCard';
import { ChevronDown, ChevronRight, Package, Search, Filter, Sparkles, PlusCircle } from 'lucide-react';

interface ToolboxProps {
  requiredServices: ServiceType[];
  eventVibe?: string;
  budgetLimit?: number;
  onAddService: (service: ServiceType) => void;
  onVisualize?: (vendor: Vendor) => void;
}

const ALL_SERVICES: ServiceType[] = [
    'VENUE', 'CATERING', 'ACCOMMODATION', 'PHOTOGRAPHER', 'ENTERTAINMENT', 'MARKETING_MATERIALS'
];

export const Toolbox: React.FC<ToolboxProps> = ({ requiredServices, eventVibe, budgetLimit, onAddService, onVisualize }) => {
  // Initialize all sections as open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    requiredServices.reduce((acc, curr) => ({ ...acc, [curr]: true }), {})
  );

  // Sync openSections when requiredServices changes (e.g. adding a new one)
  useEffect(() => {
    setOpenSections(prev => {
        const next = { ...prev };
        requiredServices.forEach(s => {
            // If it's a new service not previously tracked, default to open
            if (next[s] === undefined) {
                next[s] = true;
            }
        });
        return next;
    });
  }, [requiredServices]);

  // States for "Show More" functionality per category
  const [showAllFor, setShowAllFor] = useState<Record<string, boolean>>({});

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [selectedVibe, setSelectedVibe] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  // Suggestions for unselected services
  const unselectedServices = useMemo(() => {
     return ALL_SERVICES.filter(s => !requiredServices.includes(s));
  }, [requiredServices]);

  const toggleSection = (service: string) => {
    setOpenSections(prev => ({ ...prev, [service]: !prev[service] }));
  };

  const toggleShowAll = (service: string) => {
     setShowAllFor(prev => ({ ...prev, [service]: !prev[service] }));
  };

  const getRankedVendors = (type: ServiceType) => {
    let vendors = MOCK_VENDORS.filter(v => v.type === type);

    // 1. Filtering
    vendors = vendors.filter(v => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!v.name.toLowerCase().includes(query) && 
            !v.description.toLowerCase().includes(query) &&
            !v.location?.toLowerCase().includes(query)) {
          return false;
        }
      }
      if (minRating > 0 && v.rating < minRating) return false;
      if (maxPrice !== '' && v.pricePerUnit > maxPrice) return false;
      if (selectedVibe && v.vibe !== selectedVibe) return false;
      return true;
    });

    // 2. Ranking/Sorting
    // Logic: If eventVibe matches vendor.vibe, boost score
    vendors.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        if (eventVibe && a.vibe === eventVibe) scoreA += 10;
        if (eventVibe && b.vibe === eventVibe) scoreB += 10;

        scoreA += a.rating;
        scoreB += b.rating;

        return scoreB - scoreA; // Descending
    });

    return vendors;
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 overflow-hidden">
      
      {/* Header & Search */}
      <div className="p-4 border-b border-gray-200 bg-white shadow-sm flex-shrink-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center">
            <Package className="mr-2 text-indigo-600" size={16} />
            Vendor Market
          </h2>
          <button 
             onClick={() => setShowFilters(!showFilters)}
             className={`p-1.5 rounded-md transition-colors ${showFilters ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
             <Filter size={16} />
          </button>
        </div>

        <div className="relative">
           <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
           <input 
             type="text" 
             placeholder="Search vendors..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
           />
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-3 pt-3 border-t border-gray-100 animate-in slide-in-from-top-2 fade-in">
             <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                   <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Min Rating</label>
                   <select 
                     value={minRating}
                     onChange={(e) => setMinRating(Number(e.target.value))}
                     className="w-full text-xs p-1.5 rounded border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-indigo-500 outline-none"
                   >
                     <option value={0}>Any Rating</option>
                     <option value={4}>4+ Stars</option>
                     <option value={4.5}>4.5+ Stars</option>
                     <option value={5}>5 Stars</option>
                   </select>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Max Budget</label>
                   <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                      <input 
                        type="number" 
                        placeholder="Any"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
                        className="w-full text-xs pl-5 p-1.5 rounded border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                   </div>
                </div>
             </div>
             <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Vibe</label>
                <select 
                     value={selectedVibe}
                     onChange={(e) => setSelectedVibe(e.target.value)}
                     className="w-full text-xs p-1.5 rounded border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-indigo-500 outline-none"
                   >
                     <option value="">Any Vibe</option>
                     <option value="Professional">Professional</option>
                     <option value="Relaxed">Relaxed</option>
                     <option value="High Energy">High Energy</option>
                     <option value="Luxury">Luxury</option>
                     <option value="Rustic">Rustic</option>
                     <option value="Tech-Focused">Tech-Focused</option>
                </select>
             </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {requiredServices.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            <p>No services selected.</p>
          </div>
        )}

        {requiredServices.map((service) => {
          const allVendors = getRankedVendors(service);
          const isOpen = openSections[service];
          const isShowingAll = showAllFor[service];

          // Top 5 Recommendation Logic
          const topVendors = allVendors.slice(0, 5);
          const displayVendors = isShowingAll ? allVendors : topVendors;
          const remainingCount = allVendors.length - 5;

          // If searching/filtering, only show sections with matches (unless manually opened)
          if ((searchQuery || minRating > 0 || maxPrice !== '' || selectedVibe) && allVendors.length === 0) return null;

          return (
            <div key={service} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              <button
                onClick={() => toggleSection(service)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <span className="font-semibold text-xs text-gray-700 uppercase tracking-wide">
                  {service.replace('_', ' ')}
                  <span className="ml-2 text-gray-400 font-normal normal-case">({allVendors.length})</span>
                </span>
                {isOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
              </button>
              
              {isOpen && (
                <div className="p-3 bg-gray-50/50">
                  {eventVibe && (
                     <div className="mb-3 flex items-center gap-2 text-xs text-indigo-600 bg-indigo-50 p-2 rounded border border-indigo-100">
                         <Sparkles size={12} />
                         <span>Prioritizing <strong>{eventVibe}</strong> vibes</span>
                     </div>
                  )}
                  
                  <div className="space-y-3">
                    {displayVendors.map(vendor => (
                        <VendorCard 
                          key={vendor.id} 
                          vendor={vendor} 
                          onVisualize={() => onVisualize?.(vendor)}
                        />
                    ))}
                  </div>

                  {allVendors.length === 0 && (
                     <div className="text-center py-2 text-xs text-gray-400 italic">No vendors match filters</div>
                  )}

                  {/* Show More Button */}
                  {remainingCount > 0 && (
                      <button 
                        onClick={() => toggleShowAll(service)}
                        className="w-full mt-3 py-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-indigo-100 rounded transition-all"
                      >
                         {isShowingAll ? 'Show Less' : `Show ${remainingCount} More Options`}
                      </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Suggest Unselected Services */}
        {unselectedServices.length > 0 && (
            <div className="pt-8 border-t border-dashed border-gray-300">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Suggested Add-ons</h3>
                <div className="space-y-2">
                    {unselectedServices.map(service => (
                        <div key={service} className="p-3 border border-gray-200 border-dashed rounded-lg bg-white/50 flex items-center justify-between group hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer" onClick={() => onAddService(service)}>
                             <span className="text-xs font-medium text-gray-600 group-hover:text-indigo-700">{service.replace('_', ' ')}</span>
                             <button className="text-gray-400 group-hover:text-indigo-600 bg-white rounded-full p-1 hover:bg-indigo-100 transition-colors">
                                 <PlusCircle size={16} />
                             </button>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};