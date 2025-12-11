import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Calendar, ShieldCheck, Activity, Clock } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { ICON_MAP } from '../constants';

const Home: React.FC = () => {
  const { clinicInfo, services, team } = useData();

  const featuredTeam = team.slice(0, 3);

  // Fallbacks in case data is missing
  const heroImage = clinicInfo.heroImage || "https://cdn.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg";
  const heroTitle = clinicInfo.heroTitle || "Médecine vétérinaire d'excellence et de proximité.";
  const heroSubtitle = clinicInfo.heroSubtitle || "Nous allions expertise médicale de pointe et approche humaine pour garantir la meilleure qualité de vie à vos compagnons.";

  return (
    <div className="bg-white">
      {/* Hero Section - Professional & Clean */}
      <section className="relative h-[650px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Veterinary Clinic Environment" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-500/30">
              Depuis 1997 à Chièvres
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light max-w-2xl">
              {heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={clinicInfo.tipawLink}
                target="_blank"
                rel="noreferrer" 
                className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
              >
                <Calendar size={18} />
                Prendre Rendez-vous
              </a>
              <Link 
                to="/services" 
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-bold transition flex items-center justify-center border border-slate-700"
              >
                Nos Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Bar - High Visibility */}
      <div className="bg-primary text-white relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-blue-500">
            <div className="p-6 flex items-center justify-center gap-4 text-center md:text-left">
                <Clock className="opacity-80" size={32} />
                <div>
                    <h3 className="font-bold text-lg">Horaires Étendus</h3>
                    <p className="text-blue-100 text-sm">Lun-Ven 8h-12h, 13h-19h • Sam 9h-12h</p>
                </div>
            </div>
            <div className="p-6 flex items-center justify-center gap-4 text-center md:text-left">
                <ShieldCheck className="opacity-80" size={32} />
                <div>
                    <h3 className="font-bold text-lg">Urgences Assurées</h3>
                    <p className="text-blue-100 text-sm">Service de garde disponible</p>
                </div>
            </div>
            <div className="p-6 flex items-center justify-center gap-4 text-center md:text-left">
                <Activity className="opacity-80" size={32} />
                <div>
                    <h3 className="font-bold text-lg">Plateau Technique</h3>
                    <p className="text-blue-100 text-sm">Radio numérique, Écho, Labo</p>
                </div>
            </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                 <img src="https://cdn.pixabay.com/photo/2018/05/11/08/11/dog-3389729_640.jpg" alt="Consultation" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                 <div className="absolute bottom-8 left-8 text-white">
                    <p className="font-bold text-2xl">Dr. Frédéric Jonckers</p>
                    <p className="opacity-90">Vétérinaire fondateur</p>
                 </div>
             </div>
             {/* Decorative pattern */}
             <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-blue-50 rounded-full"></div>
             <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 bg-slate-50 rounded-full"></div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Notre Philosophie</h4>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Une approche médicale rigoureuse, <br/>une écoute attentive.</h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              La clinique vétérinaire Jonckers-Thoumsin s'engage à offrir à vos animaux les soins les plus adaptés. 
              Notre équipe se forme continuellement aux nouvelles techniques médicales et chirurgicales.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Nous comprenons le lien unique qui vous unit à votre animal. C'est pourquoi nous prenons le temps 
              d'expliquer chaque diagnostic et chaque traitement, dans un langage clair et transparent.
            </p>
            <div className="flex gap-4">
                <div className="flex flex-col">
                    <span className="text-3xl font-bold text-primary">25+</span>
                    <span className="text-sm text-slate-500 font-medium uppercase">Années d'expérience</span>
                </div>
                <div className="w-px bg-slate-200 h-12"></div>
                <div className="flex flex-col">
                    <span className="text-3xl font-bold text-primary">5000+</span>
                    <span className="text-sm text-slate-500 font-medium uppercase">Patients suivis</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Modernized */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nos Domaines d'Expertise</h2>
            <p className="text-slate-600 text-lg">Des services vétérinaires complets pour assurer la santé de vos animaux à chaque étape de leur vie.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
               const Icon = ICON_MAP[service.iconName] || Star;
               return (
                <Link key={service.id} to={`/services/${service.id}`} className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">{service.shortDescription}</p>
                  <span className="text-slate-900 font-semibold text-sm flex items-center group-hover:translate-x-2 transition-transform duration-300">
                    En savoir plus <ArrowRight size={16} className="ml-2 text-primary" />
                  </span>
                </Link>
            )})}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/services" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-blue-50 hover:bg-blue-100 transition">
              Voir tous nos services
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview - Clean Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">L'Équipe Médicale</h4>
              <h2 className="text-3xl font-bold text-slate-900">Vos vétérinaires dévoués</h2>
            </div>
            <Link to="/team" className="hidden md:flex items-center text-slate-600 hover:text-primary font-medium transition group">
              Rencontrer toute l'équipe <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTeam.map((member) => (
              <div key={member.id} className="group relative">
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 mb-4">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                  <p className="text-primary font-medium text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
             <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Confiez-nous la santé de votre animal</h2>
            <p className="text-slate-300 text-lg mb-10">Prenez rendez-vous en ligne via Tipaw ou contactez-nous par téléphone pour toute urgence.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={clinicInfo.tipawLink} target="_blank" rel="noreferrer" className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition shadow-lg">
                    Prendre Rendez-vous
                </a>
                <Link to="/contact" className="border border-slate-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition">
                    Nous contacter
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;