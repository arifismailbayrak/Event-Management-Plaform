import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Star, HelpCircle, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'YEARLY'>('YEARLY');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChoosePlan = (planId: string) => {
    navigate(`/checkout/${planId}?cycle=${billingCycle}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
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

      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-wide mb-6 border border-indigo-100">
          <Zap size={12} className="fill-indigo-600" />
          Simple, Transparent Pricing
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900">
          Plan better events, <br className="hidden md:block"/> for less than the cost of a caterer.
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Stop paying per-event fees. One subscription for your entire event calendar.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm font-semibold ${billingCycle === 'MONTHLY' ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(prev => prev === 'MONTHLY' ? 'YEARLY' : 'MONTHLY')}
            className="w-14 h-8 bg-slate-200 rounded-full p-1 relative transition-colors duration-300 focus:outline-none"
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${billingCycle === 'YEARLY' ? 'translate-x-6' : ''}`}></div>
          </button>
          <span className={`text-sm font-semibold ${billingCycle === 'YEARLY' ? 'text-slate-900' : 'text-slate-500'}`}>
            Yearly <span className="text-emerald-600 text-xs font-bold ml-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Save 20%</span>
          </span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 max-w-7xl mx-auto pb-24">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          
          {/* Free Tier */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-slate-300 transition-all relative">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
            <p className="text-sm text-slate-500 mb-6 min-h-[40px]">Perfect for planning your first team offsite.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-slate-900">$0</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <button 
              onClick={() => handleChoosePlan('starter')}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-colors mb-8"
            >
              Get Started Free
            </button>
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Includes:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <Check size={18} className="text-indigo-600 shrink-0" />
                  <span>1 Active Event</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <Check size={18} className="text-indigo-600 shrink-0" />
                  <span>Access to Blueprint Library</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <Check size={18} className="text-indigo-600 shrink-0" />
                  <span>Basic Vendor Marketplace</span>
                </li>
                 <li className="flex items-start gap-3 text-sm text-slate-600">
                  <Check size={18} className="text-indigo-600 shrink-0" />
                  <span>Manual Budget Tracking</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pro Tier (Highlighted) */}
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Pro Workspace</h3>
            <p className="text-sm text-slate-400 mb-6 min-h-[40px]">For office managers running multiple events.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">${billingCycle === 'YEARLY' ? '49' : '59'}</span>
              <span className="text-slate-400">/mo</span>
            </div>
            <button 
              onClick={() => handleChoosePlan('pro')}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors mb-8 shadow-lg shadow-indigo-900/50"
            >
              Start Pro Trial
            </button>
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Everything in Starter, plus:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <Check size={18} className="text-indigo-400 shrink-0" />
                  <span><strong>Unlimited</strong> Active Events</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <Check size={18} className="text-indigo-400 shrink-0" />
                  <span>Automated Vendor Payments</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <Check size={18} className="text-indigo-400 shrink-0" />
                  <span>Detailed Budget Export (CSV/PDF)</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <Check size={18} className="text-indigo-400 shrink-0" />
                  <span>Guest List Management</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <Check size={18} className="text-indigo-400 shrink-0" />
                  <span>Priority Support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-slate-300 transition-all relative">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h3>
            <p className="text-sm text-slate-500 mb-6 min-h-[40px]">Custom controls for large organizations.</p>
            <div className="mb-8 flex items-baseline">
              <span className="text-4xl font-bold text-slate-900">Custom</span>
            </div>
            <button 
              onClick={() => window.location.href = "mailto:sales@eventura.com"}
              className="w-full py-3 px-4 bg-white border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-colors mb-8"
            >
              Contact Sales
            </button>
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Everything in Pro, plus:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <Check size={18} className="text-indigo-600 shrink-0" />
                  <span>SSO & SAML Login</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <Check size={18} className="text-indigo-600 shrink-0" />
                  <span>Dedicated Account Manager</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <Check size={18} className="text-indigo-600 shrink-0" />
                  <span>Custom Vendor Onboarding</span>
                </li>
                 <li className="flex items-start gap-3 text-sm text-slate-600">
                  <Check size={18} className="text-indigo-600 shrink-0" />
                  <span>Invoice Consolidation (Net 30)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-6 max-w-5xl mx-auto pb-24">
          <h2 className="text-2xl font-bold text-center mb-12">Detailed Feature Comparison</h2>
          <div className="overflow-x-auto">
              <table className="w-full text-sm">
                  <thead>
                      <tr className="border-b-2 border-slate-100">
                          <th className="text-left py-4 px-4 w-1/3">Feature</th>
                          <th className="text-center py-4 px-4 w-1/5 text-slate-500">Starter</th>
                          <th className="text-center py-4 px-4 w-1/5 text-indigo-600 font-bold">Pro</th>
                          <th className="text-center py-4 px-4 w-1/5 text-slate-900">Enterprise</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      <tr>
                          <td className="py-4 px-4 font-medium text-slate-700">Active Events</td>
                          <td className="py-4 px-4 text-center text-slate-500">1</td>
                          <td className="py-4 px-4 text-center font-bold text-indigo-600">Unlimited</td>
                          <td className="py-4 px-4 text-center text-slate-900">Unlimited</td>
                      </tr>
                      <tr>
                          <td className="py-4 px-4 font-medium text-slate-700">Vendor Marketplace Fee</td>
                          <td className="py-4 px-4 text-center text-slate-500">10%</td>
                          <td className="py-4 px-4 text-center font-bold text-indigo-600">5%</td>
                          <td className="py-4 px-4 text-center text-slate-900">0%</td>
                      </tr>
                      <tr>
                          <td className="py-4 px-4 font-medium text-slate-700">Guest List Size</td>
                          <td className="py-4 px-4 text-center text-slate-500">Up to 50</td>
                          <td className="py-4 px-4 text-center font-bold text-indigo-600">Up to 500</td>
                          <td className="py-4 px-4 text-center text-slate-900">Unlimited</td>
                      </tr>
                      <tr>
                          <td className="py-4 px-4 font-medium text-slate-700">Contract Management</td>
                          <td className="py-4 px-4 text-center text-slate-500">-</td>
                          <td className="py-4 px-4 text-center text-indigo-600"><Check size={16} className="mx-auto"/></td>
                          <td className="py-4 px-4 text-center text-slate-900"><Check size={16} className="mx-auto"/></td>
                      </tr>
                      <tr>
                          <td className="py-4 px-4 font-medium text-slate-700">Custom Branding</td>
                          <td className="py-4 px-4 text-center text-slate-500">-</td>
                          <td className="py-4 px-4 text-center text-slate-500">-</td>
                          <td className="py-4 px-4 text-center text-slate-900"><Check size={16} className="mx-auto"/></td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 px-6 border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border border-slate-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle size={18} className="text-indigo-600" />
                Can I cancel anytime?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Yes. If you are on a monthly plan, you can cancel at any time and you won't be billed for the next month. Yearly plans are refunded on a pro-rata basis within the first 30 days.
              </p>
            </div>
            <div className="border border-slate-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle size={18} className="text-indigo-600" />
                Do you charge per attendee?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                No. Unlike other event platforms, we don't tax your success. Our Pro plan includes up to 500 guests per event with no per-head fees.
              </p>
            </div>
            <div className="border border-slate-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                 <ShieldCheck size={18} className="text-indigo-600" />
                 Is payment secure?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Yes. All payments are processed via Stripe. We do not store your credit card details on our servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 px-6 text-center border-t border-slate-200">
         <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">E</div>
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} Eventura Inc.</p>
         </div>
      </footer>
    </div>
  );
};