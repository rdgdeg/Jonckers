import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Heart } from 'lucide-react';
import { useToast } from './ToastProvider';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      showToast('Veuillez entrer une adresse email valide', 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      showToast('Merci ! Vous êtes maintenant abonné à notre newsletter', 'success');
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Merci pour votre inscription ! 🎉
            </h3>
            <p className="text-gray-600 mb-6">
              Vous recevrez bientôt nos conseils vétérinaires et nos actualités directement dans votre boîte mail.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Heart size={16} className="text-red-400" />
              <span>Nous prenons soin de vos données personnelles</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <Mail className="w-16 h-16 text-white mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Restez informé des actualités vétérinaires
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Recevez nos conseils d'experts, nos actualités et nos offres spéciales directement dans votre boîte mail. 
            Pas de spam, que du contenu utile pour vos compagnons !
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="w-full px-6 py-4 rounded-xl border-0 text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 focus:outline-none text-lg"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !email}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send size={20} />
                  S'abonner
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} />
            <span>Conseils vétérinaires gratuits</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} />
            <span>Actualités de la clinique</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} />
            <span>Offres spéciales</span>
          </div>
        </div>

        <p className="mt-6 text-xs text-blue-200">
          En vous abonnant, vous acceptez de recevoir nos emails. Vous pouvez vous désabonner à tout moment.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;