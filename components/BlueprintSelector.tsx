import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { Event, TimelineItem, ServiceType } from '../types';
import { MOCK_VENDORS } from '../constants';

interface BlueprintSelectorProps {
  onSelect: (eventData: Partial<Event>) => void;
}

export const BlueprintSelector: React.FC<BlueprintSelectorProps> = ({ onSelect }) => {
  const navigate = useNavigate();

  const blueprints = [
    {
      id: 1,
      title: "Executive Strategy Retreat",
      description: "Focus deep work with your leadership team in a secluded, high-end environment.",
      location: "Napa Valley, CA",
      attendees: 12,
      eventType: 'OFFSITE' as const,
      services: ['VENUE', 'CATERING', 'ACCOMMODATION', 'PHOTOGRAPHER'],
      color: "bg-indigo-600",
      vibe: "Luxury",
      scheduleItems: [
        { type: 'VENUE', startTime: '09:00', duration: 480 },
        { type: 'CATERING', startTime: '12:00', duration: 90 },
        { type: 'PHOTOGRAPHER', startTime: '16:00', duration: 60 }
      ]
    },
    {
      id: 2,
      title: "Sales Kickoff (SKO)",
      description: "High energy launch for the new fiscal year with production value.",
      location: "San Francisco, CA",
      attendees: 250,
      eventType: 'CONFERENCE' as const,
      services: ['VENUE', 'CATERING', 'ENTERTAINMENT', 'PHOTOGRAPHER', 'MARKETING_MATERIALS'],
      color: "bg-purple-600",
      vibe: "High Energy",
      scheduleItems: [
        { type: 'VENUE', startTime: '08:00', duration: 540 },
        { type: 'CATERING', startTime: '12:00', duration: 60 },
        { type: 'ENTERTAINMENT', startTime: '16:00', duration: 60 }
      ]
    },
    {
      id: 3,
      title: "Team Bonding Day",
      description: "Get the team moving with outdoor activities and casual dining.",
      location: "Muir Woods, CA",
      attendees: 45,
      eventType: 'OFFSITE' as const,
      services: ['VENUE', 'CATERING', 'ENTERTAINMENT'],
      color: "bg-emerald-600",
      vibe: "Relaxed",
      scheduleItems: [
        { type: 'VENUE', startTime: '10:00', duration: 360 },
        { type: 'CATERING', startTime: '12:30', duration: 60 },
        { type: 'ENTERTAINMENT', startTime: '14:00', duration: 90 }
      ]
    }
  ];

  const handleSelect = (bp: typeof blueprints[0]) => {
    // Generate pre-planned timeline based on blueprint schedule items
    const timeline: TimelineItem[] = bp.scheduleItems.map((item, index) => {
        // Find a random vendor of the correct type to populate the plan
        const candidates = MOCK_VENDORS.filter(v => v.type === item.type);
        // Fallback to first vendor if no candidates found (safety check)
        const vendor = candidates.length > 0 
            ? candidates[index % candidates.length] 
            : MOCK_VENDORS[0];

        const cost = vendor.pricingModel === 'FLAT' 
            ? vendor.pricePerUnit 
            : vendor.pricePerUnit * bp.attendees;

        return {
            id: `bp-item-${Date.now()}-${index}`,
            vendorId: vendor.id,
            dayIndex: 0,
            startTime: item.startTime,
            durationMinutes: item.duration,
            cost: cost,
            vendorStatus: 'MAILED',
            paymentStatus: 'UNPAID',
            documents: [],
            vendorContact: { 
                email: `bookings@${vendor.name.toLowerCase().replace(/\s/g, '')}.com`, 
                phone: '+1 (555) 012-3456' 
            }
        };
    });

    const currentSpend = timeline.reduce((sum, item) => sum + item.cost, 0);

    // Set a default future date (e.g. 45 days from now)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 45);

    const eventData: Partial<Event> = {
      name: bp.title,
      eventType: bp.eventType,
      headcount: bp.attendees,
      location: bp.location,
      requiredServices: bp.services as any,
      vibe: bp.vibe,
      totalBudgetLimit: Math.max(currentSpend * 1.2, 15000), // Ensure budget covers the plan with buffer
      timeline: timeline,
      currentSpend: currentSpend,
      date: futureDate,
      dateMode: 'SINGLE'
    };
    onSelect(eventData);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">E</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Eventura</span>
          </Link>
          <Link to="/create" className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
            <ArrowLeft size={16} /> Back to Hub
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-slate-900">Select a Blueprint</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
             Start with a proven event structure used by top companies. Customize it later in the workspace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {blueprints.map((bp) => (
             <div key={bp.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:shadow-xl hover:border-indigo-200 transition-all hover:-translate-y-1">
                <div className={`h-12 w-12 rounded-xl ${bp.color} flex items-center justify-center text-white shadow-md mb-6`}>
                   <Calendar size={24} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{bp.title}</h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">{bp.description}</p>
                
                <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={16} /> {bp.location}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Users size={16} /> {bp.attendees} People
                   </div>
                   <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 size={16} className="text-green-500" /> {bp.services.length} Services Included
                   </div>
                </div>

                <button 
                  onClick={() => handleSelect(bp)}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                   Use Template <ArrowRight size={16} />
                </button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};