import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, ShoppingBag, Stethoscope } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Contact: React.FC = () => {
  const { clinicInfo } = useData();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Map Section - Styled Filter */}
      <div className="w-full h-[450px] bg-slate-200 relative grayscale invert-[.1]">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2538.3739726884633!2d3.8040789769363073!3d50.58844897161817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c25a07c2c0453d%3A0xb353592078631021!2sRue%20de%20Cond%C3%A9%204%2C%207950%20Chi%C3%A8vres%2C%20Belgique!5e0!3m2!1sfr!2sbe!4v1709220000000!5m2!1sfr!2sbe" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            title="Clinic Location"
        ></iframe>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10 pb-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Column: Contact Details */}
          <div className="p-10 lg:p-16 bg-slate-900 text-white">
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Nous contacter</h4>
            <h1 className="text-4xl font-bold mb-8">Discutons de vos besoins.</h1>
            
            <div className="space-y-10">
                <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Notre Adresse</h3>
                        <p className="text-slate-400 leading-relaxed">{clinicInfo.address}</p>
                        <p className="text-sm text-slate-500 mt-2">Parking privé disponible à l'arrière.</p>
                    </div>
                </div>

                <div className="flex items-start gap-6">
                     <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                        <Phone size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Téléphone & Urgences</h3>
                        <p className="text-slate-400 mb-2">Consultez nos horaires ci-dessous</p>
                        <a href={`tel:${clinicInfo.phone}`} className="text-2xl font-bold text-white hover:text-primary transition">{clinicInfo.phone}</a>
                    </div>
                </div>

                <div className="flex items-start gap-6">
                     <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Email</h3>
                        <p className="text-slate-400 mb-2">Pour les demandes non urgentes</p>
                        <a href={`mailto:${clinicInfo.email}`} className="text-white hover:text-primary transition">{clinicInfo.email}</a>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-10 border-t border-slate-800">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Clock size={20}/> Nos Horaires</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold text-sm mb-4 flex items-center gap-2 text-primary uppercase tracking-wide">
                            <ShoppingBag size={16}/> Magasin / Accueil
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                            {clinicInfo.hours.map((h, i) => (
                                <div key={i} className="flex flex-col sm:flex-row justify-between text-slate-400 text-sm">
                                    <span className="font-medium text-slate-300">{h.day}</span>
                                    <span>{h.hours}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                         <h4 className="font-bold text-sm mb-4 flex items-center gap-2 text-primary uppercase tracking-wide">
                            <Stethoscope size={16}/> Consultations (RDV)
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                            {clinicInfo.consultationHours?.map((h, i) => (
                                <div key={i} className="flex flex-col sm:flex-row justify-between text-slate-400 text-sm">
                                    <span className="font-medium text-slate-300">{h.day}</span>
                                    <span>{h.hours}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="p-10 lg:p-16 bg-white">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Envoyez un message</h3>
            <p className="text-slate-500 mb-8">Nous nous efforçons de répondre à toutes les demandes sous 24h ouvrables.</p>
            
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Nom complet</label>
                        <input type="text" className="w-full rounded-lg bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition p-3" placeholder="Votre nom" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                        <input type="email" className="w-full rounded-lg bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition p-3" placeholder="votre@email.com" />
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Sujet</label>
                    <select className="w-full rounded-lg bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition p-3">
                        <option>Renseignement général</option>
                        <option>Demande de stage/emploi</option>
                        <option>Question post-opératoire</option>
                        <option>Autre demande</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                    <textarea rows={5} className="w-full rounded-lg bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition p-3" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                </div>

                <button type="button" className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-lg transition shadow-lg flex items-center justify-center gap-2">
                    Envoyer le message <ArrowRight size={18} />
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;