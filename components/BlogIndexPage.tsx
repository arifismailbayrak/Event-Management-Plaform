import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, Check } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export const BlogIndexPage: React.FC = () => {
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
    }
  };

  const featuredPost = BLOG_POSTS[0];
  const remainingPosts = BLOG_POSTS.slice(1);

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
      <header className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-slate-900">The OffsiteFlow Journal</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
          Insights, guides, and blueprints for the modern office manager.
        </p>
      </header>

      {/* Featured Post */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <Link to={`/blog/${featuredPost.slug}`} className="group block relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto overflow-hidden">
               <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10"></div>
               <img src={featuredPost.imageUrl} alt={featuredPost.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
               <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{featuredPost.category}</span>
                  <span className="text-xs text-slate-400 font-medium">{featuredPost.readTime}</span>
               </div>
               <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">{featuredPost.title}</h2>
               <p className="text-slate-600 mb-8 leading-relaxed text-lg">{featuredPost.excerpt}</p>
               
               <div className="flex items-center gap-3 mt-auto">
                  <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-10 h-10 rounded-full border border-slate-100" />
                  <div>
                    <div className="text-sm font-bold text-slate-900">{featuredPost.author.name}</div>
                    <div className="text-xs text-slate-500">{featuredPost.author.role} • {featuredPost.date}</div>
                  </div>
               </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Post Grid */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
         <div className="grid md:grid-cols-3 gap-8">
            {remainingPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                 <div className="h-48 overflow-hidden relative">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                 </div>
                 <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                       <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">{post.category}</span>
                       <span className="text-[10px] text-slate-400">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                    <p className="text-sm text-slate-600 mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    
                    <div className="mt-auto flex items-center gap-2 pt-4 border-t border-slate-100">
                       <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full" />
                       <span className="text-xs font-medium text-slate-500">{post.author.name}</span>
                       <span className="text-xs text-slate-300">•</span>
                       <span className="text-xs text-slate-400">{post.date}</span>
                    </div>
                 </div>
              </Link>
            ))}
            
            {/* Newsletter Box (Full Row) */}
            <div className="bg-indigo-600 rounded-xl p-8 flex flex-col justify-center text-white text-center md:col-span-3">
               <Mail size={32} className="mx-auto mb-4 text-indigo-200" />
               <h3 className="text-xl font-bold mb-2">Get the weekly dispatch</h3>
               <p className="text-indigo-200 text-sm mb-6 max-w-md mx-auto">Join 5,000+ office managers leveling up their events with tips delivered to their inbox.</p>
               
               {subscribed ? (
                  <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center gap-2 text-sm font-medium animate-in fade-in max-w-md mx-auto w-full">
                     <Check size={16} /> Subscribed!
                  </div>
               ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto w-full">
                     <input 
                       type="email" 
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="you@company.com" 
                       required
                       className="flex-1 px-4 py-2 rounded-lg bg-indigo-700/50 border border-indigo-500 placeholder:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                     />
                     <button type="submit" className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-lg hover:bg-indigo-50 transition-colors text-sm">
                        Subscribe
                     </button>
                  </form>
               )}
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200 px-6 text-center">
         <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">O</div>
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} OffsiteFlow Inc.</p>
         </div>
      </footer>
    </div>
  );
};