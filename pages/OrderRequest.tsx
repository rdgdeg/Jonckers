import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { AlertCircle, User, Phone, Mail, FileText, Send } from 'lucide-react';
import SmartImage from '../components/SmartImage';
import { CustomerInfo, Order } from '../types';

const OrderRequest: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, addOrder, clinicInfo } = useData();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === productId);
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    petName: '',
    petType: ''
  });
  
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Produit introuvable</h2>
        <button
          onClick={() => navigate('/shop')}
          className="text-primary hover:underline"
        >
          Retour à la boutique
        </button>
      </div>
    );
  }

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const order: Order = {
        id: Date.now().toString(),
        orderNumber: `REQ-${Date.now()}`,
        date: new Date().toISOString(),
        status: 'pending',
        customer: customerInfo,
        items: [{
          productId: product.id,
          quantity,
          product
        }],
        total: 0, // Prix sur devis
        notes,
        requiresValidation: true
      };

      addOrder(order);
      
      // Redirect to confirmation page
      navigate(`/request-confirmation/${order.id}`);
    } catch (error) {
      console.error('Erreur lors de la demande:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Demande de produit sur ordonnance</h1>
          <p className="text-gray-600">Ce produit nécessite une validation vétérinaire avant délivrance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations personnelles */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User size={20} />
                  Vos informations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Informations animal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations sur votre animal *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'animal *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.petName}
                      onChange={(e) => handleInputChange('petName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type d'animal *
                    </label>
                    <select
                      required
                      value={customerInfo.petType}
                      onChange={(e) => handleInputChange('petType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Sélectionner</option>
                      <option value="chien">Chien</option>
                      <option value="chat">Chat</option>
                      <option value="lapin">Lapin</option>
                      <option value="oiseau">Oiseau</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quantité */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantité souhaitée
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Informations complémentaires
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Précisez le contexte médical, les symptômes observés, ou toute autre information utile pour nos vétérinaires..."
                />
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-orange-800">
                    <p className="font-medium mb-1">Important :</p>
                    <p>
                      Cette demande sera examinée par nos vétérinaires. Nous vous contacterons 
                      pour valider la prescription et vous informer du prix et des modalités de retrait.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send size={20} />
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
              </button>
            </form>
          </div>

          {/* Informations produit */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Produit demandé</h3>
            
            <div className="border border-gray-100 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 flex-shrink-0">
                  <SmartImage
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{product.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      <AlertCircle size={12} className="mr-1" />
                      Sur ordonnance
                    </span>
                    <span className="text-xs text-gray-500">#{product.sku}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Processus de validation</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Examen de votre demande par nos vétérinaires</li>
                  <li>2. Validation de la prescription si nécessaire</li>
                  <li>3. Contact pour confirmer le prix et les modalités</li>
                  <li>4. Préparation et mise à disposition du produit</li>
                </ol>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Besoin d'aide ?</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-500" />
                    <span>{clinicInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" />
                    <span>{clinicInfo.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderRequest;