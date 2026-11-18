# TamimHost.free

A mobile-first static website hosting dashboard project.

> **Current stage:** Firebase Authentication and Firestore project dashboard are implemented. Firebase Hosting configuration and a GitHub Actions OIDC deployment workflow are committed. The first live deployment still requires Workload Identity Federation setup in Google Cloud and GitHub Actions repository variables.

## Project principles

- No Cloudflare services.
- Target budget: ৳0. Use Firebase Hosting's Spark no-cost quota and stay within its limits.
- Firebase project setup and credentials are managed by the project owner.
- No service-account JSON keys or private keys are stored in GitHub.
- Firebase Storage is intentionally not used; the current project does not support customer file uploads or published customer sites yet.

## Firebase project

The repository is configured for project ID `fresh-argon-515107-h2` (project number `857519353360`).

- Static site directory: `frontend/`
- Hosting config: `firebase.json`
- Project alias: `.firebaserc`
- Automated deploy workflow: `.github/workflows/firebase-hosting.yml`

## Workload Identity Federation setup

1. In Google Cloud Console, select project `fresh-argon-515107-h2`.
2. Create a Workload Identity Pool and GitHub OIDC provider, restricted to repository `veyeqicezo625-svg/TamimHost.free`.
3. Create or select a dedicated deployment service account and grant it the Firebase Hosting deployment permissions required for this project.
4. Allow the GitHub repository principal from that pool to impersonate the service account using `roles/iam.workloadIdentityUser`.
5. In GitHub, open **Settings → Secrets and variables → Actions → Variables** and add:
   - `GCP_WORKLOAD_IDENTITY_PROVIDER`: full provider resource name, e.g. `projects/857519353360/locations/global/workloadIdentityPools/github-pool/providers/github-provider`
   - `GCP_SERVICE_ACCOUNT`: service account email address.
6. Push a commit to `main` or manually run the **Deploy TamimHost.free to Firebase Hosting** workflow.

No service-account JSON key is required. Never create or upload a private key for this workflow.

Expected Hosting addresses (unverified until deployment succeeds):
- `https://fresh-argon-515107-h2.web.app`
- `https://fresh-argon-515107-h2.firebaseapp.com`

## Important Firebase client configuration

The frontend Firebase Web App config in `frontend/js/firebase.js` still needs to match the Web App registered inside project `fresh-argon-515107-h2`. Replace it with the config from Firebase Console → Project settings → Your apps. Do not guess or reuse config values from the previous project.

## Free-tier limits

Firebase Hosting has no-cost quotas and usage limits. Monitor Hosting usage in Firebase Console. Do not upgrade to a paid plan unless the project owner explicitly chooses to.

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
