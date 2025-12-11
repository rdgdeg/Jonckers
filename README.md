# Clinique Vétérinaire Jonckers-Thoumsin

Site web moderne pour la clinique vétérinaire Jonckers-Thoumsin à Chièvres.

## 🚀 Déploiement sur Vercel

### Prérequis
- Node.js 18+ 
- Compte Vercel

### Instructions de déploiement

1. **Connecter le repository à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Importer le projet depuis GitHub
   - Vercel détectera automatiquement qu'il s'agit d'un projet Vite

2. **Configuration automatique**
   - Build Command: `npm ci && npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`

3. **Variables d'environnement (optionnel)**
   - `GEMINI_API_KEY` : Clé API Gemini (si utilisée)

### Résolution des problèmes de page blanche

Si vous obtenez une page blanche après déploiement :

1. **Vérifier les logs de build**
   - Aller dans l'onglet "Functions" de votre projet Vercel
   - Vérifier qu'il n'y a pas d'erreurs de build

2. **Vérifier la console du navigateur**
   - Ouvrir les outils de développement (F12)
   - Regarder s'il y a des erreurs JavaScript

3. **Forcer un nouveau déploiement**
   - Dans Vercel, aller dans "Deployments"
   - Cliquer sur "Redeploy" sur le dernier déploiement

## 🛠 Développement Local

1. **Installation**
   ```bash
   npm install
   ```

2. **Développement**
   ```bash
   npm run dev
   ```

3. **Build de production**
   ```bash
   npm run build
   ```

4. **Preview du build**
   ```bash
   npm run preview
   ```

5. **Vérification des types**
   ```bash
   npm run type-check
   ```

## 📁 Structure du projet

```
├── components/          # Composants React réutilisables
├── contexts/           # Contextes React (Auth, Data)
├── pages/             # Pages de l'application
├── constants.tsx      # Données par défaut
├── types.ts          # Types TypeScript
├── App.tsx           # Composant principal
├── index.tsx         # Point d'entrée
├── index.html        # Template HTML
└── vercel.json       # Configuration Vercel
```

## 🔧 Technologies utilisées

- **React 19** avec TypeScript
- **React Router** pour la navigation
- **Tailwind CSS** pour le styling
- **Vite** pour le build
- **Lucide React** pour les icônes
