import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { TimelineItem, Vendor } from '../types';
import { MOCK_VENDORS } from '../constants';
import { Clock, Trash2, X, Check, CalendarClock } from 'lucide-react';

interface TimelineProps {
  items: TimelineItem[];
  dayIndex: number;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, updates: Partial<TimelineItem>) => void;
}

const START_HOUR = 0; // 00:00
const END_HOUR = 23; // 23:00 (Effectively covers up to 24:00)
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);
const HOUR_HEIGHT = 192; // 48px per 15 mins

// Generate Time Options (00:00 to 23:55 in 5 min steps)
const TIME_OPTIONS: string[] = [];
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 5) {
    TIME_OPTIONS.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
  }
}

// Droppable Row Component with 15-min guides
const TimeSlotRow: React.FC<{ hour: number; dayIndex: number }> = ({ hour, dayIndex }) => {
  const slotId = `slot-${dayIndex}-${hour}`;
  const { setNodeRef, isOver } = useDroppable({ id: slotId });

  return (
    <div 
      ref={setNodeRef}
      className={`border-b border-gray-100 w-full relative group transition-colors duration-200 box-border ${isOver ? 'bg-indigo-50/60' : 'bg-white'}`}
      style={{ height: HOUR_HEIGHT }}
    >
      {/* Time Label */}
      <div className="absolute -left-12 md:-left-16 top-0 w-12 text-right text-[10px] md:text-xs text-gray-400 font-mono -translate-y-1/2 bg-white pr-2 z-10 select-none">
        {hour < 10 ? `0${hour}` : hour}:00
      </div>

      {/* Hover Guide (Active Hour) */}
      <div className="hidden group-hover:block absolute inset-0 pointer-events-none border-l-2 border-indigo-200 bg-indigo-50/10 ml-0"></div>
      
      {/* 15 Minute Markers */}
      <div className="absolute top-[25%] left-0 right-0 border-t border-dotted border-gray-50 flex justify-end pr-2"><span className="text-[9px] text-gray-200 hidden group-hover:block">:15</span></div>
      <div className="absolute top-[50%] left-0 right-0 border-t border-dotted border-gray-100/60 flex justify-end pr-2"><span className="text-[9px] text-gray-200 hidden group-hover:block">:30</span></div>
      <div className="absolute top-[75%] left-0 right-0 border-t border-dotted border-gray-50 flex justify-end pr-2"><span className="text-[9px] text-gray-200 hidden group-hover:block">:45</span></div>
    </div>
  );
};

// Helper to format minutes to "1h 30m"
const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
};

// Helper to calculate End Time string
const getEndTime = (startTime: string, durationMinutes: number) => {
  const [h, m] = startTime.split(':').map(Number);
  const totalMinutes = h * 60 + m + durationMinutes;
  let endH = Math.floor(totalMinutes / 60);
  const endM = totalMinutes % 60;
  
  if (endH >= 24) endH = endH % 24; // Simple wrap for single day view
  
  return `${endH < 10 ? '0' : ''}${endH}:${endM < 10 ? '0' : ''}${endM}`;
};

