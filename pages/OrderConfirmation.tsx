import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { CheckCircle, Package, Phone, Mail, Calendar } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders, clinicInfo } = useData();
  
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Commande introuvable</h2>
        <Link to="/shop" className="text-primary hover:underline">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header de confirmation */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Commande confirmée !</h1>
          <p className="text-gray-600 text-lg">
            Merci pour votre commande. Nous la préparons avec soin.
          </p>
        </div>

        {/* Informations de commande */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Détails de la commande</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Numéro de commande:</span>
                  <span className="font-medium">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(order.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut:</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    En attente
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold text-lg">{order.total.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations client</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Nom:</span>
                  <span className="ml-2 font-medium">
                    {order.customer.firstName} {order.customer.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 font-medium">{order.customer.email}</span>
                </div>
                <div>
                  <span className="text-gray-600">Téléphone:</span>
                  <span className="ml-2 font-medium">{order.customer.phone}</span>
                </div>
                <div>
                  <span className="text-gray-600">Adresse:</span>
                  <span className="ml-2 font-medium">
                    {order.customer.address}, {order.customer.postalCode} {order.customer.city}
                  </span>
                </div>
                {order.customer.petName && (
                  <div>
                    <span className="text-gray-600">Animal:</span>
                    <span className="ml-2 font-medium">
                      {order.customer.petName} ({order.customer.petType})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Produits commandés */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Produits commandés</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package size={24} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.product.price.toFixed(2)} € × {item.quantity}
                  </p>
                  {item.product.requiresValidation && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mt-1">
                      Validation requise
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {(item.product.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prochaines étapes */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Que se passe-t-il maintenant ?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Confirmation de commande</h4>
                <p className="text-sm text-gray-600">
                  Vous recevrez un email de confirmation avec tous les détails.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Préparation</h4>
                <p className="text-sm text-gray-600">
                  Notre équipe prépare votre commande avec soin.
                  {order.requiresValidation && ' Les produits sur ordonnance seront validés par nos vétérinaires.'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Retrait ou livraison</h4>
                <p className="text-sm text-gray-600">
                  Nous vous contacterons pour organiser le retrait en clinique ou la livraison.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Une question sur votre commande ?</h3>
          <p className="text-gray-600 mb-6">
            Notre équipe est à votre disposition pour toute information complémentaire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${clinicInfo.phone}`}
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              <Phone size={20} />
              {clinicInfo.phone}
            </a>
            <a
              href={`mailto:${clinicInfo.email}`}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              <Mail size={20} />
              Nous écrire
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition mr-4"
          >
            Continuer les achats
          </Link>
          <Link
            to="/"
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;