import { Vendor, ServiceType, BlogPost } from './types';

const VIBES = ['Professional', 'Relaxed', 'High Energy', 'Luxury', 'Rustic', 'Tech-Focused'];

const generateVendors = (): Vendor[] => {
  const categories: ServiceType[] = [
    'VENUE', 'CATERING', 'ACCOMMODATION', 'PHOTOGRAPHER', 'ENTERTAINMENT', 'MARKETING_MATERIALS'
  ];
  
  const vendors: Vendor[] = [];
  let idCounter = 1;

  categories.forEach(cat => {
    // Generate 15 vendors per category to have enough for "Show More"
    for (let i = 0; i < 15; i++) {
      const vibe = VIBES[Math.floor(Math.random() * VIBES.length)];
      vendors.push({
        id: `v_${idCounter++}`,
        name: `${cat.charAt(0) + cat.slice(1).toLowerCase().replace('_', ' ')} ${i + 1}`,
        type: cat,
        description: `A ${vibe.toLowerCase()} service provider for your corporate ${cat.toLowerCase()} needs. High quality and reliable.`,
        imageUrl: `https://picsum.photos/400/300?random=${idCounter}`,
        pricePerUnit: Math.floor(Math.random() * 2000) + 200,
        pricingModel: Math.random() > 0.5 ? 'FLAT' : 'PER_HEAD',
        rating: 4 + (Math.random()),
        location: 'San Francisco, CA',
        vibe: vibe
      });
    }
  });

  return vendors;
};

export const MOCK_VENDORS = generateVendors();

