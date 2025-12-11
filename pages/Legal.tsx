import React from 'react';
import { useData } from '../contexts/DataContext';

const Legal: React.FC = () => {
  const { clinicInfo } = useData();

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-12">Mentions Légales</h1>

        <div className="space-y-12 prose prose-slate max-w-none">
          
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Éditeur du site</h2>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <p className="font-bold text-lg mb-2">{clinicInfo.name}</p>
                <p className="text-slate-600 mb-1">Cabinet Vétérinaire</p>
                <p className="text-slate-600 mb-1">{clinicInfo.address}</p>
                <p className="text-slate-600 mb-1">Belgique</p>
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="mb-1"><span className="font-semibold">Téléphone :</span> {clinicInfo.phone}</p>
                    <p className="mb-1"><span className="font-semibold">Email :</span> {clinicInfo.email}</p>
                    <p className="mt-4 text-primary font-bold"><span className="text-slate-900 font-semibold">Numéro d'entreprise (TVA) :</span> BE0473.061.278</p>
                </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Ordre des Vétérinaires</h2>
            <p className="text-slate-600 leading-relaxed">
              Les vétérinaires de ce cabinet sont inscrits au Tableau de l'Ordre des Médecins Vétérinaires de Belgique.
              Ils sont soumis au Code de déontologie vétérinaire.
            </p>
            <p className="mt-2 text-slate-600">
                <a href="https://www.ordredesveterinaires.be" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                    Site de l'Ordre des Vétérinaires
                </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Propriété intellectuelle</h2>
            <p className="text-slate-600 leading-relaxed">
              L'ensemble de ce site relève de la législation belge et internationale sur le droit d'auteur et la propriété intellectuelle. 
              Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Protection des données (RGPD)</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Les informations recueillies via le formulaire de contact ou lors de la prise de rendez-vous sont enregistrées dans un fichier informatisé par 
              <strong> {clinicInfo.name}</strong> pour la gestion de notre clientèle.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Conformément à la loi, vous pouvez exercer votre droit d'accès aux données vous concernant et les faire rectifier en contactant le secrétariat du cabinet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Responsabilité</h2>
            <p className="text-slate-600 leading-relaxed">
              Les informations fournies sur ce site le sont à titre indicatif. Le cabinet ne saurait garantir l'exactitude, la complétude, l'actualité des informations diffusées sur le site. 
              Les conseils santé présents sur le blog ne remplacent en aucun cas une consultation vétérinaire.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Legal;