import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Calendar, GraduationCap } from 'lucide-react';
import SmartImage from '../components/SmartImage';

const Team: React.FC = () => {
  const { team, clinicInfo } = useData();

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">Notre Équipe</h4>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">Des experts passionnés <br/>à votre service</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Chaque membre de notre équipe s'engage à fournir les meilleurs soins avec bienveillance, expertise et professionnalisme.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500 flex flex-col h-full group">
              <div className="h-96 overflow-hidden relative">
                <SmartImage 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-100"></div>
                <div className="absolute bottom-0 left-0 w-full p-8">
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-300 font-medium tracking-wide text-sm uppercase">{member.role}</p>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-slate-600 mb-8 leading-relaxed flex-grow text-lg">
                  {member.bio}
                </p>
                <div className="mt-auto pt-6 border-t border-slate-100 space-y-3">
                    {member.cv && (
                      <Link
                        to={`/team/${member.id}`}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium py-3 rounded-xl transition flex items-center justify-center gap-2"
                      >
                        <GraduationCap size={18} />
                        Voir le parcours
                      </Link>
                    )}
                    <a 
                        href={clinicInfo.tipawLink}
                        target="_blank"
                        rel="noreferrer" 
                        className="w-full bg-slate-50 hover:bg-primary hover:text-white text-slate-900 font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white"
                    >
                        <Calendar size={18} />
                        Prendre rendez-vous
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;