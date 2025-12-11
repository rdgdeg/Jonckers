import React from 'react';
import { useData } from '../contexts/DataContext';
import { Clock, MapPin, Phone, Mail, Calendar, AlertCircle, Car, CreditCard } from 'lucide-react';
import HoursDisplay from '../components/HoursDisplay';

const PracticalInfo: React.FC = () => {
  const { clinicInfo } = useData();

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Informations Pratiques</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tout ce que vous devez savoir pour votre visite à la clinique vétérinaire Jonckers-Thoumsin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Horaires */}
          <HoursDisplay variant="page" />

          {/* Contact et localisation */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MapPin className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Contact & Localisation</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-gray-400 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Adresse</h4>
                  <p className="text-gray-600">{clinicInfo.address}</p>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(clinicInfo.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Voir sur Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-gray-400 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Téléphone</h4>
                  <a 
                    href={`tel:${clinicInfo.phone}`}
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    {clinicInfo.phone}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Urgences 24h/24</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-gray-400 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a 
                    href={`mailto:${clinicInfo.email}`}
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    {clinicInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="text-gray-400 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Rendez-vous en ligne</h4>
                  <a 
                    href={clinicInfo.tipawLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                  >
                    <Calendar size={16} />
                    Prendre RDV sur Tipaw
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Parking */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Car className="text-blue-600" size={24} />
              <h3 className="font-semibold text-gray-900">Parking</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Parking gratuit disponible devant la clinique. 
              Places réservées pour les clients avec animaux.
            </p>
          </div>

          {/* Paiements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="text-green-600" size={24} />
              <h3 className="font-semibold text-gray-900">Moyens de paiement</h3>
            </div>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Espèces</li>
              <li>• Carte bancaire</li>
              <li>• Virement</li>
              <li>• Chèque</li>
            </ul>
          </div>

          {/* Urgences */}
          <div className="bg-red-50 rounded-xl border border-red-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-red-600" size={24} />
              <h3 className="font-semibold text-red-900">Urgences</h3>
            </div>
            <p className="text-red-800 text-sm mb-3">
              En cas d'urgence vitale, appelez immédiatement :
            </p>
            <a 
              href={`tel:${clinicInfo.phone}`}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-bold"
            >
              <Phone size={16} />
              {clinicInfo.phone}
            </a>
          </div>
        </div>

        {/* Conseils pratiques */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Conseils pour votre visite</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Première visite</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Apportez le carnet de vaccination</li>
                <li>• Munissez-vous de la carte d'identité de l'animal</li>
                <li>• Préparez la liste des questions à poser</li>
                <li>• Arrivez 10 minutes avant le rendez-vous</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Préparation chirurgie</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Diète de 12h avant l'intervention</li>
                <li>• L'eau reste autorisée jusqu'à 2h avant</li>
                <li>• Prévoir la récupération en fin de journée</li>
                <li>• Suivre les instructions post-opératoires</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticalInfo;