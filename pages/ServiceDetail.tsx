import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { ChevronRight, Plus, Minus, Phone } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services, clinicInfo } = useData();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // If no slug is provided or found, default to first service or redirect
  const service = services.find(s => s.id === slug);

  if (!service && !slug && services.length > 0) {
      return <Navigate to={`/services/${services[0].id}`} replace />;
  }

  if (!service) {
    return (
        <div className="py-20 text-center">
            <h2 className="text-2xl font-bold mb-4">Service non trouvé</h2>
            <Link to="/services" className="text-primary hover:underline">Retour aux services</Link>
        </div>
    );
  }

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center text-sm text-slate-500">
            <Link to="/" className="hover:text-primary transition">Accueil</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to="/services" className="hover:text-primary transition">Services</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-slate-900 font-medium">{service.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 sticky top-28">
                <h3 className="text-lg font-bold mb-6 text-slate-900">Expertises</h3>
                <nav className="space-y-2">
                    {services.map((s) => (
                        <Link 
                            key={s.id} 
                            to={`/services/${s.id}`}
                            className={`block px-4 py-3 rounded-lg transition flex items-center justify-between text-sm font-medium ${s.id === service.id ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-white hover:text-primary'}`}
                        >
                            <span>{s.title}</span>
                            {s.id === service.id && <ChevronRight size={16} />}
                        </Link>
                    ))}
                </nav>

                <div className="mt-8 bg-slate-900 text-white p-6 rounded-xl text-center">
                    <h4 className="font-bold text-lg mb-2">Une question ?</h4>
                    <p className="text-slate-400 text-sm mb-6">Nos vétérinaires sont à votre écoute pour conseiller.</p>
                    <a href={clinicInfo.tipawLink} target="_blank" rel="noreferrer" className="block w-full bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-slate-100 transition text-sm">
                        Prendre RDV
                    </a>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400 font-medium">
                        <Phone size={14} /> {clinicInfo.phone}
                    </div>
                </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 order-1 lg:order-2">
             <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">{service.title}</h1>
             
             <div className="bg-white rounded-2xl overflow-hidden mb-10 shadow-lg">
                <div className="h-64 md:h-96 w-full bg-slate-100 relative">
                    {/* Updated image to show veterinarian hands as requested */}
                    <img src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=2000" alt="Vétérinaire examinant un animal" className="w-full h-full object-cover" />
                </div>
             </div>

             <div className="prose prose-lg max-w-none text-slate-600">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">À propos de ce service</h2>
                <p className="mb-8 leading-relaxed">
                    {service.fullDescription}
                </p>

                <h3 className="text-xl font-bold text-slate-900 mb-6">Nos prestations incluses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 not-prose">
                    {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                            <span className="text-slate-700 font-medium">{feature}</span>
                        </div>
                    ))}
                </div>
             </div>

             {/* FAQ Accordion */}
             {service.faqs.length > 0 && (
                <div className="mt-12 pt-12 border-t border-slate-100">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">Questions Fréquentes</h3>
                    <div className="space-y-4">
                        {service.faqs.map((faq, index) => (
                            <div key={index} className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-slate-300 transition">
                                <button 
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-5 bg-white text-left transition"
                                >
                                    <span className="font-semibold text-slate-900">{faq.question}</span>
                                    {openFaq === index ? <Minus size={20} className="text-primary" /> : <Plus size={20} className="text-slate-400" />}
                                </button>
                                {openFaq === index && (
                                    <div className="p-5 pt-0 text-slate-600 leading-relaxed bg-white">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;