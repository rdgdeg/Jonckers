import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { ChevronRight, Calendar, Award, GraduationCap, Briefcase, Star, Phone, Mail } from 'lucide-react';
import SmartImage from '../components/SmartImage';

const TeamMemberDetail: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const { team, clinicInfo } = useData();

  const member = team.find(m => m.id === memberId);

  if (!member) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Membre de l'équipe non trouvé</h2>
        <Link to="/team" className="text-primary hover:underline">Retour à l'équipe</Link>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center text-sm text-slate-500">
          <Link to="/" className="hover:text-primary transition">Accueil</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/team" className="hover:text-primary transition">Équipe</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-slate-900 font-medium">{member.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
              <div className="aspect-[4/5] overflow-hidden">
                <SmartImage
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">{member.name}</h1>
                <p className="text-primary font-semibold mb-4">{member.role}</p>
                <p className="text-slate-600 mb-6 leading-relaxed">{member.bio}</p>
                
                <div className="space-y-3">
                  <a
                    href={clinicInfo.tipawLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    Prendre rendez-vous
                  </a>
                  <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Phone size={16} />
                      <span>{clinicInfo.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CV Section */}
          <div className="lg:col-span-2">
            {member.cv ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Parcours professionnel</h2>
                </div>

                {/* Formation */}
                <div className="bg-slate-50 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <GraduationCap className="text-blue-600" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Formation</h3>
                  </div>
                  <div className="space-y-4">
                    {member.cv.education.map((edu, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-700 leading-relaxed">{edu}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expérience */}
                <div className="bg-white border border-slate-100 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Briefcase className="text-green-600" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Expérience professionnelle</h3>
                  </div>
                  <div className="space-y-4">
                    {member.cv.experience.map((exp, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-700 leading-relaxed">{exp}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spécialisations */}
                <div className="bg-primary/5 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Star className="text-primary" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Domaines d'expertise</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {member.cv.specializations.map((spec, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-slate-700 font-medium">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                {member.cv.certifications && member.cv.certifications.length > 0 && (
                  <div className="bg-orange-50 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Award className="text-orange-600" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Certifications et formations continues</h3>
                    </div>
                    <div className="space-y-4">
                      {member.cv.certifications.map((cert, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-slate-700 leading-relaxed">{cert}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500">Informations de parcours à venir...</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Consulter avec {member.name.includes('Dr.') ? member.name : `Dr. ${member.name.split(' ').slice(-1)[0]}`}
          </h3>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Bénéficiez de l'expertise et de l'expérience de notre équipe pour la santé de votre compagnon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={clinicInfo.tipawLink}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition"
            >
              Prendre rendez-vous en ligne
            </a>
            <a
              href={`tel:${clinicInfo.phone}`}
              className="border border-slate-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition"
            >
              Appeler la clinique
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetail;