import React, { useState, useEffect } from 'react';
import { Event, ServiceType, EventType } from '../types';
import { Users, MapPin, Check, ArrowRight, ArrowLeft, Sparkles, Home, Camera, Music, FileText, Utensils, Plane, ChevronLeft, ChevronRight, Globe2, AlertCircle, DollarSign } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ManualWizardProps {
  onComplete: (eventData: Partial<Event>) => void;
}

const SERVICE_OPTIONS: { id: ServiceType; label: string; icon: any }[] = [
  { id: 'VENUE', label: 'Venue', icon: Home },
  { id: 'CATERING', label: 'Catering', icon: Utensils },
  { id: 'ACCOMMODATION', label: 'Accommodation', icon: Home }, 
  { id: 'PHOTOGRAPHER', label: 'Photo/Video', icon: Camera },
  { id: 'ENTERTAINMENT', label: 'Entertainment', icon: Music },
  { id: 'MARKETING_MATERIALS', label: 'Marketing', icon: FileText },
];

const EVENT_TYPES: EventType[] = [
  'OFFSITE', 'DINNER', 'PARTY', 'CONFERENCE', 
  'WORKSHOP', 'PRODUCT_LAUNCH', 'HACKATHON', 'NETWORKING'
];

const MAJOR_CITIES = [
  "London, UK", "Manchester, UK", "Edinburgh, UK", "Birmingham, UK", "Bristol, UK",
  "San Francisco, CA", "New York, NY", "Austin, TX", "Los Angeles, CA", "Chicago, IL", "Seattle, WA", "Boston, MA", "Miami, FL",
  "Paris, France", "Berlin, Germany", "Amsterdam, Netherlands", "Barcelona, Spain", "Dublin, Ireland", "Stockholm, Sweden", "Zurich, Switzerland", "Lisbon, Portugal",
  "Remote"
];

const RADIUS_OPTIONS = [0, 5, 10, 25, 50];

