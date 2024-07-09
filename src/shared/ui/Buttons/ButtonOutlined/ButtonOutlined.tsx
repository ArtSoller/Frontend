interface ButtonOutlinedProps {

    label: string
    disabled?: boolean
    handleClick?: () => void
}

export const ButtonOutlined = ({
       label,
       disabled,
       handleClick
}: ButtonOutlinedProps) => {return (
    <button
        className='text-viat-accent font-viat-body font-bold py-2 px-4 rounded-md'
        disabled={disabled}
        onClick={handleClick}
    >
        {label}
    </button>
)
}