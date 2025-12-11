import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  DEFAULT_CLINIC_INFO, 
  DEFAULT_SERVICES, 
  DEFAULT_TEAM, 
  DEFAULT_BLOG_POSTS,
  DEFAULT_PRODUCTS,
  DEFAULT_PAGES,
  DEFAULT_MEDIA
} from '../constants';
import { DataContextType, ClinicInfo, Service, TeamMember, BlogPost, Product, Order, Page, MediaFile } from '../types';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or Defaults with migration logic
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo>(() => {
    const saved = localStorage.getItem('clinicInfo');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Ensure consultationHours exists (migration for existing data)
            if (!parsed.consultationHours) {
                parsed.consultationHours = DEFAULT_CLINIC_INFO.consultationHours;
            }
            return parsed;
        } catch (e) {
            console.error("Error parsing clinicInfo", e);
            return DEFAULT_CLINIC_INFO;
        }
    }
    return DEFAULT_CLINIC_INFO;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('services');
    return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
  });

  const [team, setTeam] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('team');
    return saved ? JSON.parse(saved) : DEFAULT_TEAM;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('blogPosts');
    return saved ? JSON.parse(saved) : DEFAULT_BLOG_POSTS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [pages, setPages] = useState<Page[]>(() => {
    const saved = localStorage.getItem('pages');
    return saved ? JSON.parse(saved) : DEFAULT_PAGES;
  });

  const [media, setMedia] = useState<MediaFile[]>(() => {
    const saved = localStorage.getItem('media');
    return saved ? JSON.parse(saved) : DEFAULT_MEDIA;
  });

  // Effects to save changes to LocalStorage
  useEffect(() => localStorage.setItem('clinicInfo', JSON.stringify(clinicInfo)), [clinicInfo]);
  useEffect(() => localStorage.setItem('services', JSON.stringify(services)), [services]);
  useEffect(() => localStorage.setItem('team', JSON.stringify(team)), [team]);
  useEffect(() => localStorage.setItem('blogPosts', JSON.stringify(blogPosts)), [blogPosts]);
  useEffect(() => localStorage.setItem('products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('pages', JSON.stringify(pages)), [pages]);
  useEffect(() => localStorage.setItem('media', JSON.stringify(media)), [media]);

  // Update Functions
  const updateClinicInfo = (info: ClinicInfo) => setClinicInfo(info);

  const updateService = (id: string, updatedService: Service) => {
    setServices(prev => prev.map(s => s.id === id ? updatedService : s));
  };

  const updateTeamMember = (id: string, member: TeamMember) => {
    setTeam(prev => prev.map(m => m.id === id ? member : m));
  };

  const addTeamMember = (member: TeamMember) => setTeam(prev => [...prev, member]);
  
  const deleteTeamMember = (id: string) => setTeam(prev => prev.filter(m => m.id !== id));

  const updateBlogPost = (id: string, post: BlogPost) => {
    setBlogPosts(prev => prev.map(p => p.id === id ? post : p));
  };

  const addBlogPost = (post: BlogPost) => setBlogPosts(prev => [...prev, post]);
  
  const deleteBlogPost = (id: string) => setBlogPosts(prev => prev.filter(p => p.id !== id));

  // Product functions
  const updateProduct = (id: string, updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
  };

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  // Order functions
  const addOrder = (order: Order) => setOrders(prev => [...prev, order]);
  
  const updateOrder = (id: string, updatedOrder: Order) => {
    setOrders(prev => prev.map(o => o.id === id ? updatedOrder : o));
  };

  // Page functions
  const addPage = (page: Page) => setPages(prev => [...prev, page]);
  
  const updatePage = (id: string, updatedPage: Page) => {
    setPages(prev => prev.map(p => p.id === id ? updatedPage : p));
  };
  
  const deletePage = (id: string) => setPages(prev => prev.filter(p => p.id !== id));

  // Media functions
  const addMedia = (mediaFile: MediaFile) => setMedia(prev => [...prev, mediaFile]);
  
  const deleteMedia = (id: string) => setMedia(prev => prev.filter(m => m.id !== id));

  const resetToDefaults = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser tout le contenu du site ? Toutes vos modifications seront perdues.")) {
        setClinicInfo(DEFAULT_CLINIC_INFO);
        setServices(DEFAULT_SERVICES);
        setTeam(DEFAULT_TEAM);
        setBlogPosts(DEFAULT_BLOG_POSTS);
        setProducts(DEFAULT_PRODUCTS);
        setOrders([]);
        setPages(DEFAULT_PAGES);
        setMedia(DEFAULT_MEDIA);
        localStorage.clear();
        window.location.reload();
    }
  };

  // Clean up old data with incorrect name
  React.useEffect(() => {
    const teamData = localStorage.getItem('team');
    if (teamData && teamData.includes('Frédérique')) {
      console.log('Cleaning up old team data with incorrect name');
      localStorage.removeItem('team');
      setTeam(DEFAULT_TEAM);
    }
  }, []);

  return (
    <DataContext.Provider value={{
      clinicInfo,
      services,
      team,
      blogPosts,
      products,
      orders,
      pages,
      media,
      updateClinicInfo,
      updateService,
      updateTeamMember,
      addTeamMember,
      deleteTeamMember,
      updateBlogPost,
      addBlogPost,
      deleteBlogPost,
      updateProduct,
      addProduct,
      deleteProduct,
      addOrder,
      updateOrder,
      addPage,
      updatePage,
      deletePage,
      addMedia,
      deleteMedia,
      resetToDefaults
    }}>
      {children}
    </DataContext.Provider>
  );
};