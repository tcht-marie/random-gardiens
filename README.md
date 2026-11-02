# Gardiens de la prod

Application web de tirage au sort permettant de répartir les 21 participants en
7 groupes de 3 personnes. Elle utilise React, TypeScript et Vite, sans serveur
applicatif ni base de données.

**Page du projet :** [Gardiens de la prod](https://tcht-marie.github.io/random-gardiens/).
Elle sera disponible après le premier déploiement réussi.

## Fonctionnement

Le bouton **Générer les 7 tirages** crée une série complète :

- Chaque tirage contient une personne **APP**, une personne **WEB** et une personne **BA / TEST**.
- Chaque participant apparaît exactement une fois dans les 7 tirages.
- Les listes de chaque catégorie sont mélangées aléatoirement, puis assemblées par position.
- Chaque clic génère une nouvelle série indépendante et remplace la précédente.

La liste des participants est consultable depuis **Afficher la liste des
participants**. Les résultats apparaissent dans la section « Historique des
tirages », avec leur numéro et leur date de génération.

L'historique contient uniquement la dernière série et reste en mémoire dans la
page : un rechargement le supprime. Il n'y a pas d'exclusion entre deux séries ;
une personne peut donc apparaître à la même position lors d'une nouvelle génération.

## Installation et démarrage

Installer une version de Node.js compatible avec Vite 8 : **22.12 ou supérieure**
(Node.js 24 LTS convient également), avec npm.

Depuis le dossier du projet :

```sh
npm install
npm run dev
```

Ouvrir l'adresse indiquée par Vite dans le terminal. Le projet utilise le chemin
de base `/random-gardiens`, configuré dans `vite.config.ts`.

## Configurer les participants

Modifier `src/data/participants.json`. Les catégories utilisées sont :

| Chemin dans le JSON | Catégorie affichée |
| --- | --- |
| `people.devs.app` | APP |
| `people.devs.web` | WEB |
| `people.others` | BA / TEST |

Chaque catégorie doit contenir **exactement 7 noms**. Les noms doivent être non
vides et uniques dans l'ensemble des trois catégories. Utiliser des noms
distincts pour différencier les homonymes.

Le générateur vérifie ces règles avant de produire les résultats. Si les données
sont invalides, un message d'erreur est affiché et la série précédente est conservée.

Les données sont importées au moment du build : après une modification du JSON,
il faut reconstruire et redéployer l'application pour mettre à jour la version
en production.

## Commandes

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Démarrer le serveur de développement avec rechargement automatique |
| `npm run build` | Vérifier les types TypeScript et générer l'application dans `dist/` |
| `npm run preview` | Prévisualiser localement le dernier build |
| `npm run lint` | Analyser le code avec ESLint |

**Limite actuelle du lint :** `eslint.config.js` importe `typescript-eslint`,
mais cette dépendance n'est pas déclarée dans `package.json`. La commande de lint
reste bloquée tant que cette configuration n'est pas corrigée.

## Structure du projet

```text
src/
├── App.tsx                    # Génération des séries et état de la page
├── App.css                    # Mise en page principale
├── index.css                  # Styles globaux et thèmes clair/sombre
├── main.tsx                   # Point d'entrée React
├── components/
│   ├── PeopleList.tsx         # Liste des participants par catégorie
│   ├── peopleList.css
│   ├── DrawResult.tsx         # Affichage des sept tirages
│   └── drawResult.css
├── data/
│   └── participants.json      # Source des participants
├── types/
│   └── draw.ts                # Types des catégories et des tirages
└── utils/
    └── drawGenerator.ts       # Validation, mélange et création des groupes
```

Chaque tirage utilise le type `Draw`, un triplet en lecture seule contenant
exactement une personne `app`, une personne `web` et une personne `others`, dans
cet ordre. Le générateur retourne un tableau de ces triplets.


## Déploiement

Le workflow `.github/workflows/deploy.yml` installe les dépendances avec `npm ci`,
construit l'application et publie `dist/` sur **GitHub Pages** à chaque push sur
`main`. Il peut également être lancé manuellement depuis l'onglet **Actions**.

Pour l'activer, sélectionner **GitHub Actions** dans
**Settings → Pages → Build and deployment → Source** du dépôt, puis pousser les
fichiers sur `main`.

L'application sera publiée à l'adresse :
**https://tcht-marie.github.io/random-gardiens/**.
Le chemin de base `/random-gardiens/` est configuré dans `vite.config.ts`.
