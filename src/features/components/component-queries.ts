"use client";

import { useQuery } from "@tanstack/react-query";
import { mockComponents } from "@/data/mock-components";
import type { ComponentRecord } from "@/features/components/component-types";
import { sortComponentsByUpdatedDate } from "@/features/components/component-utils";

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
    queryFn: () => getComponentBySlug(slug),
  });
}

async function getComponents() {
  await simulateNetworkDelay();

  return sortComponentsByUpdatedDate(mockComponents);
}

async function getComponentBySlug(slug: string) {
  await simulateNetworkDelay();

  return mockComponents.find((component) => component.slug === slug) ?? null;
}

function simulateNetworkDelay() {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 250);
  });
}