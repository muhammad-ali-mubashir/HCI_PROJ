import * as React from "react"
import { cn } from "../../lib/utils"
import { CircleNotch } from '@phosphor-icons/react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {

    const variants = {
      primary: "cursor-pointer bg-primary text-primary-foreground hover:bg-primary-hover shadow-[var(--shadow-glow)]",
      secondary: "cursor-pointer bg-surface text-text-primary border border-[var(--color-border)] hover:bg-surface-hover hover:border-[var(--color-border-hover)]",
      outline: "cursor-pointer border border-[var(--color-border)] bg-transparent text-text-primary hover:bg-surface-hover hover:text-text-primary",
      ghost: "cursor-pointer hover:bg-surface-hover hover:text-text-primary text-text-secondary",
      danger: "cursor-pointer bg-error text-white hover:bg-error/90 focus-visible:ring-error/20",
      link: "cursor-pointer text-primary underline-offset-4 hover:underline",
      gradient: "cursor-pointer bg-gradient-to-b from-[var(--color-primary)] to-[#4f46e5] text-white border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.2),0_0_20px_rgba(99,102,241,0.3)] hover:brightness-110 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_12px_rgba(99,102,241,0.5)] active:translate-y-[1px] active:scale-[0.99] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]",
    }

    const sizes = {
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
      md: "h-9 px-4 py-2 has-[>svg]:px-3 text-sm",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4 text-base",
      icon: "size-9 flex items-center justify-center p-0",
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
          variants[variant === 'primary' ? 'primary' : variant as keyof typeof variants] || variants.primary,
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <CircleNotch className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="flex items-center">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="flex items-center">{rightIcon}</span>}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
