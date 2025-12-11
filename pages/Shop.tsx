import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Heart, Info, AlertCircle, Phone, Plus, Minus, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SmartImage from '../components/SmartImage';

const Shop: React.FC = () => {
  const { products, clinicInfo } = useData();
  const { addToCart, items } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleAddToCart = (product: any) => {
    if (product.requiresValidation) {
      // Redirect to validation form
      window.location.href = `/order-request/${product.id}`;
    } else {
      addToCart(product);
    }
  };

  const getCartQuantity = (productId: string) => {
    const item = items.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Boutique Vétérinaire</h1>
            <p className="text-slate-600 mb-6">
                Découvrez notre sélection de produits de qualité pour la santé et le bien-être de vos animaux.
            </p>
            
            {/* Delivery Info */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-slate-900 mb-3">🚚 Modalités de récupération</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-primary mb-2">📦 Retrait à la clinique</h4>
                  <p className="text-slate-600">Récupérez vos commandes directement à la clinique aux heures d'ouverture. Gratuit pour toutes les commandes.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <h4 className="font-semibold text-green-600 mb-2">🚛 Livraison locale</h4>
                  <p className="text-slate-600">Livraison possible dans un rayon de 15km. Gratuite à partir de 50€, sinon 5€ de frais de port.</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                ⚠️ Les produits sur ordonnance nécessitent une validation vétérinaire préalable
              </p>
            </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'Tous' : category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="default">Trier par défaut</option>
              <option value="name">Nom A-Z</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>

          <div className="text-sm text-gray-500">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const cartQuantity = getCartQuantity(product.id);
              return (
                <div key={product.id} className="group border border-slate-100 rounded-xl overflow-hidden hover:shadow-xl transition duration-300 bg-white flex flex-col">
                    <div className="relative overflow-hidden h-64 bg-gray-50">
                        <SmartImage 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          fallbackSrc="https://cdn.pixabay.com/photo/2017/05/26/18/54/dog-food-2346176_640.jpg"
                        />
                        
                        {product.requiresValidation && (
                            <div className="absolute top-3 left-3 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <AlertCircle size={12} /> Sur ordonnance
                            </div>
                        )}
                        {!product.requiresValidation && product.stock && product.stock > 0 && (
                             <div className="absolute top-3 left-3 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                                En stock ({product.stock})
                             </div>
                        )}
                        {!product.requiresValidation && (!product.stock || product.stock === 0) && (
                             <div className="absolute top-3 left-3 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                                Rupture
                             </div>
                        )}

                        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:text-red-500 transition border border-slate-100">
                            <Heart size={18} />
                        </button>

                        {cartQuantity > 0 && (
                          <div className="absolute bottom-3 right-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-bold">
                            {cartQuantity} dans le panier
                          </div>
                        )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-primary font-bold uppercase tracking-wide">{product.category}</span>
                          {product.sku && (
                            <span className="text-xs text-gray-400">#{product.sku}</span>
                          )}
                        </div>
                        <h3 className="text-slate-900 font-bold text-lg mb-2 leading-tight">{product.name}</h3>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-grow">{product.description}</p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                            <div className="flex flex-col">
                              <span className="font-bold text-lg text-slate-900">
                                {product.requiresValidation ? 'Sur devis' : `${product.price.toFixed(2)} €`}
                              </span>
                              {product.price > 50 && !product.requiresValidation && (
                                <span className="text-xs text-green-600 font-medium">Livraison gratuite</span>
                              )}
                            </div>
                            
                            {product.requiresValidation ? (
                                <Link 
                                    to={`/order-request/${product.id}`}
                                    className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-100 transition flex items-center gap-2"
                                >
                                    Demander <Info size={14}/>
                                </Link>
                            ) : product.stock && product.stock > 0 ? (
                                <button 
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition duration-300 flex items-center gap-2"
                                >
                                    <ShoppingCart size={16} />
                                    Ajouter
                                </button>
                            ) : (
                                <button 
                                    disabled
                                    className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg font-bold cursor-not-allowed"
                                >
                                    Rupture
                                </button>
                            )}
                        </div>
                    </div>
                </div>
              );
            })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ShoppingCart size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        )}

        <div className="mt-20 bg-blue-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Besoin d'un conseil ?</h3>
                <p className="text-slate-600">Notre équipe est là pour vous aider à choisir les meilleurs produits pour votre animal.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${clinicInfo.phone}`} className="bg-white text-primary px-6 py-3 rounded-xl font-bold shadow-sm hover:shadow-md transition flex items-center gap-2 whitespace-nowrap">
                  <Phone size={20} /> {clinicInfo.phone}
              </a>
              <Link to="/contact" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                Nous contacter
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;