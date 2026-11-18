# Firebase setup (project owner managed)

Firebase project ID: `tamimhost-free-2c21d`.

## Configured services

- Firebase Authentication (Email/Password and Google providers; enable both in Firebase Console).
- Cloud Firestore for user profiles and project metadata.
- Firebase Hosting for the static frontend.
- Firestore security rules are stored in `firestore.rules`.

## Hosting deployment

The repository root contains `firebase.json` and `.firebaserc`. GitHub Actions deploys the `frontend/` directory when code is pushed to `main`.

Before the first deployment, add a GitHub Actions repository secret named:

`FIREBASE_SERVICE_ACCOUNT_TAMIMHOST_FREE_2C21D`

Its value must be the JSON key for a dedicated service account authorized to deploy Firebase Hosting for this Firebase project. Never commit this JSON key or share it in chat.

Firebase Hosting Spark no-cost quota is limited. Check the Firebase Hosting usage dashboard regularly and do not upgrade to a paid plan unless the project owner explicitly chooses to.

## Security

- Do not commit service-account JSON files or private credentials.
- The Firebase web config in `frontend/js/firebase.js` is public client configuration, not a secret.
- Review Firestore rules before enabling user data access.
- Firebase Storage is not initialized in the frontend because this project is being kept on a zero-budget setup.
