import React, { useState, useMemo, useEffect } from 'react';
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  useSensor, 
  useSensors, 
  PointerSensor,
  DragStartEvent,
  TouchSensor
} from '@dnd-kit/core';
import { Event, TimelineItem, Vendor, ServiceType } from '../types';
import { Timeline } from './Timeline';
import { Toolbox } from './Toolbox';
import { VendorCard } from './VendorCard';
import { AlertCircle, CheckCircle2, Calendar as CalendarIcon, ArrowLeft, Lock, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface WorkspaceProps {
  initialEvent: Event;
  onSave: (event: Event) => void;
  isReadOnly?: boolean;
}

const HOUR_HEIGHT = 192; // Must match Timeline.tsx

export const Workspace: React.FC<WorkspaceProps> = ({ initialEvent, onSave, isReadOnly = false }) => {
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event>(initialEvent);
  const [activeDragItem, setActiveDragItem] = useState<{type: 'VENDOR' | 'TIMELINE_ITEM', data: any} | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  
  // State to manage the confirmation transition
  const [isConfirming, setIsConfirming] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  // Auto-save whenever event changes (only if not read-only and not currently confirming)
  useEffect(() => {
    if (!isReadOnly && !isConfirming) {
        onSave(event);
    }
  }, [event, onSave, isReadOnly, isConfirming]);

  // Generate days array
  const eventDays = useMemo(() => {
    if (!event.date) return [];
    
    // Default to 1 day if mode is SINGLE or no endDate
    if (event.dateMode === 'SINGLE' || !event.endDate) {
      return [new Date(event.date)];
    }

    const days = [];
    const current = new Date(event.date);
    const end = new Date(event.endDate);
    
    // Safety break to prevent infinite loops if dates are messed up
    let count = 0;
    while (current <= end && count < 14) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
      count++;
    }
    return days;
  }, [event.date, event.endDate, event.dateMode]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Reduced distance for easier start on mobile
      },
    }),
    useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250, // Small delay for touch to prevent scrolling interference
            tolerance: 5,
        }
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    if (isReadOnly || isConfirming) return;
    if (event.active.data.current) {
        // Check if it's a vendor from toolbox OR an item from timeline
        const type = event.active.data.current.type === 'TIMELINE_ITEM' ? 'TIMELINE_ITEM' : 'VENDOR';
        setActiveDragItem({
            type,
            data: event.active.data.current
        });
    }
  };

  const handleDragEnd = (dragEvent: DragEndEvent) => {
    if (isReadOnly || isConfirming) return;
    const { active, over } = dragEvent;
    setActiveDragItem(null);

    if (!over) return;

    // We dropped onto a Timeline Slot
    if (over.id.toString().startsWith('slot-')) {
      // Parse slot ID: slot-{dayIndex}-{hour}
      const parts = over.id.toString().split('-');
      const targetDayIndex = parseInt(parts[1]);
      const targetHour = parseInt(parts[2]);

      // Calculate exact drop time based on position within the slot
      let minutesOffset = 0;
      if (active.rect.current.translated && over.rect) {
         const relativeY = active.rect.current.translated.top - over.rect.top;
         const rawMinutes = (relativeY / HOUR_HEIGHT) * 60;
         minutesOffset = Math.round(rawMinutes / 15) * 15; // Snap to 15
         minutesOffset = Math.max(0, Math.min(45, minutesOffset));
      }

      const startTime = `${targetHour < 10 ? '0' : ''}${targetHour}:${minutesOffset === 0 ? '00' : minutesOffset}`;

      // Logic: Are we moving an EXISTING item or adding a NEW one?
      const isExistingItem = active.data.current?.type === 'TIMELINE_ITEM';
      
      if (isExistingItem) {
          // --- MOVE EXISTING ITEM ---
          const item = active.data.current.item as TimelineItem;
          // Update the item's start time and day index
          setEvent(prev => ({
              ...prev,
              timeline: prev.timeline.map(t => {
                  if (t.id === item.id) {
                      return { ...t, startTime, dayIndex: targetDayIndex };
                  }
                  return t;
              })
          }));
      } else {
          // --- ADD NEW VENDOR ---
          const vendor = active.data.current as Vendor;
          
          // Calculate Cost
          const cost = vendor.pricingModel === 'FLAT' 
            ? vendor.pricePerUnit 
            : vendor.pricePerUnit * event.headcount;

          // Logic for Venue/Accommodation duration
          let durationMinutes = 60;
          if (vendor.type === 'VENUE' || vendor.type === 'ACCOMMODATION') {
            const endOfDayHour = 23;
            const remainingMinutes = ((endOfDayHour - targetHour) * 60) - minutesOffset;
            durationMinutes = Math.max(60, remainingMinutes);
            // Venue ends at 7pm logic if start is early
            if (targetHour < 19 && vendor.type === 'VENUE') {
                const endTarget = 19;
                const minUntil7 = ((endTarget - targetHour) * 60) - minutesOffset;
                durationMinutes = minUntil7;
            }
          }

          const newItem: TimelineItem = {
            id: `item-${Date.now()}`,
            vendorId: vendor.id,
            dayIndex: targetDayIndex, 
            startTime,
            durationMinutes,
            cost,
            // Tracking Defaults
            vendorStatus: 'MAILED',
            paymentStatus: 'UNPAID',
            documents: [],
            vendorContact: {
                email: `bookings@${vendor.name.toLowerCase().replace(/\s/g, '')}.com`,
                phone: '+1 (555) 012-3456'
            }
          };

          setEvent(prev => ({
            ...prev,
            timeline: [...prev.timeline, newItem],
            currentSpend: prev.currentSpend + cost
          }));
      }
    }
  };

  const handleRemoveItem = (itemId: string) => {
    if (isReadOnly || isConfirming) return;
    setEvent(prev => {
      const itemToRemove = prev.timeline.find(i => i.id === itemId);
      if (!itemToRemove) return prev;
      
      return {
        ...prev,
        timeline: prev.timeline.filter(i => i.id !== itemId),
        currentSpend: prev.currentSpend - itemToRemove.cost
      };
    });
  };

  const handleUpdateItem = (itemId: string, updates: Partial<TimelineItem>) => {
    if (isReadOnly || isConfirming) return;
    setEvent(prev => ({
      ...prev,
      timeline: prev.timeline.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      ),
    }));
  };

  const handleAddService = (service: ServiceType) => {
    if (isReadOnly || isConfirming) return;
    setEvent(prev => {
      if (prev.requiredServices.includes(service)) return prev;
      return {
        ...prev,
        requiredServices: [...prev.requiredServices, service]
      };
    });
  };

  const handleConfirm = async () => {
    if (isReadOnly || isConfirming) return;
    
    // 1. Lock UI
    setIsConfirming(true);
    
    // 2. Prepare Confirmed Event State
    const confirmedEvent: Event = {
        ...event,
        status: 'CONFIRMED'
    };
    
    // 3. Update Local State (Visually immediate)
    setEvent(confirmedEvent);

    // 4. Update Parent State (Persist)
    // We call this explicitly and wait slightly to ensure React batches updates
    onSave(confirmedEvent);
    
    // 5. Show Success Animation
    setShowSuccessOverlay(true);
    
    // 6. Navigate after delay (allows user to see confirmation and state to flush)
    setTimeout(() => {
        navigate(`/manage/${confirmedEvent.id}`);
    }, 1500);
  };

  // Budget Calculations
  const budgetProgress = (event.currentSpend / (event.totalBudgetLimit || 1)) * 100; // avoid div by zero
  const isOverBudget = event.currentSpend > event.totalBudgetLimit;

  return (
    <>
      {/* Success Overlay */}
      {showSuccessOverlay && (
        <div className="fixed inset-0 z-[9999] bg-white/90 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
           <div className="flex flex-col items-center">
              <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-in zoom-in duration-500">
                  <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Plan Confirmed!</h2>
              <p className="text-slate-500">Redirecting to your dashboard...</p>
           </div>
        </div>
      )}

      <DndContext 
        sensors={isReadOnly ? [] : sensors} 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col h-screen overflow-hidden bg-white text-gray-900">
          
          {/* Top Bar */}
          <header className="h-14 md:h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-6 z-30 flex-shrink-0 shadow-sm relative">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-7 w-7 md:h-8 md:w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                E
              </div>
              <div className="hidden md:block">
                <h1 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{event.name}</h1>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full">{event.eventType}</span>
                  {event.vibe && <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">{event.vibe}</span>}
                  {isReadOnly && (
                      <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-1">
                          <Lock size={10} /> Archived
                      </span>
                  )}
                </div>
              </div>
            </Link>

            {/* Budget Bar - Flexible Width */}
            <div className="flex-1 max-w-[150px] md:max-w-xl mx-4 md:mx-12">
              <div className="flex justify-between text-[10px] md:text-xs font-semibold mb-1.5">
                <span className={isOverBudget ? 'text-red-600' : 'text-gray-600'}>
                  ${event.currentSpend.toLocaleString()}
                </span>
                <span className="text-gray-400">
                  ${event.totalBudgetLimit.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 md:h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${isOverBudget ? 'bg-red-500' : 'bg-indigo-600'}`}
                  style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              {isOverBudget ? (
                <div className="hidden md:flex items-center text-xs text-red-600 font-medium bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                  <AlertCircle size={14} className="mr-1.5" /> Over
                </div>
              ) : (
                  <div className="hidden md:flex items-center text-xs text-green-700 font-medium bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                  <CheckCircle2 size={14} className="mr-1.5" /> Good
                </div>
              )}
              <button 
                  onClick={handleConfirm} 
                  disabled={isReadOnly || isConfirming}
                  className={`text-xs md:text-sm font-medium px-3 md:px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center gap-2 ${
                      isReadOnly || isConfirming
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                          : 'bg-gray-900 hover:bg-black text-white'
                  }`}
              >
                {isConfirming && <Loader2 size={14} className="animate-spin" />}
                {isReadOnly ? 'Read Only' : isConfirming ? 'Saving...' : 'Confirm Plan'}
              </button>
            </div>
          </header>

          {/* Multi-Day Navigation */}
          {eventDays.length > 0 && (
            <div className="h-10 md:h-12 border-b border-gray-200 bg-gray-50 flex items-center px-4 md:px-6 gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2 flex items-center gap-1 shrink-0">
                  <CalendarIcon size={12} /> Days
              </span>
              {eventDays.map((date, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentDayIndex(idx)}
                    className={`
                      px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap
                      ${currentDayIndex === idx 
                        ? 'bg-white text-indigo-600 shadow-sm border border-gray-200' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                      }
                    `}
                  >
                    Day {idx + 1} <span className="opacity-50 font-normal ml-1">({date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})</span>
                  </button>
              ))}
            </div>
          )}

          {/* Main Area - Responsive Layout */}
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            
            {/* Top/Left: Timeline (Grow on Desktop, 60% Height on Mobile) */}
            <div className="h-[60%] md:h-full md:w-3/4 relative border-b md:border-b-0 md:border-r border-gray-200 order-1">
              <Timeline 
                items={event.timeline} 
                dayIndex={currentDayIndex} 
                onRemoveItem={handleRemoveItem}
                onUpdateItem={handleUpdateItem}
              />
              {(isReadOnly || isConfirming) && (
                  <div className="absolute inset-0 z-40 bg-white/10 pointer-events-none"></div>
              )}
            </div>

            {/* Bottom/Right: Toolbox (40% Height on Mobile, Fixed Width on Desktop) */}
            <div className="h-[40%] md:h-full md:w-1/4 bg-gray-50 order-2 flex flex-col z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none relative">
              {(isReadOnly || isConfirming) && (
                  <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-[1px] z-50 flex items-center justify-center flex-col text-slate-400">
                      <Lock size={32} className="mb-2" />
                      <span className="text-sm font-semibold">{isConfirming ? 'Finalizing Plan...' : 'Editing Locked'}</span>
                  </div>
              )}
              <Toolbox 
                  requiredServices={event.requiredServices} 
                  eventVibe={event.vibe}
                  budgetLimit={event.totalBudgetLimit} 
                  onAddService={handleAddService}
              />
            </div>
          </div>
        </div>

        {/* Drag Overlay for smooth visuals */}
        <DragOverlay>
          {activeDragItem ? (
            <div style={{ width: '280px' }}>
              {activeDragItem.type === 'VENDOR' ? (
                  <VendorCard vendor={activeDragItem.data as Vendor} isOverlay />
              ) : (
                  <div className="bg-white p-3 rounded-lg shadow-xl border border-indigo-500 border-l-4 border-l-indigo-600 opacity-90">
                      <h4 className="font-bold text-xs text-gray-900">Moving Item...</h4>
                      <p className="text-xs text-gray-500">Drop on a time slot</p>
                  </div>
              )}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};