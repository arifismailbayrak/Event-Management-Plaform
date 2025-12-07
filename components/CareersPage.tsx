import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, UploadCloud, Briefcase, MapPin, Clock } from 'lucide-react';

export const CareersPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    linkedin: '',
    message: ''
  });
  const [cvName, setCvName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application Submitted:', { ...formData, cv: cvName });
    setSubmitted(true);
  };

  const openRoles = [
    { title: "Senior Frontend Engineer", location: "London / Remote", type: "Full-time" },
    { title: "Growth Marketing Manager", location: "New York", type: "Full-time" },
    { title: "Event Operations Associate", location: "San Francisco", type: "Contract" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">O</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">OffsiteFlow</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-wide mb-8 border border-indigo-100">
           We are hiring
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900 max-w-4xl mx-auto leading-tight">
          Build the operating system <br className="hidden md:block" /> for corporate events.
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-10">
          Join a team of operators, engineers, and strategists obsessed with solving the fragmentation of the B2B event industry.
        </p>
      </section>

      {/* Open Roles (Context) */}
      <section className="py-12 bg-white border-y border-slate-200">
         <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center text-slate-900">Open Positions</h2>
            <div className="grid gap-4">
               {openRoles.map((role, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer" onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}>
                     <div>
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">{role.title}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-slate-500">
                           <span className="flex items-center gap-1"><MapPin size={14} /> {role.location}</span>
                           <span className="flex items-center gap-1"><Clock size={14} /> {role.type}</span>
                        </div>
                     </div>
                     <span className="mt-4 sm:mt-0 px-4 py-2 bg-slate-50 text-slate-600 text-sm font-semibold rounded-full border border-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors text-center">
                        Apply Now
                     </span>
                  </div>
               ))}
            </div>
            <p className="text-center text-slate-500 mt-8 text-sm">Don't see your role? Apply generally below.</p>
         </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-24 px-6 relative">
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Submit your application</h2>
                    <p className="text-slate-600">Tell us about yourself and how you can contribute to the mission.</p>
                </div>

                {submitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-in zoom-in duration-300">
                        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">Application Received</h3>
                        <p className="text-green-700">Thanks for your interest! Our team reviews applications on a rolling basis.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                            <input 
                                required
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                type="text" 
                                className="w-full rounded-lg border-slate-300 border px-4 py-3 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. Alex Smith"
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
                                className="w-full rounded-lg border-slate-300 border px-4 py-3 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                                placeholder="alex@example.com"
                            />
                        </div>

                        <div>
                           <label className="block text-sm font-semibold text-slate-700 mb-2">Role Applying For</label>
                           <input 
                                required
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                type="text" 
                                className="w-full rounded-lg border-slate-300 border px-4 py-3 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. Senior Frontend Engineer"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">LinkedIn Profile / Portfolio</label>
                            <input 
                                required
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                type="url" 
                                className="w-full rounded-lg border-slate-300 border px-4 py-3 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                                placeholder="https://linkedin.com/in/alexsmith"
                            />
                        </div>

                        <div>
                           <label className="block text-sm font-semibold text-slate-700 mb-2">Resume / CV</label>
                           <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:bg-slate-50 transition-colors relative">
                              <div className="space-y-1 text-center">
                                 {cvName ? (
                                    <div className="flex flex-col items-center">
                                       <Briefcase className="mx-auto h-12 w-12 text-indigo-500" />
                                       <p className="text-sm text-indigo-600 font-medium mt-2">{cvName}</p>
                                       <p className="text-xs text-slate-500">Click to change</p>
                                    </div>
                                 ) : (
                                    <>
                                       <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                                       <div className="flex text-sm text-slate-600 justify-center">
                                          <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                             <span>Upload a file</span>
                                             <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                          </label>
                                          <p className="pl-1">or drag and drop</p>
                                       </div>
                                       <p className="text-xs text-slate-500">PDF, DOC up to 10MB</p>
                                    </>
                                 )}
                              </div>
                              {/* Overlay input for drag and drop behavior simulation */}
                              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                           </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Why OffsiteFlow? (Optional)</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full rounded-lg border-slate-300 border px-4 py-3 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all resize-none"
                                placeholder="Tell us briefly why you want to join..."
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl mt-4">
                            Submit Application
                        </button>
                    </form>
                )}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-16 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
           <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4 group">
                <div className="h-6 w-6 bg-slate-900 rounded-md flex items-center justify-center text-white text-xs font-bold group-hover:bg-indigo-600 transition-colors">
                  O
                </div>
                <span className="font-bold text-slate-900">OffsiteFlow</span>
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
            © {new Date().getFullYear()} OffsiteFlow Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
             {/* Social icons placeholder */}
          </div>
        </div>
      </footer>
    </div>
  );
};