import { Dialog } from "@base-ui/react";
import { ReactNode } from "react";

type ModalWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

const widthClass: Record<ModalWidth, string> = {
  sm: "w-80",
  md: "w-96",
  lg: "w-[32rem]",
  xl: "w-[36rem]",
  "2xl": "w-[42rem]",
  "3xl": "w-[48rem]",
};

interface ModalProps {
  open?: boolean;
  children: ReactNode;
  trigger?: ReactNode;
  width?: ModalWidth;
  footer?: ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  setOpen?: (open: boolean) => void;
}

export function Modal({
  open,
  children,
  title,
  trigger,
  setOpen,
  width = "md",
  description,
  footer,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {trigger && <Dialog.Trigger>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed z-50 inset-0 min-h-dvh bg-black opacity-20 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup
          className={`fixed top-[calc(50%+1.25rem*var(--nested-dialogs))] left-1/2 -mt-8 flex ${widthClass[width]} max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 scale-[calc(1-0.1*var(--nested-dialogs))] bg-white p-4 shadow-sm transition-[top,scale,opacity] duration-100 ease-out after:absolute after:inset-0 after:bg-black/5 after:opacity-0 z-51 after:transition-opacity after:duration-100 after:ease-out after:pointer-events-none data-ending-style:top-[calc(50%+0.25rem+1.25rem*var(--nested-dialogs))] data-ending-style:scale-[0.96] data-ending-style:opacity-0 data-nested-dialog-open:after:opacity-100 data-starting-style:top-[calc(50%+0.25rem+1.25rem*var(--nested-dialogs))] data-starting-style:scale-[0.96] data-starting-style:opacity-0 rounded-lg outline-none`}
        >
          <div>
            {title && <Dialog.Title>{title}</Dialog.Title>}
            {description && (
              <Dialog.Description className="text-muted leading-[110%]">
                {description}
              </Dialog.Description>
            )}
          </div>

          {children}

          {footer}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
