import React, { useState } from 'react';
import { Event, ServiceType } from '../types';
import { Calendar, Users, DollarSign, ArrowRight, Check } from 'lucide-react';

interface EventWizardProps {
  onComplete: (eventData: Partial<Event>) => void;
}

const SERVICE_OPTIONS: { id: ServiceType; label: string; icon: string }[] = [
  { id: 'VENUE', label: 'Venue', icon: '🏰' },
  { id: 'CATERING', label: 'Catering', icon: '🍽️' },
  { id: 'ACCOMMODATION', label: 'Accommodation', icon: '🛏️' },
  { id: 'PHOTOGRAPHER', label: 'Photographer', icon: '📸' },
  { id: 'ENTERTAINMENT', label: 'Entertainment', icon: '🎤' },
  { id: 'MARKETING_MATERIALS', label: 'Marketing', icon: '📢' },
];

export const EventWizard: React.FC<EventWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Event>>({
    name: 'My New Event',
    eventType: 'OFFSITE',
    headcount: 50,
    totalBudgetLimit: 10000,
    requiredServices: [],
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else onComplete(formData);
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-100 w-full">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Plan your {formData.eventType?.toLowerCase()}
            </h1>
            <p className="text-gray-500">Step {step} of 4: Let's get the basics down.</p>
          </div>

          {/* Step 1: Event Type */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['OFFSITE', 'DINNER', 'PARTY', 'CONFERENCE'].map((type) => (
                <button
                  key={type}
                  onClick={() => updateField('eventType', type)}
                  className={`
                    p-6 rounded-xl border-2 text-left transition-all
                    ${formData.eventType === type 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                      : 'border-gray-100 hover:border-indigo-200 bg-white text-gray-600'
                    }
                  `}
                >
                  <span className="block text-lg font-bold mb-1">{type}</span>
                  <span className="text-sm opacity-80">Perfect for team building and goals.</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Headcount & Date */}
          {step === 2 && (
            <div className="space-y-8">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
                  <Users className="mr-2" size={18} /> Estimated Headcount
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={formData.headcount}
                    onChange={(e) => updateField('headcount', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="w-20 text-center font-mono font-bold text-xl text-indigo-600 bg-indigo-50 py-2 rounded-lg">
                    {formData.headcount}
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
                  <Calendar className="mr-2" size={18} /> Event Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
                  onChange={(e) => updateField('date', new Date(e.target.value))}
                />
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div className="space-y-6">
               <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
                  <DollarSign className="mr-2" size={18} /> Total Budget Limit
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">$</span>
                  <input
                    type="number"
                    value={formData.totalBudgetLimit}
                    onChange={(e) => updateField('totalBudgetLimit', parseInt(e.target.value))}
                    className="w-full pl-10 pr-4 py-4 text-2xl font-bold text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    placeholder="25000"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Approx. ${((formData.totalBudgetLimit || 0) / (formData.headcount || 1)).toFixed(0)} per person.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Services */}
          {step === 4 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {SERVICE_OPTIONS.map((service) => {
                const isSelected = formData.requiredServices?.includes(service.id);
                return (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 h-32
                      ${isSelected 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-gray-100 hover:border-indigo-200 bg-white text-gray-500'
                      }
                    `}
                  >
                    <span className="text-3xl">{service.icon}</span>
                    <span className="font-semibold text-sm">{service.label}</span>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-1">
                        <Check size={10} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-10 flex justify-end">
             <button
                onClick={handleNext}
                disabled={step === 4 && formData.requiredServices?.length === 0}
                className="group flex items-center bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 4 ? 'Launch Workspace' : 'Continue'}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};