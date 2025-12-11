import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Settings, Users, FileText, 
  LogOut, Plus, Trash2, Save, LayoutGrid, ArrowLeft,
  Home, TrendingUp, Search, Image as ImageIcon, CheckCircle, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TeamMember, BlogPost } from '../../types';

// Mock images for "Media Library" simulation
const STOCK_IMAGES = [
    "https://cdn.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/05/11/08/11/dog-3389729_640.jpg",
    "https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2284501_640.jpg",
    "https://cdn.pixabay.com/photo/2020/04/18/08/33/doctor-5058699_640.jpg",
    "https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_640.jpg",
    "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_640.jpg",
    "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg",
    "https://cdn.pixabay.com/photo/2017/05/26/18/54/dog-food-2346176_640.jpg",
    "https://cdn.pixabay.com/photo/2017/02/15/12/12/cat-2068462_640.jpg"
];

const AdminDashboard: React.FC = () => {
  const { 
    clinicInfo, updateClinicInfo, 
    services, updateService,
    team, updateTeamMember, addTeamMember, deleteTeamMember,
    blogPosts, updateBlogPost, addBlogPost, deleteBlogPost,
    resetToDefaults
  } = useData();
  const { logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'info' | 'services' | 'team' | 'blog'>('dashboard');
  const [editId, setEditId] = useState<string | null>(null);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
  };

  // --- Helpers for Forms ---
  const handleClinicInfoChange = (field: string, value: any) => {
    updateClinicInfo({ ...clinicInfo, [field]: value });
  };

  const saveClinicInfo = () => {
      showToast("Informations enregistrées avec succès");
  };

  const handleHourChange = (index: number, field: 'day' | 'hours', value: string) => {
    const newHours = [...clinicInfo.hours];
    newHours[index] = { ...newHours[index], [field]: value };
    updateClinicInfo({ ...clinicInfo, hours: newHours });
  };

  const handleConsultationHourChange = (index: number, field: 'day' | 'hours', value: string) => {
    // Fallback if consultationHours is somehow undefined in legacy state (though DataContext handles it)
    const newHours = [...(clinicInfo.consultationHours || [])];
    newHours[index] = { ...newHours[index], [field]: value };
    updateClinicInfo({ ...clinicInfo, consultationHours: newHours });
  };

  // --- Components ---

  const ImageInput = ({ value, onChange, label }: { value: string, onChange: (val: string) => void, label: string }) => {
      const [showPicker, setShowPicker] = useState(false);
      return (
          <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
              <div className="flex gap-2">
                  <div className="flex-grow">
                      <input 
                          type="text" 
                          value={value} 
                          onChange={(e) => onChange(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                          placeholder="https://..."
                      />
                  </div>
                  <button 
                    onClick={() => setShowPicker(!showPicker)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-3 rounded-lg border border-slate-200 transition"
                    title="Choisir une image"
                  >
                      <ImageIcon size={20} />
                  </button>
              </div>
              {/* Preview */}
              {value && (
                  <div className="mt-2 w-full h-32 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative">
                      <img src={value} alt="Preview" className="w-full h-full object-cover" />
                  </div>
              )}
              {/* Picker */}
              {showPicker && (
                  <div className="mt-2 p-4 bg-white border border-slate-200 rounded-xl shadow-lg">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-3">Médiathèque (Simulée)</p>
                      <div className="grid grid-cols-4 gap-2">
                          {STOCK_IMAGES.map((img, idx) => (
                              <button key={idx} onClick={() => { onChange(img); setShowPicker(false); }} className="aspect-square rounded-lg overflow-hidden hover:opacity-80 transition ring-2 ring-transparent hover:ring-primary">
                                  <img src={img} className="w-full h-full object-cover" />
                              </button>
                          ))}
                      </div>
                  </div>
              )}
          </div>
      );
  };

  // --- RENDERERS ---

  const renderDashboard = () => (
      <div className="animate-fadeIn space-y-8">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-2">Bonjour, Admin 👋</h2>
                  <p className="text-slate-300">Bienvenue sur votre interface de gestion. Voici un aperçu de votre clinique en ligne.</p>
              </div>
              <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                  <Settings size={200} />
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                  { label: 'Services Actifs', value: services.length, icon: LayoutGrid, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { label: 'Membres Équipe', value: team.length, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { label: 'Articles Blog', value: blogPosts.length, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' },
                  { label: 'Visites (30j)', value: '1,420', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
              ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                          <stat.icon size={24} />
                      </div>
                      <div>
                          <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">{stat.label}</p>
                          <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      </div>
                  </div>
              ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-slate-900 text-lg">Derniers Articles</h3>
                      <button onClick={() => setActiveTab('blog')} className="text-sm text-primary font-medium hover:underline">Tout voir</button>
                  </div>
                  <div className="space-y-4">
                      {blogPosts.slice(0, 3).map(post => (
                          <div key={post.id} className="flex gap-4 items-center p-3 hover:bg-slate-50 rounded-lg transition">
                              <img src={post.imageUrl} className="w-12 h-12 rounded-lg object-cover bg-slate-200" />
                              <div>
                                  <p className="font-bold text-slate-900 text-sm">{post.title}</p>
                                  <p className="text-slate-500 text-xs">{post.date}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                   <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-4">
                       <LayoutGrid size={32} />
                   </div>
                   <h3 className="font-bold text-slate-900 text-lg mb-2">Gérer le contenu</h3>
                   <p className="text-slate-500 text-sm mb-6 max-w-xs">Modifiez les services, l'équipe et les informations de la clinique facilement.</p>
                   <button onClick={() => setActiveTab('info')} className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition">
                       Configuration
                   </button>
              </div>
          </div>
      </div>
  );

  const renderClinicInfo = () => (
    <div className="space-y-6 animate-fadeIn">
      {/* Home Page Settings (Hero) */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-4 mb-6 flex items-center gap-2"><Home size={20} /> Page d'Accueil</h2>
          <div className="grid grid-cols-1 gap-6">
              <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Titre Principal (Hero)</label>
                  <input 
                      type="text" 
                      value={clinicInfo.heroTitle || ""} 
                      onChange={(e) => handleClinicInfoChange('heroTitle', e.target.value)} 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none font-bold text-lg"
                      placeholder="Ex: Médecine vétérinaire d'excellence..."
                  />
              </div>
              <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Sous-titre</label>
                  <textarea 
                      value={clinicInfo.heroSubtitle || ""} 
                      onChange={(e) => handleClinicInfoChange('heroSubtitle', e.target.value)} 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none h-24"
                      placeholder="Phrase d'accroche..."
                  />
              </div>
              <ImageInput 
                  label="Image de fond (Hero)" 
                  value={clinicInfo.heroImage || ""} 
                  onChange={(val) => handleClinicInfoChange('heroImage', val)} 
              />
          </div>
      </div>

      {/* General Info */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 border-b pb-4 mb-6 flex items-center gap-2"><Settings size={20} /> Informations Générales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nom de la clinique</label>
            <input 
                type="text" 
                value={clinicInfo.name} 
                onChange={(e) => handleClinicInfoChange('name', e.target.value)} 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
            </div>
            <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Téléphone</label>
            <input 
                type="text" 
                value={clinicInfo.phone} 
                onChange={(e) => handleClinicInfoChange('phone', e.target.value)} 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
            </div>
            <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Adresse</label>
            <input 
                type="text" 
                value={clinicInfo.address} 
                onChange={(e) => handleClinicInfoChange('address', e.target.value)} 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
            </div>
            <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
            <input 
                type="text" 
                value={clinicInfo.email} 
                onChange={(e) => handleClinicInfoChange('email', e.target.value)} 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Lien Tipaw (Prise de RDV)</label>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={clinicInfo.tipawLink} 
                        onChange={(e) => handleClinicInfoChange('tipawLink', e.target.value)} 
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                    <a href={clinicInfo.tipawLink} target="_blank" className="bg-slate-100 hover:bg-slate-200 p-3 rounded-lg text-slate-600 flex items-center justify-center"><ArrowLeft size={20} className="rotate-135" /></a>
                </div>
            </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h3 className="font-bold text-slate-900 mb-4 text-primary">Horaires Magasin / Accueil</h3>
                {clinicInfo.hours.map((h, i) => (
                <div key={i} className="flex gap-4 mb-3 items-center">
                    <input 
                    value={h.day} 
                    onChange={(e) => handleHourChange(i, 'day', e.target.value)}
                    className="w-1/3 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none font-medium text-slate-700 text-xs"
                    />
                    <input 
                    value={h.hours} 
                    onChange={(e) => handleHourChange(i, 'hours', e.target.value)}
                    className="w-2/3 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-xs"
                    />
                </div>
                ))}
            </div>

            <div>
                <h3 className="font-bold text-slate-900 mb-4 text-primary">Horaires Consultations (RDV)</h3>
                {(clinicInfo.consultationHours || []).map((h, i) => (
                <div key={i} className="flex gap-4 mb-3 items-center">
                    <input 
                    value={h.day} 
                    onChange={(e) => handleConsultationHourChange(i, 'day', e.target.value)}
                    className="w-1/3 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none font-medium text-slate-700 text-xs"
                    />
                    <input 
                    value={h.hours} 
                    onChange={(e) => handleConsultationHourChange(i, 'hours', e.target.value)}
                    className="w-2/3 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-xs"
                    />
                </div>
                ))}
            </div>
        </div>

        <div className="mt-8 pt-4 flex justify-end">
            <button onClick={saveClinicInfo} className="bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-600 transition flex items-center gap-2">
                <Save size={18} /> Enregistrer les modifications
            </button>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6 animate-fadeIn">
      {services.map(service => (
        <div key={service.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition hover:shadow-md">
          <div className="p-6 flex justify-between items-center bg-slate-50 border-b border-slate-100">
             <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm border border-slate-100 font-bold">
                    {service.iconName.slice(0, 2)}
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">ID: {service.id}</p>
                 </div>
             </div>
             <button 
                onClick={() => setEditId(editId === service.id ? null : service.id)} 
                className={`px-4 py-2 rounded-lg font-medium text-sm transition ${editId === service.id ? 'bg-slate-200 text-slate-800' : 'bg-white text-primary border border-slate-200 hover:bg-blue-50'}`}
             >
               {editId === service.id ? 'Fermer' : 'Modifier'}
             </button>
          </div>
          
          {editId === service.id && (
            <div className="p-8 space-y-6 bg-white">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Titre du service</label>
                        <input 
                            className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary outline-none" 
                            value={service.title}
                            onChange={(e) => updateService(service.id, { ...service, title: e.target.value })}
                        />
                   </div>
                   <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Nom de l'icône (Lucide React)</label>
                        <input 
                            className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary outline-none" 
                            value={service.iconName}
                            onChange={(e) => updateService(service.id, { ...service, iconName: e.target.value })}
                        />
                   </div>
               </div>
               
               <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Description courte (Liste)</label>
                  <textarea 
                    className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary outline-none" 
                    value={service.shortDescription}
                    onChange={(e) => updateService(service.id, { ...service, shortDescription: e.target.value })}
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Description complète (Page détail)</label>
                  <textarea 
                    className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary outline-none h-48" 
                    value={service.fullDescription}
                    onChange={(e) => updateService(service.id, { ...service, fullDescription: e.target.value })}
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Points forts (un par ligne)</label>
                  <textarea 
                    className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary outline-none h-32 font-mono text-sm" 
                    value={service.features.join('\n')}
                    onChange={(e) => updateService(service.id, { ...service, features: e.target.value.split('\n') })}
                  />
               </div>
               <div className="flex justify-end pt-4">
                   <button onClick={() => { setEditId(null); showToast("Service mis à jour"); }} className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition flex items-center gap-2">
                       <CheckCircle size={18} /> Enregistrer
                   </button>
               </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderTeam = () => {
    const handleAdd = () => {
        const newMember: TeamMember = {
            id: Date.now().toString(),
            name: "Nouveau Membre",
            role: "Vétérinaire",
            bio: "Biographie à rédiger...",
            imageUrl: "https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2284501_640.jpg"
        };
        addTeamMember(newMember);
        setEditId(newMember.id);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Membres de l'équipe</h2>
                <button onClick={handleAdd} className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition shadow-lg shadow-blue-200 font-bold">
                    <Plus size={18} /> Ajouter un membre
                </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                {team.map(member => (
                    <div key={member.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        {editId === member.id ? (
                            <div className="p-8 space-y-6">
                                <div className="flex justify-between items-center border-b pb-4 mb-4">
                                    <h3 className="font-bold text-lg">Édition : {member.name}</h3>
                                    <button onClick={() => deleteTeamMember(member.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><Trash2 size={20} /></button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Nom complet</label>
                                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg" value={member.name} onChange={(e) => updateTeamMember(member.id, {...member, name: e.target.value})} placeholder="Nom" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Rôle / Spécialité</label>
                                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg" value={member.role} onChange={(e) => updateTeamMember(member.id, {...member, role: e.target.value})} placeholder="Rôle" />
                                    </div>
                                </div>
                                <ImageInput 
                                    label="Photo de profil" 
                                    value={member.imageUrl} 
                                    onChange={(val) => updateTeamMember(member.id, {...member, imageUrl: val})} 
                                />
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Biographie</label>
                                    <textarea className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg h-32" value={member.bio} onChange={(e) => updateTeamMember(member.id, {...member, bio: e.target.value})} placeholder="Biographie" />
                                </div>
                                <div className="flex gap-2 justify-end pt-4">
                                    <button onClick={() => setEditId(null)} className="text-slate-500 font-bold px-4 hover:text-slate-700">Annuler</button>
                                    <button onClick={() => { setEditId(null); showToast("Membre enregistré"); }} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2"><Save size={18} /> Enregistrer</button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
                                <img src={member.imageUrl} className="w-24 h-24 object-cover rounded-full border-4 border-slate-100 shadow-sm" alt="avatar" />
                                <div className="flex-grow text-center md:text-left">
                                    <div className="flex flex-col md:flex-row justify-between items-center mb-2">
                                        <div>
                                            <h4 className="font-bold text-xl text-slate-900">{member.name}</h4>
                                            <p className="text-primary font-medium">{member.role}</p>
                                        </div>
                                        <button onClick={() => setEditId(member.id)} className="mt-4 md:mt-0 text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-2 rounded-lg transition">Modifier</button>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
  };

  const renderBlog = () => {
    const handleAdd = () => {
        const newPost: BlogPost = {
            id: Date.now().toString(),
            title: "Nouvel Article",
            excerpt: "Résumé...",
            date: new Date().toLocaleDateString('fr-FR'),
            category: "Général",
            imageUrl: "https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_640.jpg"
        };
        addBlogPost(newPost);
        setEditId(newPost.id);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Blog & Actualités</h2>
                <button onClick={handleAdd} className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition shadow-lg shadow-blue-200 font-bold">
                    <Plus size={18} /> Créer un article
                </button>
            </div>
             <div className="space-y-6">
                {blogPosts.map(post => (
                    <div key={post.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                         {editId === post.id ? (
                                <div className="p-8 space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Titre de l'article</label>
                                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-lg font-bold text-slate-800" value={post.title} onChange={(e) => updateBlogPost(post.id, {...post, title: e.target.value})} placeholder="Titre" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Date de publication</label>
                                            <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm" value={post.date} onChange={(e) => updateBlogPost(post.id, {...post, date: e.target.value})} placeholder="Date" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Catégorie</label>
                                            <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm" value={post.category} onChange={(e) => updateBlogPost(post.id, {...post, category: e.target.value})} placeholder="Catégorie" />
                                        </div>
                                    </div>
                                    <ImageInput 
                                        label="Image de couverture" 
                                        value={post.imageUrl} 
                                        onChange={(val) => updateBlogPost(post.id, {...post, imageUrl: val})} 
                                    />
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Contenu / Résumé</label>
                                        <textarea className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm h-40" value={post.excerpt} onChange={(e) => updateBlogPost(post.id, {...post, excerpt: e.target.value})} placeholder="Résumé" />
                                    </div>
                                    
                                    <div className="flex gap-4 justify-between pt-4 border-t border-slate-100">
                                        <button onClick={() => deleteBlogPost(post.id)} className="text-red-500 px-4 py-2 rounded hover:bg-red-50 flex items-center gap-2 transition font-medium"><Trash2 size={18} /> Supprimer l'article</button>
                                        <div className="flex gap-2">
                                            <button onClick={() => setEditId(null)} className="text-slate-500 font-bold px-4 hover:text-slate-700">Annuler</button>
                                            <button onClick={() => { setEditId(null); showToast("Article publié"); }} className="bg-slate-900 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition font-bold"><Save size={18} /> Enregistrer</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-64 h-48 relative">
                                        <img src={post.imageUrl} className="w-full h-full object-cover" alt="post" />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold uppercase shadow-sm">
                                            {post.category}
                                        </div>
                                    </div>
                                    <div className="flex-grow p-6 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-xl text-slate-900">{post.title}</h4>
                                                <span className="text-xs text-slate-400 whitespace-nowrap">{post.date}</span>
                                            </div>
                                            <p className="text-slate-600 line-clamp-2 leading-relaxed mb-4">{post.excerpt}</p>
                                        </div>
                                        <div className="flex justify-end">
                                            <button onClick={() => setEditId(post.id)} className="text-sm font-bold text-primary hover:bg-blue-50 px-4 py-2 rounded-lg transition border border-transparent hover:border-blue-100">Modifier l'article</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                ))}
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      
      {/* Toast Notification */}
      {toast && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce-in text-white font-bold ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {toast.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
              {toast.message}
          </div>
      )}

      {/* Sidebar - Premium Dark */}
      <aside className="w-72 bg-slate-900 text-white hidden md:flex flex-col fixed h-full shadow-2xl z-20">
        <div className="p-8 pb-0">
            <div className="flex items-center gap-3 mb-10 text-white/90">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold">A</div>
                <h2 className="text-xl font-bold tracking-tight">Admin Console</h2>
            </div>
            
            <nav className="space-y-2">
                <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-4 p-4 rounded-xl transition font-medium ${activeTab === 'dashboard' ? 'bg-primary text-white shadow-lg shadow-blue-900/50 translate-x-1' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <LayoutGrid size={20} /> Tableau de bord
                </button>
                <div className="pt-4 pb-2">
                    <p className="text-xs font-bold text-slate-600 uppercase px-4">Contenu</p>
                </div>
                <button onClick={() => setActiveTab('info')} className={`w-full flex items-center gap-4 p-4 rounded-xl transition font-medium ${activeTab === 'info' ? 'bg-slate-800 text-white shadow-sm border border-slate-700 translate-x-1' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <Settings size={20} /> Configuration
                </button>
                <button onClick={() => setActiveTab('services')} className={`w-full flex items-center gap-4 p-4 rounded-xl transition font-medium ${activeTab === 'services' ? 'bg-slate-800 text-white shadow-sm border border-slate-700 translate-x-1' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <Users size={20} /> Services
                </button>
                <button onClick={() => setActiveTab('team')} className={`w-full flex items-center gap-4 p-4 rounded-xl transition font-medium ${activeTab === 'team' ? 'bg-slate-800 text-white shadow-sm border border-slate-700 translate-x-1' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <Users size={20} /> Équipe
                </button>
                <button onClick={() => setActiveTab('blog')} className={`w-full flex items-center gap-4 p-4 rounded-xl transition font-medium ${activeTab === 'blog' ? 'bg-slate-800 text-white shadow-sm border border-slate-700 translate-x-1' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <FileText size={20} /> Blog
                </button>
            </nav>
        </div>
        <div className="mt-auto p-6 border-t border-slate-800 bg-slate-950">
             <Link to="/" className="flex items-center gap-3 text-slate-400 hover:text-white mb-4 transition text-sm font-medium"><ArrowLeft size={16} /> Voir le site</Link>
             <button onClick={logout} className="flex items-center justify-center gap-2 text-red-400 hover:bg-red-900/20 hover:text-red-300 transition w-full p-3 rounded-lg border border-red-900/30 text-sm font-bold">
                <LogOut size={16} /> Déconnexion
             </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
            {/* Header Mobile */}
            <div className="md:hidden flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Admin</h1>
                <button onClick={logout} className="p-2 bg-slate-200 rounded-full"><LogOut size={20} /></button>
            </div>

            {/* Title & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 capitalize tracking-tight">
                        {activeTab === 'dashboard' && 'Vue d\'ensemble'}
                        {activeTab === 'info' && 'Configuration'}
                        {activeTab === 'services' && 'Services'}
                        {activeTab === 'team' && 'Équipe'}
                        {activeTab === 'blog' && 'Actualités'}
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">Gérez le contenu de votre site internet.</p>
                </div>
                {activeTab !== 'dashboard' && (
                    <button onClick={resetToDefaults} className="text-sm text-red-400 hover:text-red-600 underline decoration-dotted opacity-70 hover:opacity-100 transition">Réinitialiser les données</button>
                )}
            </div>
            
            {/* Mobile Nav Tabs */}
            <div className="mb-8 md:hidden flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                 {['dashboard', 'info', 'services', 'team', 'blog'].map(tab => (
                     <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap shadow-sm transition ${activeTab === tab ? 'bg-primary text-white' : 'bg-white text-slate-600'}`}>
                         {tab}
                     </button>
                 ))}
            </div>

            {/* Content Area */}
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'info' && renderClinicInfo()}
            {activeTab === 'services' && renderServices()}
            {activeTab === 'team' && renderTeam()}
            {activeTab === 'blog' && renderBlog()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;