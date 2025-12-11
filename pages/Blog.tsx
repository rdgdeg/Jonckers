import React from 'react';
import { useData } from '../contexts/DataContext';
import { ArrowRight, Search } from 'lucide-react';

const Blog: React.FC = () => {
  const { blogPosts } = useData();

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Conseils & Actualités</h1>
            <p className="text-slate-600 text-lg mb-10">
                L'actualité de la clinique et nos conseils vétérinaires pour le bien-être de vos compagnons.
            </p>
            <div className="relative max-w-lg mx-auto">
                <input 
                    type="text" 
                    placeholder="Rechercher un article..." 
                    className="w-full pl-12 pr-6 py-4 rounded-full border-slate-200 bg-slate-50 focus:bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
                <Search className="absolute left-5 top-4 text-slate-400" size={20} />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post) => (
             <article key={post.id} className="flex flex-col group h-full">
                <div className="rounded-2xl overflow-hidden mb-6 h-64 shadow-sm relative">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-4 left-4">
                     <span className="bg-white/90 backdrop-blur text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        {post.category}
                     </span>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="text-sm text-slate-400 mb-3 font-medium">Publié le {post.date}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition leading-tight">{post.title}</h3>
                  <p className="text-slate-500 mb-6 flex-grow leading-relaxed">{post.excerpt}</p>
                  <a href="#" className="text-slate-900 font-bold hover:text-primary transition inline-flex items-center mt-auto group-hover:translate-x-2 duration-300">
                    Lire l'article <ArrowRight size={18} className="ml-2" />
                  </a>
                </div>
             </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;