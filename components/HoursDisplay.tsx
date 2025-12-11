import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface HoursDisplayProps {
  variant?: 'footer' | 'page' | 'compact';
  showConsultations?: boolean;
}

const HoursDisplay: React.FC<HoursDisplayProps> = ({ 
  variant = 'footer', 
  showConsultations = false 
}) => {
  const { clinicInfo } = useData();

  if (variant === 'page') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Clock className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Nos Horaires</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Horaires d'ouverture */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={18} className="text-blue-600" />
              <h4 className="font-semibold text-gray-900">Magasin / Accueil</h4>
            </div>
            <div className="space-y-3">
              {clinicInfo.hours.map((h, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">{h.day}</span>
                  <span className={`font-semibold ${h.hours === 'Fermé' ? 'text-red-600' : 'text-gray-900'}`}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Horaires de consultation */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={18} className="text-green-600" />
              <h4 className="font-semibold text-gray-900">Consultations (RDV)</h4>
            </div>
            <div className="space-y-3">
              {clinicInfo.consultationHours.map((h, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-gray-700">{h.day}</span>
                  <span className={`font-semibold ${h.hours === 'Fermé' ? 'text-red-600' : 'text-gray-900'}`}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Important :</strong> Les consultations se font uniquement sur rendez-vous. 
            Pour les urgences en dehors des heures d'ouverture, appelez le {clinicInfo.phone}.
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={16} className="text-blue-600" />
          <h4 className="font-semibold text-gray-900 text-sm">Horaires</h4>
        </div>
        <div className="space-y-2 text-sm">
          {clinicInfo.hours.slice(0, 5).map((h, i) => (
            <div key={i} className="flex justify-between">
              <span className="text-gray-600">{h.day}</span>
              <span className="font-medium text-gray-900">{h.hours}</span>
            </div>
          ))}
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="text-gray-600">Samedi</span>
            <span className="font-medium text-gray-900">09:00 - 12:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Dimanche</span>
            <span className="font-medium text-red-600">Fermé</span>
          </div>
        </div>
      </div>
    );
  }

  // Footer variant (default)
  return (
    <div>
      <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Horaires d'ouverture</h4>
      <div className="space-y-3 text-sm">
        {clinicInfo.hours.map((h, i) => (
          <div key={i} className="flex justify-between items-center pb-2 border-b border-slate-800 last:border-0">
            <span className="text-slate-300">{h.day}</span>
            <span className={`font-medium ${h.hours === 'Fermé' ? 'text-red-400' : 'text-white'}`}>
              {h.hours}
            </span>
          </div>
        ))}
      </div>
      
      {showConsultations && (
        <div className="mt-6 pt-4 border-t border-slate-700">
          <h5 className="text-slate-300 font-medium mb-3 text-xs uppercase tracking-wide">Consultations sur RDV</h5>
          <div className="space-y-2 text-xs">
            {clinicInfo.consultationHours.slice(0, 5).map((h, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-slate-400">{h.day}</span>
                <span className="text-slate-200">{h.hours}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HoursDisplay;