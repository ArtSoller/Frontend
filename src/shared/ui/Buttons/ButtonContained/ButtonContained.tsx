interface ButtonContainedProps {
    label: string
    disabled?: boolean
    handleClick?: () => void
    className?: string;
}

export const ButtonContained = ({
        label,
        disabled,
        handleClick,
        className
}: ButtonContainedProps) => {
    return (
        <button
            className={className + 'text-viat-bg font-viat-body hover:text-viat-accent font-bold py-2 px-4 rounded-md'}
            disabled={disabled}
            onClick={handleClick}
        >
            {label}
        </button>
    )
}