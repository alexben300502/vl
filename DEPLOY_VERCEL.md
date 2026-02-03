Déploiement sur Vercel (rapide)

1) Pré-requis
- Avoir un dépôt Git (GitHub, GitLab, ou Bitbucket).
- Le projet doit être pushé dans le dépôt.

2) Importer le projet sur Vercel
- Connectez-vous sur https://vercel.com et cliquez sur "New Project" → Import Project → sélectionnez votre repo.
- Vercel détecte automatiquement Next.js.

3) Ajouter les variables d'environnement
- Dans le project dashboard → Settings → Environment Variables, ajoutez :
  - `EMAIL_USER` : votre adresse d'envoi (ex: votremail@gmail.com)
  - `EMAIL_PASS` : mot de passe d'application Gmail (16 caractères)
- Ajoutez ces variables pour les environnements `Preview` et `Production` (optionnel: `Development`).

4) Builder & déployer
- Vercel utilise automatiquement `npm run build` puis `next start`.
- Lancement automatique dès que vous poussez (push) sur la branche configurée (généralement `main`).

5) Tests et conseils
- Ne committez jamais `.env.local` (il est ignoré par `.gitignore`).
- Vérifiez le dossier Spam si l'email n'arrive pas.
- Si Gmail bloque, assurez-vous que 2FA est activé et que vous utilisez un mot de passe d'application.

Commandes utiles localement

```bash
# installer dépendances
npm install
# lancer en dev (prend .env.local)
npm run dev
# builder
npm run build
# démarrer en production locale
npm start
```

