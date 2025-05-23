import React, { ReactNode } from "react"

interface NextButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}

const NextButton = ({ children, onClick, disabled }: NextButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 rounded-lg font-medium text-white transition-colors
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-br from-[#0a3b5e] to-[#1e6a9e] hover:brightness-110"}
      `}
      disabled={disabled}
      type="button"
    >
      <span className="flex justify-center items-center">{children}</span>
    </button>
  )
}

export default NextButton
