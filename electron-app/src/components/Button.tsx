import React from 'react'

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'danger' | 'light'
    className?: string
    disabled?: boolean
}

const variantStyles: Record<string, string> = {
    primary: 'bg-primario text-white hover:bg-opacity-90',
    secondary: 'bg-secundario text-white hover:bg-opacity-90',
    danger: 'bg-sexto text-white hover:bg-opacity-90',
    light: 'bg-cuarto text-primario hover:bg-opacity-90',
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    className = '',
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        px-4 py-2 rounded transition duration-200 font-semibold cursor-pointer
        ${variantStyles[variant]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
        >
            {children}
        </button>
    )
}

export default Button
