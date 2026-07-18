import React from "react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

type Status =
  | "PENDING"
  | "UNDER_REVIEW"
  | "CHANGES_REQUESTED"
  | "REJECTED"
  | "ACCEPTED";

type StatusBadgeProps = {
  status: Status;
};

const statusStyles: Record<Status, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  UNDER_REVIEW: "bg-blue-100 text-blue-800 border-blue-200",
  CHANGES_REQUESTED: "bg-orange-100 text-orange-800 border-orange-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
  ACCEPTED: "bg-green-100 text-green-800 border-green-200",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <Badge
      className={cn(
        "border px-2 py-0.5 text-xs font-medium rounded-md",
        statusStyles[status]
      )}
    >
      {status.replaceAll("_", " ")}
    </Badge>
  );
};

export default StatusBadge;