export const ManualWizard: React.FC<ManualWizardProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Custom Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [formData, setFormData] = useState<Partial<Event>>({
    name: '',
    eventType: 'OFFSITE',
    headcount: 50,
    location: '',
    locationRadius: 0,
    dateMode: 'SINGLE',
    date: null,
    endDate: null,
    vibe: '',
    requiredServices: [],
    totalBudgetLimit: 10000,
  });

  useEffect(() => {
    if (location.state?.prefilled) {
      setLoading(true);
      setTimeout(() => {
        setFormData(prev => ({ ...prev, ...location.state.prefilled }));
        setLoading(false);
      }, 1500);
    }
  }, [location.state]);

  const handleNext = () => {
    if (!isStepValid()) return;
    if (step < 4) setStep(step + 1);
    else onComplete(formData);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/create');
  };

  const updateField = (field: keyof Event, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: ServiceType) => {
    setFormData(prev => {
      const current = prev.requiredServices || [];
      if (current.includes(service)) {
        return { ...prev, requiredServices: current.filter(s => s !== service) };
      }
      return { ...prev, requiredServices: [...current, service] };
    });
  };

  // Calendar Helpers
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handleDateClick = (clickedDate: Date) => {
    if (formData.dateMode === 'SINGLE') {
      updateField('date', clickedDate);
      updateField('endDate', null);
    } else {
      if (!formData.date || (formData.date && formData.endDate)) {
        // Start new range
        updateField('date', clickedDate);
        updateField('endDate', null);
      } else {
        // Complete range
        if (clickedDate < formData.date) {
           updateField('endDate', formData.date);
           updateField('date', clickedDate);
        } else {
           updateField('endDate', clickedDate);
        }
      }
    }
  };

  const renderCalendarMonth = (monthOffset: number) => {
     const monthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
     const daysInMonth = getDaysInMonth(monthDate);
     const startDay = getFirstDayOfMonth(monthDate);
     const monthName = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

     const days = [];
     for (let i = 0; i < startDay; i++) days.push(null);
     for (let i = 1; i <= daysInMonth; i++) days.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), i));

     return (
       <div className="flex-1">
          <div className="text-center font-semibold mb-4 text-slate-800">{monthName}</div>
          <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2 text-slate-400 font-medium">
             <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
          </div>
          <div className="grid grid-cols-7 gap-1">
             {days.map((d, i) => {
                if (!d) return <div key={i} className="aspect-square"></div>;
                
                const isSelected = 
                   (formData.date && d.getTime() === formData.date.getTime()) || 
                   (formData.endDate && d.getTime() === formData.endDate.getTime());
                
                const isInRange = 
                   formData.date && formData.endDate && 
                   d > formData.date && d < formData.endDate;

                return (
                   <button
                     key={i}
                     onClick={() => handleDateClick(d)}
                     className={`
                       aspect-square rounded-full text-sm flex items-center justify-center transition-all
                       ${isSelected ? 'bg-indigo-600 text-white font-bold shadow-md transform scale-105' : ''}
                       ${isInRange ? 'bg-indigo-100 text-indigo-900 rounded-none' : ''}
                       ${!isSelected && !isInRange ? 'hover:bg-slate-100 text-slate-700' : ''}
                       ${isInRange && i % 7 === 0 ? 'rounded-l-full' : ''}
                       ${isInRange && i % 7 === 6 ? 'rounded-r-full' : ''}
                     `}
                   >
                     {d.getDate()}
                   </button>
                );
             })}
          </div>
       </div>
     );
  };

  // Validation Logic
  const isStepValid = () => {
      switch(step) {
          case 1: 
              return !!formData.name && !!formData.eventType && (formData.totalBudgetLimit || 0) > 0;
          case 2:
              // Must have location AND date
              return !!formData.location && !!formData.date;
          case 3:
              return true; // Vibe optional
          case 4:
              // Must have at least 1 service
              return (formData.requiredServices?.length || 0) > 0;
          default: return true;
      }
  };

  const getRadiusIndex = (val: number) => RADIUS_OPTIONS.indexOf(val) !== -1 ? RADIUS_OPTIONS.indexOf(val) : 0;
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const idx = parseInt(e.target.value);
      updateField('locationRadius', RADIUS_OPTIONS[idx]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-6"
        >
          <Sparkles size={48} className="text-indigo-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Consulting the Eventura Engine...</h2>
        <p className="text-slate-500">Generating the perfect event for you.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
           <button onClick={handleBack} className="text-slate-400 hover:text-slate-600 transition-colors">
             <ArrowLeft size={20} />
           </button>
           <span className="font-semibold text-slate-900">Create Event</span>
        </div>
        <div className="flex gap-2">
           {[1, 2, 3, 4].map(s => (
             <div 
               key={s} 
               className={`h-2 w-8 rounded-full transition-colors duration-300 ${s <= step ? 'bg-indigo-600' : 'bg-slate-200'}`} 
             />
           ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12 my-8"
        >
          {/* Step 1: Basics & Budget */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                 <h2 className="text-3xl font-bold text-slate-900 mb-2">Research & Budget</h2>
                 <p className="text-slate-500">Define the core scope and financial limits.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Event Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full p-4 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="e.g. Q3 Marketing Offsite"
                  autoFocus
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Event Type <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select
                        value={formData.eventType}
                        onChange={(e) => updateField('eventType', e.target.value)}
                        className="w-full p-4 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white cursor-pointer"
                      >
                        {EVENT_TYPES.map(type => (
                          <option key={type} value={type}>{type.replace('_', ' ')}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <ChevronLeft className="rotate-[-90deg]" size={20} />
                      </div>
                    </div>
                  </div>

                  <div>
                     <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                         <DollarSign className="mr-2" size={16} /> Total Budget <span className="text-red-500">*</span>
                     </label>
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                             <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Max Spend</div>
                             <div className="relative w-36">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                                <input 
                                    type="number"
                                    min="0"
                                    max="100000"
                                    step="500"
                                    value={formData.totalBudgetLimit}
                                    onChange={(e) => updateField('totalBudgetLimit', parseInt(e.target.value))}
                                    className="w-full py-2 pl-6 pr-3 text-right font-mono font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
                                />
                             </div>
                        </div>
                         <input
                            type="range"
                            min="0"
                            max="100000"
                            step="500"
                            value={formData.totalBudgetLimit || 0}
                            onChange={(e) => updateField('totalBudgetLimit', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                         <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-medium">
                            <span>$0</span>
                            <span>$25k</span>
                            <span>$50k</span>
                            <span>$75k</span>
                            <span>$100k</span>
                         </div>
                     </div>
                  </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-4">
                  <Users className="mr-2" size={16} /> Estimated Headcount
                </label>
                
                <div className="flex items-center gap-6">
                   <div className="flex-1">
                      <input
                        type="range"
                        min="1"
                        max="500"
                        step="1"
                        value={formData.headcount}
                        onChange={(e) => updateField('headcount', parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <div className="flex justify-between text-xs text-slate-400 mt-2">
                        <span>1</span>
                        <span>500+</span>
                      </div>
                   </div>
                   
                   <div className="w-24">
                      <input 
                        type="number"
                        min="1"
                        value={formData.headcount}
                        onChange={(e) => updateField('headcount', parseInt(e.target.value))}
                        className="w-full p-3 text-center text-lg font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Logistics */}
          {step === 2 && (
             <div className="space-y-8">
              <div className="text-center mb-8">
                 <h2 className="text-3xl font-bold text-slate-900 mb-2">When & Where</h2>
                 <p className="text-slate-500">Book your time and place. These are required.</p>
              </div>

              {/* Location Selector */}
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                   <MapPin className="mr-2" size={16} /> Location & Radius <span className="text-red-500">*</span>
                </label>
                
                <div className="space-y-4">
                    <div className="relative">
                       <select
                          value={MAJOR_CITIES.includes(formData.location || '') ? formData.location : (formData.location ? 'custom' : '')}
                          onChange={(e) => {
                             if(e.target.value !== 'custom') updateField('location', e.target.value);
                             else updateField('location', '');
                          }}
                          className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white font-medium text-slate-700"
                       >
                          <option value="" disabled>Select a major city</option>
                          <optgroup label="United Kingdom">
                             <option value="London, UK">London, UK</option>
                             <option value="Manchester, UK">Manchester, UK</option>
                             <option value="Edinburgh, UK">Edinburgh, UK</option>
                             <option value="Birmingham, UK">Birmingham, UK</option>
                             <option value="Bristol, UK">Bristol, UK</option>
                          </optgroup>
                          <optgroup label="United States">
                             <option value="San Francisco, CA">San Francisco, CA</option>
                             <option value="New York, NY">New York, NY</option>
                             <option value="Austin, TX">Austin, TX</option>
                             <option value="Los Angeles, CA">Los Angeles, CA</option>
                             <option value="Chicago, IL">Chicago, IL</option>
                             <option value="Seattle, WA">Seattle, WA</option>
                             <option value="Boston, MA">Boston, MA</option>
                             <option value="Miami, FL">Miami, FL</option>
                          </optgroup>
                          <optgroup label="Europe">
                             <option value="Paris, France">Paris, France</option>
                             <option value="Berlin, Germany">Berlin, Germany</option>
                             <option value="Amsterdam, Netherlands">Amsterdam, Netherlands</option>
                             <option value="Barcelona, Spain">Barcelona, Spain</option>
                             <option value="Dublin, Ireland">Dublin, Ireland</option>
                             <option value="Stockholm, Sweden">Stockholm, Sweden</option>
                             <option value="Zurich, Switzerland">Zurich, Switzerland</option>
                             <option value="Lisbon, Portugal">Lisbon, Portugal</option>
                          </optgroup>
                          <option value="Remote">Remote</option>
                          <option value="custom">Other / Custom</option>
                       </select>
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                          <ChevronLeft className="rotate-[-90deg]" size={20} />
                       </div>
                    </div>
                    
                    {(!MAJOR_CITIES.includes(formData.location || '') && formData.location !== undefined) && (
                       <input
                         type="text"
                         value={formData.location || ''}
                         onChange={(e) => updateField('location', e.target.value)}
                         className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none animate-in fade-in slide-in-from-top-1"
                         placeholder="Enter custom location..."
                         autoFocus
                       />
                    )}

                    {/* Radius Slider */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <label className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase mb-3">
                            <span className="flex items-center gap-1"><Globe2 size={12} /> Search Radius</span>
                            <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                                {formData.locationRadius === 0 ? 'Exact Location' : `+ ${formData.locationRadius} km`}
                            </span>
                        </label>
                        <input 
                           type="range"
                           min="0"
                           max="4"
                           step="1"
                           value={getRadiusIndex(formData.locationRadius || 0)}
                           onChange={handleRadiusChange}
                           className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-medium">
                           <span>Exact</span>
                           <span>5km</span>
                           <span>10km</span>
                           <span>25km</span>
                           <span>50km+</span>
                        </div>
                    </div>
                </div>
              </div>

              {/* Date Selection */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                 <div className="flex justify-between items-center mb-6">
                    <label className="text-sm font-semibold text-slate-700">Date Selection <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                       <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 hover:bg-slate-200 rounded-full"><ChevronLeft size={16} /></button>
                       <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 hover:bg-slate-200 rounded-full"><ChevronRight size={16} /></button>
                    </div>
                 </div>

                 <div className="flex flex-col md:flex-row gap-8">
                    {renderCalendarMonth(0)}
                    <div className="hidden md:block w-px bg-slate-200"></div>
                    {renderCalendarMonth(1)}
                 </div>

                 <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-4">
                     <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                       <button 
                          onClick={() => { updateField('dateMode', 'SINGLE'); updateField('endDate', null); }}
                          className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.dateMode === 'SINGLE' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                       >
                          Single Day
                       </button>
                       <button 
                          onClick={() => updateField('dateMode', 'MULTI')}
                          className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.dateMode === 'MULTI' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                       >
                          Multi-Day
                       </button>
                    </div>
                    <div className="text-sm text-slate-600">
                        {formData.date ? (
                            <span className="font-bold text-indigo-600">
                                {formData.date.toLocaleDateString()} 
                                {formData.dateMode === 'MULTI' && formData.endDate && ` - ${formData.endDate.toLocaleDateString()}`}
                            </span>
                        ) : 'No date selected'}
                    </div>
                 </div>
              </div>

            </div>
          )}

          {/* Step 3: Vibe */}
          {step === 3 && (
             <div className="space-y-8">
              <div className="text-center mb-8">
                 <h2 className="text-3xl font-bold text-slate-900 mb-2">Set the Vibe</h2>
                 <p className="text-slate-500">How do you want your guests to feel?</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                 {['Professional', 'Relaxed', 'High Energy', 'Luxury', 'Rustic', 'Tech-Focused'].map((vibe) => (
                    <button
                      key={vibe}
                      onClick={() => updateField('vibe', vibe)}
                      className={`
                        py-3 px-4 rounded-full border transition-all text-sm font-medium
                        ${formData.vibe === vibe
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-slate-50'
                        }
                      `}
                    >
                      {vibe}
                    </button>
                 ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                 <label className="block text-sm font-semibold text-slate-700 mb-2">Something specific?</label>
                 <textarea
                    rows={3}
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                    placeholder="Describe your specific vibe..."
                    value={formData.vibe && !['Professional', 'Relaxed', 'High Energy', 'Luxury', 'Rustic', 'Tech-Focused'].includes(formData.vibe) ? formData.vibe : ''}
                    onChange={(e) => updateField('vibe', e.target.value)}
                 ></textarea>
              </div>
            </div>
          )}

          {/* Step 4: Services */}
          {step === 4 && (
             <div className="space-y-8">
              <div className="text-center mb-8">
                 <h2 className="text-3xl font-bold text-slate-900 mb-2">Services Needed</h2>
                 <p className="text-slate-500">Select what you need to book for this event. <span className="text-red-500">*</span></p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SERVICE_OPTIONS.map((service) => {
                  const isSelected = formData.requiredServices?.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`
                        relative p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-3 h-32
                        ${isSelected 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md' 
                          : 'border-slate-100 hover:border-indigo-200 bg-white text-slate-500 hover:shadow-sm'
                        }
                      `}
                    >
                      <service.icon size={28} strokeWidth={1.5} />
                      <span className="font-semibold text-sm">{service.label}</span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-1 animate-in zoom-in">
                          <Check size={10} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {(formData.requiredServices?.length || 0) === 0 && (
                  <div className="text-center text-red-500 text-sm flex items-center justify-center gap-2">
                      <AlertCircle size={16} /> Please select at least one service.
                  </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-12 flex justify-between items-center pt-6 border-t border-slate-100">
             {step > 1 ? (
                <button onClick={handleBack} className="text-slate-500 font-medium hover:text-slate-800 transition-colors">
                   Back
                </button>
             ) : (
                <div></div> // Spacer
             )}
             
             <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 4 ? (location.state?.isLucky ? 'Generate Workspace' : 'Build Workspace') : 'Continue'}
                <ArrowRight size={18} />
              </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};