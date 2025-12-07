import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, CreditCard, Clock, Check, ArrowRight, Star, Calendar, Lock, MapPin, Tag, Menu, X, Zap } from 'lucide-react';
import { MOCK_VENDORS } from '../constants';
import { ServiceType } from '../types';

export const LandingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceType>('VENUE');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const marketplaceCategories: { id: ServiceType; label: string }[] = [
    { id: 'VENUE', label: 'Venues' },
    { id: 'CATERING', label: 'Catering' },
    { id: 'PHOTOGRAPHER', label: 'Photography' },
    { id: 'ENTERTAINMENT', label: 'Entertainment' },
    { id: 'ACCOMMODATION', label: 'Accommodation' },
  ];

  // Limit to 4 vendors per category for the landing page preview
  const filteredVendors = MOCK_VENDORS.filter(v => v.type === activeCategory).slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 scroll-smooth relative">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">
              E
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Eventura</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            <button onClick={() => scrollToSection('blueprints')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">Blueprints</button>
            <button onClick={() => scrollToSection('marketplace')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">Marketplace</button>
            <button onClick={() => scrollToSection('Benefits')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">Benefits</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">Customers</button>
            <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
               Pricing
            </Link>
          </div>
          <div className="hidden md:flex gap-4 items-center">
             <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Log in</Link>
             <Link to="/create" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
               Start Planning
             </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl py-4 flex flex-col z-50 animate-in slide-in-from-top-2">
                <button onClick={() => scrollToSection('blueprints')} className="px-6 py-3 text-left font-medium text-slate-600 hover:bg-slate-50">Blueprints</button>
                <button onClick={() => scrollToSection('marketplace')} className="px-6 py-3 text-left font-medium text-slate-600 hover:bg-slate-50">Marketplace</button>
                <button onClick={() => scrollToSection('Benefits')} className="px-6 py-3 text-left font-medium text-slate-600 hover:bg-slate-50">Benefits</button>
                <button onClick={() => scrollToSection('testimonials')} className="px-6 py-3 text-left font-medium text-slate-600 hover:bg-slate-50">Customers</button>
                <Link to="/pricing" className="px-6 py-3 text-left font-medium text-slate-600 hover:bg-slate-50">Pricing</Link>
                <div className="border-t border-slate-100 my-2"></div>
                <Link to="/login" className="px-6 py-3 text-left font-medium text-slate-600 hover:bg-slate-50">Log in</Link>
                <Link to="/create" className="mx-6 mt-2 text-center bg-slate-900 text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-slate-800">
                    Start Planning
                </Link>
            </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 md:pt-48 md:pb-32 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-wide mb-8 border border-indigo-100">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
          v2.0 is now live
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8 text-slate-900">
          Corporate Events, <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Automated.</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-light text-justify md:text-center md:text-balance">
          Stop playing phone tag with vendors. Plan your next event in minutes, not weeks. 
          We bring the entire event supply chain into one unified workspace for modern teams.
        </p>
        <div className="flex flex-col items-center gap-6">
          <Link 
            to="/create" 
            className="group flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-500 transition-all shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transform hover:-translate-y-1"
          >
            Start Planning Free
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
             <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" className="w-6 h-6 rounded-full border-2 border-white" />
                ))}
             </div>
             <span>Trusted by Office Managers at 50+ startups</span>
          </div>
        </div>
      </header>

      {/* Visual Hook: The Old Way vs New Way */}
      <section className="bg-slate-50 border-y border-slate-200 overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Order from chaos.</h2>
            <p className="text-slate-600 text-lg text-justify md:text-center">Ditch the spreadsheet for a workflow that actually works. We've redesigned the planning experience to be visual, intuitive, and remarkably efficient.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl mx-auto">
            
            {/* The Old Way: Excel Chaos */}
            <div className="relative group perspective-1000">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-200 to-orange-200 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-white border border-slate-200 rounded-xl shadow-sm h-[22rem] overflow-hidden flex flex-col transform transition-transform duration-500 hover:rotate-1 hover:scale-[1.02]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                     <div className="w-3 h-3 rounded-sm bg-green-700 flex items-center justify-center text-[8px] text-white font-serif">X</div>
                     events_v4_FINAL.xlsx
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                  </div>
                </div>
                {/* Fake Spreadsheet Grid */}
                <div className="grid grid-cols-4 gap-[1px] bg-slate-200 border-b border-slate-200 text-[10px] font-mono text-slate-600 overflow-hidden">
                  {/* Header */}
                  <div className="bg-slate-50 p-2 font-bold text-slate-400">A</div>
                  <div className="bg-slate-50 p-2 font-bold text-slate-400">B</div>
                  <div className="bg-slate-50 p-2 font-bold text-slate-400">C</div>
                  <div className="bg-slate-50 p-2 font-bold text-slate-400">D</div>

                  {/* Rows */}
                  {[1,2,3,4,5,6].map((row) => (
                    <React.Fragment key={row}>
                        <div className="bg-white p-2 border-r border-slate-100 h-10 flex items-center">
                            {row === 1 && "Vendor"}
                            {row === 2 && "Joe's Catering"}
                            {row === 3 && "Venue A"}
                            {row === 4 && "Transport"}
                        </div>
                        <div className="bg-white p-2 border-r border-slate-100 h-10 flex items-center">
                            {row === 1 && "Status"}
                            {row === 2 && <span className="bg-red-100 text-red-600 px-1 rounded">LATE??</span>}
                            {row === 3 && "Emailed..."}
                            {row === 4 && "Unknown"}
                        </div>
                        <div className="bg-white p-2 border-r border-slate-100 h-10 flex items-center">
                             {row === 1 && "Cost"}
                             {row === 2 && "$1200"}
                             {row === 3 && "$5000"}
                             {row === 4 && "-"}
                        </div>
                         <div className="bg-white p-2 h-10 flex items-center">
                             {row === 1 && "Notes"}
                             {row === 2 && "Call him!!"}
                             {row === 3 && "Contract lost"}
                             {row === 4 && ""}
                        </div>
                    </React.Fragment>
                  ))}
                </div>
                
                {/* Floating "Stress" elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-50 text-red-600 text-xs md:text-sm font-bold px-4 py-2 rounded-full border border-red-200 shadow-xl rotate-12 backdrop-blur-sm z-30 whitespace-nowrap">
                   Where is the contract?? 😫
                </div>
              </div>
            </div>

            {/* The New Way: Eventura Card */}
            <div className="relative group perspective-1000">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-white border border-slate-200 rounded-xl shadow-2xl h-[22rem] flex flex-col transform transition-transform duration-500 hover:-rotate-1 hover:scale-[1.02] overflow-hidden">
                
                {/* Header */}
                 <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2">
                     <div className="w-4 h-4 rounded bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">E</div>
                     Eventura Workspace
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                    <Check size={10} strokeWidth={3} />
                    <span>Everything On Track</span>
                  </div>
                </div>

                {/* The Clean Card */}
                <div className="flex-1 p-6 bg-slate-50/50 flex flex-col justify-center gap-4">
                   
                   {/* Item 1 */}
                   <div className="flex gap-4 items-start opacity-50">
                      <div className="w-12 text-right text-xs font-bold text-slate-400 pt-3">10:00</div>
                      <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-500">Welcome Coffee</span>
                          <span className="h-2 w-12 bg-slate-100 rounded-full"></span>
                      </div>
                   </div>

                   {/* Item 2 (Active) */}
                   <div className="flex gap-4 items-start relative z-10">
                      <div className="w-12 text-right text-sm font-bold text-slate-900 pt-3">12:00</div>
                       <div className="absolute left-[3.25rem] top-0 bottom-0 w-0.5 bg-indigo-100"></div>
                       <div className="absolute left-[3.15rem] top-4 w-2.5 h-2.5 bg-indigo-600 rounded-full ring-4 ring-white"></div>

                      <div className="flex-1 bg-white border border-indigo-200 rounded-lg p-4 shadow-lg hover:border-indigo-400 transition-colors border-l-4 border-l-indigo-500 flex flex-col gap-2">
                         <div className="flex justify-between items-start">
                            <div>
                               <h4 className="font-bold text-slate-900 text-sm">Executive Lunch</h4>
                               <p className="text-xs text-slate-500 mt-0.5">Catering • Blue Hill Farm</p>
                            </div>
                            <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">$2,400</span>
                         </div>
                         <div className="flex gap-1 items-center pt-2 border-t border-slate-50">
                           <div className="flex -space-x-1.5">
                              <div className="h-5 w-5 rounded-full bg-indigo-100 border border-white"></div>
                              <div className="h-5 w-5 rounded-full bg-purple-100 border border-white"></div>
                           </div>
                           <span className="text-[10px] text-slate-400 ml-1">Vendor confirmed</span>
                         </div>
                      </div>
                   </div>

                    {/* Item 3 */}
                   <div className="flex gap-4 items-start opacity-50">
                      <div className="w-12 text-right text-xs font-bold text-slate-400 pt-3">14:00</div>
                      <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-500">Keynote Speech</span>
                          <span className="h-2 w-12 bg-slate-100 rounded-full"></span>
                      </div>
                   </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Customer Logos */}
      <section className="py-12 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
             <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Powering events for next-gen companies</p>
             <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                <h3 className="text-2xl font-bold font-serif text-slate-800 cursor-default">ACME</h3>
                <h3 className="text-2xl font-black tracking-tighter text-slate-800 italic cursor-default">Globex</h3>
                <h3 className="text-xl font-semibold tracking-widest text-slate-800 cursor-default">SOYLENT</h3>
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-1 cursor-default"><span className="w-6 h-6 bg-slate-800 rounded-full"></span> Initech</h3>
                <h3 className="text-2xl font-light text-slate-800 cursor-default">Umbrella<span className="font-bold">Corp</span></h3>
             </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="Benefits" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to run the show</h2>
            <p className="text-slate-600 text-lg text-justify md:text-center">We handle the boring stuff so you can focus on the experience. Our platform integrates every aspect of event planning into a cohesive, automated workflow.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="h-14 w-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-2">
              <Map size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Curated Blueprints</h3>
            <p className="text-slate-600 leading-relaxed text-left">
              Don't start from scratch. Use templates for Offsites, Dinners, and Parties designed by top event planners to ensure nothing is overlooked.
            </p>
          </div>
          <div className="flex flex-col gap-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="h-14 w-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-2">
              <CreditCard size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Unified Billing</h3>
            <p className="text-slate-600 leading-relaxed text-left">
              One invoice. We pay the 10 vendors, so your Finance team doesn't hate you at the end of the month. Simplify reconciliation and payment.
            </p>
          </div>
          <div className="flex flex-col gap-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="h-14 w-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-2">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Live Callsheet</h3>
            <p className="text-slate-600 leading-relaxed text-left">
              Drag-and-drop timeline that syncs with every vendor instantly. Everyone knows where to be and when, reducing confusion on event day.
            </p>
          </div>
        </div>
      </section>

      {/* Blueprints Teaser Section */}
      <section id="blueprints" className="py-24 bg-white border-t border-slate-200 relative overflow-hidden">
        {/* Background decoration - subtle for light mode */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
            <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[200%] bg-indigo-50/50 rounded-full blur-3xl"></div>
            <div className="absolute top-[20%] right-[10%] w-[40%] h-[80%] bg-purple-50/50 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
                 Featured Collection
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900">Proven Event Blueprints</h2>
              <p className="text-slate-600 text-lg">
                Why start from scratch? Clone complete event timelines, vendor lists, and budgets from top companies.
              </p>
            </div>
            <Link to="/blueprints" className="whitespace-nowrap flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg shadow-indigo-200">
              Explore Library <ArrowRight size={18} />
            </Link>
          </div>

          {/* Mini Grid of Blueprints */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Executive Retreat", tags: ["12 People", "Napa Valley"], color: "bg-indigo-500" },
              { title: "Sales Kickoff", tags: ["250 Attendees", "San Francisco"], color: "bg-purple-500" },
              { title: "Holiday Gala", tags: ["150 Guests", "New York"], color: "bg-rose-500" },
            ].map((item, i) => (
              <Link key={i} to="/blueprints" className="group block bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-indigo-200 transition-all hover:-translate-y-1">
                 <div className="flex items-center justify-between mb-8">
                    <div className={`h-10 w-10 rounded-lg ${item.color} flex items-center justify-center text-white shadow-md`}>
                       <Calendar size={20} />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                       <ArrowRight size={16} />
                    </div>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                 <div className="flex gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        {tag}
                      </span>
                    ))}
                 </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Marketplace Preview */}
      <section id="marketplace" className="py-24 bg-slate-50 border-t border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-slate-900">Curated Vendor Marketplace</h2>
                <p className="text-slate-600 text-lg">
                    Access our network of premium vendors. From industrial lofts to Michelin-star catering, find the perfect match for your event.
                </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {marketplaceCategories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                            activeCategory === cat.id
                                ? 'bg-slate-900 text-white shadow-lg ring-2 ring-slate-900 ring-offset-2 ring-offset-slate-50'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Vendor Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {filteredVendors.map((vendor, idx) => (
                    <div key={vendor.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all hover:-translate-y-1 group">
                        <div className="h-40 bg-slate-100 relative overflow-hidden">
                            <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-slate-800 flex items-center shadow-sm">
                                <Star size={10} className="text-yellow-500 fill-yellow-500 mr-1" />
                                {vendor.rating.toFixed(1)}
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-900 text-sm leading-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">{vendor.name}</h3>
                            </div>
                            <div className="flex items-center text-xs text-slate-500 mb-3">
                                <MapPin size={10} className="mr-1" />
                                {vendor.location}
                            </div>
                            <div className="flex flex-wrap gap-1 mb-4">
                               <span className="text-[10px] px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-100 uppercase tracking-wide">{vendor.type}</span>
                               <span className="text-[10px] px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-100 uppercase tracking-wide">Premium</span>
                            </div>
                            
                            {/* Login Wall for Pricing */}
                            <div className="relative mt-2 pt-3 border-t border-slate-100">
                                <div className="filter blur-[4px] select-none opacity-50 flex justify-between items-center">
                                     <div className="h-4 w-16 bg-slate-200 rounded"></div>
                                     <div className="h-8 w-24 bg-slate-900 rounded-lg"></div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Link to="/login" className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors border border-indigo-100 group-hover:shadow-sm">
                                        <Lock size={12} /> Log in to see pricing
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <Link to="/new" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
                   Browse all 2,000+ vendors <ArrowRight size={16} />
                </Link>
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-slate-900">Loved by modern teams</h2>
            <p className="text-slate-600 text-lg">
              See why high-growth companies trust Eventura to manage their culture.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               {
                 quote: "I used to spend 10 hours a week on spreadsheets. Eventura cut that down to 30 minutes. It's a game changer.",
                 author: "Sarah J.",
                 role: "Office Manager",
                 company: "TechFlow",
                 image: "https://i.pravatar.cc/100?img=5"
               },
               {
                 quote: "The curated vendor marketplace is gold. We found our holiday party venue in minutes, not weeks.",
                 author: "Michael R.",
                 role: "Head of People",
                 company: "Growth.io",
                 image: "https://i.pravatar.cc/100?img=12"
               },
               {
                 quote: "Finally, a tool that speaks the language of finance and culture. Budget tracking is seamless now.",
                 author: "Elena T.",
                 role: "VP Operations",
                 company: "ScaleUp",
                 image: "https://i.pravatar.cc/100?img=9"
               }
             ].map((t, i) => (
               <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
                  <div className="text-indigo-200 absolute top-6 left-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                    </svg>
                  </div>
                  <p className="text-slate-700 italic relative z-10 mb-6 pt-8">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                     <img src={t.image} alt={t.author} className="w-10 h-10 rounded-full border border-slate-200" />
                     <div>
                        <div className="font-bold text-slate-900 text-sm">{t.author}</div>
                        <div className="text-xs text-slate-500">{t.role}, {t.company}</div>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
               <li><Link to="/pricing" className="hover:text-indigo-600">Pricing</Link></li>
             </ul>
           </div>

           <div>
             <h4 className="font-bold text-slate-900 mb-4">Company</h4>
             <ul className="space-y-2 text-sm text-slate-600">
               <li><Link to="/about" className="hover:text-indigo-600">About</Link></li>
               <li><Link to="/careers" className="hover:text-indigo-600">Careers</Link></li>
               <li><Link to="/blog" className="hover:text-indigo-600">Blog</Link></li>
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