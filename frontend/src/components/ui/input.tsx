import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

function Input({
  className,
  type,
  icon,
  rightIcon,
  onRightIconClick,
  ...props
}: Readonly<InputProps>) {
  const baseClasses =
    "h-9 w-full min-w-0 rounded-md border border-input bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30";
  const focusClasses =
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";
  const invalidClasses =
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40";

  const hasLeftIcon = Boolean(icon);
  const hasRightIcon = Boolean(rightIcon);

  const inputElement = (
    <input
      type={type}
      data-slot="input"
      className={cn(
        baseClasses,
        focusClasses,
        invalidClasses,
        hasLeftIcon ? "pl-9" : "pl-3",
        hasRightIcon ? "pr-9" : "pr-3",
        className,
      )}
      {...props}
    />
  );

  if (!hasLeftIcon && !hasRightIcon) {
    return inputElement;
  }

  return (
    <div className="relative flex w-full items-center">
      {hasLeftIcon ? (
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground [&>svg]:size-4">
          {icon}
        </span>
      ) : null}
      {inputElement}
      {hasRightIcon ? (
        onRightIconClick ? (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute inset-y-0 right-3 inline-flex items-center text-muted-foreground hover:text-foreground focus-visible:outline-none"
          >
            {rightIcon}
          </button>
        ) : (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground [&>svg]:size-4">
            {rightIcon}
          </span>
        )
      ) : null}
    </div>
  );
}

export { Input };
