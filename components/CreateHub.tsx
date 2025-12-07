import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PenTool, Map, Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const CreateHub: React.FC = () => {
  const navigate = useNavigate();

  const handleFeelingLucky = () => {
    // Generate random values for the wizard
    const eventTypes = ['OFFSITE', 'DINNER', 'PARTY', 'CONFERENCE'];
    const vibes = ['Professional', 'Relaxed', 'High Energy', 'Luxury', 'Rustic'];
    const names = ['Q4 Strategy Summit', 'Annual Team Retreat', 'Summer Social', 'Product Launch Dinner', 'Executive Offsite'];
    const services = ['VENUE', 'CATERING', 'ACCOMMODATION', 'PHOTOGRAPHER', 'ENTERTAINMENT', 'MARKETING_MATERIALS'];

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const randomVibe = vibes[Math.floor(Math.random() * vibes.length)];
    const randomHeadcount = Math.floor(Math.random() * 85) + 15; // 15-100
    
    // Pick 3 random services
    const shuffledServices = [...services].sort(() => 0.5 - Math.random());
    const randomServices = shuffledServices.slice(0, 3);

    const randomData = {
      name: randomName,
      eventType: randomType,
      headcount: randomHeadcount,
      vibe: randomVibe,
      requiredServices: randomServices,
      location: 'San Francisco, CA', // Default random location
      dateMode: 'SINGLE',
      date: new Date(new Date().setDate(new Date().getDate() + 30)), // 30 days from now
    };

    navigate('/create/manual', { state: { prefilled: randomData, isLucky: true } });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
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

      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">How do you want to plan today?</h1>
          <p className="text-lg text-slate-600">Choose your path to the perfect corporate event.</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-8 max-w-6xl w-full"
        >
          {/* Card A: Manual */}
          <motion.div variants={item}>
            <Link to="/create/manual" className="block h-full group">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 h-full shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 to-slate-300 group-hover:from-indigo-400 group-hover:to-indigo-600 transition-all"></div>
                <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 mb-6 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <PenTool size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Build from Scratch</h3>
                <p className="text-slate-600 leading-relaxed">
                  I know exactly what I want. Let me choose every detail manually, from the venue to the napkins.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Card B: Blueprints */}
          <motion.div variants={item}>
            <Link to="/create/blueprints" className="block h-full group">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 h-full shadow-sm hover:shadow-xl hover:border-purple-200 transition-all hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 to-slate-300 group-hover:from-purple-400 group-hover:to-purple-600 transition-all"></div>
                <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 mb-6 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                  <Map size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Use a Blueprint</h3>
                <p className="text-slate-600 leading-relaxed">
                  Speed is key. Use a pre-made template curated by top event planners at companies like Airbnb and Stripe.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Card C: AI / Lucky */}
          <motion.div variants={item}>
            <button onClick={handleFeelingLucky} className="block w-full text-left h-full group">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 h-full shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 to-slate-300 group-hover:from-emerald-400 group-hover:to-emerald-600 transition-all"></div>
                <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Sparkles size={150} />
                </div>
                <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 mb-6 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">I'm Feeling Lucky</h3>
                <p className="text-slate-600 leading-relaxed">
                  Let the Eventura AI engine suggest a complete event package for you instantly based on trends.
                </p>
              </div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};