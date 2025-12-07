import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, CalendarPlus, Search, Filter, MoreHorizontal, Bell, PlusCircle, ArrowUpRight, User, LogOut, Archive } from 'lucide-react';
import { Event } from '../types';

interface GlobalTrackerPageProps {
  events: Event[];
  onLogout?: () => void;
}

export const GlobalTrackerPage: React.FC<GlobalTrackerPageProps> = ({ events, onLogout }) => {
  const [viewMode, setViewMode] = useState<'ACTIVE' | 'ARCHIVED'>('ACTIVE');

  // Filter events based on view mode
  const displayedEvents = events.filter(evt => {
     if (viewMode === 'ACTIVE') {
         return evt.status !== 'ARCHIVED';
     } else {
         return evt.status === 'ARCHIVED';
     }
  });

  // Calculate stats
  const processedEvents = displayedEvents.map(evt => {
    const totalItems = evt.timeline.length;
    const completedItems = evt.timeline.filter(i => i.vendorStatus === 'ACCEPTED' || i.vendorStatus === 'OFFER_RECEIVED').length;
    return {
        ...evt,
        progress: completedItems,
        total: totalItems > 0 ? totalItems : 1 
    };
  });

  const vendorCrm = [
      { id: 'v1', vendor: "Joe's Catering", event: "Q3 Offsite", status: "WAITING", lastActivity: "Sent RFQ 2 days ago" },
      { id: 'v2', vendor: "Grand Ballroom", event: "Holiday Gala", status: "NEGOTIATING", lastActivity: "Received quote $15k (High)" },
      { id: 'v3', vendor: "TechBus Transport", event: "Q3 Offsite", status: "READY", lastActivity: "Contract signed today" },
      { id: 'v4', vendor: "DJ Spark", event: "Holiday Gala", status: "WAITING", lastActivity: "Sent availability check 1 day ago" },
  ];

  const renderStatusBadge = (status: string) => {
      const styles = status === 'LOCKED' 
        ? 'bg-green-100 text-green-700' 
        : status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700'
        : status === 'PAID' ? 'bg-purple-100 text-purple-700'
        : status === 'ARCHIVED' ? 'bg-gray-100 text-gray-500'
        : 'bg-yellow-100 text-yellow-700';
      
      return <span className={`px-2 py-1 rounded text-[10px] font-bold ${styles}`}>{status}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 relative">
         {/* Global Sidebar - Desktop Only */}
         <aside className="hidden md:flex w-64 bg-slate-900 text-white flex-col flex-shrink-0 fixed h-full z-20">
            <div className="h-16 flex items-center px-6 font-bold text-xl tracking-tight border-b border-slate-800">
                OffsiteFlow
            </div>
            <nav className="flex-1 py-6 px-3 space-y-1">
                <div className="flex items-center px-3 py-2.5 rounded-lg bg-indigo-600 text-white font-medium">
                    <LayoutDashboard size={18} className="mr-3"/> Global Tracker
                </div>
            </nav>
            <div className="p-4 border-t border-slate-800">
                 <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold">JD</div>
                        <div className="text-sm">
                            <div className="font-medium">Jane Doe</div>
                            <div className="text-slate-500 text-xs">Admin</div>
                        </div>
                    </div>
                    {onLogout && (
                        <button onClick={onLogout} className="text-slate-500 hover:text-white transition-colors" title="Log out">
                            <LogOut size={16} />
                        </button>
                    )}
                 </div>
            </div>
        </aside>

        <main className="md:ml-64 ml-0 flex-1 p-4 md:p-8 pb-20 md:pb-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Office Manager Dashboard</h1>
                    <p className="text-slate-500 text-sm md:text-base">Overview of all event pipelines.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-indigo-600 relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <Link to="/create" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                        <PlusCircle size={18} /> <span className="md:hidden">New</span> <span className="hidden md:inline">New Event</span>
                    </Link>
                </div>
            </header>

            {/* SECTION A: Events Portfolio */}
            <section className="mb-12">
                <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                    <div className="flex gap-6">
                        <button 
                            onClick={() => setViewMode('ACTIVE')}
                            className={`text-lg font-bold flex items-center gap-2 pb-2 transition-colors border-b-2 ${viewMode === 'ACTIVE' ? 'text-slate-900 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                        >
                            <CalendarPlus size={18} /> Active Events
                        </button>
                        <button 
                            onClick={() => setViewMode('ARCHIVED')}
                            className={`text-lg font-bold flex items-center gap-2 pb-2 transition-colors border-b-2 ${viewMode === 'ARCHIVED' ? 'text-slate-900 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                        >
                            <Archive size={18} /> Past & Archived
                        </button>
                    </div>
                </div>
                
                {processedEvents.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                        <CalendarPlus size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">No {viewMode.toLowerCase()} events</h3>
                        <p className="text-slate-500 mb-6">You don't have any events in this category yet.</p>
                        {viewMode === 'ACTIVE' && (
                            <Link to="/create" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-500 transition-colors">
                                Create First Event
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase font-bold text-xs">
                                <tr>
                                    <th className="px-6 py-3">Event Name</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Vendor Progress</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {processedEvents.map(evt => (
                                    <tr key={evt.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <Link to={`/manage/${evt.id}`} className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                                                {evt.name} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 font-medium">
                                            {evt.date ? new Date(evt.date).toLocaleDateString() : 'TBD'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full w-24 overflow-hidden">
                                                    <div className={`h-full rounded-full ${viewMode === 'ARCHIVED' ? 'bg-slate-400' : 'bg-indigo-600'}`} style={{ width: `${(evt.progress / evt.total) * 100}%`}}></div>
                                                </div>
                                                <span className="text-xs text-slate-500 font-medium">{evt.progress}/{evt.total}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {renderStatusBadge(evt.status)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link to={`/manage/${evt.id}`} className="text-slate-300 hover:text-indigo-600">
                                                <MoreHorizontal size={16}/>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {/* SECTION B: Vendor CRM (Only show for Active view) */}
            {viewMode === 'ACTIVE' && (
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                             Vendor Communication Hub
                        </h2>
                        <div className="flex gap-2">
                            <div className="relative hidden md:block">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                                <input type="text" placeholder="Search vendors..." className="pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"/>
                            </div>
                            <button className="p-1.5 border border-slate-300 rounded-lg hover:bg-slate-50"><Filter size={14} className="text-slate-500"/></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Column 1: Waiting */}
                        <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-200/60">
                             <div className="flex justify-between items-center mb-4">
                                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Waiting for Quote</h3>
                                 <span className="bg-slate-200 text-slate-600 px-2 rounded-full text-[10px] font-bold">2</span>
                             </div>
                             <div className="space-y-3">
                                 {vendorCrm.filter(v => v.status === 'WAITING').map(item => (
                                     <div key={item.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                         <div className="flex justify-between items-start mb-2">
                                             <span className="font-bold text-slate-900 text-sm">{item.vendor}</span>
                                             <span className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 truncate max-w-[80px]">{item.event}</span>
                                         </div>
                                         <p className="text-xs text-slate-500 mb-3">{item.lastActivity}</p>
                                         <button className="w-full py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded transition-colors">
                                             Nudge Vendor
                                         </button>
                                     </div>
                                 ))}
                             </div>
                        </div>

                        {/* Column 2: Negotiating */}
                        <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-200/60">
                             <div className="flex justify-between items-center mb-4">
                                 <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider">Negotiating</h3>
                                 <span className="bg-blue-100 text-blue-600 px-2 rounded-full text-[10px] font-bold">1</span>
                             </div>
                             <div className="space-y-3">
                                 {vendorCrm.filter(v => v.status === 'NEGOTIATING').map(item => (
                                     <div key={item.id} className="bg-white p-4 rounded-lg border-l-4 border-l-blue-500 border-y border-r border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                         <div className="flex justify-between items-start mb-2">
                                             <span className="font-bold text-slate-900 text-sm">{item.vendor}</span>
                                              <span className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 truncate max-w-[80px]">{item.event}</span>
                                         </div>
                                         <p className="text-xs text-slate-500 mb-3">{item.lastActivity}</p>
                                         <button className="w-full py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors">
                                             View Proposal
                                         </button>
                                     </div>
                                 ))}
                             </div>
                        </div>

                        {/* Column 3: Ready */}
                        <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-200/60">
                             <div className="flex justify-between items-center mb-4">
                                 <h3 className="text-xs font-bold text-green-600 uppercase tracking-wider">Ready to Sign</h3>
                                 <span className="bg-green-100 text-green-600 px-2 rounded-full text-[10px] font-bold">1</span>
                             </div>
                             <div className="space-y-3">
                                 {vendorCrm.filter(v => v.status === 'READY').map(item => (
                                     <div key={item.id} className="bg-white p-4 rounded-lg border-l-4 border-l-green-500 border-y border-r border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                         <div className="flex justify-between items-start mb-2">
                                             <span className="font-bold text-slate-900 text-sm">{item.vendor}</span>
                                              <span className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 truncate max-w-[80px]">{item.event}</span>
                                         </div>
                                         <p className="text-xs text-slate-500 mb-3">{item.lastActivity}</p>
                                         <button className="w-full py-1.5 text-xs font-bold text-white bg-green-600 hover:bg-green-500 rounded transition-colors shadow-sm">
                                             Review & Sign
                                         </button>
                                     </div>
                                 ))}
                             </div>
                        </div>

                    </div>
                </section>
            )}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center px-2 py-3 z-30 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col items-center p-2 text-indigo-600">
                <LayoutDashboard size={20} />
                <span className="text-[10px] font-medium mt-1">Tracker</span>
            </div>
            <Link to="/create" className="flex flex-col items-center p-2 text-slate-400 hover:text-indigo-600">
                <CalendarPlus size={20} />
                <span className="text-[10px] font-medium mt-1">Events</span>
            </Link>
             <Link to="/profile" className="flex flex-col items-center p-2 text-slate-400 hover:text-indigo-600">
                <User size={20} />
                <span className="text-[10px] font-medium mt-1">Profile</span>
            </Link>
        </div>
    </div>
  );
};