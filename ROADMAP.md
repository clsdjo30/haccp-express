# HACCP Express - Roadmap de Développement

> Feuille de route détaillée pour le développement du prototype HACCP Express

**Version**: 1.0
**Dernière mise à jour**: 21 janvier 2025
**Statut**: Phase de planification

---

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Principes directeurs](#principes-directeurs)
- [Phases de développement](#phases-de-développement)
- [Timeline estimée](#timeline-estimée)
- [Dépendances techniques](#dépendances-techniques)
- [Métriques de succès](#métriques-de-succès)

---

## Vue d'ensemble

### Objectif du projet

Développer un prototype fonctionnel de HACCP Express permettant aux professionnels de la restauration de gérer leur conformité HACCP via une application mobile simple, rapide et utilisable en conditions réelles de cuisine.

### Portée du MVP

Le MVP se concentre sur trois blocs fonctionnels essentiels :

1. **Checklists HACCP** - Relevés de température rapides
2. **Validation QR** - Contrôle du nettoyage des équipements
3. **Étiquetage DLC** - Impression d'étiquettes via Bluetooth

### Contraintes

- **UX**: Maximum 3-4 taps par workflow
- **Performance**: Temps de réponse < 2 secondes
- **Offline-first**: Fonctionnement sans connexion réseau
- **Simplicité**: Interface intuitive pour personnel non-technique

---

## Principes directeurs

### Architecture

✅ **Modulaire**: Features isolées et réutilisables
✅ **Testable**: Couverture de tests > 70%
✅ **Maintenable**: Code documenté et conventions strictes
✅ **Performant**: Optimisations React Native (memoization, lazy loading)
✅ **Accessible**: Support a11y pour tous les composants

### Méthodologie

- **Développement itératif**: Livraisons fréquentes de fonctionnalités complètes
- **Test-driven**: Tests unitaires et E2E avant chaque release
- **Code review**: Pull requests systématiques avec revue de code
- **Documentation continue**: Mise à jour de CLAUDE.md à chaque pattern majeur

---

## Phases de développement

## 🏗️ Phase 0 - Fondations (Semaine 1-2)

**Objectif**: Préparer l'environnement et l'infrastructure de base

### Tasks

#### 0.1 Configuration du projet

- [x] Initialisation du projet avec Obytes starter
- [x] Configuration des environnements (dev/staging/production)
- [x] Setup CI/CD avec GitHub Actions
- [x] Configuration EAS Build
- [ ] Documentation initiale (CLAUDE.md, ROADMAP.md)

#### 0.2 Architecture de base

- [ ] Définir la structure des features (`src/features/`)
- [ ] Configurer le stockage local (MMKV)
- [ ] Setup du système de navigation (Expo Router)
- [ ] Créer les layouts de base (authenticated/unauthenticated)

#### 0.3 Design System

- [ ] Définir la palette de couleurs HACCP (blanc/bleu/vert pro)
- [ ] Configurer Tailwind avec les tokens de design
- [ ] Créer les composants UI de base :
  - [ ] Boutons (primary, secondary, danger)
  - [ ] Inputs (text, numeric, date)
  - [ ] Cards et containers
  - [ ] Loading states et skeletons
  - [ ] Error boundaries et messages d'erreur

#### 0.4 Utilitaires communs

- [ ] Helpers de formatage (dates, nombres)
- [ ] Helpers de validation (température, dates)
- [ ] Types partagés (User, Equipment, Record)
- [ ] Configuration des traductions (FR/EN minimum)

**Livrables**:
- ✅ Projet configuré et déployable
- ✅ Design system fonctionnel
- ✅ Documentation à jour

---

## 📝 Phase 1 - Checklists HACCP (Semaine 3-4)

**Objectif**: Implémenter le système de checklists avec relevés de température

### Feature Structure

```
src/features/checklists/
├── components/
│   ├── checklist-card.tsx
│   ├── checklist-form.tsx
│   ├── temperature-input.tsx
│   └── status-badge.tsx
├── screens/
│   ├── checklists-list.tsx
│   └── checklist-detail.tsx
├── hooks/
│   ├── use-checklists.ts
│   └── use-add-checklist-entry.ts
├── stores/
│   └── checklist-store.ts
├── types.ts
└── index.ts
```

### Tasks

#### 1.1 Modèle de données

- [ ] Définir le schéma Checklist (Zod)
  ```typescript
  type Checklist = {
    id: string;
    title: string;
    equipmentId: string;
    frequency: 'daily' | 'shift' | 'hourly';
    thresholds: { min: number; max: number };
  }
  ```
- [ ] Définir le schéma ChecklistEntry
  ```typescript
  type ChecklistEntry = {
    id: string;
    checklistId: string;
    value: number;
    timestamp: string;
    userId: string;
    status: 'ok' | 'warning' | 'alert';
  }
  ```
- [ ] Créer les helpers de validation des seuils
- [ ] Setup MMKV storage pour persistance locale

#### 1.2 Store Zustand

- [ ] Créer `useChecklistStore` avec :
  - State : `checklists`, `entries`, `isLoading`
  - Actions : `addEntry`, `getHistory`, `syncData`
- [ ] Implémenter la logique de calcul des statuts (OK/Warning/Alert)
- [ ] Ajouter la gestion du mode offline

#### 1.3 Composants UI

- [ ] `ChecklistCard` : Affichage d'une checklist avec dernier relevé
  - Titre et équipement
  - Dernière température + badge statut
  - Indicateur de fraîcheur (il y a X heures)
- [ ] `TemperatureInput` : Input optimisé pour saisie rapide
  - Clavier numérique par défaut
  - Validation en temps réel
  - Indicateur visuel du seuil (rouge/vert)
- [ ] `ChecklistForm` : Formulaire de saisie complet
  - React Hook Form + Zod validation
  - Auto-fill de la date/heure
  - Confirmation visuelle après soumission
- [ ] `StatusBadge` : Badge coloré (vert/orange/rouge)

#### 1.4 Écrans

- [ ] **Écran liste** (`/checklists`)
  - Liste des checklists du jour (FlashList)
  - Filtres : Tous / À faire / En retard
  - Pull-to-refresh
  - Bouton floating "Nouveau relevé"
- [ ] **Écran détail** (`/checklists/[id]`)
  - Formulaire de saisie rapide
  - Historique des 10 derniers relevés
  - Graphique simple (optionnel pour MVP)
  - Bouton "Valider"

#### 1.5 Tests

- [ ] Tests unitaires :
  - Validation des seuils
  - Calcul des statuts
  - Formatage des températures
- [ ] Tests de composants :
  - TemperatureInput avec différentes valeurs
  - ChecklistForm soumission valide/invalide
- [ ] Tests E2E (Maestro) :
  - Parcours complet : ouvrir app → sélectionner checklist → saisir température → valider

**Livrables**:
- ✅ Système de checklists fonctionnel
- ✅ Persistance locale des données
- ✅ Tests unitaires et E2E passants
- ✅ Documentation du feature dans CLAUDE.md

---

## 📱 Phase 2 - Scan QR Code (Semaine 5-6)

**Objectif**: Implémenter la validation du nettoyage via QR codes

### Feature Structure

```
src/features/cleaning/
├── components/
│   ├── qr-scanner.tsx
│   ├── equipment-card.tsx
│   ├── validation-form.tsx
│   └── cleaning-history.tsx
├── screens/
│   ├── scanner.tsx
│   └── equipment-detail.tsx
├── hooks/
│   ├── use-scanner.ts
│   └── use-validate-cleaning.ts
├── stores/
│   └── cleaning-store.ts
├── types.ts
└── index.ts
```

### Tasks

#### 2.1 Configuration du scanner

- [ ] Installer et configurer `expo-camera`
- [ ] Gérer les permissions caméra (iOS/Android)
- [ ] Implémenter le composant QRScanner
  - Détection automatique
  - Feedback visuel (cadre vert au scan)
  - Vibration au succès
  - Gestion des erreurs (QR non reconnu)

#### 2.2 Modèle de données

- [ ] Définir le schéma Equipment
  ```typescript
  type Equipment = {
    id: string;
    qrCode: string;
    name: string;
    location: string;
    cleaningTasks: CleaningTask[];
  }
  ```
- [ ] Définir le schéma CleaningValidation
  ```typescript
  type CleaningValidation = {
    id: string;
    equipmentId: string;
    taskId: string;
    timestamp: string;
    userId: string;
    notes?: string;
  }
  ```
- [ ] Créer une base de données d'équipements (JSON local pour MVP)

#### 2.3 Store Zustand

- [ ] Créer `useCleaningStore` avec :
  - State : `equipments`, `validations`, `scannedEquipment`
  - Actions : `scanQR`, `validateCleaning`, `getHistory`
- [ ] Implémenter la recherche d'équipement par QR code
- [ ] Gérer l'historique des validations

#### 2.4 Composants UI

- [ ] `QRScanner` : Composant caméra avec overlay
  - Cadre de visée
  - Instructions claires
  - Bouton retour
- [ ] `EquipmentCard` : Affichage de l'équipement scanné
  - Photo (optionnel)
  - Nom et localisation
  - Tâches de nettoyage associées
- [ ] `ValidationForm` : Formulaire de validation
  - Sélection de la tâche
  - Champ notes (optionnel)
  - Bouton "Valider le nettoyage"
- [ ] `CleaningHistory` : Liste des dernières validations
  - Date/heure
  - Utilisateur
  - Tâche effectuée

#### 2.5 Écrans

- [ ] **Écran scanner** (`/cleaning/scanner`)
  - Vue caméra plein écran
  - Overlay avec instructions
  - Détection automatique du QR
  - Redirection vers équipement après scan
- [ ] **Écran équipement** (`/cleaning/equipment/[id]`)
  - Card de l'équipement
  - Liste des tâches disponibles
  - Formulaire de validation
  - Historique des 5 dernières validations

#### 2.6 Tests

- [ ] Tests unitaires :
  - Parsing des QR codes
  - Recherche d'équipement
  - Validation des données
- [ ] Tests de composants :
  - EquipmentCard avec différents équipements
  - ValidationForm soumission
- [ ] Tests E2E (Maestro) :
  - Parcours complet avec QR code simulé

**Livrables**:
- ✅ Scanner QR fonctionnel avec permissions
- ✅ Système de validation des nettoyages
- ✅ Base de données d'équipements
- ✅ Tests et documentation

---

## 🏷️ Phase 3 - Étiquettes DLC (Semaine 7-8)

**Objectif**: Implémenter l'impression d'étiquettes via Bluetooth

### Feature Structure

```
src/features/labels/
├── components/
│   ├── product-picker.tsx
│   ├── label-preview.tsx
│   ├── printer-selector.tsx
│   └── label-form.tsx
├── screens/
│   ├── create-label.tsx
│   └── printer-settings.tsx
├── hooks/
│   ├── use-products.ts
│   ├── use-printer.ts
│   └── use-print-label.ts
├── stores/
│   └── label-store.ts
├── services/
│   └── bluetooth-printer.ts
├── types.ts
└── index.ts
```

### Tasks

#### 3.1 Configuration Bluetooth

- [ ] Rechercher et installer une lib Bluetooth appropriée
  - Options : `react-native-ble-plx`, `react-native-bluetooth-escpos-printer`
  - Vérifier la compatibilité avec Expo
- [ ] Gérer les permissions Bluetooth (iOS/Android)
- [ ] Implémenter le scan des imprimantes disponibles
- [ ] Créer le service de connexion/déconnexion

#### 3.2 Modèle de données

- [ ] Définir le schéma Product
  ```typescript
  type Product = {
    id: string;
    name: string;
    shelfLifeDays: number;
    category: 'prepared' | 'cooked' | 'raw';
    storageTemp?: string;
  }
  ```
- [ ] Définir le schéma Label
  ```typescript
  type Label = {
    id: string;
    productId: string;
    productionDate: string;
    dlc: string;
    notes?: string;
    printedAt?: string;
    printedBy?: string;
  }
  ```
- [ ] Créer un catalogue de produits (JSON local)

#### 3.3 Store Zustand

- [ ] Créer `useLabelStore` avec :
  - State : `products`, `labels`, `connectedPrinter`
  - Actions : `createLabel`, `printLabel`, `connectPrinter`
- [ ] Implémenter le calcul automatique de la DLC
- [ ] Gérer l'historique des impressions

#### 3.4 Service Bluetooth

- [ ] `bluetooth-printer.ts` :
  - `scanPrinters()` : Recherche des imprimantes
  - `connectToPrinter(id)` : Connexion
  - `disconnectPrinter()` : Déconnexion
  - `printLabel(labelData)` : Envoi des commandes d'impression
  - `testPrint()` : Impression de test
- [ ] Implémenter les commandes ESC/POS (format standard)
- [ ] Gérer les erreurs de connexion/impression

#### 3.5 Composants UI

- [ ] `ProductPicker` : Sélecteur de produit
  - Liste searchable (FlashList)
  - Catégories filtrables
  - Affichage de la durée de vie
- [ ] `LabelForm` : Formulaire de création
  - Sélection du produit
  - Date de production (auto-fill aujourd'hui)
  - DLC calculée automatiquement
  - Champ notes optionnel
- [ ] `LabelPreview` : Prévisualisation de l'étiquette
  - Layout exact de l'impression
  - Nom du produit
  - Date de production + DLC
  - Nom du restaurant
- [ ] `PrinterSelector` : Sélection d'imprimante
  - Liste des imprimantes découvertes
  - Statut de connexion
  - Bouton "Tester l'impression"

#### 3.6 Écrans

- [ ] **Écran création** (`/labels/create`)
  - Sélecteur de produit (modal ou écran dédié)
  - Formulaire de saisie
  - Prévisualisation de l'étiquette
  - Bouton "Imprimer" (ou "Sauvegarder" si pas de printer)
- [ ] **Écran paramètres imprimante** (`/labels/printer-settings`)
  - Bouton "Scanner les imprimantes"
  - Liste des imprimantes trouvées
  - Connexion/Déconnexion
  - Impression de test
- [ ] **Écran historique** (`/labels/history`) (optionnel)
  - Liste des étiquettes créées
  - Filtres par date/produit
  - Option ré-impression

#### 3.7 Tests

- [ ] Tests unitaires :
  - Calcul de DLC
  - Formatage des dates
  - Génération des commandes ESC/POS
- [ ] Tests de composants :
  - LabelForm avec différents produits
  - LabelPreview rendering
- [ ] Tests E2E (Maestro) :
  - Parcours complet (sans imprimante réelle)
  - Mock du service Bluetooth

**Livrables**:
- ✅ Système de création d'étiquettes
- ✅ Connexion Bluetooth fonctionnelle
- ✅ Impression sur imprimante thermique
- ✅ Catalogue de produits
- ✅ Tests et documentation

---

## 🏠 Phase 4 - Écran d'accueil et Navigation (Semaine 9)

**Objectif**: Créer l'écran d'accueil et finaliser la navigation

### Tasks

#### 4.1 Écran d'accueil

- [ ] Créer le layout principal (`src/app/(app)/index.tsx`)
- [ ] Implémenter les 3 boutons principaux :
  - [ ] "Checklists du jour" → `/checklists`
  - [ ] "Scanner un équipement" → `/cleaning/scanner`
  - [ ] "Imprimer une étiquette" → `/labels/create`
- [ ] Ajouter des cartes de statistiques :
  - Nombre de checklists complétées aujourd'hui
  - Dernière validation de nettoyage
  - Étiquettes imprimées aujourd'hui
- [ ] Design avec illustrations ou icônes claires

#### 4.2 Navigation

- [ ] Configurer le Tab Navigator (bottom tabs)
  - Accueil
  - Historique (optionnel)
  - Paramètres
- [ ] Implémenter le Stack Navigator pour chaque feature
- [ ] Ajouter les animations de transition
- [ ] Configurer le deep linking (pour QR codes futurs)

#### 4.3 Onboarding

- [ ] Créer un écran d'onboarding simple (3 slides max)
  - Slide 1 : Bienvenue + présentation
  - Slide 2 : Les 3 fonctionnalités principales
  - Slide 3 : Configuration rapide
- [ ] Gérer l'affichage unique (première ouverture)
- [ ] Bouton "Passer" et "Suivant"

#### 4.4 Tests

- [ ] Tests de navigation entre les écrans
- [ ] Tests E2E du flow complet depuis l'accueil

**Livrables**:
- ✅ Écran d'accueil fonctionnel
- ✅ Navigation fluide entre toutes les features
- ✅ Onboarding pour nouveaux utilisateurs

---

## ⚙️ Phase 5 - Paramètres et Configuration (Semaine 10)

**Objectif**: Implémenter les paramètres utilisateur et configuration de l'app

### Tasks

#### 5.1 Écran Paramètres

- [ ] **Section Utilisateur**
  - [ ] Saisie du nom (pour traçabilité)
  - [ ] Photo de profil (optionnel)
  - [ ] Poste/rôle (Chef, Employé, Manager)
- [ ] **Section Restaurant**
  - [ ] Nom du restaurant
  - [ ] Adresse (optionnel)
  - [ ] Logo (optionnel, pour étiquettes)
- [ ] **Section Préférences**
  - [ ] Langue (FR/EN)
  - [ ] Thème (clair/sombre)
  - [ ] Notifications (activation/désactivation)
- [ ] **Section Données**
  - [ ] Bouton "Exporter les données" (JSON)
  - [ ] Bouton "Effacer les données" (avec confirmation)
  - [ ] Statistiques d'utilisation

#### 5.2 Gestion des données

- [ ] Implémenter l'export JSON de toutes les données
- [ ] Implémenter l'effacement complet (avec confirmation double)
- [ ] Créer une page "À propos" (version, crédits, licences)

#### 5.3 Tests

- [ ] Tests de persistance des paramètres
- [ ] Tests d'export/import de données

**Livrables**:
- ✅ Écran paramètres complet
- ✅ Gestion des préférences utilisateur
- ✅ Export/import de données

---

## 🔒 Phase 6 - Sécurité et Auth (Semaine 11)

**Objectif**: Ajouter une couche de sécurité basique

### Tasks

#### 6.1 Authentification simple

- [ ] Implémenter un système de code PIN (4-6 chiffres)
- [ ] Écran de définition du PIN (premier lancement)
- [ ] Écran de saisie du PIN (à chaque ouverture)
- [ ] Option "Biométrie" (Face ID / Touch ID)
- [ ] Gestion de l'oubli du PIN (réinitialisation)

#### 6.2 Sécurité des données

- [ ] Chiffrement du stockage MMKV (optionnel pour MVP)
- [ ] Validation des inputs pour prévenir les injections
- [ ] Sanitization des données avant sauvegarde

#### 6.3 Tests

- [ ] Tests du flow d'authentification
- [ ] Tests de sécurité basiques

**Livrables**:
- ✅ Système d'authentification par PIN
- ✅ Support biométrie (iOS/Android)
- ✅ Données sécurisées

---

## 🧪 Phase 7 - Tests et Optimisations (Semaine 12)

**Objectif**: Finaliser les tests et optimiser les performances

### Tasks

#### 7.1 Tests complets

- [ ] Atteindre 70%+ de couverture de tests unitaires
- [ ] Compléter tous les tests E2E Maestro
- [ ] Tests sur devices réels (iOS + Android)
- [ ] Tests de performance (temps de chargement, FPS)

#### 7.2 Optimisations

- [ ] Profiling avec React DevTools
- [ ] Memoization des composants lourds
- [ ] Lazy loading des écrans
- [ ] Optimisation des images (compression)
- [ ] Réduction de la taille du bundle

#### 7.3 Accessibilité

- [ ] Audit a11y complet
- [ ] Support du lecteur d'écran
- [ ] Contraste des couleurs (WCAG AA)
- [ ] Navigation au clavier (web)

#### 7.4 Documentation

- [ ] Mettre à jour CLAUDE.md avec tous les patterns
- [ ] Créer un guide utilisateur (PDF/web)
- [ ] Documenter l'API interne (JSDoc)
- [ ] Créer des vidéos de démo

**Livrables**:
- ✅ Tests complets (>70% coverage)
- ✅ App optimisée et performante
- ✅ Conformité a11y
- ✅ Documentation finalisée

---

## 🚀 Phase 8 - Préparation au déploiement (Semaine 13)

**Objectif**: Préparer l'app pour le déploiement beta

### Tasks

#### 8.1 Configuration des builds

- [ ] Configurer les profils EAS Build
- [ ] Générer les certificats (iOS + Android)
- [ ] Configurer les identifiants
- [ ] Tester les builds staging

#### 8.2 Déploiement beta

- [ ] Créer un groupe de testeurs beta
- [ ] Déployer sur TestFlight (iOS)
- [ ] Déployer sur Play Console Beta (Android)
- [ ] Créer un formulaire de feedback

#### 8.3 Monitoring

- [ ] Configurer Sentry (error tracking)
- [ ] Configurer Analytics (Expo Analytics ou Firebase)
- [ ] Dashboard de monitoring

#### 8.4 Documentation de déploiement

- [ ] Guide de release
- [ ] Checklist de déploiement
- [ ] Procédure de rollback

**Livrables**:
- ✅ Build production prêt
- ✅ App déployée en beta
- ✅ Monitoring actif
- ✅ Documentation de déploiement

---

## 🎨 Phase 9 - Améliorations UX (Semaine 14)

**Objectif**: Affiner l'expérience utilisateur basée sur les retours beta

### Tasks

#### 9.1 Animations et micro-interactions

- [ ] Animations de transition entre écrans
- [ ] Feedback visuel sur les actions (succès/erreur)
- [ ] Loading states engageants
- [ ] Haptic feedback pertinent

#### 9.2 Améliorations ergonomiques

- [ ] Raccourcis et actions rapides
- [ ] Gestes (swipe pour supprimer, etc.)
- [ ] Mode paysage (si pertinent)
- [ ] Support tablette (layout adaptatif)

#### 9.3 Intégration des retours beta

- [ ] Analyser les retours des testeurs
- [ ] Prioriser et implémenter les corrections
- [ ] Ajustements UX basés sur les données

**Livrables**:
- ✅ UX améliorée avec animations
- ✅ Retours beta intégrés
- ✅ App prête pour la production

---

## 📦 Phase 10 - Release v1.0 (Semaine 15)

**Objectif**: Déploiement production et lancement

### Tasks

#### 10.1 Finalisation

- [ ] Tests finaux sur production
- [ ] Vérification de tous les stores (checklists, cleaning, labels)
- [ ] Vérification des builds iOS/Android
- [ ] Review finale du code

#### 10.2 Assets de lancement

- [ ] Screenshots App Store / Play Store
- [ ] Vidéo de démo
- [ ] Description de l'app (FR/EN)
- [ ] Keywords SEO

#### 10.3 Déploiement

- [ ] Soumission à l'App Store
- [ ] Soumission au Play Store
- [ ] Monitoring post-déploiement
- [ ] Support utilisateurs

#### 10.4 Communication

- [ ] Annonce sur réseaux sociaux
- [ ] Article de blog de lancement
- [ ] Mise à jour du portfolio

**Livrables**:
- ✅ HACCP Express v1.0 en production
- ✅ App disponible sur App Store et Play Store
- ✅ Communication de lancement

---

## Timeline estimée

```
┌─────────────────────────────────────────────────────────────────────┐
│  Phase 0  │  Phase 1  │  Phase 2  │  Phase 3  │  Phase 4-5  │ ...   │
│ Fondations│ Checklists│ QR Scan   │ Étiquettes│ Nav + Param │ Tests │
│  2 sem    │  2 sem    │  2 sem    │  2 sem    │   2 sem     │ 5 sem │
└─────────────────────────────────────────────────────────────────────┘
  Sem 1-2      Sem 3-4     Sem 5-6     Sem 7-8     Sem 9-10    Sem 11-15

Total estimé : 15 semaines (3,5 mois)
```

### Jalons clés

| Jalon | Semaine | Livrables |
|-------|---------|-----------|
| **M1 - MVP Core** | Semaine 8 | Checklists + QR + Étiquettes fonctionnels |
| **M2 - Beta Ready** | Semaine 13 | App testée, déployée en beta |
| **M3 - Production** | Semaine 15 | v1.0 en production sur les stores |

---

## Dépendances techniques

### Packages critiques à installer

#### Phase 1 - Checklists
```bash
# Déjà inclus dans le starter
npx expo install zustand react-hook-form zod @hookform/resolvers
```

#### Phase 2 - QR Scanner
```bash
npx expo install expo-camera expo-barcode-scanner
```

#### Phase 3 - Bluetooth
```bash
# Option 1 : BLE générique
npx expo install react-native-ble-plx

# Option 2 : Imprimante spécifique (à évaluer)
npm install react-native-bluetooth-escpos-printer
```

#### Phase 6 - Auth
```bash
npx expo install expo-local-authentication expo-secure-store
```

#### Phase 8 - Monitoring
```bash
npx expo install @sentry/react-native expo-analytics
```

### Compatibilité Expo

⚠️ **Important** : Toutes les bibliothèques doivent être compatibles avec Expo. Vérifier sur :
- [Expo SDK Documentation](https://docs.expo.dev)
- [React Native Directory](https://reactnative.directory)

---

## Métriques de succès

### Qualité du code

| Métrique | Cible | Outil |
|----------|-------|-------|
| Couverture de tests | > 70% | Jest |
| Linting | 0 erreur | ESLint |
| Type errors | 0 erreur | TypeScript |
| Performance score | > 90/100 | Lighthouse (web) |
| Bundle size | < 15 MB | Metro bundler |

### Performance

| Métrique | Cible |
|----------|-------|
| Temps de démarrage | < 3 sec |
| Temps de navigation | < 500 ms |
| FPS (animations) | > 60 fps |
| Temps de réponse API | < 2 sec |

### Utilisation

| Métrique | Cible (Beta) |
|----------|--------------|
| Taux de crash | < 1% |
| Taux de rétention J7 | > 40% |
| Temps de session moyen | > 5 min |
| Actions par session | > 3 |

---

## Risques et mitigation

### Risques techniques

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Bluetooth incompatible avec Expo | Élevé | Moyen | Recherche préalable + POC + Plan B (expo-dev-client) |
| Performance sur anciens devices | Moyen | Élevé | Tests sur devices réels + optimisations |
| Problèmes de permission caméra | Moyen | Faible | Documentation claire + gestion d'erreurs |

### Risques projet

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Retard sur planning | Moyen | Moyen | Buffer de 2 semaines + priorisation MVP |
| Scope creep | Élevé | Élevé | Documentation stricte + revues régulières |
| Feedback négatif beta | Faible | Faible | Itérations rapides + communication |

---

## Notes de version

### v1.0.0 (Cible : Fin Semaine 15)

**Features**:
- ✅ Checklists HACCP avec relevés de température
- ✅ Validation de nettoyage via QR code
- ✅ Impression d'étiquettes DLC via Bluetooth
- ✅ Stockage local (mode offline)
- ✅ Authentification par PIN
- ✅ Support iOS et Android
- ✅ Interface en français et anglais

**Limitations connues** (à adresser en v1.1+) :
- Pas de synchronisation cloud
- Pas de gestion multi-utilisateurs
- Pas de rapports automatiques
- Catalogue de produits limité (statique)

---

## Roadmap Post-MVP (v1.1+)

### Fonctionnalités futures

**Court terme (v1.1 - v1.3)** :
- [ ] Synchronisation cloud (Firebase/Supabase)
- [ ] Rapports PDF exportables
- [ ] Notifications push pour rappels
- [ ] Widget pour accès rapide
- [ ] Mode tablette optimisé

**Moyen terme (v2.0)** :
- [ ] Gestion multi-établissements
- [ ] Rôles et permissions (Admin/Manager/Employé)
- [ ] Dashboard web pour managers
- [ ] API REST publique
- [ ] Intégrations tierces (systèmes POS)

**Long terme (v3.0+)** :
- [ ] IA pour détection d'anomalies
- [ ] Analyse prédictive des risques
- [ ] Mode collaboratif en temps réel
- [ ] Certification HACCP automatique

---

## Contributeurs et responsabilités

| Rôle | Responsabilités | Contact |
|------|----------------|---------|
| **Lead Developer** | Architecture, code reviews, CI/CD | - |
| **UI/UX Designer** | Design system, mockups, tests utilisateurs | - |
| **QA Engineer** | Tests E2E, tests devices, beta testing | - |
| **Product Owner** | Roadmap, priorisation, validation métier | - |

---

## Ressources

### Documentation
- [Obytes Starter Docs](https://starter.obytes.com)
- [Expo Documentation](https://docs.expo.dev)
- [HACCP Guidelines](https://www.food.gov.uk/business-guidance/hazard-analysis-and-critical-control-point-haccp)

### Design
- [Figma Design System](https://figma.com/...) (à créer)
- [Brand Guidelines](./docs/brand-guidelines.md) (à créer)

### Outils
- **Project Management** : GitHub Projects
- **Communication** : Slack / Discord
- **Design** : Figma
- **CI/CD** : GitHub Actions + EAS Build
- **Monitoring** : Sentry + Expo Analytics

---

**Dernière mise à jour** : 21 janvier 2025
**Version du document** : 1.0
**Prochaine revue** : Fin de Phase 0 (Semaine 2)

---

*Ce document est vivant et sera mis à jour régulièrement en fonction de l'avancement du projet et des retours d'expérience.*
