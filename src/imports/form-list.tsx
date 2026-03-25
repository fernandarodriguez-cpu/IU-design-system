"use client";

import * as React from "react";
import {
  useFieldArray,
  useFormContext,
  type ArrayPath,
  type FieldValues,
  type UseFieldArrayReturn,
} from "react-hook-form";
import { cn } from "./utils";

// ==================== TYPES ====================

export interface FormListProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>
> {
  /** Name of the field array */
  name: TName;
  /** Render function for list items */
  children: (
    fields: UseFieldArrayReturn<TFieldValues, TName>["fields"],
    operations: {
      add: (value?: any) => void;
      remove: (index: number) => void;
      move: (from: number, to: number) => void;
      insert: (index: number, value: any) => void;
      update: (index: number, value: any) => void;
      replace: (values: any[]) => void;
    }
  ) => React.ReactNode;
  /** Initial value for new items */
  initialValue?: any;
  /** Container className */
  className?: string;
}

// ==================== COMPONENT ====================

export function FormList<
  TFieldValues extends FieldValues = FieldValues,
  TName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>
>({
  name,
  children,
  initialValue,
  className,
}: FormListProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>();

  const { fields, append, remove, move, insert, update, replace } = useFieldArray({
    control,
    name,
  });

  const operations = React.useMemo(
    () => ({
      add: (value?: any) => {
        append((value || initialValue || {}) as any);
      },
      remove,
      move,
      insert: (index: number, value: any) => {
        insert(index, (value || initialValue || {}) as any);
      },
      update,
      replace,
    }),
    [append, remove, move, insert, update, replace, initialValue]
  );

  return (
    <div className={cn("space-y-4", className)}>
      {children(fields, operations)}
    </div>
  );
}

// ==================== FORM LIST ITEM ====================

export interface FormListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Index of the item */
  index: number;
  /** Whether to show remove button */
  showRemove?: boolean;
  /** Custom remove button */
  removeButton?: React.ReactNode;
  /** Remove callback */
  onRemove?: () => void;
}

export const FormListItem = React.forwardRef<HTMLDivElement, FormListItemProps>(
  (
    {
      className,
      index,
      showRemove = true,
      removeButton,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative p-4 border border-input rounded-lg bg-card",
          className
        )}
        {...props}
      >
        {children}
        {showRemove && (
          <div className="absolute top-2 right-2">
            {removeButton || (
              <button
                type="button"
                onClick={onRemove}
                className="inline-flex items-center justify-center size-6 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                aria-label="Remove item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

FormListItem.displayName = "FormListItem";

// ==================== EXPORT ====================

export { useFieldArray };
