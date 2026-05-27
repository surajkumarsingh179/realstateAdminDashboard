import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        new: "border-transparent bg-indigo-100 text-indigo-700",
        contacted: "border-transparent bg-blue-100 text-blue-700",
        hot: "border-transparent bg-red-100 text-red-700",
        warm: "border-transparent bg-orange-100 text-orange-700",
        cold: "border-transparent bg-slate-100 text-slate-600",
        converted: "border-transparent bg-green-100 text-green-700",
        lost: "border-transparent bg-gray-100 text-gray-600",
        high: "border-transparent bg-red-50 text-red-600",
        medium: "border-transparent bg-amber-50 text-amber-700",
        low: "border-transparent bg-slate-50 text-slate-500",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
export { Badge, badgeVariants };
