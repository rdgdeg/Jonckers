import React, { useState, useEffect } from 'react';
import { Users, Heart, Award, Clock } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import AnimatedSection from './AnimatedSection';

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
  description: string;
}

const LiveStats: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calcul dynamique basé sur l'heure pour simuler l'activité
  const getPatientsTodayCount = () => {
    const hour = currentTime.getHours();
    const baseCount = 12;
    const hourlyIncrease = Math.floor(hour / 2);
    return baseCount + hourlyIncrease;
  };

  const stats: Stat[] = [
    {
      icon: <Users className="w-8 h-8" />,
      value: getPatientsTodayCount(),
      suffix: '',
      label: 'Patients aujourd\'hui',
      color: 'text-blue-600',
      description: 'Consultations et soins'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      value: 5247,
      suffix: '+',
      label: 'Animaux soignés',
      color: 'text-red-500',
      description: 'Depuis notre ouverture'
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: 27,
      suffix: '',
      label: 'Années d\'expérience',
      color: 'text-yellow-600',
      description: 'Au service de vos compagnons'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: 98,
      suffix: '%',
      label: 'Satisfaction client',
      color: 'text-green-600',
      description: 'Basé sur nos enquêtes'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Notre Impact en Chiffres
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Des statistiques qui témoignent de notre engagement quotidien pour la santé de vos animaux
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection 
              key={index} 
              delay={index * 150}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className={`${stat.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                
                <div className="mb-2">
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix}
                    className="text-4xl font-bold text-white"
                  />
                </div>
                
                <h3 className="text-white font-semibold text-lg mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-blue-100 text-sm">
                  {stat.description}
                </p>

                {/* Live indicator for today's patients */}
                {index === 0 && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-xs font-medium">En temps réel</span>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Current Time Display */}
        <AnimatedSection delay={600} className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 inline-block">
            <p className="text-blue-100 text-sm mb-2">Actuellement</p>
            <p className="text-white text-2xl font-bold">
              {currentTime.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </p>
            <p className="text-blue-200 text-sm mt-1">
              {currentTime.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LiveStats;