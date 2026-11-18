# TamimHost.free

A mobile-first static website hosting dashboard project.

> **Current stage:** Firebase Authentication and Firestore project dashboard are implemented. Firebase Hosting configuration and a GitHub Actions deployment workflow are committed. The first live deployment still requires the repository's Firebase deploy secret.

## Project principles

- No Cloudflare services.
- Target budget: ৳0. Use Firebase Hosting's Spark no-cost quota and stay within its limits.
- Firebase project setup and credentials are managed by the project owner.
- Never commit service-account keys, private keys, access tokens, or real environment secrets.
- Firebase Storage is intentionally not used; the current project does not support customer file uploads or published customer sites yet.

## Firebase project

The repository is configured for project ID `tamimhost-free-2c21d`.

- Static site directory: `frontend/`
- Hosting config: `firebase.json`
- Project alias: `.firebaserc`
- Automated deploy workflow: `.github/workflows/firebase-hosting.yml`

## First deployment setup

1. In Google Cloud Console, select project `tamimhost-free-2c21d`.
2. Create a dedicated service account for GitHub Actions and grant only the Firebase Hosting deployment role needed to deploy this site.
3. Create a JSON key for that service account. Keep the file private.
4. In this GitHub repository, open **Settings → Secrets and variables → Actions → New repository secret**.
5. Set the secret name exactly to `FIREBASE_SERVICE_ACCOUNT_TAMIMHOST_FREE_2C21D` and paste the full JSON key as its value.
6. Do not commit the JSON key or send it in chat.
7. Push a commit to `main` (or manually run the **Deploy TamimHost.free to Firebase Hosting** workflow from the Actions tab).

The workflow deploys only the static contents of `frontend/` to Firebase Hosting. Expected site addresses are:

- `https://tamimhost-free-2c21d.web.app`
- `https://tamimhost-free-2c21d.firebaseapp.com`

These addresses should be treated as unverified until the GitHub Actions deployment succeeds.

## Free-tier limits

Firebase Hosting's no-cost quota currently includes up to 10 GB stored content and 10 GB/month data transfer. Sites may be disabled after the free transfer quota is exceeded until the next month on Spark. Monitor usage in Firebase Console. No paid upgrade is required for the configured static Hosting deployment within these limits.

## Current functionality

- Email/password and Google sign-in UI using Firebase Authentication.
- User profile and project metadata stored in Cloud Firestore.
- Users can create and view their own draft project records.
- Firestore security rules are in `firebase/firestore.rules`.

## Not implemented yet

- Customer website file uploads.
- ZIP extraction and validation.
- Publishing customer websites to unique URLs.
- Admin dashboard and moderation tools.
- A production API for hosting customer projects.

The backend folder is only a health-check scaffold; it is not deployed by this workflow and does not host customer sites.
