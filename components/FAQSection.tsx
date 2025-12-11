import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const defaultFAQs: FAQ[] = [
  {
    id: '1',
    question: 'Comment prendre rendez-vous ?',
    answer: 'Vous pouvez prendre rendez-vous en appelant le 068 65 74 68 ou via notre plateforme en ligne Tipaw. Les consultations se font uniquement sur rendez-vous.',
    category: 'Rendez-vous'
  },
  {
    id: '2',
    question: 'Quels sont vos tarifs de consultation ?',
    answer: 'Les tarifs varient selon le type de consultation. Une consultation générale coûte 35€. Pour les urgences et interventions spécialisées, contactez-nous pour un devis personnalisé.',
    category: 'Tarifs'
  },
  {
    id: '3',
    question: 'Prenez-vous en charge les NAC ?',
    answer: 'Oui, nous soignons les Nouveaux Animaux de Compagnie : lapins, furets, oiseaux, rongeurs et reptiles. Chaque espèce nécessite des soins spécifiques que nous maîtrisons.',
    category: 'Services'
  },
  {
    id: '4',
    question: 'Comment fonctionne la boutique en ligne ?',
    answer: 'Notre boutique propose des produits vétérinaires et de l\'alimentation. Les produits sur ordonnance nécessitent une validation vétérinaire. Vous pouvez récupérer vos commandes à la clinique ou opter pour la livraison (selon disponibilité).',
    category: 'Boutique'
  },
  {
    id: '5',
    question: 'Que faire en cas d\'urgence ?',
    answer: 'En cas d\'urgence, contactez immédiatement le 068 65 74 68. Un service de garde est assuré 24h/24 pour les urgences vitales. N\'hésitez pas à nous appeler avant de vous déplacer.',
    category: 'Urgences'
  },
  {
    id: '6',
    question: 'À quelle fréquence vacciner mon animal ?',
    answer: 'Généralement une fois par an pour les chiens et chats. Le protocole vaccinal est adapté selon l\'âge, le mode de vie et les risques d\'exposition de votre animal. Nous vous conseillerons lors de la consultation.',
    category: 'Prévention'
  },
  {
    id: '7',
    question: 'Proposez-vous des plans de paiement ?',
    answer: 'Nous acceptons les paiements en espèces, carte bancaire et chèques. Pour les interventions importantes, nous pouvons étudier des facilités de paiement au cas par cas.',
    category: 'Paiement'
  },
  {
    id: '8',
    question: 'Mon animal doit-il être à jeun avant une anesthésie ?',
    answer: 'Oui, pour toute anesthésie générale, une diète alimentaire de 12h est requise (l\'eau reste autorisée jusqu\'à 2h avant). Nous vous donnerons toutes les instructions lors de la prise de rendez-vous.',
    category: 'Chirurgie'
  }
];

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  const categories = ['Tous', ...Array.from(new Set(defaultFAQs.map(faq => faq.category)))];
  
  const filteredFAQs = selectedCategory === 'Tous' 
    ? defaultFAQs 
    : defaultFAQs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="text-primary" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Questions Fréquentes</h2>
          </div>
          <p className="text-gray-600 text-lg">
            Trouvez rapidement les réponses à vos questions les plus courantes
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={200} className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <AnimatedSection 
              key={faq.id} 
              delay={index * 100}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{faq.question}</h3>
                  <span className="text-xs text-primary font-medium bg-blue-50 px-2 py-1 rounded-full">
                    {faq.category}
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {openFAQ === faq.id ? (
                    <ChevronUp className="text-primary" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={20} />
                  )}
                </div>
              </button>
              
              {openFAQ === faq.id && (
                <div className="px-6 pb-5 border-t border-gray-100 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </AnimatedSection>
          ))}
        </div>

        {/* Contact CTA */}
        <AnimatedSection delay={400} className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Vous ne trouvez pas la réponse à votre question ?
            </h3>
            <p className="text-gray-600 mb-6">
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:068657468"
                className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
              >
                Appeler : 068 65 74 68
              </a>
              <a
                href="mailto:info@jonckers-thoumsin.be"
                className="border border-gray-300 hover:border-primary text-gray-700 hover:text-primary px-6 py-3 rounded-lg font-semibold transition"
              >
                Envoyer un email
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQSection;