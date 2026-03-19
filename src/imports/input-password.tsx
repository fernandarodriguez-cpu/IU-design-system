"use client";

import * as React from "react";
import { Input, InputProps } from "./input";
import { Eye, EyeOff } from "lucide-react";

// ==================== TYPES ====================

export interface InputPasswordProps extends Omit<InputProps, 'type' | 'suffix'> {
  /** Show visibility toggle icon */
  visibilityToggle?: boolean;
  /** Custom icon for visibility toggle */
  iconRender?: (visible: boolean) => React.ReactNode;
}

// ==================== COMPONENT ====================

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    {
      visibilityToggle = true,
      iconRender,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(false);

    const defaultIconRender = (visible: boolean) => {
      return visible ? (
        <EyeOff className="size-4" />
      ) : (
        <Eye className="size-4" />
      );
    };

    const toggleButton = visibilityToggle ? (
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="inline-flex items-center justify-center hover:bg-muted rounded-sm p-0.5 transition-colors"
        tabIndex={-1}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {iconRender ? iconRender(visible) : defaultIconRender(visible)}
      </button>
    ) : undefined;

    return (
      <Input
        ref={ref}
        type={visible ? "text" : "password"}
        suffix={toggleButton}
        {...props}
      />
    );
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