// Simple Modal for Time Editing
const TimeEditorModal: React.FC<{
  initialStart: string;
  initialDuration: number;
  onSave: (newStart: string, newDuration: number) => void;
  onClose: () => void;
}> = ({ initialStart, initialDuration, onSave, onClose }) => {
  const [startTime, setStartTime] = useState(initialStart);
  const [endTime, setEndTime] = useState(getEndTime(initialStart, initialDuration));

  const handleSave = () => {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    
    let startTotal = startH * 60 + startM;
    let endTotal = endH * 60 + endM;

    if (endTotal < startTotal) {
       endTotal += 24 * 60;
    }

    const duration = Math.max(5, endTotal - startTotal); // Min 5 mins
    onSave(startTime, duration);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4" onClick={(e) => { e.stopPropagation(); }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
           <h3 className="font-bold text-gray-900 flex items-center gap-2">
             <CalendarClock size={18} className="text-indigo-600"/> Edit Time
           </h3>
           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-200/50">
             <X size={18} />
           </button>
        </div>
        
        <div className="p-6 space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Start Time</label>
                 <select 
                   value={startTime}
                   onChange={(e) => setStartTime(e.target.value)}
                   className="w-full p-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                 >
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                 </select>
              </div>
              <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2">End Time</label>
                 <select 
                   value={endTime}
                   onChange={(e) => setEndTime(e.target.value)}
                   className="w-full p-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                 >
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                    <option value="00:00">00:00 (Next Day)</option> 
                 </select>
              </div>
           </div>
           
           <div className="bg-indigo-50 p-3 rounded-lg flex justify-between items-center">
              <span className="text-xs font-medium text-indigo-700">Duration</span>
              <span className="text-sm font-bold text-indigo-900">
                 {(() => {
                    const [sh, sm] = startTime.split(':').map(Number);
                    const [eh, em] = endTime.split(':').map(Number);
                    let diff = (eh * 60 + em) - (sh * 60 + sm);
                    if (diff < 0) diff += 24 * 60;
                    return formatDuration(diff);
                 })()}
              </span>
           </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
           <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">Cancel</button>
           <button onClick={handleSave} className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 flex items-center gap-2 shadow-sm">
             <Check size={16} /> Save Changes
           </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Individual Event Component
const TimelineEventItem: React.FC<{
  item: TimelineItem;
  vendor: Vendor;
  layout: any;
  isContainer?: boolean;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<TimelineItem>) => void;
}> = ({ item, vendor, layout, isContainer, onRemove, onUpdate }) => {
  const [isEditingTime, setIsEditingTime] = useState(false);

  // Make the item draggable
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `timeline-item-${item.id}`,
    data: { 
      type: 'TIMELINE_ITEM',
      item: item,
      vendor: vendor
    },
    disabled: isEditingTime
  });

  const currentHeight = layout.height;
  const isImageVisible = currentHeight >= 60;
  
  const displayDuration = item.durationMinutes;
  const endTime = getEndTime(item.startTime, displayDuration);
  const colorCode = getColorCode(vendor.type);

  // Background items (Containers) look distinct from floating items
  const containerStyles = isContainer ? {
    backgroundColor: `${colorCode}08`, // Very transparent background
    borderColor: `${colorCode}40`,     // Subtle border
    borderLeftWidth: 4,
    borderLeftColor: colorCode,
    zIndex: 0
  } : {
    backgroundColor: 'white',
    borderColor: '#e2e8f0', // slate-200
    borderLeftWidth: 4,
    borderLeftColor: colorCode,
    zIndex: 10
  };

  const style: React.CSSProperties = {
    top: layout.top,
    left: layout.left,
    width: layout.width,
    height: layout.height,
    zIndex: isDragging ? 50 : (containerStyles.zIndex),
    opacity: isDragging ? 0.5 : 1,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="absolute p-1 transition-all group overflow-visible touch-none"
      >
        <div 
          className={`
            w-full h-full rounded-lg border shadow-sm flex flex-col hover:shadow-md transition-all relative select-none overflow-hidden
            ${isDragging ? 'ring-2 ring-indigo-400 rotate-1 cursor-grabbing shadow-xl' : 'cursor-grab active:cursor-grabbing'}
          `}
          style={{
             ...containerStyles,
             // If dragging, we override transparency to make it solid for visibility
             backgroundColor: isDragging ? 'white' : containerStyles.backgroundColor
          }}
          {...listeners}
          {...attributes}
        >
          {/* Action Buttons: Top Right Corner */}
          <div className="absolute top-1.5 right-1.5 flex gap-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
             <button 
                 onPointerDown={e => e.stopPropagation()} 
                 onClick={(e) => { e.stopPropagation(); setIsEditingTime(true); }}
                 className="p-1 rounded-md bg-white/80 hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 border border-transparent hover:border-indigo-100 transition-all shadow-sm"
                 title="Edit Time"
             >
                 <CalendarClock size={13} />
             </button>
             <button 
                 onPointerDown={e => e.stopPropagation()} 
                 onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
                 className="p-1 rounded-md bg-white/80 hover:bg-red-50 text-gray-400 hover:text-red-500 border border-transparent hover:border-red-100 transition-all shadow-sm"
                 title="Remove"
             >
                 <Trash2 size={13} />
             </button>
          </div>

          <div className="flex h-full p-2 gap-3 relative">
             {/* Optional Image - Hide for background containers to keep it clean, or if too small */}
             {isImageVisible && !isContainer && (
               <div className="w-10 h-10 rounded-md bg-gray-100 flex-shrink-0 overflow-hidden mt-0.5 border border-slate-100">
                 <img src={vendor.imageUrl} alt="" className="w-full h-full object-cover" />
               </div>
             )}

             {/* Content Area - Top Aligned */}
             <div className="flex-1 min-w-0 pr-12 flex flex-col justify-start">
                 <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono font-medium leading-none mb-1.5">
                    <span className={isContainer ? "text-gray-700 font-bold" : ""}>{item.startTime} - {endTime}</span>
                    <span className="bg-slate-100 px-1.5 rounded text-slate-500">{formatDuration(displayDuration)}</span>
                 </div>
                 <div className={`font-bold text-gray-900 truncate leading-tight ${isContainer ? 'text-sm' : 'text-xs'}`}>
                    {vendor.name} {isContainer && <span className="text-xs font-normal text-gray-500 ml-2">(Venue)</span>}
                 </div>
                 
                 {/* Show extra details for containers if there is space */}
                 {isContainer && (
                     <p className="text-xs text-gray-500 mt-1 line-clamp-2 w-3/4">
                        {vendor.description}
                     </p>
                 )}
             </div>
          </div>
        </div>
      </div>
      
      {isEditingTime && (
        <TimeEditorModal 
          initialStart={item.startTime}
          initialDuration={item.durationMinutes}
          onClose={() => setIsEditingTime(false)}
          onSave={(newStart, newDuration) => {
             onUpdate(item.id, { startTime: newStart, durationMinutes: newDuration });
             setIsEditingTime(false);
          }}
        />
      )}
    </>
  );
};

