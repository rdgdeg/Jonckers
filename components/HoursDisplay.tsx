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
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Clock className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Nos Horaires</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Horaires d'ouverture */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-blue-100">
              <Calendar size={18} className="text-blue-600" />
              <h4 className="font-bold text-gray-900 text-lg">Magasin / Accueil</h4>
            </div>
            <div className="space-y-2">
              {clinicInfo.hours.map((h, i) => (
                <div key={i} className="flex justify-between items-center py-2 px-4 hover:bg-blue-50 rounded-lg transition-colors">
                  <span className="font-medium text-gray-700 min-w-[100px]">{h.day}</span>
                  <span className={`font-semibold text-right ${h.hours === 'Fermé' ? 'text-red-600' : 'text-gray-900'}`}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Horaires de consultation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-green-100">
              <Calendar size={18} className="text-green-600" />
              <h4 className="font-bold text-gray-900 text-lg">Consultations (RDV)</h4>
            </div>
            <div className="space-y-2">
              {clinicInfo.consultationHours.map((h, i) => (
                <div key={i} className="flex justify-between items-center py-2 px-4 hover:bg-green-50 rounded-lg transition-colors">
                  <span className="font-medium text-gray-700 min-w-[100px]">{h.day}</span>
                  <span className={`font-semibold text-right ${h.hours === 'Fermé' ? 'text-red-600' : 'text-gray-900'}`}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-100">
          <p className="text-sm text-gray-800 leading-relaxed">
            <strong className="text-blue-700">Important :</strong> Les consultations se font uniquement sur rendez-vous. 
            Pour les urgences en dehors des heures d'ouverture, appelez le <strong className="text-gray-900">{clinicInfo.phone}</strong>.
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
      <div className="space-y-2 text-sm">
        {clinicInfo.hours.map((h, i) => (
          <div key={i} className="flex justify-between items-center py-1">
            <span className="text-slate-300 min-w-0 flex-shrink-0">{h.day}</span>
            <span className={`font-medium text-right ml-4 ${h.hours === 'Fermé' ? 'text-red-400' : 'text-white'}`}>
              {h.hours}
            </span>
          </div>
        ))}
      </div>
      
      {showConsultations && (
        <div className="mt-6 pt-4 border-t border-slate-700">
          <h5 className="text-slate-300 font-medium mb-3 text-xs uppercase tracking-wide">Consultations sur RDV</h5>
          <div className="space-y-1 text-xs">
            {clinicInfo.consultationHours.slice(0, 5).map((h, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-slate-400 min-w-0 flex-shrink-0">{h.day}</span>
                <span className="text-slate-200 text-right ml-4">{h.hours}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HoursDisplay;