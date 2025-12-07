import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Linkedin, Mail, GraduationCap, MapPin, ArrowRight, Check } from 'lucide-react';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // Here you would typically send the email to your backend
    }
  };

  const team = [
    {
      name: "Yohanne Akladius",
      role: "Operations",
      degree: "MBA",
      linkedin: "https://www.linkedin.com/in/yakladious/",
      email: "mailto:yakladious@gmail.com",
      // Using thumbnail endpoint for better embed reliability
      image: "https://drive.google.com/thumbnail?id=1zwHIXvyRy4fS0z_NBt3XrKC-6ZXwS8Hh&sz=w400"
    },
    {
      name: "Marek Swiatek",
      role: "Product",
      degree: "MSc Innovation, Entrepreneurship & Management",
      linkedin: "https://www.linkedin.com/in/marek-swiatek/",
      email: "mailto:marek@eventura.com",
      image: "https://drive.google.com/thumbnail?id=1vsTAJR98pOLn1HAnXhdMp_Ji5ZCJw8ix&sz=w400"
    },
    {
      name: "Eliott Pelpel",
      role: "Technology",
      degree: "MSc Business Analytics",
      linkedin: "https://www.linkedin.com/in/eliott-pelpel/",
      email: "mailto:eliottpel@gmail.com",
      image: "https://drive.google.com/thumbnail?id=1yrzN9sjA-nksBtMEqC1Qn-LluwvU8U74&sz=w400"
    },
    {
      name: "Arif Bayrak",
      role: "Growth",
      degree: "MSc Economics & Strategy",
      linkedin: "https://www.linkedin.com/in/arifismailbayrak/",
      email: "mailto:arifismailbayrak@gmail.com",
      image: "https://drive.google.com/thumbnail?id=1ry_d57X1WMgZuR4VOKSEtIK9WKjwGkbR&sz=w400"
    }
  ];

  // Fallback to a generated avatar if the local image fails to load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${e.currentTarget.alt}&background=random`;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">E</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Eventura</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wide mb-8 border border-slate-200">
           <MapPin size={12} />
           Born in South Kensington, London
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 text-slate-900 max-w-4xl mx-auto leading-tight">
          Re-engineering the corporate <br className="hidden md:block" /> event stack.
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
          Born at <span className="font-semibold text-indigo-600">Imperial College London</span>, we are a team of operators, engineers, and strategists obsessed with solving the fragmentation of the B2B event industry.
        </p>
      </section>

      {/* Team Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* 
             - grid-cols-1 on mobile
             - md:grid-cols-4 ensures 1 row of 4 items on tablets and larger screens 
          */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group flex flex-col items-center h-full">
                
                {/* Avatar */}
                <div className="w-24 h-24 mb-4 relative">
                  <div className="w-full h-full rounded-full p-1 bg-white shadow-md border border-slate-100">
                    <img 
                        src={member.image} 
                        alt={member.name} 
                        onError={handleImageError}
                        className="w-full h-full rounded-full object-cover" 
                    />
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full inline-block">{member.role}</p>
                </div>
                
                <div className="mt-auto space-y-4 w-full">
                  <div className="flex flex-col items-center gap-1.5 pt-4 border-t border-slate-50">
                     <div className="inline-flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        <GraduationCap size={12} /> Imperial College
                     </div>
                     <p className="text-xs text-slate-500 text-center leading-snug">
                        {member.degree}
                     </p>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0077b5] transition-all hover:scale-110">
                      <Linkedin size={18} />
                    </a>
                    <a href={member.email} className="text-slate-400 hover:text-indigo-600 transition-all hover:scale-110">
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Story Timeline */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-2">The Origin Story</h2>
            <p className="text-slate-500">From a whiteboard in South Ken to a VC-backed platform.</p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-200 via-indigo-400 to-slate-200 rounded-full"></div>

            {/* Milestone Node */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Glowing Node */}
              <div className="w-6 h-6 bg-indigo-600 rounded-full border-4 border-white shadow-[0_0_15px_rgba(79,70,229,0.5)] mb-8 relative">
                 <div className="absolute inset-0 bg-indigo-600 rounded-full animate-ping opacity-20"></div>
              </div>

              {/* Content Card */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full text-center relative hover:scale-[1.02] transition-transform duration-500">
                {/* Arrow */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-200 transform rotate-45"></div>
                
                <div className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full mb-4">
                  December 2025
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Imperial Entrepreneurs Ideathon</h3>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  Eventura was born during a 48-hour hackathon supported by <span className="font-bold bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">Google x Lovable</span>. We validated the problem with 50+ office managers in real-time.
                </p>

                <div className="flex justify-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-indigo-600"></div>
                   <div className="h-1.5 w-1.5 rounded-full bg-slate-200"></div>
                   <div className="h-1.5 w-1.5 rounded-full bg-slate-200"></div>
                </div>
              </div>
            </div>
            
            {/* Fading line at bottom */}
            <div className="h-24 bg-gradient-to-b from-transparent to-slate-50 relative z-20 mt-[-2rem]"></div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Stay in the loop</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Get the latest updates on our product, new blueprints, and behind-the-scenes stories from the team.
          </p>
          
          {subscribed ? (
             <div className="animate-in fade-in zoom-in duration-300 bg-green-500/10 border border-green-500/20 rounded-xl p-4 inline-flex items-center gap-2 text-green-400 font-medium">
                <Check size={20} />
                <span>Thanks for subscribing! We'll be in touch.</span>
             </div>
          ) : (
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="flex-1 rounded-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 px-6 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                required
              />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-indigo-500/30">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Join the Movement Section */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Join the Movement</h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            We are building the operating system for the future of work events. Whether you are a builder, a creator, or a venue partner, we want to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/careers" className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center">
              Careers
            </Link>
            <Link to="/partners" className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold bg-white text-slate-900 border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center">
              Partner with Us
            </Link>
            <Link to="/blog" className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold bg-white text-slate-900 border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
              Blog <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200 px-6 text-center">
         <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">E</div>
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} Eventura Inc.</p>
         </div>
      </footer>
    </div>
  );
};