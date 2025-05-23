"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      duration={3500} // 3.5 seconds
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toaster bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#29B6F6] text-charcoal border border-sky-500 shadow-xl",
          description: "text-muted",
          actionButton:
            "bg-emerald-600 text-white hover:brightness-110",
          cancelButton:
            "bg-light-ivory text-coral-pink",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
