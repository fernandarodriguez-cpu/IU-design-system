"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "./utils";
import { useTokens } from "./useTokens";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { tokens } = useTokens();
  
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      style={{
        gap: tokens.spacing[2],
      }}
      {...props}
    />
  );
}

export { Label };
