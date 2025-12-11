import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, CreditCard, User, MapPin, Phone, Mail, Heart } from 'lucide-react';
import SmartImage from '../components/SmartImage';
import { CustomerInfo, Order } from '../types';

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useData();
  const navigate = useNavigate();
  
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
  
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const order: Order = {
        id: Date.now().toString(),
        orderNumber: `CMD-${Date.now()}`,
        date: new Date().toISOString(),
        status: 'pending',
        customer: customerInfo,
        items: items,
        total: getTotalPrice(),
        notes,
        requiresValidation: items.some(item => item.product.requiresValidation)
      };

      addOrder(order);
      clearCart();
      
      // Redirect to confirmation page
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Votre panier est vide</h2>
        <p className="text-gray-500 mb-8">Ajoutez des produits à votre panier pour passer commande</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Découvrir nos produits
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finaliser votre commande</h1>
          <p className="text-gray-600">Vérifiez vos informations et validez votre commande</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations personnelles */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User size={20} />
                  Informations personnelles
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

              {/* Adresse */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  Adresse de livraison
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Code postal *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ville *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations animal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart size={20} />
                  Informations sur votre animal (optionnel)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'animal
                    </label>
                    <input
                      type="text"
                      value={customerInfo.petName}
                      onChange={(e) => handleInputChange('petName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type d'animal
                    </label>
                    <select
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

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes ou instructions spéciales
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Informations complémentaires..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Traitement en cours...' : 'Valider la commande'}
              </button>
            </form>
          </div>

          {/* Récapitulatif */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Récapitulatif de commande</h3>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
                  <div className="w-16 h-16 flex-shrink-0">
                    <SmartImage
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                    <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total:</span>
                <span>{getTotalPrice().toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison:</span>
                <span>{getTotalPrice() > 50 ? 'Gratuite' : '5.00 €'}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
                <span>Total:</span>
                <span>{(getTotalPrice() + (getTotalPrice() > 50 ? 0 : 5)).toFixed(2)} €</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Mode de retrait:</strong> Retrait en clinique ou livraison à domicile.
                Vous serez contacté pour organiser la remise de votre commande.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;