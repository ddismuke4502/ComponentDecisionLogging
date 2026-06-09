import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
  type DocumentData,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  type WithFieldValue,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase/firestore";
import type { ComponentRecord } from "@/features/components/component-types";

export const COMPONENTS_COLLECTION = "components";

const componentConverter: FirestoreDataConverter<ComponentRecord> = {
  toFirestore(component: WithFieldValue<ComponentRecord>): DocumentData {
    return component as DocumentData;
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): ComponentRecord {
    const data = snapshot.data(options) as ComponentRecord;

    return {
      ...data,
      id: data.id || snapshot.id,
    };
  },
};

export function getComponentsCollectionRef() {
  return collection(getFirebaseDb(), COMPONENTS_COLLECTION).withConverter(
    componentConverter,
  );
}

export function getComponentDocumentRef(componentId: string) {
  return doc(getComponentsCollectionRef(), componentId);
}

export async function getComponentsFromFirestore() {
  const componentsQuery = query(
    getComponentsCollectionRef(),
    orderBy("updatedAt", "desc"),
  );

  const snapshot = await getDocs(componentsQuery);

  return snapshot.docs.map((document) => document.data());
}

export async function getComponentFromFirestoreById(componentId: string) {
  const snapshot = await getDoc(getComponentDocumentRef(componentId));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export async function getComponentFromFirestoreBySlug(slug: string) {
  const componentSlugQuery = query(
    getComponentsCollectionRef(),
    where("slug", "==", slug),
    limit(1),
  );

  const snapshot = await getDocs(componentSlugQuery);

  return snapshot.docs[0]?.data() ?? null;
}

export async function saveComponentToFirestore(component: ComponentRecord) {
  await setDoc(getComponentDocumentRef(component.id), component, {
    merge: true,
  });

  return component;
}