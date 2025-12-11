import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { 
  LogOut, 
  Settings, 
  Users, 
  FileText, 
  ShoppingBag, 
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Eye,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Package,
  Image,
  Globe,
  CheckCircle,
  AlertCircle,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CMSDashboard: React.FC = () => {
  const { 
    clinicInfo, updateClinicInfo,
    services, updateService,
    team, updateTeamMember, addTeamMember, deleteTeamMember,
    blogPosts, updateBlogPost, addBlogPost, deleteBlogPost,
    products, updateProduct, addProduct, deleteProduct,
    orders, updateOrder,
    pages, updatePage, addPage, deletePage,
    media, addMedia, deleteMedia,
    resetToDefaults
  } = useData();
  const { logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'content' | 'media' | 'settings'>('dashboard');
  const [editId, setEditId] = useState<string | null>(null);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Statistics
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalProducts: products.length,
    lowStockProducts: products.filter(p => p.stock && p.stock < 5).length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tableau de bord</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commandes totales</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <Package className="text-blue-500" size={32} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</p>
              </div>
              <AlertCircle className="text-orange-500" size={32} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Produits</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <ShoppingBag className="text-green-500" size={32} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stock faible</p>
                <p className="text-2xl font-bold text-red-600">{stats.lowStockProducts}</p>
              </div>
              <AlertCircle className="text-red-500" size={32} />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Commandes récentes</h3>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">#{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{order.total.toFixed(2)} €</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des commandes</h2>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">#{order.orderNumber}</h3>
                    <p className="text-gray-600">
                      {order.customer.firstName} {order.customer.lastName} - {order.customer.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">{order.total.toFixed(2)} €</p>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrder(order.id, { ...order, status: e.target.value as any })}
                      className="mt-2 border border-gray-200 rounded px-3 py-1 text-sm"
                    >
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmée</option>
                      <option value="preparing">En préparation</option>
                      <option value="ready">Prête</option>
                      <option value="completed">Terminée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Produits commandés:</h4>
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>{(item.product.price * item.quantity).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>
                
                {order.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700"><strong>Notes:</strong> {order.notes}</p>
                  </div>
                )}
                
                {order.requiresValidation && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded">
                    <p className="text-sm text-orange-800">
                      <AlertCircle size={16} className="inline mr-2" />
                      Cette commande contient des produits nécessitant une validation vétérinaire.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des produits</h2>
        <button
          onClick={() => {
            const newProduct = {
              id: Date.now().toString(),
              name: "Nouveau produit",
              description: "Description du produit",
              price: 0,
              imageUrl: "/images/products/default.jpg",
              category: "Alimentation" as const,
              requiresValidation: false,
              stock: 0,
              sku: `PROD-${Date.now()}`
            };
            addProduct(newProduct);
            showToast("Produit ajouté avec succès");
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus size={20} />
          Ajouter un produit
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
            </div>
            
            {editId === product.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => updateProduct(product.id, { ...product, name: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
                <textarea
                  value={product.description}
                  onChange={(e) => updateProduct(product.id, { ...product, description: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => updateProduct(product.id, { ...product, price: parseFloat(e.target.value) || 0 })}
                    className="border border-gray-200 rounded px-3 py-2 text-sm"
                    placeholder="Prix"
                  />
                  <input
                    type="number"
                    value={product.stock || 0}
                    onChange={(e) => updateProduct(product.id, { ...product, stock: parseInt(e.target.value) || 0 })}
                    className="border border-gray-200 rounded px-3 py-2 text-sm"
                    placeholder="Stock"
                  />
                </div>
                <select
                  value={product.category}
                  onChange={(e) => updateProduct(product.id, { ...product, category: e.target.value as any })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                >
                  <option value="Alimentation">Alimentation</option>
                  <option value="Soins">Soins</option>
                  <option value="Médicaments">Médicaments</option>
                  <option value="Accessoires">Accessoires</option>
                </select>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={product.requiresValidation}
                    onChange={(e) => updateProduct(product.id, { ...product, requiresValidation: e.target.checked })}
                    className="rounded"
                  />
                  <label className="text-sm text-gray-700">Nécessite une validation</label>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditId(null);
                      showToast("Produit mis à jour");
                    }}
                    className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition"
                  >
                    <Save size={16} className="inline mr-1" />
                    Sauvegarder
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="px-3 py-2 border border-gray-200 rounded text-sm hover:bg-gray-50 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-lg text-gray-900">{product.price.toFixed(2)} €</span>
                  <span className="text-sm text-gray-500">Stock: {product.stock || 0}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditId(product.id)}
                    className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition"
                  >
                    <Edit size={16} className="inline mr-1" />
                    Modifier
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
                        deleteProduct(product.id);
                        showToast("Produit supprimé");
                      }
                    }}
                    className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Gestion du contenu</h2>
      
      {/* Clinic Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de la clinique</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la clinique</label>
            <input
              type="text"
              value={clinicInfo.name}
              onChange={(e) => updateClinicInfo({ ...clinicInfo, name: e.target.value })}
              className="w-full border border-gray-200 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
            <input
              type="text"
              value={clinicInfo.phone}
              onChange={(e) => updateClinicInfo({ ...clinicInfo, phone: e.target.value })}
              className="w-full border border-gray-200 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={clinicInfo.email}
              onChange={(e) => updateClinicInfo({ ...clinicInfo, email: e.target.value })}
              className="w-full border border-gray-200 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
            <input
              type="text"
              value={clinicInfo.address}
              onChange={(e) => updateClinicInfo({ ...clinicInfo, address: e.target.value })}
              className="w-full border border-gray-200 rounded px-3 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre héro</label>
            <input
              type="text"
              value={clinicInfo.heroTitle}
              onChange={(e) => updateClinicInfo({ ...clinicInfo, heroTitle: e.target.value })}
              className="w-full border border-gray-200 rounded px-3 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre héro</label>
            <textarea
              value={clinicInfo.heroSubtitle}
              onChange={(e) => updateClinicInfo({ ...clinicInfo, heroSubtitle: e.target.value })}
              className="w-full border border-gray-200 rounded px-3 py-2"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Team Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Équipe</h3>
          <button
            onClick={() => {
              const newMember = {
                id: Date.now().toString(),
                name: "Nouveau membre",
                role: "Vétérinaire",
                bio: "Biographie à rédiger...",
                imageUrl: "/images/team/default.jpg"
              };
              addTeamMember(newMember);
              showToast("Membre ajouté avec succès");
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus size={20} />
            Ajouter un membre
          </button>
        </div>
        
        <div className="space-y-4">
          {team.map((member) => (
            <div key={member.id} className="border border-gray-200 rounded-lg p-4">
              {editId === member.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateTeamMember(member.id, { ...member, name: e.target.value })}
                    className="w-full border border-gray-200 rounded px-3 py-2"
                    placeholder="Nom"
                  />
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => updateTeamMember(member.id, { ...member, role: e.target.value })}
                    className="w-full border border-gray-200 rounded px-3 py-2"
                    placeholder="Rôle"
                  />
                  <textarea
                    value={member.bio}
                    onChange={(e) => updateTeamMember(member.id, { ...member, bio: e.target.value })}
                    className="w-full border border-gray-200 rounded px-3 py-2"
                    rows={3}
                    placeholder="Biographie"
                  />
                  
                  {/* CV Section */}
                  <div className="border-t pt-4 mt-4">
                    <h5 className="font-medium text-gray-900 mb-3">CV et Parcours</h5>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Formation (une par ligne)</label>
                        <textarea
                          value={member.cv?.education?.join('\n') || ''}
                          onChange={(e) => updateTeamMember(member.id, { 
                            ...member, 
                            cv: { 
                              ...member.cv, 
                              education: e.target.value.split('\n').filter(line => line.trim()),
                              experience: member.cv?.experience || [],
                              specializations: member.cv?.specializations || [],
                              certifications: member.cv?.certifications || []
                            } 
                          })}
                          className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                          rows={3}
                          placeholder="Ex: Doctorat en Médecine Vétérinaire - Université de Liège (1998)"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expérience (une par ligne)</label>
                        <textarea
                          value={member.cv?.experience?.join('\n') || ''}
                          onChange={(e) => updateTeamMember(member.id, { 
                            ...member, 
                            cv: { 
                              ...member.cv, 
                              education: member.cv?.education || [],
                              experience: e.target.value.split('\n').filter(line => line.trim()),
                              specializations: member.cv?.specializations || [],
                              certifications: member.cv?.certifications || []
                            } 
                          })}
                          className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                          rows={3}
                          placeholder="Ex: Fondateur - Clinique Vétérinaire (1999-présent)"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Spécialisations (une par ligne)</label>
                        <textarea
                          value={member.cv?.specializations?.join('\n') || ''}
                          onChange={(e) => updateTeamMember(member.id, { 
                            ...member, 
                            cv: { 
                              ...member.cv, 
                              education: member.cv?.education || [],
                              experience: member.cv?.experience || [],
                              specializations: e.target.value.split('\n').filter(line => line.trim()),
                              certifications: member.cv?.certifications || []
                            } 
                          })}
                          className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                          rows={2}
                          placeholder="Ex: Chirurgie des tissus mous"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Certifications (une par ligne)</label>
                        <textarea
                          value={member.cv?.certifications?.join('\n') || ''}
                          onChange={(e) => updateTeamMember(member.id, { 
                            ...member, 
                            cv: { 
                              ...member.cv, 
                              education: member.cv?.education || [],
                              experience: member.cv?.experience || [],
                              specializations: member.cv?.specializations || [],
                              certifications: e.target.value.split('\n').filter(line => line.trim())
                            } 
                          })}
                          className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                          rows={2}
                          placeholder="Ex: Membre de l'Ordre des Médecins Vétérinaires"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(null);
                        showToast("Membre mis à jour");
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="border border-gray-200 px-4 py-2 rounded hover:bg-gray-50 transition"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-sm text-gray-500 mt-1">{member.bio}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditId(member.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
                          deleteTeamMember(member.id);
                          showToast("Membre supprimé");
                        }
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-primary hover:text-blue-700 transition">
                <Home size={24} />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Administration CMS</h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <LogOut size={20} />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === 'dashboard' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <BarChart3 size={20} />
                    Tableau de bord
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === 'orders' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Package size={20} />
                    Commandes
                    {stats.pendingOrders > 0 && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        {stats.pendingOrders}
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === 'products' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ShoppingBag size={20} />
                    Produits
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === 'content' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FileText size={20} />
                    Contenu
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('media')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === 'media' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Image size={20} />
                    Médias
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === 'settings' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Settings size={20} />
                    Paramètres
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'content' && renderContent()}
            {activeTab === 'media' && (
              <div className="text-center py-12">
                <Image size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Gestion des médias</h3>
                <p className="text-gray-500">Fonctionnalité en cours de développement</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <button
                    onClick={() => {
                      if (confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.")) {
                        resetToDefaults();
                        showToast("Données réinitialisées", "success");
                      }
                    }}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
                  >
                    Réinitialiser toutes les données
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <div className="flex items-center gap-2">
            {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSDashboard;