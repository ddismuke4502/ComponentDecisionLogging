"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveComponentToFirestore } from "@/features/components/component-firestore";
import { componentQueryKeys } from "@/features/components/component-queries";
import type { ComponentRecord } from "@/features/components/component-types";
import { sortComponentsByUpdatedDate } from "@/features/components/component-utils";
import { isFirebaseConfigured } from "@/lib/firebase/client";

export function useSaveComponentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveComponent,
    onSuccess: async (savedComponent) => {
      queryClient.setQueryData<ComponentRecord[]>(
        componentQueryKeys.lists(),
        (currentComponents = []) => {
          const componentsWithoutSavedRecord = currentComponents.filter(
            (component) => component.id !== savedComponent.id,
          );

          return sortComponentsByUpdatedDate([
            savedComponent,
            ...componentsWithoutSavedRecord,
          ]);
        },
      );

      queryClient.setQueryData(
        componentQueryKeys.detail(savedComponent.slug),
        savedComponent,
      );

      if (isFirebaseConfigured) {
        await queryClient.invalidateQueries({
          queryKey: componentQueryKeys.all,
        });
      }
    },
  });
}

async function saveComponent(component: ComponentRecord) {
  await simulateNetworkDelay();

  if (isFirebaseConfigured) {
    return saveComponentToFirestore(component);
  }

  return component;
}

function simulateNetworkDelay() {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, 350);
  });
}