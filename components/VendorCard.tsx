import React from 'react';
import { Vendor } from '../types';
import { Star, DollarSign, MapPin, Sparkles } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

interface VendorCardProps {
  vendor: Vendor;
  isOverlay?: boolean;
  onVisualize?: () => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor, isOverlay, onVisualize }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: vendor.id,
    data: vendor,
  });

  // If we are dragging this specific instance in the list, hide it to simulate "picking it up"
  // Unless it's the overlay itself
  const style = isDragging && !isOverlay ? { opacity: 0.3 } : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`
        flex flex-col gap-2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm 
        cursor-grab active:cursor-grabbing hover:shadow-md transition-all relative group
        ${isOverlay ? 'shadow-xl rotate-2 scale-105 border-indigo-500' : ''}
      `}
    >
      <div className="relative h-32 w-full overflow-hidden rounded-md bg-gray-100">
        <img 
          src={vendor.imageUrl} 
          alt={vendor.name} 
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center shadow-sm">
          <Star size={10} className="text-yellow-500 mr-1 fill-yellow-500" />
          {vendor.rating.toFixed(1)}
        </div>
        {/* Vibe Badge */}
        {vendor.vibe && (
            <div className="absolute bottom-2 left-2 bg-indigo-600/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-sm uppercase tracking-wider">
               {vendor.vibe}
            </div>
        )}
        
        {/* Visualize Button (Only show if not overlay and handler exists) */}
        {!isOverlay && onVisualize && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
             <button
               onPointerDown={(e) => e.stopPropagation()} // Stop dragging from starting
               onClick={(e) => { e.stopPropagation(); onVisualize(); }}
               className="pointer-events-auto bg-white/95 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 hover:bg-indigo-50 transform hover:scale-105 transition-all"
             >
                <Sparkles size={12} /> Visualize
             </button>
          </div>
        )}
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 text-sm leading-tight">{vendor.name}</h4>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{vendor.description}</p>
      </div>

      <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-600 font-medium">
          <DollarSign size={12} className="text-gray-400 mr-0.5" />
          {vendor.pricePerUnit.toLocaleString()}
          <span className="text-gray-400 font-normal ml-1">
            /{vendor.pricingModel === 'FLAT' ? 'flat' : 'head'}
          </span>
        </div>
        {vendor.location && (
          <div className="flex items-center text-[10px] text-gray-400">
            <MapPin size={10} className="mr-1" />
            {vendor.location}
          </div>
        )}
      </div>
    </div>
  );
};