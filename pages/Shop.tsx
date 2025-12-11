import React from 'react';
import { useData } from '../contexts/DataContext';
import { ShoppingCart, Heart, Info, AlertCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Shop: React.FC = () => {
  const { products, clinicInfo } = useData();

  const handleAddToCart = (productName: string) => {
      alert(`${productName} a été ajouté à votre panier.`);
  };

  const handleOrderRequest = (productName: string) => {
      alert(`Votre demande pour "${productName}" a été envoyée à la clinique pour validation. Nous vous contacterons sous peu.`);
  };

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="mb-12 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Boutique & Commandes</h1>
            <p className="text-slate-600">
                Retrouvez notre sélection d'alimentation et de soins. Certains produits, comme les médicaments, nécessitent une validation vétérinaire avant délivrance.
            </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-8 border-b border-slate-100">
            <div className="text-sm font-medium text-slate-500">
                {products.length} produits disponibles
            </div>
            
            <div className="flex gap-4 mt-4 md:mt-0">
                <select className="border-gray-200 rounded-lg text-sm p-3 bg-slate-50 focus:ring-2 focus:ring-primary outline-none">
                    <option>Trier par défaut</option>
                    <option>Prix: Croissant</option>
                    <option>Prix: Décroissant</option>
                </select>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
                <div key={product.id} className="group border border-slate-100 rounded-xl overflow-hidden hover:shadow-xl transition duration-300 bg-white flex flex-col">
                    <div className="relative overflow-hidden h-64 bg-gray-50 p-4">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-500" />
                        
                        {product.requiresValidation && (
                            <div className="absolute top-3 left-3 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <AlertCircle size={12} /> Sur validation
                            </div>
                        )}
                        {!product.requiresValidation && (
                             <div className="absolute top-3 left-3 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                                En stock
                            </div>
                        )}

                        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:text-red-500 transition border border-slate-100">
                            <Heart size={18} />
                        </button>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                        <span className="text-xs text-primary font-bold uppercase tracking-wide mb-2">{product.category}</span>
                        <h3 className="text-slate-900 font-bold text-lg mb-2 leading-tight">{product.name}</h3>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                            <span className="font-bold text-lg text-slate-900">{product.price}</span>
                            
                            {product.requiresValidation ? (
                                <button 
                                    onClick={() => handleOrderRequest(product.name)}
                                    className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-100 transition flex items-center gap-2"
                                    title="Ce produit nécessite une validation vétérinaire"
                                >
                                    Commander <Info size={14}/>
                                </button>
                            ) : (
                                <button 
                                    onClick={() => handleAddToCart(product.name)}
                                    className="bg-slate-900 text-white p-3 rounded-lg shadow-lg hover:bg-primary transition duration-300 flex items-center gap-2"
                                >
                                    <ShoppingCart size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-20 bg-blue-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Vous ne trouvez pas votre produit ?</h3>
                <p className="text-slate-600">Nous pouvons commander des références spécifiques sur demande. Contactez le cabinet.</p>
            </div>
            <a href={`tel:${clinicInfo.phone}`} className="bg-white text-primary px-8 py-4 rounded-xl font-bold shadow-sm hover:shadow-md transition flex items-center gap-2 whitespace-nowrap">
                <Phone size={20} /> Appeler le secrétariat
            </a>
        </div>
      </div>
    </div>
  );
};

export default Shop;