import { getFirestore } from "firebase/firestore";
import { getFirebaseClientApp } from "@/lib/firebase/client";

export function getFirebaseDb() {
  return getFirestore(getFirebaseClientApp());
}