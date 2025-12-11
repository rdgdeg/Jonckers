import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  DEFAULT_CLINIC_INFO, 
  DEFAULT_SERVICES, 
  DEFAULT_TEAM, 
  DEFAULT_BLOG_POSTS,
  DEFAULT_PRODUCTS
} from '../constants';
import { DataContextType, ClinicInfo, Service, TeamMember, BlogPost, Product } from '../types';

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

  // Products are currently static or could be extended to LS later
  const [products] = useState<Product[]>(DEFAULT_PRODUCTS);

  // Effects to save changes to LocalStorage
  useEffect(() => localStorage.setItem('clinicInfo', JSON.stringify(clinicInfo)), [clinicInfo]);
  useEffect(() => localStorage.setItem('services', JSON.stringify(services)), [services]);
  useEffect(() => localStorage.setItem('team', JSON.stringify(team)), [team]);
  useEffect(() => localStorage.setItem('blogPosts', JSON.stringify(blogPosts)), [blogPosts]);

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

  const resetToDefaults = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser tout le contenu du site ? Toutes vos modifications seront perdues.")) {
        setClinicInfo(DEFAULT_CLINIC_INFO);
        setServices(DEFAULT_SERVICES);
        setTeam(DEFAULT_TEAM);
        setBlogPosts(DEFAULT_BLOG_POSTS);
        localStorage.clear();
        window.location.reload();
    }
  };

  return (
    <DataContext.Provider value={{
      clinicInfo,
      services,
      team,
      blogPosts,
      products,
      updateClinicInfo,
      updateService,
      updateTeamMember,
      addTeamMember,
      deleteTeamMember,
      updateBlogPost,
      addBlogPost,
      deleteBlogPost,
      resetToDefaults
    }}>
      {children}
    </DataContext.Provider>
  );
};