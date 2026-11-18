# TamimHost.free

A mobile-first website hosting platform project.

> **Current stage:** Initial project scaffold. Authentication, database integration, secure deployment and admin tools are not implemented yet.

## Project principles

- No Cloudflare services.
- Target budget: ৳0. Any provider limits, card requirements, or paid features must be disclosed before use.
- Firebase project setup and Firebase credentials are managed by the project owner.
- Never commit service-account keys, private keys, access tokens, or real environment secrets.

## Repository layout

```text
frontend/       Public website UI
backend/        API server scaffold
firebase/       Firebase setup notes and rules/configuration (owner-managed)
```

## Local preview

Open `frontend/index.html` in a browser to preview the starter page.

## Backend scaffold

1. Enter the `backend` directory.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Run `npm run dev`.

The initial API exposes `GET /health` only. It does not yet create or deploy customer websites.

## Planned milestones

1. Confirm the free hosting architecture and provider limits.
2. Connect Firebase Authentication and Firestore using the owner's Firebase project.
3. Add authenticated project management and ownership checks.
4. Add safe ZIP validation and static-site deployment.
5. Add admin controls, audit logs, rate limits and security tests.

Do not describe a site as deployed until a real deployment URL has been verified.
