import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, Check } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundPost = BLOG_POSTS.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
           <h2 className="text-2xl font-bold text-slate-900 mb-2">Post not found</h2>
           <Link to="/blog" className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center justify-center gap-1">
             <ArrowLeft size={16} /> Back to Blog
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">O</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">OffsiteFlow</span>
          </Link>
          <Link to="/blog" className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
            <ArrowLeft size={16} /> Back to Journal
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto pt-32 pb-24 px-6 grid md:grid-cols-[1fr_768px_1fr] gap-12">
         {/* Left Sidebar (TOC placeholder or Empty) */}
         <div className="hidden md:block">
            <div className="sticky top-32">
               <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-600 transition-colors mb-8">
                  <ArrowLeft size={14} /> Back
               </Link>
            </div>
         </div>

         {/* Main Content */}
         <article>
            <div className="mb-8 text-center">
               <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wide mb-6">
                  {post.category}
               </span>
               <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                  {post.title}
               </h1>
               <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                     <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
                     <span className="font-bold text-slate-900">{post.author.name}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">{post.date}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">{post.readTime}</span>
               </div>
            </div>

            <div className="rounded-2xl overflow-hidden mb-12 shadow-lg">
               <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover" />
            </div>

            {/* Typography Content */}
            <div 
               className="prose prose-lg prose-indigo mx-auto text-slate-600 leading-relaxed 
                          [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:mt-12 [&>h2]:mb-6
                          [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2
                          [&>strong]:text-slate-900 [&>strong]:font-bold"
               dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Bio Box */}
            <div className="mt-16 p-8 bg-slate-50 rounded-2xl flex items-center gap-6 border border-slate-100">
               <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />
               <div>
                  <h3 className="font-bold text-slate-900 text-lg">Written by {post.author.name}</h3>
                  <p className="text-slate-500 text-sm">{post.author.role} at OffsiteFlow. Obsessed with making work not suck.</p>
               </div>
            </div>
