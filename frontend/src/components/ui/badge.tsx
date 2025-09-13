import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors"
  
  const variantClasses = {
    default: "bg-primary-900 text-white",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-500 text-white",
    outline: "border border-gray-300 text-gray-700"
  }

  return (
    <div 
      className={cn(baseClasses, variantClasses[variant], className)} 
      {...props} 
    />
  )
}

export { Badge }
