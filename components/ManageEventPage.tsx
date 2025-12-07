import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { Event, TimelineItem, VendorStatus, PaymentStatus, Attendee } from '../types';
import { MOCK_VENDORS } from '../constants';
import { 
  CalendarPlus, ArrowLeft, Phone, Mail, FileText, Download, 
  Upload, Clock, CheckCircle2, AlertCircle, XCircle, Search, 
  MoreHorizontal, PlusCircle, LayoutDashboard, Users, FileEdit, User, Lock, PenTool
} from 'lucide-react';

interface ManageEventPageProps {
  events: Event[];
  onUpdateEvent: (event: Event) => void;
}

export const ManageEventPage: React.FC<ManageEventPageProps> = ({ events, onUpdateEvent }) => {
  const { eventId } = useParams();
  
  // Find event from global state using ID
  const event = events.find(e => e.id === eventId);
  const isReadOnly = event?.status === 'ARCHIVED' || event?.status === 'PAID';
  
  const [activeTab, setActiveTab] = useState<'TIMELINE' | 'ATTENDEES' | 'NOTES'>('TIMELINE');
  const [attendees] = useState<Attendee[]>([
      { id: '1', name: 'Sarah Jenkins', role: 'CEO', email: 'sarah@company.com', phone: '555-0101', status: 'CONFIRMED' },
      { id: '2', name: 'Mike Ross', role: 'CTO', email: 'mike@company.com', phone: '555-0102', status: 'CONFIRMED' },
      { id: '3', name: 'Jessica Pearson', role: 'COO', email: 'jessica@company.com', phone: '555-0103', status: 'INVITED' },
      { id: '4', name: 'Louis Litt', role: 'Legal', email: 'louis@company.com', phone: '555-0104', status: 'DECLINED' },
  ]);

  const [notes, setNotes] = useState("");

  // Initialize notes once event loads
  useEffect(() => {
    if (event && !notes) {
        setNotes(`## ${event.name} Notes\n\n- Key objective: Align on Q4 Strategy\n- Dietary restrictions: 2 Vegan, 1 GF\n- Budget code: MK-2025-Q3`);
    }
  }, [event]);

  if (!event) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-slate-50 text-slate-600">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Event not found</h2>
            <p className="mb-6">We couldn't locate the event you are looking for.</p>
            <Link to="/tracker" className="text-indigo-600 hover:text-indigo-500 font-bold flex items-center gap-2">
                <ArrowLeft size={16} /> Back to Tracker
            </Link>
        </div>
    );
  }

  // Helper to find vendor details
  const getVendor = (id: string) => MOCK_VENDORS.find(v => v.id === id);

  // Simulate Reply Action (Disabled if read-only)
  const simulateReply = () => {
     if (isReadOnly) return;
     const newTimeline = [...event.timeline];
     const waitingItems = newTimeline.filter(i => i.vendorStatus === 'MAILED');
     
     if (waitingItems.length > 0) {
         const randomIdx = Math.floor(Math.random() * waitingItems.length);
         const itemToUpdate = waitingItems[randomIdx];
         const updatedItem = {
             ...itemToUpdate,
             vendorStatus: 'OFFER_RECEIVED' as VendorStatus,
             documents: [
                 ...itemToUpdate.documents,
                 { type: 'BRIEF' as const, name: 'Proposal_v1.pdf', url: '#' }
             ]
         };
         // Find index in original array to replace
         const realIndex = newTimeline.findIndex(i => i.id === itemToUpdate.id);
         newTimeline[realIndex] = updatedItem;
         
         // Update Global State
         onUpdateEvent({ ...event, timeline: newTimeline });
     }
  };

  const renderStatusBadge = (status: VendorStatus) => {
      switch(status) {
          case 'MAILED': return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800"><Clock size={12} className="mr-1"/> Waiting</span>;
          case 'OFFER_RECEIVED': return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"><AlertCircle size={12} className="mr-1"/> Action Needed</span>;
          case 'ACCEPTED': return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"><CheckCircle2 size={12} className="mr-1"/> Locked</span>;
          case 'REJECTED': return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"><XCircle size={12} className="mr-1"/> Rejected</span>;
      }
  };

  const renderPaymentBadge = (status: PaymentStatus) => {
      switch(status) {
          case 'UNPAID': return <span className="text-xs font-mono text-gray-400">Unpaid</span>;
          case 'HALF_PAID': return <span className="text-xs font-mono text-orange-600 bg-orange-50 px-1 rounded">50% Paid</span>;
          case 'PAID': return <span className="text-xs font-mono text-green-600 bg-green-50 px-1 rounded">Paid</span>;
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 relative">
        {/* Global Sidebar - Desktop Only */}
        <aside className="hidden md:flex w-64 bg-slate-900 text-white flex-col flex-shrink-0 fixed h-full z-20">
            <div className="h-16 flex items-center px-6 font-bold text-xl tracking-tight border-b border-slate-800">
                Eventura
            </div>
            <nav className="flex-1 py-6 px-3 space-y-1">
                <Link to="/tracker" className="flex items-center px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                    <LayoutDashboard size={18} className="mr-3"/> Global Tracker
                </Link>
                <div className="flex items-center px-3 py-2.5 rounded-lg bg-indigo-600 text-white font-medium">
                    <CalendarPlus size={18} className="mr-3"/> {event.name}
                </div>
            </nav>
            <div className="p-4 border-t border-slate-800">
                 <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold">JD</div>
                    <div className="text-sm">
                        <div className="font-medium">Jane Doe</div>
                        <div className="text-slate-500 text-xs">Admin</div>
                    </div>
                 </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="md:ml-64 ml-0 flex-1 flex flex-col min-h-screen pb-20 md:pb-0">
            {/* Page Header */}
            <header className="bg-white border-b border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-8 py-4 md:h-20 sticky top-0 z-10 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Link to="/tracker" className="text-slate-400 hover:text-indigo-600 transition-colors"><ArrowLeft size={16}/></Link>
                        <h1 className="text-xl md:text-2xl font-bold text-slate-900 truncate max-w-[200px] md:max-w-none">{event.name}</h1>
                        {isReadOnly ? (
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wide whitespace-nowrap flex items-center gap-1">
                                <Lock size={10} /> Archived
                            </span>
                        ) : event.status === 'CONFIRMED' ? (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide whitespace-nowrap flex items-center gap-1">
                                <CheckCircle2 size={10} /> Confirmed
                            </span>
                        ) : (
                            <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                                Planning
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><CalendarPlus size={14}/> {event.date ? new Date(event.date).toLocaleDateString() : 'TBD'}</span>
                        <span className="flex items-center gap-1"><Users size={14}/> {event.headcount} Guests</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex-1 md:flex-none md:w-64">
                         <div className="flex justify-between text-xs font-semibold mb-1">
                             <span>Budget</span>
                             <span>${event.currentSpend.toLocaleString()} / ${event.totalBudgetLimit.toLocaleString()}</span>
                         </div>
                         <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                             <div className={`h-full ${isReadOnly ? 'bg-slate-400' : 'bg-indigo-600'}`} style={{ width: `${Math.min((event.currentSpend / event.totalBudgetLimit) * 100, 100)}%`}}></div>
                         </div>
                    </div>
                    
                    {!isReadOnly ? (
                        <div className="flex gap-2">
                            <Link to={`/plan/${event.id}`} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 p-2 md:px-4 md:py-2 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2">
                                <PenTool size={16} />
                                <span className="hidden md:inline">Edit Plan</span>
                            </Link>
                            {/* Dev Only Button */}
                            <button onClick={simulateReply} className="bg-slate-900 text-white p-2 md:px-3 md:py-1 rounded text-xs opacity-50 hover:opacity-100" title="Dev: Randomly update a vendor status">
                                <span className="hidden md:inline">Simulate Reply</span>
                                <span className="md:hidden">Sim</span>
                            </button>
                        </div>
                    ) : (
                        <Link to={`/plan/${event.id}`} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 p-2 md:px-4 md:py-2 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2">
                            <Lock size={16} />
                            <span className="hidden md:inline">View Timeline</span>
                        </Link>
                    )}
                </div>
            </header>

            {/* Tabs */}
            <div className="px-4 md:px-8 mt-6 overflow-x-auto scrollbar-hide">
                <div className="flex border-b border-slate-200 min-w-max">
                    <button 
                        onClick={() => setActiveTab('TIMELINE')}
                        className={`pb-3 px-1 mr-8 font-medium text-sm transition-colors border-b-2 ${activeTab === 'TIMELINE' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                        Timeline & Vendors
                    </button>
                    <button 
                         onClick={() => setActiveTab('ATTENDEES')}
                        className={`pb-3 px-1 mr-8 font-medium text-sm transition-colors border-b-2 ${activeTab === 'ATTENDEES' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                        Guest List
                    </button>
                    <button 
                         onClick={() => setActiveTab('NOTES')}
                        className={`pb-3 px-1 mr-8 font-medium text-sm transition-colors border-b-2 ${activeTab === 'NOTES' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                        Notes
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 md:p-8 flex-1 bg-slate-50 overflow-y-auto">
                
                {/* TIMELINE TAB */}
                {activeTab === 'TIMELINE' && (
                    <div className="space-y-4 max-w-4xl pb-4">
                        {event.timeline.sort((a,b) => a.startTime.localeCompare(b.startTime)).map((item) => {
                            const vendor = getVendor(item.vendorId);
                            // Simple logic: if duration is long and type is venue, treat differently? For now, list all.
                            if (!vendor) return null;

                            return (
                                <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start gap-4 md:gap-6">
                                    {/* Time */}
                                    <div className="w-full md:w-20 pt-1 flex md:block justify-between items-center border-b md:border-b-0 border-slate-100 pb-2 md:pb-0">
                                        <div className="text-lg font-bold text-slate-900">{item.startTime}</div>
                                        <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full md:bg-transparent md:p-0">{item.durationMinutes}m</div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex-1 w-full">
                                        <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-2">
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg">{vendor.name}</h3>
                                                <div className="text-sm text-slate-500">{vendor.type} • {vendor.location}</div>
                                            </div>
                                            <div className="flex md:flex-col flex-row items-center md:items-end gap-2 md:gap-1 w-full md:w-auto justify-between md:justify-start">
                                                {renderStatusBadge(item.vendorStatus)}
                                                {renderPaymentBadge(item.paymentStatus)}
                                            </div>
                                        </div>

                                        {/* Action Row */}
                                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mt-4 pt-4 border-t border-slate-50">
                                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                                <button disabled={isReadOnly} className="p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-slate-100 disabled:opacity-50 disabled:cursor-not-allowed" title="Call">
                                                    <Phone size={16} />
                                                </button>
                                                <button disabled={isReadOnly} className="p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-slate-100 disabled:opacity-50 disabled:cursor-not-allowed" title="Email">
                                                    <Mail size={16} />
                                                </button>
                                            </div>

                                            {/* Docs Vault */}
                                            <div className="flex-1 flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                                                {item.documents.length > 0 ? item.documents.map((doc, i) => (
                                                    <div key={i} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:border-indigo-200 cursor-pointer group">
                                                        <FileText size={12} className="text-indigo-500" />
                                                        <span className="truncate max-w-[100px]">{doc.name}</span>
                                                        <Download size={10} className="opacity-0 group-hover:opacity-100" />
                                                    </div>
                                                )) : (
                                                    <span className="text-xs text-slate-400 italic py-2">No documents yet</span>
                                                )}
                                                {!isReadOnly && item.vendorStatus !== 'MAILED' && (
                                                     <button className="flex-shrink-0 px-2 py-1.5 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-xs text-slate-400 hover:text-indigo-600 hover:border-indigo-300 transition-colors whitespace-nowrap">
                                                        + Upload
                                                     </button>
                                                )}
                                            </div>
                                            
                                            <div className="font-mono font-bold text-slate-900 text-sm text-center md:text-right">
                                                ${item.cost.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                         {event.timeline.length === 0 && (
                            <div className="text-center py-12 text-slate-500">
                                No timeline items yet. Go back to <Link to={`/plan/${event.id}`} className="text-indigo-600 underline">planning workspace</Link>.
                            </div>
                        )}
                    </div>
                )}

                {/* ATTENDEES TAB */}
                {activeTab === 'ATTENDEES' && (
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden max-w-5xl">
                        {!isReadOnly && (
                        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50">
                            <div className="relative w-full md:w-auto">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                                <input type="text" placeholder="Search guests..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-64"/>
                            </div>
                            <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-500">
                                <Upload size={16} /> Upload CSV
                            </button>
                        </div>
                        )}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                                    <tr>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">Role</th>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3">Status</th>
                                        {!isReadOnly && <th className="px-6 py-3"></th>}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {attendees.map(attendee => (
                                        <tr key={attendee.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900">{attendee.name}</td>
                                            <td className="px-6 py-4 text-slate-500">{attendee.role}</td>
                                            <td className="px-6 py-4 text-slate-500">{attendee.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                    attendee.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                                    attendee.status === 'DECLINED' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {attendee.status}
                                                </span>
                                            </td>
                                            {!isReadOnly && (
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16}/></button>
                                            </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* NOTES TAB */}
                {activeTab === 'NOTES' && (
                    <div className="max-w-4xl h-full flex flex-col">
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden min-h-[400px]">
                             <div className="border-b border-slate-100 p-3 bg-slate-50 flex gap-2 overflow-x-auto">
                                {!isReadOnly && (
                                <>
                                <button className="p-2 hover:bg-slate-200 rounded"><FileEdit size={16} className="text-slate-500"/></button>
                                <div className="h-full w-px bg-slate-300 mx-2"></div>
                                <button className="font-bold font-serif text-slate-600 px-2">B</button>
                                <button className="italic font-serif text-slate-600 px-2">I</button>
                                <button className="underline font-serif text-slate-600 px-2">U</button>
                                </>
                                )}
                             </div>
                             <textarea 
                                className="flex-1 p-6 outline-none resize-none font-mono text-sm leading-relaxed text-slate-700 disabled:bg-slate-50"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                disabled={isReadOnly}
                             />
                        </div>
                    </div>
                )}

            </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center px-2 py-3 z-30 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <Link to="/tracker" className="flex flex-col items-center p-2 text-slate-400 hover:text-indigo-600">
                <LayoutDashboard size={20} />
                <span className="text-[10px] font-medium mt-1">Tracker</span>
            </Link>
            <div className="flex flex-col items-center p-2 text-indigo-600">
                <CalendarPlus size={20} />
                <span className="text-[10px] font-medium mt-1">Event</span>
            </div>
             <Link to="/profile" className="flex flex-col items-center p-2 text-slate-400 hover:text-indigo-600">
                <User size={20} />
                <span className="text-[10px] font-medium mt-1">Profile</span>
            </Link>
        </div>
    </div>
  );
};