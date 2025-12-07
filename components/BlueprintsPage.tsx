import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Coffee, Bed, Music, ArrowRight, Camera, Mic2, MoreHorizontal, CheckCircle2, Phone, Mail, Clock, Briefcase, Users, DollarSign, CreditCard, AlertCircle } from 'lucide-react';

export const BlueprintsPage: React.FC = () => {
  
  // 1. Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blueprints = [
    {
      id: 1,
      title: "Executive Strategy Retreat",
      description: "Focus deep work with your leadership team in a secluded, high-end environment.",
      location: "Napa Valley, CA",
      attendees: "12 Executives",
      schedule: [
        { 
          time: "09:00", 
          endTime: "10:00", 
          title: "Arrival & Check-in", 
          vendor: { 
            name: "Napa Valley Estate", 
            icon: MapPin, 
            role: "Venue",
            paymentStatus: 'PAID',
            bookingStatus: 'CONFIRMED'
          } 
        },
        { time: "10:00", endTime: "12:30", title: "Q3 Strategy Keynote", vendor: null },
        { 
          time: "12:30", 
          endTime: "13:30", 
          title: "Executive Lunch", 
          vendor: { 
            name: "Private Chef Michael", 
            icon: Coffee, 
            role: "Catering",
            paymentStatus: 'HALF_PAID',
            bookingStatus: 'CONFIRMED'
          } 
        },
        { time: "14:00", endTime: "16:00", title: "Department Workshops", vendor: null },
        { 
          time: "16:00", 
          endTime: "17:30", 
          title: "Team Headshots", 
          vendor: { 
            name: "Corp. Headshots", 
            icon: Camera, 
            role: "Photo",
            paymentStatus: 'NOT_PAID',
            bookingStatus: 'AWAITING'
          } 
        }
      ],
      vendors: [
        { role: "Venue", name: "Napa Valley Estate", icon: MapPin },
        { role: "Stay", name: "Estate Suites (12 rooms)", icon: Bed },
        { role: "Food", name: "Private Chef Michael", icon: Coffee },
        { role: "Photo", name: "Corporate Headshots", icon: Camera },
      ],
      color: "bg-indigo-600",
      borderColor: "border-indigo-600",
      lightColor: "bg-indigo-50",
      ringColor: "ring-indigo-100"
    },
    {
      id: 2,
      title: "Sales Kickoff (SKO)",
      description: "High energy launch for the new fiscal year with production value.",
      location: "San Francisco, CA",
      attendees: "250 Attendees",
      schedule: [
        { 
          time: "08:30", 
          endTime: "09:30", 
          title: "Registration & Breakfast", 
          vendor: { 
            name: "Urban Eats Buffet", 
            icon: Coffee, 
            role: "Catering",
            paymentStatus: 'PAID',
            bookingStatus: 'CONFIRMED'
          } 
        },
        { 
          time: "09:30", 
          endTime: "12:00", 
          title: "Global All-Hands", 
          vendor: { 
            name: "Metreon Center", 
            icon: MapPin, 
            role: "Venue",
            paymentStatus: 'PAID',
            bookingStatus: 'CONFIRMED'
          } 
        },
        { time: "12:00", endTime: "13:00", title: "Networking Lunch", vendor: null },
        { 
          time: "13:30", 
          endTime: "15:00", 
          title: "Product Roadmap Reveal", 
          vendor: { 
            name: "StagePro Systems", 
            icon: Music, 
            role: "AV",
            paymentStatus: 'HALF_PAID',
            bookingStatus: 'CONFIRMED'
          } 
        },
        { time: "15:30", endTime: "17:00", title: "Regional Breakouts", vendor: null }
      ],
      vendors: [
        { role: "Venue", name: "Metreon Center", icon: MapPin },
        { role: "AV", name: "StagePro Systems", icon: Music },
        { role: "Catering", name: "Urban Eats Buffet", icon: Coffee },
        { role: "Photo", name: "Event Coverage Team", icon: Camera },
      ],
      color: "bg-purple-600",
      borderColor: "border-purple-600",
      lightColor: "bg-purple-50",
      ringColor: "ring-purple-100"
    },
    {
      id: 3,
      title: "Team Bonding Day",
      description: "Get the team moving with outdoor activities and casual dining.",
      location: "Muir Woods, CA",
      attendees: "45 Team Members",
      schedule: [
        { 
          time: "10:00", 
          endTime: "10:30", 
          title: "Arrival at Park", 
          vendor: { 
            name: "Redwood Park", 
            icon: MapPin, 
            role: "Venue",
            paymentStatus: 'NOT_PAID',
            bookingStatus: 'AWAITING'
          } 
        },
        { time: "10:30", endTime: "11:00", title: "Safety Briefing", vendor: null },
        { 
          time: "11:00", 
          endTime: "13:00", 
          title: "Ropes Course Challenge", 
          vendor: { 
            name: "Ropes Course Inc.", 
            icon: Music, 
            role: "Activity",
            paymentStatus: 'PAID',
            bookingStatus: 'CONFIRMED'
          } 
        },
        { 
          time: "13:00", 
          endTime: "14:30", 
          title: "BBQ Lunch", 
          vendor: { 
            name: "Smokey's BBQ Truck", 
            icon: Coffee, 
            role: "Food",
            paymentStatus: 'PAID',
            bookingStatus: 'CONFIRMED'
          } 
        },
        { 
          time: "15:00", 
          endTime: "16:00", 
          title: "Group Photo Session", 
          vendor: { 
            name: "Action Photographer", 
            icon: Camera, 
            role: "Photo",
            paymentStatus: 'NOT_PAID',
            bookingStatus: 'AWAITING'
          } 
        }
      ],
      vendors: [
        { role: "Venue", name: "Redwood Park", icon: MapPin },
        { role: "Activity", name: "Ropes Course Inc.", icon: Music },
        { role: "Food", name: "Smokey's BBQ Truck", icon: Coffee },
        { role: "Photo", name: "Action Photographer", icon: Camera },
      ],
      color: "bg-emerald-600",
      borderColor: "border-emerald-600",
      lightColor: "bg-emerald-50",
      ringColor: "ring-emerald-100"
    },
    {
      id: 4,
      title: "Holiday Gala",
      description: "A formal evening to celebrate the year's achievements in style.",
      location: "New York, NY",
      attendees: "150 Guests",
      schedule: [
        { 
          time: "18:00", 
          endTime: "19:00", 
          title: "Red Carpet Arrival", 
          vendor: { 
            name: "Grand Ballroom", 
            icon: MapPin, 
            role: "Venue",
            paymentStatus: 'PAID',
            bookingStatus: 'CONFIRMED'
          } 
        },
        { 
          time: "19:00", 
          endTime: "20:00", 
          title: "Cocktail Hour", 
          vendor: { 
            name: "TopShelf Mixology", 
            icon: Coffee, 
            role: "Bar",
            paymentStatus: 'HALF_PAID',
            bookingStatus: 'CONFIRMED'
          } 
        },
        { time: "20:00", endTime: "21:30", title: "Three-Course Dinner", vendor: null },
        { 
          time: "21:30", 
          endTime: "23:00", 
          title: "Live Performance", 
          vendor: { 
            name: "Live DJ Set", 
            icon: Mic2, 
            role: "Ent.",
            paymentStatus: 'NOT_PAID',
            bookingStatus: 'AWAITING'
          } 
        },
        { time: "23:00", endTime: "00:00", title: "Closing", vendor: null }
      ],
      vendors: [
        { role: "Venue", name: "Grand Ballroom", icon: MapPin },
        { role: "Music", name: "The Jazz Quartet", icon: Music },
        { role: "Bar", name: "TopShelf Mixology", icon: Coffee },
        { role: "Ent.", name: "Live DJ Set", icon: Mic2 },
      ],
      color: "bg-rose-600",
      borderColor: "border-rose-600",
      lightColor: "bg-rose-50",
      ringColor: "ring-rose-100"
    }
  ];

  // Helper to render status badges
  const renderStatusBadges = (vendor: any) => {
    if (!vendor) return null;
    
    // Payment Logic
    let paymentColor = "bg-gray-100 text-gray-500 border-gray-200";
    let paymentText = "Unpaid";
    if (vendor.paymentStatus === 'PAID') {
        paymentColor = "bg-green-50 text-green-700 border-green-200";
        paymentText = "Paid";
    } else if (vendor.paymentStatus === 'HALF_PAID') {
        paymentColor = "bg-amber-50 text-amber-700 border-amber-200";
        paymentText = "Deposit Paid";
    }

    // Booking Logic
    let bookingColor = "bg-gray-100 text-gray-500 border-gray-200";
    let bookingText = "Awaiting";
    let bookingIcon = <Clock size={10} />;
    
    if (vendor.bookingStatus === 'CONFIRMED') {
        bookingColor = "bg-blue-50 text-blue-700 border-blue-200";
        bookingText = "Confirmed";
        bookingIcon = <CheckCircle2 size={10} />;
    }

    return (
        <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
            <div className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${paymentColor}`}>
                <CreditCard size={10} /> {paymentText}
            </div>
            <div className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${bookingColor}`}>
                {bookingIcon} {bookingText}
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">E</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Eventura</span>
          </Link>
          <div className="flex gap-4">
             <Link to="/new" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-sm hover:shadow-md">
               Start Planning
             </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-wide mb-6 border border-indigo-100">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
          New Templates Added
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">Event Blueprints</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Don't reinvent the wheel. Start with a pre-configured timeline and vendor set used by top companies. 
          One click to copy the entire plan to your workspace.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {blueprints.map((bp) => (
          <div key={bp.id} className="group border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-100 transition-all bg-white flex flex-col relative overflow-hidden">
             {/* Hover gradient effect */}
             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             
             {/* Card Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <div className={`h-12 w-12 rounded-xl ${bp.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                   <Calendar size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl leading-tight text-slate-900">{bp.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                     <CheckCircle2 size={12} className="text-green-500" />
                     Verified Template
                  </div>
                </div>
              </div>
              <button className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Event Meta Data */}
            <div className="flex gap-4 mb-6 text-sm text-slate-600">
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="font-medium">{bp.location}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Users size={14} className="text-slate-400" />
                    <span className="font-medium">{bp.attendees}</span>
                </div>
            </div>

            <p className="text-slate-600 text-sm mb-8 flex-grow leading-relaxed">{bp.description}</p>

            {/* Visual Timeline (Detailed) */}
            <div className="flex-1 bg-slate-50/50 rounded-xl p-6 border border-slate-100 mb-8 flex flex-col gap-0">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Clock size={12} /> Detailed Schedule
                </h4>
                   
                {bp.schedule.map((item, idx) => {
                   const hasVendor = !!item.vendor;
                   const isLast = idx === bp.schedule.length - 1;

                   return (
                   <div key={idx} className="flex gap-4 items-start relative z-10 group/timeline-item">
                      {/* Time Column */}
                      <div className="w-14 text-right flex flex-col items-end pt-1">
                        <span className="text-xs font-bold text-slate-900 font-mono">{item.time}</span>
                        <span className="text-[10px] text-slate-400 font-mono opacity-0 group-hover/timeline-item:opacity-100 transition-opacity">{item.endTime}</span>
                      </div>
                      
                      {/* Connector Line */}
                      {!isLast && (
                         <div className="absolute left-[4.5rem] top-4 bottom-[-1rem] w-0.5 bg-slate-200 group-hover/timeline-item:bg-indigo-200 transition-colors"></div>
                      )}

                      {/* Dot */}
                      <div className={`absolute left-[4.35rem] top-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 ${hasVendor ? bp.color : 'bg-slate-400'}`}></div>

                      {/* Card Content */}
                      <div className={`flex-1 mb-6 transition-all duration-300 transform group-hover/timeline-item:translate-x-1`}>
                         <div className={`bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow border-l-4 ${hasVendor ? bp.borderColor : 'border-slate-300 border-slate-200'}`}>
                            <div className="flex flex-col">
                               <div className="flex justify-between items-start">
                                   <div>
                                      <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                                      <div className="flex items-center gap-1.5 mt-1">
                                         {hasVendor ? (
                                           <>
                                             <div className={`p-1 rounded bg-slate-100 text-slate-500`}>
                                                {React.createElement(item.vendor!.icon, { size: 10 })}
                                             </div>
                                             <span className="text-xs font-medium text-slate-600">{item.vendor!.name}</span>
                                           </>
                                         ) : (
                                           <>
                                             <div className="p-1 rounded bg-slate-50 text-slate-400">
                                                <Briefcase size={10} />
                                             </div>
                                             <span className="text-xs font-medium text-slate-400">Internal / In-House Team</span>
                                           </>
                                         )}
                                      </div>
                                   </div>
                                   
                                   {hasVendor && (
                                       <div className="flex gap-1">
                                          <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Call Vendor">
                                             <Phone size={12} />
                                          </button>
                                          <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Email Vendor">
                                             <Mail size={12} />
                                          </button>
                                      </div>
                                   )}
                               </div>
                               
                               {/* Vendor Status Badges */}
                               {hasVendor && renderStatusBadges(item.vendor)}
                            </div>
                         </div>
                      </div>
                   </div>
                   );
                })}
            </div>

            {/* Included Vendors Summary */}
            <div className="mb-8">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 pl-2">Vendor Summary</h4>
               <div className="flex flex-wrap gap-2">
                 {bp.vendors.map((v, i) => (
                   <div key={i} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default">
                      <v.icon size={12} />
                      {v.name}
                   </div>
                 ))}
               </div>
            </div>

            {/* Footer / Action */}
            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="GCal" className="w-3.5 h-3.5" />
                 <span>Auto-sync</span>
              </div>
              <Link to="/new" className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                Use Blueprint <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Footer from LandingPage */}
      <footer className="bg-slate-50 py-16 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
           <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4 group">
                <div className="h-6 w-6 bg-slate-900 rounded-md flex items-center justify-center text-white text-xs font-bold group-hover:bg-indigo-600 transition-colors">
                  E
                </div>
                <span className="font-bold text-slate-900">Eventura</span>
              </Link>
              <p className="text-sm text-slate-600 text-left">The operating system for modern corporate events. We simplify the complex world of event planning into a delightful experience.</p>
           </div>
           
           <div>
             <h4 className="font-bold text-slate-900 mb-4">Product</h4>
             <ul className="space-y-2 text-sm text-slate-600">
               <li><Link to="/blueprints" className="hover:text-indigo-600">Blueprints</Link></li>
               <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
             </ul>
           </div>

           <div>
             <h4 className="font-bold text-slate-900 mb-4">Company</h4>
             <ul className="space-y-2 text-sm text-slate-600">
               <li><Link to="/about" className="hover:text-indigo-600">About</Link></li>
               <li><Link to="/careers" className="hover:text-indigo-600">Careers</Link></li>
               <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
               <li><Link to="/partners" className="hover:text-indigo-600">Work With Us</Link></li>
             </ul>
           </div>

            <div>
             <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
             <ul className="space-y-2 text-sm text-slate-600">
               <li><Link to="/legal" className="hover:text-indigo-600">Terms</Link></li>
               <li><Link to="/legal" className="hover:text-indigo-600">Privacy</Link></li>
             </ul>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Eventura Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
             {/* Social icons placeholder */}
          </div>
        </div>
      </footer>
    </div>
  );
};