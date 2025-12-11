import React from 'react';
import { useData } from '../contexts/DataContext';

const PrivacyPolicy: React.FC = () => {
  const { clinicInfo } = useData();

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-12">Politique de Confidentialité</h1>

        <div className="space-y-12 prose prose-slate max-w-none">
          <p className="text-lg text-slate-600">
            La protection de vos données personnelles est une priorité pour le Cabinet Vétérinaire {clinicInfo.name}.
            Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Responsable du traitement</h2>
            <p className="text-slate-600">
              Le responsable du traitement des données est :<br/>
              <strong>{clinicInfo.name}</strong><br/>
              {clinicInfo.address}<br/>
              Tél : {clinicInfo.phone}<br/>
              Email : {clinicInfo.email}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Données collectées</h2>
            <p className="text-slate-600 mb-2">Nous pouvons collecter les informations suivantes :</p>
            <ul className="list-disc pl-5 text-slate-600 space-y-2">
              <li>Informations d'identité (nom, prénom).</li>
              <li>Coordonnées (adresse email, numéro de téléphone, adresse postale).</li>
              <li>Informations relatives à vos animaux (nom, espèce, race, historique médical).</li>
              <li>Données de navigation sur notre site web (cookies techniques).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Finalité du traitement</h2>
            <p className="text-slate-600 mb-2">Vos données sont collectées pour les raisons suivantes :</p>
            <ul className="list-disc pl-5 text-slate-600 space-y-2">
              <li>Gestion des rendez-vous et suivi médical de vos animaux.</li>
              <li>Communication avec vous (rappels de vaccins, réponses à vos questions).</li>
              <li>Gestion administrative et comptable (facturation).</li>
              <li>Amélioration de nos services et de notre site web.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Partage des données</h2>
            <p className="text-slate-600">
              Vos données personnelles ne sont jamais vendues à des tiers. Elles peuvent être partagées uniquement avec :
            </p>
            <ul className="list-disc pl-5 text-slate-600 mt-2 space-y-2">
              <li>Les laboratoires d'analyses (dans le cadre des soins).</li>
              <li>Les confrères spécialistes (en cas de référence).</li>
              <li>Nos prestataires informatiques (hébergement, logiciel vétérinaire) soumis à confidentialité.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Vos droits</h2>
            <p className="text-slate-600">
              Conformément au RGPD (Règlement Général sur la Protection des Données), vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-5 text-slate-600 mt-2 space-y-2">
              <li>Droit d'accès à vos données.</li>
              <li>Droit de rectification des données inexactes.</li>
              <li>Droit à l'effacement (droit à l'oubli) sous certaines conditions.</li>
              <li>Droit à la limitation du traitement.</li>
            </ul>
            <p className="text-slate-600 mt-4">
              Pour exercer ces droits, veuillez nous contacter à l'adresse : {clinicInfo.email}.
            </p>
          </section>

           <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Cookies</h2>
            <p className="text-slate-600">
              Ce site utilise des cookies techniques nécessaires à son bon fonctionnement (par exemple pour mémoriser vos préférences d'affichage). 
              Ces cookies ne nécessitent pas de consentement préalable.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;