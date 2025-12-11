#!/bin/bash

# Script de déploiement pour PlanetHoster
echo "🚀 Déploiement de la clinique vétérinaire Jonckers-Thoumsin"

# Vérification des dépendances
echo "📦 Installation des dépendances..."
npm ci

# Build de production
echo "🔨 Build de production..."
npm run build

# Optimisation des images (optionnel)
echo "🖼️ Optimisation des images..."
# Vous pouvez ajouter ici des outils d'optimisation d'images

# Vérification du build
if [ -d "dist" ]; then
    echo "✅ Build réussi ! Dossier dist créé."
    echo "📁 Contenu du dossier dist :"
    ls -la dist/
else
    echo "❌ Erreur : Le dossier dist n'a pas été créé."
    exit 1
fi

echo "🎉 Déploiement prêt !"
echo "📋 Instructions pour PlanetHoster :"
echo "1. Uploadez le contenu du dossier 'dist' dans votre dossier public_html"
echo "2. Assurez-vous que le fichier .htaccess est bien présent"
echo "3. Configurez votre domaine pour pointer vers public_html"
echo "4. Testez votre site !"

# Affichage des statistiques du build
echo ""
echo "📊 Statistiques du build :"
du -sh dist/
echo "Nombre de fichiers : $(find dist -type f | wc -l)"