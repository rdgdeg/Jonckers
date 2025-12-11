import React, { useState, useEffect } from 'react';
import { Search, X, FileText, Users, ShoppingBag, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'service' | 'team' | 'product' | 'page';
  url: string;
  icon: React.ReactNode;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const { services, team, products } = useData();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    // Search in services
    services.forEach(service => {
      if (
        service.title.toLowerCase().includes(searchTerm) ||
        service.shortDescription.toLowerCase().includes(searchTerm) ||
        service.fullDescription.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          id: service.id,
          title: service.title,
          description: service.shortDescription,
          type: 'service',
          url: `/services/${service.id}`,
          icon: <FileText size={20} className="text-blue-500" />
        });
      }
    });

    // Search in team
    team.forEach(member => {
      if (
        member.name.toLowerCase().includes(searchTerm) ||
        member.role.toLowerCase().includes(searchTerm) ||
        member.bio.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          id: member.id,
          title: member.name,
          description: member.role,
          type: 'team',
          url: `/team/${member.id}`,
          icon: <Users size={20} className="text-green-500" />
        });
      }
    });

    // Search in products
    products.forEach(product => {
      if (
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          id: product.id,
          title: product.name,
          description: `${product.category} - ${product.price.toFixed(2)}€`,
          type: 'product',
          url: `/shop?product=${product.id}`,
          icon: <ShoppingBag size={20} className="text-purple-500" />
        });
      }
    });

    // Add static pages
    const staticPages = [
      { title: 'Prendre Rendez-vous', description: 'Réserver une consultation', url: '/contact', keywords: ['rdv', 'rendez-vous', 'consultation', 'réserver'] },
      { title: 'Horaires', description: 'Heures d\'ouverture', url: '/horaires', keywords: ['horaires', 'heures', 'ouverture'] },
      { title: 'Contact', description: 'Nous contacter', url: '/contact', keywords: ['contact', 'téléphone', 'adresse'] },
      { title: 'Boutique', description: 'Produits vétérinaires', url: '/shop', keywords: ['boutique', 'produits', 'acheter'] }
    ];

    staticPages.forEach(page => {
      if (
        page.title.toLowerCase().includes(searchTerm) ||
        page.description.toLowerCase().includes(searchTerm) ||
        page.keywords.some(keyword => keyword.includes(searchTerm))
      ) {
        searchResults.push({
          id: page.url,
          title: page.title,
          description: page.description,
          type: 'page',
          url: page.url,
          icon: <Calendar size={20} className="text-orange-500" />
        });
      }
    });

    setResults(searchResults.slice(0, 8)); // Limit to 8 results
  }, [query, services, team, products]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-16">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center gap-4 p-6 border-b border-gray-100">
            <Search size={24} className="text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des services, produits, membres de l'équipe..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-lg outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim() && results.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Search size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Aucun résultat trouvé pour "{query}"</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="p-2">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    to={result.url}
                    onClick={onClose}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition group"
                  >
                    <div className="flex-shrink-0">
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {result.description}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">
                      {result.type}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!query.trim() && (
              <div className="p-8 text-center text-gray-500">
                <Search size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Commencez à taper pour rechercher...</p>
                <div className="mt-4 text-sm">
                  <p>Vous pouvez rechercher :</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">Services</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">Équipe</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">Produits</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">Pages</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;