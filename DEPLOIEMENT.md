# 🚀 Guide de Déploiement - PlanetHoster

## Préparation du site

### 1. Build de production
```bash
npm run build
```

### 2. Vérification du contenu
Le dossier `dist` contient tous les fichiers nécessaires :
- `index.html` - Page principale
- `assets/` - CSS, JS et images optimisés
- `.htaccess` - Configuration serveur

## Déploiement sur PlanetHoster

### 1. Accès au panneau de contrôle
- Connectez-vous à votre espace client PlanetHoster
- Accédez au gestionnaire de fichiers (File Manager)

### 2. Upload des fichiers
1. Naviguez vers le dossier `public_html` de votre domaine
2. Supprimez les fichiers existants (si nécessaire)
3. Uploadez **tout le contenu** du dossier `dist`
4. Vérifiez que le fichier `.htaccess` est bien présent

### 3. Configuration du domaine
- Assurez-vous que votre domaine pointe vers le bon dossier
- Activez le SSL/HTTPS dans le panneau PlanetHoster

### 4. Test du site
- Visitez votre domaine
- Testez la navigation (les routes React doivent fonctionner)
- Vérifiez le CMS admin : `votre-domaine.com/admin`

## Fonctionnalités après déploiement

### ✅ Ce qui fonctionne immédiatement
- Site web complet avec toutes les pages
- CMS d'administration (mot de passe : `admin`)
- Boutique e-commerce avec panier
- Système de commandes
- Responsive design
- Animations et interactions

### 🔧 Améliorations possibles
- **Base de données** : Remplacer localStorage par une vraie DB
- **Emails** : Intégrer un service d'envoi d'emails
- **Paiement** : Ajouter Stripe/PayPal
- **Images** : Utiliser un CDN pour les uploads

## Maintenance

### Mise à jour du contenu
1. Modifiez le contenu via l'interface admin
2. Les données sont sauvegardées dans le navigateur
3. Pour une sauvegarde permanente, exportez les données

### Sauvegardes
- Sauvegardez régulièrement le dossier `public_html`
- Exportez les données du CMS depuis l'interface admin

## Support technique

### Problèmes courants
1. **Routes ne fonctionnent pas** → Vérifiez le fichier `.htaccess`
2. **Images ne s'affichent pas** → Vérifiez les permissions des dossiers
3. **Site lent** → Activez la compression Gzip dans PlanetHoster

### Contact
- Support PlanetHoster : https://www.planethoster.com/support
- Documentation technique : Consultez ce README

## Optimisations PlanetHoster

### Performance
- ✅ Compression Gzip activée
- ✅ Cache des ressources statiques
- ✅ Images optimisées
- ✅ CSS/JS minifiés

### Sécurité
- ✅ Headers de sécurité configurés
- ✅ Protection XSS
- ✅ HTTPS forcé
- ✅ Authentification admin

### SEO
- ✅ Meta tags optimisés
- ✅ Structure HTML sémantique
- ✅ URLs propres
- ✅ Sitemap automatique