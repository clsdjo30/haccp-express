1. Cahier des charges – Prototype « HACCP Express »
1.1. Objectif du prototype

Montrer ta compréhension métier HACCP (chef / restaurateur).

Montrer ta capacité à :

Concevoir un flux simple, rapide, sans usine à gaz.

Gérer des fonctionnalités « réelles » : checklists, QR code, impression Bluetooth.

Servir de projet signature sur ton portfolio (preuve concrète de ton expertise resto + dev mobile).

Le prototype doit être utilisable de bout en bout par un chef dans un restaurant fictif ou réel, mais sans chercher à couvrir toute la norme HACCP.

1.2. Personas cibles

Chef de cuisine / Responsable de restaurant

Besoin : gagner du temps, ne plus courir derrière les papiers HACCP.

Usage : quelques actions rapides par jour, sur son téléphone.

Équipier / Employé de cuisine

Besoin : effectuer les contrôles demandés simplement, sans réfléchir à la paperasse.

Usage : suit des checklists simples, scanne des QR codes sur les équipements.

Pour le POC, tu peux te contenter d’un seul rôle « Utilisateur » avec un accès unique, sans gestion complexe de permissions.

1.3. Fonctionnalités principales (MVP POC)

L’application se limite volontairement à 3 blocs clés :

1.3.1. Bloc 1 – Checklists rapides HACCP

Use case principal :
« Relevé Frigo 1 – l’utilisateur ouvre l’app, tape la température, valide. 3 secondes. »

Fonctionnalités :

Liste des checklists du jour

Écran listant les actions à faire (exemples) :

Relevé Frigo 1 – matin

Relevé Frigo 2 – matin

Contrôle température plat témoin – service midi

Statut par checklist : À faire, Fait, En retard (optionnel pour POC).

Saisie ultra rapide d’un relevé

Tap sur une checklist → écran simple :

Titre : « Relevé Frigo 1 – Matin »

Champ numérique : température (ex: 3.5)

Bouton Valider

Validation en 1 clic :

Sauvegarde de la valeur

Date/heure auto (pas à saisir)

Utilisateur auto (ex: prénom stocké dans les settings de l’app)

Historique minimal (POC)

Pour chaque checklist, afficher les derniers relevés :

Liste simple : Date/heure – Valeur – Statut (OK / Alerte).

Seuils de contrôle simples (config codée en dur ou stockée en local) :

Ex : Frigo 1 : seuil entre 0°C et 4°C

Si en dehors → badge rouge « ALERTE ».

1.3.2. Bloc 2 – Scan QR Code : validation Plan de Nettoyage

Use case principal :
« Sur la friteuse, un QR code collé. L’utilisateur scanne, valide le nettoyage en 2 taps. »

Fonctionnalités :

Scan QR Code

Bouton « Scanner un équipement » accessible depuis l’écran d’accueil.

Ouverture d’un écran de scan (expo-camera / expo-barcode-scanner).

Le QR code contient un identifiant d’équipement (ex: EQUIP_FRIT_001).

Reconnaissance de l’équipement

Après scan :

Affichage du nom : « Friteuse 1 – Cuisine chaude »

Liste des tâches HACCP associées (pour le POC, une tâche principale suffit) :

« Nettoyage quotidien »

« Changement d’huile »

Pour le POC, le mapping QR → équipement peut être:

Codé en dur dans l’app, ou

Stocké dans un petit JSON / AsyncStorage / Firestore simple.

Validation du nettoyage

L’utilisateur choisit la tâche (ou auto-sélection si une seule).

Écran de validation :

Titre : « Nettoyage Friteuse 1 – quotidien »

Bouton Valider

Enregistrement :

Date/heure

Équipement

Type de tâche

Historique par équipement

Liste des dernières validations :

Date/heure – Utilisateur

Permet de montrer dans la démo que « c’est tracé ».

1.3.3. Bloc 3 – Impression d’étiquettes DLC via imprimante Bluetooth

Use case principal :
« L’utilisateur prépare un bac de salade. Il ouvre l’app, choisit un produit, l’app calcule la DLC, et imprime une étiquette. »

Fonctionnalités :

Catalogue simple de produits HACCP

Liste de produits (POC) :

Salade verte – DLC 2 jours

Poulet cuit – DLC 3 jours

Sauce maison – DLC 2 jours

Pour chaque produit :

Nom

Durée de vie (en jours)

Stockage local (JSON / AsyncStorage) pour le POC.

Création d’une étiquette

L’utilisateur :

Choisit un produit dans la liste

Saisit éventuellement une petite note (ex: « Bac n°2 »)

L’app calcule automatiquement :

Date de fabrication = maintenant (ou saisie manuelle optionnelle)

Date limite de consommation (DLC) = fabrication + durée de vie

Prévisualisation d’étiquette

Affichage de ce qui sera imprimé :

Nom du produit

Date de fabrication

DLC

Optionnel : Nom du restaurant / Logo (pour POC, texte simple suffit).

Impression via Bluetooth

Recherche et sélection d’une imprimante compatible (POC : tu peux viser une marque standard type imprimante thermique mobile).

Bouton Imprimer :

Envoi de la commande d’impression.

Pour le POC :

Soit tu connectes une vraie imprimante.

Soit tu simules la réussite (mock) + log en console.

L’objectif du POC est surtout de montrer : UI + logique + appel à l’API Bluetooth, même si en démo tu n’as pas toujours l’imprimante sous la main.

1.4. Fonctionnalités secondaires (POC)

Écran d’accueil simple

3 boutons principaux :

« Checklists du jour »

« Scanner un équipement »

« Imprimer une étiquette DLC »

Paramètres utilisateur minimalistes

Nom de l’utilisateur (chef / employé) – pour afficher dans les historiques.

Nom du restaurant (utilisé sur les écrans et éventuellement sur les étiquettes).

Mode offline

Pour le POC, tout peut être stocké en local (AsyncStorage) :

Relevés de température

Validations nettoyage

Étiquettes imprimées

L’objectif : montrer que l’app reste utilisable sans réseau.

1.5. Contraintes non fonctionnelles (POC)

Simplicité UX :

Maximum 3–4 écrans principaux.

Chaque flux (relevé / scan / impression) doit se faire en moins de 5 actions.

Performance :

Temps de lancement raisonnable.

UI fluide, boutons réactifs.

Design :

Thème sobre, pro (blanc / bleu / vert), lisibilité même dans une cuisine.

Utilisation des composants de base du starter Obytes (boutons, typographie, theming).

Sécurité (POC) :

Pas d’auth ultra complexe.

Un simple écran « PIN » ou « code à 4 chiffres » suffirait si tu veux montrer une intention.

1.6. Architecture technique (haut niveau)

Front mobile : React Native + Expo + starter Obytes.

Stockage :

POC : AsyncStorage / SQLite local.

Modules Expo / libs possibles :

Scanner QR : expo-barcode-scanner ou expo-camera.

Bluetooth : lib dédiée (type react-native-ble-plx ou plugin spécifique imprimante).

Organisation :

features/checklists/

features/cleaning/

features/labels/

features/settings/

L’idée est d’avoir des features bien séparées dans le starter Obytes pour montrer que tu sais structurer un projet.
