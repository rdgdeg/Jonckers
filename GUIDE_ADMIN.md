# 📚 Guide d'Administration - Clinique Vétérinaire

## 🔐 Accès à l'Administration

1. **URL** : `http://localhost:3000/#/admin` (ou votre domaine + `/admin`)
2. **Mot de passe par défaut** : `admin`
3. **Changement du mot de passe** : Modifiez dans `contexts/AuthContext.tsx`

## 🖼️ Modifier les Images des Membres de l'Équipe

### Méthode 1 : Via l'Interface Admin (Recommandé)

1. **Connectez-vous** à l'admin (`/admin`)
2. Cliquez sur **"Contenu"** dans le menu latéral
3. Descendez jusqu'à la section **"Équipe"**
4. Cliquez sur l'icône **"Modifier"** (crayon) du membre à éditer
5. Dans le formulaire, vous verrez **"Photo de profil"**
6. **Collez l'URL** d'une image (ex: depuis Unsplash, votre serveur, etc.)
7. Cliquez sur **"Sauvegarder"**

### Méthode 2 : Modifier directement dans le code

Éditez le fichier `constants.tsx` :

```typescript
export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "frederic-jonckers",
    name: "Dr. Frederic Jonckers",
    role: "Vétérinaire Fondateur",
    bio: "...",
    imageUrl: "VOTRE_URL_ICI", // ← Changez cette URL
    cv: { ... }
  },
  // ...
]
```

### Sources d'images recommandées :

- **Unsplash** : https://unsplash.com (images gratuites haute qualité)
- **Pexels** : https://pexels.com (images gratuites)
- **Votre propre serveur** : Uploadez dans `/public/images/team/`

## 💾 Système de Données Actuel

### ⚠️ Important : LocalStorage (Temporaire)

Actuellement, **TOUTES les données sont stockées dans le navigateur** via `localStorage` :

```
📦 localStorage
├── clinicInfo      → Informations de la clinique
├── services        → Liste des services
├── team            → Membres de l'équipe
├── blogPosts       → Articles du blog
├── products        → Produits (désactivé)
├── orders          → Commandes (désactivé)
├── testimonials    → Témoignages clients
├── pages           → Pages du site
└── media           → Fichiers médias
```

### ✅ Avantages du localStorage :
- Pas de serveur nécessaire
- Modifications instantanées
- Parfait pour le développement

### ❌ Limitations :
- Données perdues si on vide le cache du navigateur
- Pas de synchronisation entre utilisateurs
- Limite de 5-10 MB de stockage
- Pas de backup automatique

## 🗄️ Migration vers une Base de Données Réelle

### Option 1 : Supabase (Recommandé - Gratuit)

**Supabase** est une alternative open-source à Firebase, avec PostgreSQL.

#### Installation :

```bash
npm install @supabase/supabase-js
```

#### Configuration :

1. Créez un compte sur https://supabase.com
2. Créez un nouveau projet
3. Récupérez votre `URL` et `anon key`
4. Créez un fichier `.env` :

```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon
```

#### Structure des tables SQL :

```sql
-- Table clinicInfo
CREATE TABLE clinic_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_image TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table team
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  image_url TEXT,
  cv JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  icon_name TEXT,
  short_description TEXT,
  full_description TEXT,
  features JSONB,
  faqs JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  pet_name TEXT,
  pet_type TEXT,
  rating INTEGER,
  comment TEXT,
  avatar TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table blog_posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  image_url TEXT,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Exemple de code pour Supabase :

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Exemple d'utilisation
export const getTeamMembers = async () => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('created_at', { ascending: true })
  
  if (error) throw error
  return data
}

export const updateTeamMember = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('team_members')
    .update(updates)
    .eq('id', id)
  
  if (error) throw error
  return data
}
```

### Option 2 : Firebase (Google)

```bash
npm install firebase
```

Configuration similaire à Supabase mais avec Firestore.

### Option 3 : Backend personnalisé (Node.js + PostgreSQL)

Si vous voulez un contrôle total :

1. **Backend** : Node.js + Express + PostgreSQL
2. **ORM** : Prisma ou TypeORM
3. **Hébergement** : PlanetHoster (avec accès SSH)

## 📤 Upload d'Images

### Solution temporaire (actuelle) :
- Utilisez des URLs externes (Unsplash, Imgur, etc.)

### Solution recommandée :
1. **Cloudinary** (gratuit jusqu'à 25GB) : https://cloudinary.com
2. **Supabase Storage** (inclus avec Supabase)
3. **AWS S3** (payant mais robuste)

#### Exemple avec Cloudinary :

```typescript
// Upload vers Cloudinary
const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'votre_preset')
  
  const response = await fetch(
    'https://api.cloudinary.com/v1_1/votre_cloud_name/image/upload',
    {
      method: 'POST',
      body: formData
    }
  )
  
  const data = await response.json()
  return data.secure_url // URL de l'image uploadée
}
```

## 🔄 Export/Import des Données

### Export actuel (localStorage) :

```javascript
// Dans la console du navigateur
const data = {
  clinicInfo: localStorage.getItem('clinicInfo'),
  team: localStorage.getItem('team'),
  services: localStorage.getItem('services'),
  // ... etc
}
console.log(JSON.stringify(data, null, 2))
// Copiez et sauvegardez dans un fichier JSON
```

### Import :

```javascript
// Dans la console du navigateur
const data = { /* vos données */ }
Object.keys(data).forEach(key => {
  localStorage.setItem(key, data[key])
})
location.reload()
```

## 🚀 Prochaines Étapes Recommandées

1. **Court terme** : Continuez avec localStorage pour le développement
2. **Moyen terme** : Migrez vers Supabase (gratuit et simple)
3. **Long terme** : Backend personnalisé si besoins spécifiques

## 📞 Support

Pour toute question sur l'administration :
- Consultez ce guide
- Vérifiez les fichiers dans `/contexts/DataContext.tsx`
- Testez dans l'environnement de développement avant production