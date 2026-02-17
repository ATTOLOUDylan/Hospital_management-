
# 🎯 Travailler en collaboration avec github

À la fin du cours, vous devez être capables de :

* Travailler à plusieurs sur un même projet
* Utiliser les branches correctement
* Créer et gérer des Pull Requests
* Gérer les conflits
* Faire des code reviews

---

# 🧠 PLAN DU COURS

1. Rappel : Le problème de la collaboration
2. Workflow GitHub professionnel
3. Travailler avec les branches
4. Pull Requests (PR)
5. Gestion des conflits
6. Code Review
7. Cas pratique complet (simulation équipe)

---

# 1️⃣ Pourquoi GitHub est indispensable en équipe ?

## ❌ Sans GitHub :

* On s’envoie des fichiers par WhatsApp
* Plusieurs versions du même projet
* Écrasement du travail des autres
* Impossible de suivre qui a fait quoi

## ✅ Avec GitHub :

* Historique complet
* Travail parallèle avec branches
* Validation avant fusion
* Suivi des tâches
* Collaboration propre

---

# 2️⃣ Workflow professionnel standard

Voici le workflow que je recommande pour tes étudiants 👇

```
main (production)
   |
develop (intégration)
   |
feature/nom-fonctionnalité
```

### Explication :

* `main` → version stable
* `develop` → branche de travail
* `feature/...` → une fonctionnalité spécifique

---

# 3️⃣ 🔥 CAS PRATIQUE 1 – Collaboration à 2 développeurs

## 🎬 SCÉNARIO

Projet : Application Vue.js 
Équipe :

* Dev A → Page Accueil
* Dev B → Page Blog

---

## 👨🏾‍💻 ÉTAPE 1 – Création du projet

Un développeur :

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin URL_DU_REPO
git push -u origin main
```

---

## 👨🏾‍💻 ÉTAPE 2 – Création de la branche develop

```bash
git checkout -b develop
git push -u origin develop
```

---

## 👨🏾‍💻 ÉTAPE 3 – Chaque développeur clone le projet

```bash
git clone URL_DU_REPO
cd projet
git checkout develop
```

---

## 👨🏾‍💻 ÉTAPE 4 – Chaque développeur crée sa branche

### Dev A

```bash
git checkout -b feature/home-page
```

### Dev B

```bash
git checkout -b feature/blog-page
```

---

## 👨🏾‍💻 ÉTAPE 5 – Développement

Chaque développeur :

```bash
git add .
git commit -m "Add home page"
git push -u origin feature/home-page
```

---

# 4️⃣ Pull Request (PR)

## 🔎 Pourquoi ?

On ne fusionne jamais directement dans develop.

On crée une Pull Request.

---

## 👨🏾‍💻 Étapes :

1. Aller sur GitHub
2. Cliquer sur "Compare & Pull Request"
3. Vérifier :

   * base: develop
   * compare: feature/home-page
4. Ajouter description
5. Create Pull Request

---

# 5️⃣ Code Review

L’autre développeur :

* Vérifie le code
* Laisse des commentaires
* Approuve
* Merge la PR

---

# 6️⃣ 🔥 CAS PRATIQUE 2 – Gestion des conflits

## 🎬 SCÉNARIO

Les deux modifient le même fichier :

`App.vue`

---

### Dev A push d'abord

PR validée → merge

---

### Dev B fait :

```bash
git pull origin develop
```

💥 Conflit !

Git montre :

```text
<<<<<<< HEAD
Code Dev B
=======
Code Dev A
>>>>>>> develop
```

---

### Résolution :

1. Choisir quoi garder
2. Supprimer les marqueurs
3. Sauvegarder
4. Puis :

```bash
git add .
git commit -m "Resolve merge conflict"
git push
```

---

# 9️⃣ Workflow recommandé pour tes étudiants

### 🔁 Routine quotidienne :

```bash
git checkout develop
git pull origin develop
git checkout feature/ma-feature
git merge develop
```

Puis développement.

---

# 🔟 Bonnes pratiques professionnelles

✅ Un commit = une responsabilité
✅ Messages clairs
✅ Toujours pull avant de push
✅ Pas de travail direct sur main
✅ Toujours passer par PR

---

# 💪 CAS PRATIQUE FINAL – Simulation réelle

## 🎬 Projet : Mini site web Vue.js

Équipe de 3 :

* Dev 1 → Navbar (accueil, à propos, contact) + Page accueil
* Dev 2 → Page à propos + Footer
* Dev 3 → Page contact + Formulaire

---
