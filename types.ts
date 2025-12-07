
export type ServiceType = 
  | 'VENUE' 
  | 'CATERING' 
  | 'ACCOMMODATION' 
  | 'PHOTOGRAPHER' 
  | 'ENTERTAINMENT' 
  | 'MARKETING_MATERIALS';

export interface Vendor {
  id: string;
  name: string;
  type: ServiceType; 
  description: string;
  imageUrl: string;
  pricePerUnit: number;
  pricingModel: 'FLAT' | 'PER_HEAD';
  rating: number;
  location?: string;
  vibe: string; 
}

export type VendorStatus = 'MAILED' | 'OFFER_RECEIVED' | 'ACCEPTED' | 'REJECTED';
export type PaymentStatus = 'UNPAID' | 'HALF_PAID' | 'PAID';
export type DocType = 'INVOICE' | 'AGREEMENT' | 'BRIEF' | 'PHOTO';

export interface TimelineItem {
  id: string;
  vendorId: string;
  dayIndex: number; 
  startTime: string; 
  durationMinutes: number;
  cost: number;
  
  // Tracking Fields
  vendorStatus: VendorStatus;
  paymentStatus: PaymentStatus;
  
  // Documents
  documents: {
    type: DocType;
    name: string;
    url: string;
  }[];
  
  // Vendor Contact
  vendorContact: {
    phone: string;
    email: string;
  };
}

export interface Attendee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'INVITED' | 'CONFIRMED' | 'DECLINED';
}

export type EventType = 
  | 'OFFSITE' 
  | 'DINNER' 
  | 'PARTY' 
  | 'CONFERENCE' 
  | 'WORKSHOP' 
  | 'PRODUCT_LAUNCH' 
  | 'HACKATHON' 
  | 'NETWORKING';

export interface Event {
  id: string;
  userId: string;
  status: 'DRAFT' | 'CONFIRMED' | 'PAID' | 'ARCHIVED';
  
  // Wizard Data
  name: string;
  eventType: EventType;
  date: Date | null;
  endDate?: Date | null; 
  dateMode?: 'SINGLE' | 'MULTI'; 
  location?: string; 
  locationRadius?: number; 
  vibe?: string; 
  headcount: number;
  totalBudgetLimit: number;
  
  // The "Filter" derived from Wizard Step 4
  requiredServices: ServiceType[]; 
  
  // The Workspace State
  timeline: TimelineItem[]; 
  currentSpend: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; 
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
}
