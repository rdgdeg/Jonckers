# 🚀 Déploiement dans un Sous-Dossier (ldmedia.info/veto)

## 📍 Configuration Actuelle

Votre site est configuré pour fonctionner dans un **sous-dossier** :

```
URL : https://ldmedia.info/veto/
```

## ✅ Modifications Appliquées

### 1. vite.config.ts
```typescript
base: '/veto/'  // ← Chemin de base configuré
```

### 2. .htaccess
```apache
RewriteBase /veto/  // ← Base path pour Apache
```

### 3. Chemins des assets
Tous les assets utilisent maintenant `/veto/` :
- `/veto/assets/index-*.js`
- `/veto/images/...`

## 📂 Structure sur le Serveur

Sur o2switch, votre structure sera :

```
/public_html/
└── veto/                          ← Créez ce dossier
    ├── .htaccess                  ← IMPORTANT
    ├── index.html
    ├── assets/
    │   └── index-BH-9aQPl.js
    └── images/
```

## 🚀 Déploiement (3 Étapes)

### Étape 1 : Créer le Dossier

**Via FTP** :
1. Connectez-vous à o2switch
2. Naviguez vers `/public_html/`
3. Créez un dossier nommé `veto`

**Via cPanel** :
1. Gestionnaire de fichiers
2. Naviguez vers `/public_html/`
3. Nouveau dossier → `veto`

### Étape 2 : Upload des Fichiers

Uploadez **tout le contenu** de `dist/` dans `/public_html/veto/` :

```
/public_html/veto/
├── .htaccess          ← Vérifiez qu'il est bien uploadé !
├── index.html
├── assets/
└── images/
```

⚠️ **IMPORTANT** : Uploadez le **CONTENU** de dist/, pas le dossier dist/ lui-même !

### Étape 3 : Test

Visitez : **https://ldmedia.info/veto/**

URLs du site :
- Accueil : `https://ldmedia.info/veto/#/`
- Services : `https://ldmedia.info/veto/#/services`
- Équipe : `https://ldmedia.info/veto/#/team`
- Admin : `https://ldmedia.info/veto/#/admin`

## ✅ Vérifications Post-Déploiement

### 1. Vérifier que le site charge
```
✅ https://ldmedia.info/veto/
```

### 2. Vérifier les assets
Ouvrez la console (F12) → Onglet Network :
```
✅ /veto/assets/index-*.js → Status 200
✅ Pas d'erreur 404
```

### 3. Vérifier la navigation
```
✅ Cliquez sur les menus
✅ Testez le refresh (F5) sur une page
✅ Testez les liens directs
```

### 4. Vérifier l'admin
```
✅ https://ldmedia.info/veto/#/admin
✅ Mot de passe : admin
```

## 🔧 Dépannage

### Problème : Page blanche

**Cause** : Chemins des assets incorrects

**Solution** :
1. Vérifiez que `base: '/veto/'` est dans vite.config.ts
2. Recompilez : `npm run build`
3. Re-uploadez

### Problème : Assets 404

**Cause** : Fichiers uploadés au mauvais endroit

**Solution** :
Vérifiez la structure :
```
/public_html/veto/assets/  ← Doit être ici
PAS /public_html/assets/   ← Pas ici !
```

### Problème : Erreur 500

**Cause** : .htaccess mal configuré

**Solution** :
1. Vérifiez que `RewriteBase /veto/` est dans .htaccess
2. Vérifiez les permissions (644)

### Problème : Refresh donne 404

**Cause** : .htaccess manquant ou mal configuré

**Solution** :
1. Vérifiez que .htaccess est uploadé
2. Vérifiez que mod_rewrite est activé

## 🔄 Pour Changer de Dossier

Si vous voulez changer le nom du dossier (ex: `/veterinaire/`) :

1. **Modifiez vite.config.ts** :
```typescript
base: '/veterinaire/'  // ← Nouveau nom
```

2. **Modifiez .htaccess** :
```apache
RewriteBase /veterinaire/  // ← Nouveau nom
```

3. **Recompilez** :
```bash
npm run build
```

4. **Uploadez** dans le nouveau dossier

## 🌐 Pour Mettre à la Racine

Si finalement vous voulez mettre le site à la racine (`ldmedia.info/`) :

1. **Modifiez vite.config.ts** :
```typescript
base: '/'  // ← Racine
```

2. **Modifiez .htaccess** :
```apache
RewriteBase /  // ← Racine
```

3. **Recompilez** :
```bash
npm run build
```

4. **Uploadez** dans `/public_html/`

## 📊 Avantages du Sous-Dossier

✅ **Cohabitation** : Votre site principal reste intact
✅ **Test** : Vous pouvez tester avant de mettre en production
✅ **Organisation** : Plusieurs sites sur le même domaine
✅ **Flexibilité** : Facile de déplacer plus tard

## ⚠️ Limitations

❌ **SEO** : URLs plus longues (`/veto/` dans l'URL)
❌ **Partage** : Liens moins "propres"
❌ **Domaine** : Pas de domaine dédié (ex: jonckers-thoumsin.be)

## 💡 Recommandation Finale

### Pour un site de test / démo :
✅ **Gardez `/veto/`** - Parfait pour tester

### Pour un site en production :
✅ **Utilisez un domaine dédié** - Plus professionnel
   - Exemple : jonckers-thoumsin.be
   - Ou sous-domaine : veto.ldmedia.info

## 📞 Support

Si vous avez des problèmes :
1. Vérifiez la console (F12)
2. Vérifiez les chemins des assets
3. Vérifiez que .htaccess est présent
4. Contactez le support o2switch si nécessaire

---

**Configuration actuelle** : ✅ Prêt pour ldmedia.info/veto/
**Date** : 15 janvier 2026