interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    icon?: string;
}

function Button({onClick, children, icon}: ButtonProps) {
    return (
        <button
            className="flex flex-row justify-center items-center rounded-2xl px-4 py-2 bg-blackish border border-dark gap-2
            transition-all duration-200 ease-in-out hover:scale-105"
            onClick={onClick}
        >
            {icon && <span className="text-mist font-bold">{icon}</span>}
            <span className="text-mist font-bold">{children}</span>
        </button>
    );
}

export default Button;