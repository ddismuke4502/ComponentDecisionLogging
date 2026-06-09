"use client";

import { useQuery } from "@tanstack/react-query";
import { mockComponents } from "@/data/mock-components";
import {
  getComponentFromFirestoreBySlug,
  getComponentsFromFirestore,
} from "@/features/components/component-firestore";
import type { ComponentRecord } from "@/features/components/component-types";
import {
  getComponentBySlug,
  sortComponentsByUpdatedDate,
} from "@/features/components/component-utils";
import { isFirebaseConfigured } from "@/lib/firebase/client";

export const componentQueryKeys = {
  all: ["components"] as const,
  lists: () => [...componentQueryKeys.all, "list"] as const,
  details: () => [...componentQueryKeys.all, "detail"] as const,
  detail: (slug: string) => [...componentQueryKeys.details(), slug] as const,
};

export function useComponentsQuery(initialData?: ComponentRecord[]) {
  return useQuery({
    queryKey: componentQueryKeys.lists(),
    queryFn: getComponents,
    initialData,
  });
}

export function useComponentQuery(slug: string) {
  return useQuery({
    queryKey: componentQueryKeys.detail(slug),
    queryFn: () => getComponentBySlugFromDataSource(slug),
  });
}

async function getComponents() {
  await simulateNetworkDelay();

  if (isFirebaseConfigured) {
    return getComponentsFromFirestore();
  }

  return sortComponentsByUpdatedDate(mockComponents);
}

async function getComponentBySlugFromDataSource(slug: string) {
  await simulateNetworkDelay();

  if (isFirebaseConfigured) {
    return getComponentFromFirestoreBySlug(slug);
  }

  return getComponentBySlug(mockComponents, slug) ?? null;
}

function simulateNetworkDelay() {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, 250);
  });
}