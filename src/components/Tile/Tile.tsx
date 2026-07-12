interface TileProps {
    emoji: string;
    color: string;
    isFlipped: boolean;
    isMatched: boolean;
    isMismatch: boolean;
    onClick: () => void;
    disabled: boolean;
}

export default function Tile({
                                 emoji,
                                 color,
                                 isFlipped,
                                 isMatched,
                                 isMismatch,
                                 onClick,
                                 disabled,
                             }: TileProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || isMatched}
            className={`
        aspect-square rounded-2xl text-4xl sm:text-5xl
        flex items-center justify-center
        transition-all duration-200 ease-in-out
        ${isFlipped || isMatched ? 'scale-100' : 'hover:scale-105'}
        ${isMismatch ? 'animate-shake' : ''}
        disabled:cursor-default
      `}
            style={{
                background: isFlipped || isMatched ? color : '#1E1E2E',
                border: isMismatch
                    ? '3px solid #ef4444'
                    : isMatched
                        ? '3px solid #4ade80'
                        : '2px solid #2A2A3A',
                boxShadow: isFlipped || isMatched
                    ? `0 8px 24px ${color}40`
                    : 'none',
                color: isFlipped || isMatched ? '#FFFFFF' : 'transparent',
                transform: isMismatch ? 'scale(0.95)' : 'scale(1)',
            }}
        >
            {isFlipped || isMatched ? emoji : '❓'}
        </button>
    );
}