import { Badge } from "@/components/ui/Badge";
import type { ComponentStatus } from "@/features/components/component-types";
import { formatComponentStatus } from "@/features/components/component-utils";

type ComponentStatusBadgeProps = {
  status: ComponentStatus;
};

const statusToBadgeVariant = {
  proposed: "proposed",
  in_review: "review",
  approved: "approved",
  deprecated: "deprecated",
} as const satisfies Record<ComponentStatus, React.ComponentProps<typeof Badge>["variant"]>;

export function ComponentStatusBadge({ status }: ComponentStatusBadgeProps) {
  return (
    <Badge variant={statusToBadgeVariant[status]}>
      <span className="sr-only">Component status: </span>
      {formatComponentStatus(status)}
    </Badge>
  );
}