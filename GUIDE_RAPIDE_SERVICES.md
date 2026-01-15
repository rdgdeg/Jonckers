# Guide Rapide - Modifier les Images des Services

## 🎯 Où Trouver l'Option

### Étape 1: Accéder à l'Admin
1. Va sur: `http://localhost:3000/veto/#/admin`
2. Connecte-toi avec tes identifiants

### Étape 2: Trouver l'Onglet Services
Dans la **sidebar gauche**, tu verras maintenant:

```
📊 Tableau de bord
📦 Commandes
🛍️ Produits
📄 Contenu
🩺 Services    ← CLIQUE ICI!
📝 Blog
🖼️ Médias
⚙️ Paramètres
```

L'onglet **"Services"** a une icône de stéthoscope (🩺)

### Étape 3: Modifier un Service
1. Clique sur **"Services"** dans la sidebar
2. Tu verras la liste de tous les services:
   - Médecine Générale
   - Chirurgie
   - Urgences
   - Imagerie Médicale
   - Hospitalisation
   - Colombophilie & NAC

3. Clique sur l'**icône crayon (✏️)** du service à modifier

### Étape 4: Changer l'Image
1. Scroll jusqu'à voir **"Image du service"**
2. Tu as 2 options:
   
   **Option A: URL d'image**
   - Colle une URL d'image (Unsplash, Pexels, etc.)
   - Exemple: `https://images.unsplash.com/photo-...`
   
   **Option B: Upload**
   - Clique sur "Choisir un fichier"
   - Sélectionne une image depuis ton ordinateur

3. Clique sur **"Sauvegarder"**

### Étape 5: Vérifier le Résultat
1. Va sur la page publique: `http://localhost:3000/veto/#/services`
2. Clique sur le service modifié
3. L'image apparaît en haut de la page!

## 🖼️ Où Trouver des Images

### Sites Recommandés (Gratuits)

1. **Unsplash** - https://unsplash.com
   - Recherche: "veterinary", "animal care", "pet clinic"
   - Clic droit sur l'image → "Copier l'adresse de l'image"

2. **Pexels** - https://www.pexels.com
   - Recherche: "veterinarian", "animal hospital"
   - Clic droit → "Copier l'adresse de l'image"

3. **Pixabay** - https://pixabay.com
   - Recherche: "vétérinaire", "clinique animaux"
   - Télécharge ou copie l'URL

## 💡 Conseils

### Pour de Belles Images:
- **Format**: Paysage (horizontal)
- **Résolution**: Minimum 1920x1080px
- **Ratio**: 16:9 idéal
- **Contenu**: Éviter texte ou watermark

### Exemples d'Images par Service:

**Médecine Générale**
- Vétérinaire examinant un animal
- Consultation avec propriétaire
- Stéthoscope sur animal

**Chirurgie**
- Bloc opératoire vétérinaire
- Équipe chirurgicale
- Instruments chirurgicaux

**Urgences**
- Ambulance vétérinaire
- Équipement d'urgence
- Salle d'urgence

**Imagerie Médicale**
- Appareil de radiographie
- Échographe
- Vétérinaire analysant radio

**Hospitalisation**
- Chenil propre et moderne
- Animal en convalescence
- Cage d'hospitalisation

**Colombophilie & NAC**
- Pigeon voyageur
- Lapin, furet, oiseau
- Consultation NAC

## 🎨 Nouveau Design des Horaires

Les horaires ont été complètement refaits avec un design moderne:

### Sur la Page Contact:
- Cartes séparées pour Magasin et Consultations
- Fond sombre avec bordures élégantes
- Icônes colorées (bleu et vert)
- Lignes séparatrices entre les jours

### Sur la Page Horaires (si elle existe):
- Fond dégradé bleu
- Cartes blanches avec ombres
- Design épuré et professionnel
- Encadré bleu pour les informations importantes

## ❓ Problèmes Courants

### "Je ne vois pas l'onglet Services"
- Rafraîchis la page (Cmd+R ou F5)
- Vide le cache (Cmd+Shift+R)
- Vérifie que tu es bien connecté à l'admin

### "L'image ne s'affiche pas"
- Vérifie que l'URL est correcte
- Essaie avec une autre image
- Vérifie que l'image est accessible publiquement

### "L'image est trop lourde"
- Utilise des URLs externes (Unsplash)
- Ou compresse l'image avant upload
- Limite: ~500 KB recommandé

## 📱 Responsive

Les horaires et les images s'adaptent automatiquement:
- **Desktop**: 2 colonnes côte à côte
- **Tablet**: 2 colonnes
- **Mobile**: 1 colonne empilée

---

**Besoin d'aide?** Consulte `MODIFICATIONS_V3_SERVICES.md` pour plus de détails techniques.
