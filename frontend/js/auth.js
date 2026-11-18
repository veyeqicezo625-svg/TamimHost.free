import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  collection, addDoc, getDocs, query, where, orderBy, serverTimestamp,
  doc, setDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const $ = (id) => document.getElementById(id);
const emailInput = $("auth-email");
const passwordInput = $("auth-password");
const message = $("auth-message");
const form = $("auth-form");
const accountPanel = $("account-panel");
let activeUser = null;

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

async function saveUserProfile(user) {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    updatedAt: serverTimestamp()
  }, { merge: true });
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

$("create-project-btn").addEventListener("click", async () => {
  if (!activeUser) return showMessage("Please sign in first.", true);
  const name = $("project-name").value.trim();
  const description = $("project-description").value.trim();
  if (!name) return showMessage("Enter a project name.", true);
  if (name.length > 50 || description.length > 180) return showMessage("Project name max 50 and description max 180 characters.", true);
  try {
    showMessage("Saving your project...");
    await addDoc(collection(db, "projects"), {
      ownerId: activeUser.uid,
      name,
      description,
      status: "draft",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    $("project-name").value = "";
    $("project-description").value = "";
    await loadProjects(activeUser);
    showMessage("Project saved in Firestore.");
  } catch (error) { showMessage(error.message, true); }
});

async function loadProjects(user) {
  const list = $("project-list");
  list.replaceChildren();
  const q = query(collection(db, "projects"), where("ownerId", "==", user.uid), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    const empty = document.createElement("p");
    empty.className = "empty-projects";
    empty.textContent = "No projects yet. Create your first project above.";
    list.append(empty);
    return;
  }
  snapshot.forEach((item) => {
    const data = item.data();
    const card = document.createElement("article");
    card.className = "project-item";
    const title = document.createElement("h3");
    title.textContent = data.name || "Untitled project";
    const desc = document.createElement("p");
    desc.textContent = data.description || "No description";
    const status = document.createElement("span");
    status.textContent = "Draft";
    status.className = "project-status";
    card.append(title, desc, status);
    list.append(card);
  });
}

onAuthStateChanged(auth, async (user) => {
  activeUser = user;
  form.hidden = Boolean(user);
  accountPanel.hidden = !user;
  if (!user) return;
  $("signed-email").textContent = user.email || "Google account";
  try {
    await saveUserProfile(user);
    await loadProjects(user);
  } catch (error) {
    showMessage("Signed in, but Firestore setup/rules need attention: " + error.message, true);
  }
});
