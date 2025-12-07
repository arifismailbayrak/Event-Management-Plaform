import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, ChevronDown, ChevronUp, DollarSign, Users, ClipboardCheck } from 'lucide-react';

export const PartnersPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'VENUE',
    city: '',
    website: '',
    contactName: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Vendor Application:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  const faqs = [
    { q: "Is there a listing fee?", a: "No. It is free to list. We only take a standard commission on confirmed bookings." },
    { q: "Who sets the prices?", a: "You do. We respect your standard rates and add our service fee on top of your quote or negotiate a commission structure that works for you." },
    { q: "How do payments work?", a: "Eventura pays you directly. No need to chase individual corporate clients. We typically settle invoices within 7 days of the event completion." },
    { q: "What kind of clients use Eventura?", a: "We work with venture-backed technology companies, financial firms, and creative agencies who value quality and speed." }
  ];

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

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-wide mb-8 border border-indigo-100">
           Partner Network
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900 max-w-4xl mx-auto leading-tight">
          Grow your corporate business <br className="hidden md:block" /> with Eventura.
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-10">
          We connect premium vendors with 50+ fast-growing tech companies. <br className="hidden md:block"/> No marketing fees, just confirmed bookings.
        </p>
        <button 
          onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-500 transition-all shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1"
        >
          Apply to Join
        </button>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            {/* Benefit 1 */}
            <div className="flex flex-col gap-4">
                <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-2">
                    <DollarSign size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Zero Invoice Chasing</h3>
                <p className="text-slate-600 leading-relaxed">
                    We handle the client billing. You get paid by Eventura directly, on time, every time. Guaranteed payment terms.
                </p>
            </div>
            {/* Benefit 2 */}
            <div className="flex flex-col gap-4">
                <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-2">
                    <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">High-Intent Clients</h3>
                <p className="text-slate-600 leading-relaxed">
                    No tire-kickers. Our users are Office Managers with approved budgets ready to book offsites, dinners, and parties.
                </p>
            </div>
            {/* Benefit 3 */}
            <div className="flex flex-col gap-4">
                <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-2">
                    <ClipboardCheck size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Automated Callsheets</h3>
                <p className="text-slate-600 leading-relaxed">
                   Receive a digital run-of-show for every event. Know exactly when to arrive, who the POC is, and what to do.
                </p>
            </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Join the Network</h2>
                    <p className="text-slate-600">Tell us about your services. We review every application manually.</p>
                </div>

                {submitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-in zoom-in duration-300">
                        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">Application Received</h3>
                        <p className="text-green-700">Thanks for applying! Our team will check out your portfolio and get back to you within 48 hours.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Business Name</label>
                                <input 
                                    required
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    type="text" 
                                    className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                                    placeholder="Acme Catering Co."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                                <select 
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="VENUE">Venue</option>
                                    <option value="CATERING">Catering</option>
                                    <option value="PHOTOGRAPHER">Photography</option>
                                    <option value="ENTERTAINMENT">Entertainment</option>
                                    <option value="ACCOMMODATION">Accommodation</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">City / Location</label>
                            <input 
                                required
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                type="text" 
                                className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. San Francisco, CA"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Website / Portfolio Link</label>
                            <input 
                                required
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                type="url" 
                                className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                                placeholder="https://instagram.com/yourbusiness"
                            />
                            <p className="text-xs text-slate-500 mt-1">Link to your website or Instagram so we can see your work.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Name</label>
                                <input 
                                    required
                                    name="contactName"
                                    value={formData.contactName}
                                    onChange={handleChange}
                                    type="text" 
                                    className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <input 
                                    required
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email" 
                                    className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                                    placeholder="jane@acmecatering.com"
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl mt-4">
                            Submit Application
                        </button>
                    </form>
                )}
            </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button 
                            onClick={() => toggleFaq(idx)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                        >
                            <span className="font-semibold text-slate-900">{faq.q}</span>
                            {openFaq === idx ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                        </button>
                        {openFaq === idx && (
                            <div className="px-6 pb-6 text-slate-600 leading-relaxed bg-slate-50 border-t border-slate-100 pt-4">
                                {faq.a}
                            </div>
                        )}
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
               <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
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