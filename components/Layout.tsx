import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Facebook, Lock, Clock, Search } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import HoursDisplay from './HoursDisplay';
import SearchModal from './SearchModal';
import ChatWidget from './ChatWidget';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { clinicInfo } = useData();

  const isActive = (path: string) => location.pathname === path ? "text-primary font-semibold" : "text-slate-600 hover:text-primary font-medium";
  const isAdmin = location.pathname.startsWith('/admin');

  // If in Admin panel, render simple layout
  if (isAdmin) {
      return <div>{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-white">
      {/* Top Bar - Clean & Professional */}
      <div className="bg-slate-900 text-slate-200 py-2.5 px-4 text-xs tracking-wide hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center gap-2 hover:text-white transition cursor-default"><Phone size={13} /> {clinicInfo.phone}</span>
            <span className="flex items-center gap-2 hover:text-white transition cursor-default"><MapPin size={13} /> {clinicInfo.address}</span>
            <span className="flex items-center gap-2 text-emerald-400 font-medium"><Clock size={13} /> Ouvert aujourd'hui</span>
          </div>
          <div className="flex space-x-4 items-center">
            <span className="opacity-50">|</span>
            <a href="https://www.facebook.com/profile.php?id=100071739754034" target="_blank" rel="noreferrer" className="hover:text-white transition">Facebook</a>
          </div>
        </div>
      </div>

      {/* Navigation - Glassmorphism effect */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col group">
              <span className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors">{clinicInfo.name}</span>
              <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">Clinique Vétérinaire</span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 items-center text-sm">
              <Link to="/" className={isActive("/")}>Accueil</Link>
              <Link to="/services" className={isActive("/services")}>Expertise</Link>
              <Link to="/team" className={isActive("/team")}>L'Équipe</Link>
              <Link to="/blog" className={isActive("/blog")}>Conseils</Link>
              <Link to="/contact" className={isActive("/contact")}>Contact</Link>
              <Link to="/horaires" className={isActive("/horaires")}>Horaires</Link>
              
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-600 hover:text-primary transition"
                title="Rechercher"
              >
                <Search size={20} />
              </button>
              
              <a 
                href={clinicInfo.tipawLink} 
                target="_blank" 
                rel="noreferrer"
                className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-md shadow-blue-200/50 flex items-center gap-2"
              >
                Prendre RDV
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
                {/* Mobile Search Button */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-slate-600 hover:text-primary transition"
                >
                  <Search size={20} />
                </button>
                
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800 p-2 hover:bg-slate-50 rounded-lg transition">
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-4 py-6 space-y-2 flex flex-col">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-primary hover:bg-blue-50 transition">Accueil</Link>
              <Link to="/services" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-primary hover:bg-blue-50 transition">Expertise & Soins</Link>
              <Link to="/team" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-primary hover:bg-blue-50 transition">Notre Équipe</Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-primary hover:bg-blue-50 transition">Conseils</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-primary hover:bg-blue-50 transition">Contact</Link>
              <Link to="/horaires" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-primary hover:bg-blue-50 transition">Horaires</Link>
              <a 
                href={clinicInfo.tipawLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block w-full text-center bg-primary text-white px-5 py-3 rounded-lg font-bold shadow-lg"
              >
                Prendre RDV en ligne
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Chat Widget */}
      <ChatWidget />

      {/* Footer - Minimalist & Professional */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
             <h3 className="text-white text-lg font-bold mb-6 tracking-wide">{clinicInfo.name}</h3>
             <p className="text-sm leading-7 mb-6 text-slate-400">
               Excellence médicale et approche humaine. Nous accompagnons vos compagnons avec les technologies les plus récentes au cœur de Chièvres.
             </p>
             <div className="flex space-x-5">
               <a href="https://www.facebook.com/profile.php?id=100071739754034" target="_blank" rel="noreferrer">
                  <Facebook className="hover:text-white cursor-pointer transition w-5 h-5" />
               </a>
             </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-white transition flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Nos Services</Link></li>
              <li><Link to="/team" className="hover:text-white transition flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> L'Équipe</Link></li>
              <li><Link to="/blog" className="hover:text-white transition flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Actualités</Link></li>
              <li><Link to="/contact" className="hover:text-white transition flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
             <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Coordonnées</h4>
             <ul className="space-y-4 text-sm">
               <li className="flex items-start gap-3">
                 <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                 <span>{clinicInfo.address}</span>
               </li>
               <li className="flex items-center gap-3">
                 <Phone size={18} className="text-primary flex-shrink-0" />
                 <span className="font-medium text-white">{clinicInfo.phone}</span>
               </li>
               <li className="flex items-center gap-3 bg-red-500/10 p-2 rounded text-red-400 border border-red-900/50">
                 <span className="text-xs font-bold uppercase">Urgences:</span>
                 <span className="font-bold">{clinicInfo.phone}</span>
               </li>
             </ul>
          </div>

          {/* Hours */}
          <HoursDisplay variant="footer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <span>© {new Date().getFullYear()} Cabinet Vétérinaire Jonckers-Thoumsin. Tous droits réservés.</span>
              <span className="hidden md:inline text-slate-700">|</span>
              <a href="https://ldmedia.be" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition">
                Site web : LD Media - Agence de communication
              </a>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/legal" className="hover:text-slate-400">Mentions Légales</Link>
            <Link to="/privacy" className="hover:text-slate-400">Politique de Confidentialité</Link>
            <Link to="/admin" className="hover:text-white flex items-center gap-1 bg-slate-800 px-3 py-1 rounded transition"><Lock size={10}/> Accès Pro</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;