import { config } from "dotenv";
import {
  applicationDefault,
  cert,
  getApps,
  initializeApp,
  type ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { mockComponents } from "../src/data/mock-components";

config({ path: ".env.seed.local" });
config({ path: ".env.local" });

const collectionName = process.env.COMPONENT_SEED_COLLECTION ?? "components";

async function seedComponents() {
  const app = getApps()[0] ?? initializeApp({
    credential: getFirebaseAdminCredential(),
    projectId: getFirebaseProjectId(),
  });

  const db = getFirestore(app);
  const batch = db.batch();
  const collectionRef = db.collection(collectionName);

  for (const component of mockComponents) {
    batch.set(collectionRef.doc(component.id), component, {
      merge: true,
    });
  }

  await batch.commit();

  console.log(
    `Seeded ${mockComponents.length} component records into "${collectionName}".`,
  );
}

function getFirebaseProjectId() {
  const projectId =
    process.env.FIREBASE_PROJECT_ID ?? getServiceAccount()?.projectId;

  if (!projectId) {
    throw new Error(
      "Missing FIREBASE_PROJECT_ID. Add it to .env.seed.local before running the seed script.",
    );
  }

  return projectId;
}

function getFirebaseAdminCredential() {
  const serviceAccount = getServiceAccount();

  if (serviceAccount) {
    return cert(serviceAccount);
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return applicationDefault();
  }

  throw new Error(
    "Missing Firebase Admin credentials. Add FIREBASE_SERVICE_ACCOUNT_BASE64 to .env.seed.local or set GOOGLE_APPLICATION_CREDENTIALS.",
  );
}

function getServiceAccount(): ServiceAccount | null {
  const encodedServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

  if (!encodedServiceAccount) {
    return null;
  }

  const serviceAccountJson = Buffer.from(
    encodedServiceAccount,
    "base64",
  ).toString("utf-8");

  const parsedServiceAccount = JSON.parse(serviceAccountJson) as {
    project_id?: string;
    client_email?: string;
    private_key?: string;
  };

  return {
    projectId: parsedServiceAccount.project_id,
    clientEmail: parsedServiceAccount.client_email,
    privateKey: parsedServiceAccount.private_key,
  };
}

seedComponents().catch((error) => {
  console.error("Failed to seed Firestore component records.");
  console.error(error);
  process.exit(1);
});