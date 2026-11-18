# Firebase setup (project owner managed)

Firebase project ID: `fresh-argon-515107-h2`.
Project number: `857519353360`.

## Configured services

- Firebase Authentication (enable Email/Password and Google providers in Firebase Console).
- Cloud Firestore for user profiles and project metadata.
- Firebase Hosting for the static frontend.
- Firestore security rules are stored in `firestore.rules`.

## Hosting deployment

The repository root contains `firebase.json` and `.firebaserc`. GitHub Actions deploys the `frontend/` directory when code is pushed to `main`.

GitHub Actions authenticates using Workload Identity Federation (OIDC). Configure the provider and dedicated deployment service account in Google Cloud, then add these GitHub Actions repository variables:

- `GCP_WORKLOAD_IDENTITY_PROVIDER`: full Workload Identity Provider resource name.
- `GCP_SERVICE_ACCOUNT`: deployment service account email.

No service-account JSON key or `FIREBASE_SERVICE_ACCOUNT_...` secret is needed.

## Firebase Web App configuration

Update `frontend/js/firebase.js` using the Web App configuration shown in Firebase Console → Project settings → Your apps for project `fresh-argon-515107-h2`. The current frontend file may still contain values from the previous Firebase project.

## Security

- Do not commit service-account JSON files or private credentials.
- The Firebase web config is public client configuration, not a secret.
- Review Firestore rules before enabling user data access.
- Firebase Storage is not initialized in the frontend because this project is being kept on a zero-budget setup.
