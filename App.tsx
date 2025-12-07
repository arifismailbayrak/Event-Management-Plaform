import React, { useState, useEffect } from 'react';
import { Event, TimelineItem } from './types';
import { ManualWizard } from './components/ManualWizard';
import { CreateHub } from './components/CreateHub';
import { BlueprintSelector } from './components/BlueprintSelector';
import { Workspace } from './components/Workspace';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { BlueprintsPage } from './components/BlueprintsPage';
import { LegalPage } from './components/LegalPage';
import { AboutPage } from './components/AboutPage';
import { PartnersPage } from './components/PartnersPage';
import { CareersPage } from './components/CareersPage';
import { BlogIndexPage } from './components/BlogIndexPage';
import { BlogPostPage } from './components/BlogPostPage';
import { ManageEventPage } from './components/ManageEventPage';
import { GlobalTrackerPage } from './components/GlobalTrackerPage';
import { PricingPage } from './components/PricingPage';
import { BuyingPage } from './components/BuyingPage';
import { HashRouter, Routes, Route, useNavigate, Navigate, useLocation, useParams } from 'react-router-dom';
import { MOCK_VENDORS } from './constants';

// --- Sample Data Generators ---
const generateSampleEvents = (): Event[] => {
  // 1. Active Event
  const activeEvent: Event = {
    id: 'evt_sample_active',
    userId: 'user_123',
    status: 'CONFIRMED',
    name: 'Q3 Marketing Offsite',
    eventType: 'OFFSITE',
    date: new Date(new Date().setDate(new Date().getDate() + 45)), // 45 days in future
    dateMode: 'SINGLE',
    location: 'San Francisco, CA',
    locationRadius: 10,
    headcount: 24,
    totalBudgetLimit: 15000,
    currentSpend: 8200,
    requiredServices: ['VENUE', 'CATERING'],
    vibe: 'Creative & Focused',
    timeline: [
       {
         id: 't1', vendorId: MOCK_VENDORS[0].id, dayIndex: 0, startTime: '09:00', durationMinutes: 480, cost: 5000,
         vendorStatus: 'ACCEPTED', paymentStatus: 'HALF_PAID', documents: [], vendorContact: { email: 'venue@test.com', phone: '123' }
       },
       {
         id: 't2', vendorId: MOCK_VENDORS[1].id, dayIndex: 0, startTime: '12:00', durationMinutes: 60, cost: 1200,
         vendorStatus: 'OFFER_RECEIVED', paymentStatus: 'UNPAID', documents: [], vendorContact: { email: 'food@test.com', phone: '123' }
       }
    ]
  };

  // 2. Archived Event
  const archivedEvent: Event = {
    id: 'evt_sample_archived',
    userId: 'user_123',
    status: 'ARCHIVED',
    name: 'Annual Holiday Party 2024',
    eventType: 'PARTY',
    date: new Date('2024-12-15'),
    dateMode: 'SINGLE',
    location: 'New York, NY',
    headcount: 150,
    totalBudgetLimit: 50000,
    currentSpend: 48500,
    requiredServices: ['VENUE', 'CATERING', 'ENTERTAINMENT'],
    vibe: 'Glamorous',
    timeline: [
        {
         id: 't3', vendorId: MOCK_VENDORS[2].id, dayIndex: 0, startTime: '18:00', durationMinutes: 300, cost: 25000,
         vendorStatus: 'ACCEPTED', paymentStatus: 'PAID', documents: [{ type: 'INVOICE', name: 'Final_Invoice.pdf', url: '#' }], vendorContact: { email: 'hotel@test.com', phone: '123' }
       }
    ]
  };

  return [activeEvent, archivedEvent];
};

// Wrapper to handle Workspace routing logic
const PlanRoute = ({ events, onSave }: { events: Event[], onSave: (e: Event) => void }) => {
  const { eventId } = useParams();
  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    return <Navigate to="/tracker" replace />;
  }

  return (
    <Workspace 
      key={event.id} // Force remount if ID changes
      initialEvent={event} 
      onSave={onSave}
      isReadOnly={event.status === 'ARCHIVED' || event.status === 'PAID'}
    />
  );
};