export const STEP_DESCRIPTIONS = [
  "Choose Event Type",
  "Logistics",
  "Budget",
  "Select Services"
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'spreadsheet-killing-culture',
    title: "Why 'The Spreadsheet' is Killing Your Company Culture",
    excerpt: "We love Excel, but not for planning a 50-person offsite. Here is why manual event planning is costing you 40+ hours a quarter—and how to fix it.",
    category: "Productivity",
    date: "Dec 12, 2025",
    author: {
      name: "Marek Swiatek",
      role: "Head of Product",
      avatar: "https://drive.google.com/thumbnail?id=1vsTAJR98pOLn1HAnXhdMp_Ji5ZCJw8ix&sz=w400"
    },
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80",
    content: `
      <h2>The Hidden Cost of Manual Planning</h2>
      <p>It starts innocently enough. You open a new Google Sheet. You create columns for "Venue," "Cost," and "Status." You feel organized. But three weeks later, that spreadsheet has turned into a monster with 15 tabs, color-coded cells that no one understands, and broken formulas.</p>
      <p>We calculated the cost. The average Office Manager spends 40+ hours per quarter just managing the logistics of team events. At an average hourly rate, that's thousands of dollars of wasted productivity—not to mention the opportunity cost of what you <em>could</em> be building for your culture.</p>
      
      <h2>The "Silo" Problem</h2>
      <p>When information lives in a spreadsheet, it is by definition disconnected from the real world. Only one person (you) knows if the bus is actually booked. If you get sick, or if you're on vacation, the event fails. This creates a single point of failure that is risky for any growing company.</p>
      
      <h2>The Fix: Centralization</h2>
      <p>Modern teams need dynamic tools. Moving from static rows to a dynamic timeline changes everything. It allows for:</p>
      <ul>
        <li>Real-time collaboration with your finance team</li>
        <li>Automated reminders for vendor payments</li>
        <li>A "Single Source of Truth" that anyone can understand instantly</li>
      </ul>
      
      <p><strong>Stop pasting links into cells.</strong> Your company culture deserves better than VLOOKUP errors.</p>
    `
  },
  {
    id: '2',
    slug: 'q3-offsite-guide-budget',
    title: "The Ultimate Guide to Planning a Q3 Offsite (Under $400/Head)",
    excerpt: "You don't need a Google-sized budget to have a Google-quality offsite. Here is our blueprint for a high-impact, low-cost team retreat.",
    category: "Planning Guides",
    date: "Nov 28, 2025",
    author: {
      name: "Yohanne Akladius",
      role: "COO",
      avatar: "https://drive.google.com/thumbnail?id=1zwHIXvyRy4fS0z_NBt3XrKC-6ZXwS8Hh&sz=w400"
    },
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    content: `
      <h2>The Budget Breakdown</h2>
      <p>Planning an offsite on a budget requires discipline. We recommend the following split for a balanced experience:</p>
      <ul>
        <li><strong>40% Venue:</strong> This is your biggest ticket item.</li>
        <li><strong>30% Food & Drink:</strong> Hungry teams are unhappy teams.</li>
        <li><strong>20% Activity:</strong> The "bonding" part.</li>
        <li><strong>10% Buffer:</strong> For when things inevitably go wrong.</li>
      </ul>

      <h2>Venue Hacks</h2>
      <p>The biggest mistake companies make is booking a hotel conference room. It's expensive and sterile. Instead, look for "dry hire" venues—empty lofts, art galleries, or even large Airbnb-style estates that allow events. These often cost 50% less than hotels. You can then bring in your own catering (e.g., food trucks) which is significantly cheaper than hotel banquet pricing.</p>

      <h2>Activity Ideas</h2>
      <p>You don't need to hire an expensive motivational speaker. Some of the best team bonding happens during simple, structured activities:</p>
      <ul>
        <li><strong>Scavenger Hunts:</strong> Low cost, high engagement, gets people moving.</li>
        <li><strong>Cook-offs:</strong> Rent a kitchen and have teams compete.</li>
        <li><strong>Hiking:</strong> Free and great for conversation.</li>
      </ul>
      
      <p>Ready to start? You can clone this exact budget template in the Eventura blueprint library.</p>
    `
  },
  {
    id: '3',
    slug: 'office-is-an-event',
    title: "The Office is No Longer a Place. It’s an Event.",
    excerpt: "In a hybrid world, the \"office\" only exists when we gather. Why the frequency of your events matters more than the square footage of your HQ.",
    category: "Future of Work",
    date: "Oct 15, 2025",
    author: {
      name: "Arif Bayrak",
      role: "Head of Growth",
      avatar: "https://drive.google.com/thumbnail?id=1ry_d57X1WMgZuR4VOKSEtIK9WKjwGkbR&sz=w400"
    },
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2301&q=80",
    content: `
      <h2>The Shift</h2>
      <p>For decades, the "office" was a default. You went there because that's where your desk was. In a remote-first or hybrid world, the office is no longer a default destination—it's an intentional one. We don't go to the office to email; we go to the office to connect.</p>
      
      <h2>The ROI of Connection</h2>
      <p>Data shows that retention rates are 40% higher in hybrid teams that meet monthly compared to those that meet quarterly. The "stickiness" of your company culture depends on the frequency of high-quality interactions, not the daily grind.</p>

      <h2>The New Cadence: 1-1-4</h2>
      <p>We recommend the <strong>1-1-4 Model</strong> for modern distributed teams:</p>
      <ul>
        <li><strong>1 Annual Retreat:</strong> The "big one." All hands, strategy, deep bonding.</li>
        <li><strong>1 Holiday Party:</strong> Celebration and gratitude.</li>
        <li><strong>4 Quarterly Offsites:</strong> Department-level focus and alignment.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Stop paying rent for empty desks. Take that capital and invest it in experiences. Your office is no longer a place—it's a series of events.</p>
    `
  },
  {
    id: '4',
    slug: 'vendor-red-flags-guide',
    title: "5 Red Flags Your Caterer Might Ghost You (And How to Spot Them)",
    excerpt: "Nothing ruins a reputation faster than a hungry CEO and an empty buffet table. Learn the professional secrets to vetting vendors so you never get left stranded on event day.",
    category: "Vendor Management",
    date: "Jan 5, 2026",
    author: {
      name: "Eliott Pelpel",
      role: "CTO",
      avatar: "https://drive.google.com/thumbnail?id=1yrzN9sjA-nksBtMEqC1Qn-LluwvU8U74&sz=w400"
    },
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    content: `
      <h2>The "24-Hour Rule"</h2>
      <p>In the high-stakes world of corporate events, communication speed is a proxy for operational competence. If a caterer takes three days to reply to a sales inquiry—when they are supposedly trying to win your money—imagine how responsive they will be when they already have your deposit and their van breaks down on the morning of your event.</p>
      <p>We live by the 24-hour rule. Professional vendors have systems in place to handle inquiries. Slow responses usually indicate a "one-man show" overwhelmed by logistics, which is the #1 predictor of onsite failure.</p>

      <h2>The "All-Inclusive" Trap</h2>
      <p>Beware of quotes that are round numbers with vague descriptions like "Full Service Catering - $5,000." This is often a sign that the vendor is making it up as they go.</p>
      <p>Professional quotes should be line-itemed. You need to see:</p>
      <ul>
        <li><strong>Food Cost:</strong> Per head or per platter.</li>
        <li><strong>Service Charge:</strong> Usually 18-22% for staff.</li>
        <li><strong>Rentals:</strong> Plates, forks, linens.</li>
        <li><strong>Travel/Delivery Fees:</strong> The logistics cost.</li>
      </ul>
      <p>If these aren't separated, you are likely overpaying, or worse, you'll be hit with "surprise" fees on the final invoice.</p>

      <h2>Insurance is Non-Negotiable</h2>
      <p>This sounds boring until someone trips over a chafing dish fuel can. Never, ever book a vendor who cannot produce a COI (Certificate of Insurance) within an hour of asking. </p>
      <p>A vendor without insurance is a vendor who cuts corners. It’s a massive red flag for their overall business health and reliability.</p>

      <h2>The Eventura Standard</h2>
      <p>We know you don't have time to play detective. That's why every single vendor on the Eventura marketplace goes through a 20-point vetting process. We check their solvency, we verify their insurance on file, and we interview past corporate clients to ensure they show up on time, every time.</p>

      <h2>Conclusion</h2>
      <p>Peace of mind is worth more than saving $50. Book vendors who have "skin in the game" and professional systems to back it up.</p>
    `
  }
];