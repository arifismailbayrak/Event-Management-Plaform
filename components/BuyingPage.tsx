import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Lock, ShieldCheck, CreditCard, CheckCircle2, Loader2, Zap } from 'lucide-react';

export const BuyingPage: React.FC = () => {
  const { planId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const cycle = searchParams.get('cycle') || 'MONTHLY';
  
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      company: '',
      cardNumber: '',
      expiry: '',
      cvc: ''
  });

  useEffect(() => {
    // If starter plan, just redirect to login/create
    if (planId === 'starter') {
        navigate('/create');
    }
  }, [planId, navigate]);

  const planDetails = {
      name: planId === 'pro' ? 'Pro Workspace' : 'Enterprise Deposit',
      price: planId === 'pro' ? (cycle === 'YEARLY' ? 99 : 119) : 500,
      period: planId === 'pro' ? (cycle === 'YEARLY' ? '/mo (billed yearly)' : '/mo') : ' deposit',
      total: planId === 'pro' ? (cycle === 'YEARLY' ? 99 * 12 : 119) : 500
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handlePayment = (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
          setLoading(false);
          setStep(3);
          // Auto redirect after success
          setTimeout(() => {
            navigate('/create'); // Redirect to app start
          }, 3000);
      }, 2000);
  };

  if (step === 3) {
      return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-in zoom-in duration-300">
                 <CheckCircle2 size={40} />
             </div>
             <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
             <p className="text-slate-500 mb-8">Welcome to OffsiteFlow Pro. Redirecting you to your workspace...</p>
             <Loader2 className="animate-spin text-indigo-600" />
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
       
       {/* Left Side: Summary & Trust */}
       <div className="w-full md:w-1/3 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-indigo-500 rounded-full blur-3xl"></div>
           </div>

           <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8">
                     <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">O</div>
                     <span className="font-bold text-xl tracking-tight">OffsiteFlow</span>
                </div>

                <div className="mb-8">
                    <p className="text-indigo-300 text-sm font-semibold uppercase tracking-wider mb-2">Order Summary</p>
                    <h2 className="text-3xl font-bold mb-1">{planDetails.name}</h2>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-medium opacity-90">${planDetails.price}</span>
                        <span className="text-sm text-slate-400">{planDetails.period}</span>
                    </div>
                </div>

                <div className="border-t border-slate-700 pt-6 space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Subtotal</span>
                        <span>${planDetails.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Tax (0%)</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold border-t border-slate-700 pt-4">
                        <span>Total Due</span>
                        <span>${planDetails.total.toFixed(2)}</span>
                    </div>
                </div>
           </div>

           <div className="mt-12 relative z-10">
               <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                   <ShieldCheck size={16} className="text-green-400" />
                   <span>Secured by Stripe. 256-bit encryption.</span>
               </div>
           </div>
       </div>

       {/* Right Side: Form */}
       <div className="w-full md:w-2/3 bg-white p-6 md:p-12 overflow-y-auto">
            <div className="max-w-xl mx-auto">
                <button onClick={() => navigate('/pricing')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Pricing
                </button>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">Checkout</h2>

                <form onSubmit={handlePayment} className="space-y-6">
                    
                    {/* Section 1: Billing Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">Billing Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                                <input 
                                    required
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    type="text" 
                                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="Jane Doe" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name</label>
                                <input 
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    type="text" 
                                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="Acme Inc." 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                            <input 
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email" 
                                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="jane@company.com" 
                            />
                        </div>
                    </div>

                    {/* Section 2: Payment Details */}
                    <div className="space-y-4 pt-4">
                         <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 flex items-center justify-between">
                            Payment Details
                            <div className="flex gap-2">
                                <div className="h-5 w-8 bg-slate-100 rounded border border-slate-200"></div>
                                <div className="h-5 w-8 bg-slate-100 rounded border border-slate-200"></div>
                            </div>
                         </h3>
                         
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Card Number</label>
                            <div className="relative">
                                <input 
                                    required
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    type="text" 
                                    className="w-full p-2.5 pl-10 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono"
                                    placeholder="0000 0000 0000 0000" 
                                />
                                <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Expiration</label>
                                <input 
                                    required
                                    name="expiry"
                                    value={formData.expiry}
                                    onChange={handleChange}
                                    type="text" 
                                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono"
                                    placeholder="MM/YY" 
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">CVC</label>
                                <div className="relative">
                                    <input 
                                        required
                                        name="cvc"
                                        value={formData.cvc}
                                        onChange={handleChange}
                                        type="text" 
                                        className="w-full p-2.5 pl-10 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono"
                                        placeholder="123" 
                                    />
                                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 mt-8 disabled:opacity-70 disabled:cursor-wait"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (
                            <>
                                <Zap size={18} className="fill-white" /> Pay ${planDetails.total.toFixed(2)}
                            </>
                        )}
                    </button>
                    
                    <p className="text-center text-xs text-slate-400 mt-4">
                        By clicking pay, you agree to our Terms of Service. Your subscription will renew automatically.
                    </p>

                </form>
            </div>
       </div>
    </div>
  );
};