export const Timeline: React.FC<TimelineProps> = ({ items, dayIndex, onRemoveItem, onUpdateItem }) => {
  
  const dailyItems = items.filter(i => (i.dayIndex ?? 0) === dayIndex);

  useEffect(() => {
    const container = document.getElementById('timeline-scroll-container');
    if (container) {
        container.scrollTop = 8 * HOUR_HEIGHT;
    }
  }, []);

  const getVendor = (vendorId: string): Vendor | undefined => {
    return MOCK_VENDORS.find(v => v.id === vendorId);
  };

  const parseTimeMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + (m || 0);
  };

  // Improved Layout Engine for "Calendar" style
  // 1. Identify "Containers" (Venues) vs "Standard" items
  // 2. Containers get full width (background layer)
  // 3. Standard items share width among themselves (foreground layer)
  const getItemLayout = (item: TimelineItem, allItems: TimelineItem[], vendor: Vendor) => {
    const startHour = parseInt(item.startTime.split(':')[0]);
    const startMin = parseInt(item.startTime.split(':')[1]) || 0;
    
    // Vertical Position
    const top = (startHour - START_HOUR) * HOUR_HEIGHT + (startMin / 60) * HOUR_HEIGHT;
    const height = (item.durationMinutes / 60) * HOUR_HEIGHT;

    // Check if this item acts as a container (Venue or Accom)
    // You can also use duration threshold, e.g., > 3 hours
    const isContainer = vendor.type === 'VENUE' || vendor.type === 'ACCOMMODATION';

    if (isContainer) {
        return {
            top,
            height: Math.max(height - 4, 30),
            left: '0.5%', 
            width: '99%',
            isContainer: true
        };
    }

    // --- Standard Items Layout (Foreground) ---
    // Only compare against other Standard Items
    const standardItems = allItems.filter(i => {
       const v = getVendor(i.vendorId);
       return v && v.type !== 'VENUE' && v.type !== 'ACCOMMODATION';
    });

    const itemStart = parseTimeMinutes(item.startTime);
    const itemEnd = itemStart + item.durationMinutes;

    // Filter items that overlap in time
    const overlappingItems = standardItems.filter(other => {
      const otherStart = parseTimeMinutes(other.startTime);
      const otherEnd = otherStart + other.durationMinutes;
      return (itemStart < otherEnd && itemEnd > otherStart);
    });

    // Sort overlaps by ID or time to ensure consistent ordering
    overlappingItems.sort((a, b) => {
        const timeDiff = parseTimeMinutes(a.startTime) - parseTimeMinutes(b.startTime);
        if (timeDiff !== 0) return timeDiff;
        return a.id.localeCompare(b.id);
    });

    const totalOverlaps = overlappingItems.length;
    const index = overlappingItems.findIndex(i => i.id === item.id);
    
    // Calculate width and left position with some padding
    // We indent standard items slightly (2%) to visually sit "inside" the venue container
    const availableWidth = 96; // 96% width
    const widthPercent = availableWidth / totalOverlaps;
    const leftPercent = 2 + (index * widthPercent); // Start at 2%

    return {
        top,
        height: Math.max(height - 4, 30),
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
        isContainer: false
    };
  };

  return (
    <div className="h-full flex flex-col bg-white relative select-none">
      {/* Time Header */}
      <div className="h-10 border-b border-gray-100 flex items-center px-4 md:px-6 text-xs text-gray-400 font-medium uppercase tracking-widest bg-white z-20 sticky top-0 shadow-sm">
        <Clock size={12} className="mr-2" /> Schedule
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto pl-12 md:pl-20 pr-2 md:pr-6 pb-20 relative bg-white" id="timeline-scroll-container">
        
        {/* The Grid (Droppable Zones) */}
        <div className="relative min-h-[4608px]">
           {HOURS.map(hour => (
             <TimeSlotRow key={hour} hour={hour} dayIndex={dayIndex} />
           ))}

           {/* Items Layer */}
           {/* Render Containers First (Background), then Standard Items (Foreground) */}
           {dailyItems
             .sort((a, b) => {
                // Sort order: Containers first, then by time
                const vA = getVendor(a.vendorId);
                const vB = getVendor(b.vendorId);
                const isContainerA = vA?.type === 'VENUE' || vA?.type === 'ACCOMMODATION';
                const isContainerB = vB?.type === 'VENUE' || vB?.type === 'ACCOMMODATION';
                
                if (isContainerA && !isContainerB) return -1;
                if (!isContainerA && isContainerB) return 1;
                return 0;
             })
             .map(item => {
               const vendor = getVendor(item.vendorId);
               if (!vendor) return null;

               const layout = getItemLayout(item, dailyItems, vendor);

               return (
                 <TimelineEventItem
                    key={item.id}
                    item={item}
                    vendor={vendor}
                    layout={layout}
                    isContainer={layout.isContainer}
                    onRemove={onRemoveItem}
                    onUpdate={onUpdateItem}
                 />
               );
           })}
        </div>
      </div>
    </div>
  );
};

const getColorCode = (type: string) => {
  switch(type) {
    case 'VENUE': return '#8b5cf6'; // Violet
    case 'CATERING': return '#f97316'; // Orange
    case 'ENTERTAINMENT': return '#ec4899'; // Pink
    case 'PHOTOGRAPHER': return '#3b82f6'; // Blue
    case 'ACCOMMODATION': return '#10b981'; // Emerald
    case 'MARKETING_MATERIALS': return '#64748b'; // Slate
    default: return '#94a3b8';
  }
};