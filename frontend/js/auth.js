import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const $ = (id) => document.getElementById(id);
const emailInput = $("auth-email");
const passwordInput = $("auth-password");
const message = $("auth-message");
const form = $("auth-form");
const accountPanel = $("account-panel");

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

function credentials() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  if (!email || !password) throw new Error("Enter your email and password.");
  if (password.length < 6) throw new Error("Password must be at least 6 characters.");
  return { email, password };
}

$("signup-btn").addEventListener("click", async () => {
  try {
    const { email, password } = credentials();
    showMessage("Creating your account...");
    await createUserWithEmailAndPassword(auth, email, password);
    showMessage("Account created successfully.");
  } catch (error) { showMessage(error.message, true); }
});

$("login-btn").addEventListener("click", async () => {
  try {
    const { email, password } = credentials();
    showMessage("Signing in...");
    await signInWithEmailAndPassword(auth, email, password);
    showMessage("Signed in successfully.");
  } catch (error) { showMessage(error.message, true); }
});

$("google-btn").addEventListener("click", async () => {
  try {
    showMessage("Opening Google sign-in...");
    await signInWithPopup(auth, new GoogleAuthProvider());
    showMessage("Signed in with Google.");
  } catch (error) { showMessage(error.message, true); }
});

$("logout-btn").addEventListener("click", async () => {
  try { await signOut(auth); showMessage("You have signed out."); }
  catch (error) { showMessage(error.message, true); }
});

onAuthStateChanged(auth, (user) => {
  form.hidden = Boolean(user);
  accountPanel.hidden = !user;
  if (user) $("signed-email").textContent = user.email || "Google account";
});