// Guard for protected routes
const RequireAuth = ({ children, isAuthenticated }: { children?: React.ReactNode; isAuthenticated: boolean }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Auth State (Persistent)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
     return localStorage.getItem('eventura_auth') === 'true';
  });

  // 2. Event State (Persistent)
  const [events, setEvents] = useState<Event[]>(() => {
    try {
      const savedEvents = localStorage.getItem('eventura_events');
      if (savedEvents) {
        const parsed = JSON.parse(savedEvents);
        // Force seed if empty to ensure user sees sample data
        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
        }
      }
      return generateSampleEvents();
    } catch (e) {
      console.error("Failed to load events", e);
      return generateSampleEvents();
    }
  });

  const [pendingEventData, setPendingEventData] = useState<Partial<Event> | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('eventura_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eventura_auth', String(isAuthenticated));
  }, [isAuthenticated]);

  const handleWizardComplete = (wizardData: Partial<Event>) => {
    // Check Auth
    if (!isAuthenticated) {
      setPendingEventData(wizardData);
      navigate('/login');
      return;
    }
    createEvent(wizardData);
  };

  const createEvent = (data: Partial<Event>) => {
    const newEvent: Event = {
      id: `evt_${Date.now()}`,
      userId: 'user_123',
      status: 'DRAFT',
      name: data.name || 'New Event',
      eventType: data.eventType || 'OFFSITE',
      date: data.date || new Date(),
      endDate: data.endDate,
      dateMode: data.dateMode,
      location: data.location,
      locationRadius: data.locationRadius || 0,
      vibe: data.vibe,
      headcount: data.headcount || 50,
      totalBudgetLimit: data.totalBudgetLimit || 10000,
      requiredServices: data.requiredServices || [],
      timeline: data.timeline || [],
      currentSpend: data.currentSpend || 0,
    };

    setEvents(prev => [...prev, newEvent]);
    // Navigate to the specific ID route
    navigate(`/plan/${newEvent.id}`);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    if (pendingEventData) {
      createEvent(pendingEventData);
      setPendingEventData(null);
    } else {
      // If they just logged in without pending data, go to Tracker
      navigate('/tracker');
    }
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      navigate('/');
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/blueprints" element={<BlueprintsPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/checkout/:planId" element={<BuyingPage />} />
      
      {/* Login: Redirect to tracker if already authenticated */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/tracker" replace /> : <LoginPage onLogin={handleLogin} />
        } 
      />
      
      <Route path="/legal" element={<LegalPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/partners" element={<PartnersPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      
      {/* Protected Routes */}
      <Route path="/create" element={<RequireAuth isAuthenticated={isAuthenticated}><CreateHub /></RequireAuth>} />
      <Route 
        path="/create/manual" 
        element={<RequireAuth isAuthenticated={isAuthenticated}><ManualWizard onComplete={handleWizardComplete} /></RequireAuth>} 
      />
      <Route 
        path="/create/blueprints" 
        element={<RequireAuth isAuthenticated={isAuthenticated}><BlueprintSelector onSelect={handleWizardComplete} /></RequireAuth>} 
      />

      <Route path="/new" element={<Navigate to="/create" replace />} />
      
      {/* Updated Plan Route to use ID parameter for persistence */}
      <Route 
        path="/plan/:eventId" 
        element={
          <RequireAuth isAuthenticated={isAuthenticated}>
             <PlanRoute events={events} onSave={updateEvent} />
          </RequireAuth>
        } 
      />
      
      {/* Legacy /plan redirect for safety */}
      <Route path="/plan" element={<Navigate to="/tracker" replace />} />

      <Route 
        path="/manage/:eventId" 
        element={<RequireAuth isAuthenticated={isAuthenticated}><ManageEventPage events={events} onUpdateEvent={updateEvent} /></RequireAuth>} 
      />
      
      <Route 
        path="/tracker" 
        element={<RequireAuth isAuthenticated={isAuthenticated}><GlobalTrackerPage events={events} onLogout={handleLogout} /></RequireAuth>} 
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}