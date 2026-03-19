"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Info, 
  AlertTriangle 
} from "lucide-react";
import { cn } from "./utils";

// ==================== TYPES ====================

export interface ModalConfirmProps {
  /** Modal title */
  title?: React.ReactNode;
  /** Modal content */
  content?: React.ReactNode;
  /** OK button text */
  okText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** OK button type */
  okType?: "default" | "primary" | "danger";
  /** Show cancel button */
  showCancel?: boolean;
  /** Icon */
  icon?: React.ReactNode;
  /** OK callback */
  onOk?: () => void | Promise<void>;
  /** Cancel callback */
  onCancel?: () => void;
  /** Custom width */
  width?: number | string;
  /** Centered */
  centered?: boolean;
  /** Mask closable */
  maskClosable?: boolean;
  /** Auto focus on OK button */
  autoFocusButton?: "ok" | "cancel" | null;
}

interface ModalConfirmConfig extends ModalConfirmProps {
  type?: "info" | "success" | "error" | "warning" | "confirm";
}

// ==================== MODAL CONFIRM COMPONENT ====================

const ModalConfirmComponent: React.FC<
  ModalConfirmConfig & {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }
> = ({
  type = "confirm",
  title,
  content,
  okText = "OK",
  cancelText = "Cancelar",
  okType = "primary",
  showCancel = true,
  icon,
  onOk,
  onCancel,
  width = 416,
  centered = true,
  maskClosable = true,
  autoFocusButton = "ok",
  open,
  onOpenChange,
}) => {
  const [loading, setLoading] = React.useState(false);

  // Default icons by type
  const defaultIcons = {
    info: <Info className="size-6 text-blue-500" />,
    success: <CheckCircle2 className="size-6 text-green-500" />,
    error: <XCircle className="size-6 text-red-500" />,
    warning: <AlertTriangle className="size-6 text-yellow-500" />,
    confirm: <AlertCircle className="size-6 text-blue-500" />,
  };

  const displayIcon = icon !== undefined ? icon : defaultIcons[type];

  const handleOk = async () => {
    if (onOk) {
      setLoading(true);
      try {
        await onOk();
        onOpenChange(false);
      } catch (error) {
        console.error("Modal confirm error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && maskClosable) {
      handleCancel();
    }
  };

  const okButtonVariant =
    okType === "danger"
      ? "destructive"
      : okType === "primary"
      ? "default"
      : "outline";

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent
        style={{ width: typeof width === "number" ? `${width}px` : width }}
        className={cn(centered && "top-[50%] translate-y-[-50%]")}
      >
        <AlertDialogHeader>
          {displayIcon && (
            <div className="flex justify-center mb-4">{displayIcon}</div>
          )}
          {title && <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>}
          {content && (
            <AlertDialogDescription className="text-center">
              {content}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row justify-center gap-2">
          {showCancel && (
            <AlertDialogCancel
              onClick={handleCancel}
              autoFocus={autoFocusButton === "cancel"}
            >
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={handleOk}
            disabled={loading}
            autoFocus={autoFocusButton === "ok"}
            className={cn(
              okButtonVariant === "destructive" && "bg-destructive hover:bg-destructive/90"
            )}
          >
            {loading ? "Procesando..." : okText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// ==================== MODAL METHODS ====================

let modalContainer: HTMLDivElement | null = null;
let modalRoot: any = null;

const getModalContainer = () => {
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.setAttribute("id", "modal-confirm-container");
    document.body.appendChild(modalContainer);
  }
  return modalContainer;
};

const destroyModal = () => {
  if (modalRoot) {
    modalRoot.unmount();
    modalRoot = null;
  }
  if (modalContainer) {
    document.body.removeChild(modalContainer);
    modalContainer = null;
  }
};

const showModal = (config: ModalConfirmConfig) => {
  const container = getModalContainer();

  // Clean up previous modal
  if (modalRoot) {
    modalRoot.unmount();
  }

  return new Promise<void>((resolve, reject) => {
    const handleOk = async () => {
      try {
        if (config.onOk) {
          await config.onOk();
        }
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        destroyModal();
      }
    };

    const handleCancel = () => {
      config.onCancel?.();
      destroyModal();
      reject(new Error("Cancel"));
    };

    const ModalWrapper = () => {
      const [open, setOpen] = React.useState(true);

      const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
          setTimeout(() => {
            handleCancel();
          }, 150);
        }
      };

      return (
        <ModalConfirmComponent
          {...config}
          open={open}
          onOpenChange={handleOpenChange}
          onOk={handleOk}
          onCancel={handleCancel}
        />
      );
    };

    modalRoot = createRoot(container);
    modalRoot.render(<ModalWrapper />);
  });
};

// ==================== EXPORTED METHODS ====================

export const Modal = {
  /**
   * Show confirmation modal
   */
  confirm: (config: ModalConfirmProps) => {
    return showModal({
      ...config,
      type: "confirm",
      showCancel: config.showCancel !== false,
    });
  },

  /**
   * Show info modal
   */
  info: (config: Omit<ModalConfirmProps, "showCancel">) => {
    return showModal({
      ...config,
      type: "info",
      showCancel: false,
      okType: "default",
    });
  },

  /**
   * Show success modal
   */
  success: (config: Omit<ModalConfirmProps, "showCancel">) => {
    return showModal({
      ...config,
      type: "success",
      showCancel: false,
      okType: "primary",
    });
  },

  /**
   * Show error modal
   */
  error: (config: Omit<ModalConfirmProps, "showCancel">) => {
    return showModal({
      ...config,
      type: "error",
      showCancel: false,
      okType: "danger",
    });
  },

  /**
   * Show warning modal
   */
  warning: (config: ModalConfirmProps) => {
    return showModal({
      ...config,
      type: "warning",
      showCancel: config.showCancel !== false,
      okType: "primary",
    });
  },

  /**
   * Destroy all modals
   */
  destroyAll: () => {
    destroyModal();
  },
};

// Export types
export type { ModalConfirmProps, ModalConfirmConfig };
