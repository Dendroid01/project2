interface WinModalProps {
    rounds: number;
    seconds: number;
    onRestart: () => void;
}

export default function WinModal({ rounds, seconds, onRestart }: WinModalProps) {
    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300">
            <div className="bg-[#16161F] border border-[#2A2A3A] rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-black text-[#F0F0F5] mb-2">
                    You Won!
                </h2>
                <p className="text-[#8888AA] mb-6">
                    Congratulations! You matched all pairs.
                </p>

                <div className="flex justify-center gap-6 mb-8">
                    <div>
                        <div className="text-xs font-bold text-[#8888AA] uppercase tracking-wider">
                            🔄 Rounds
                        </div>
                        <div className="text-2xl font-black text-[#F0F0F5]">
                            {rounds}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-[#8888AA] uppercase tracking-wider">
                            ⏱ Time
                        </div>
                        <div className="text-2xl font-black text-[#F0F0F5]">
                            {formatTime(seconds)}
                        </div>
                    </div>
                </div>

                <button
                    onClick={onRestart}
                    className="w-full py-3 px-6 bg-gradient-to-r from-[#6c63ff] to-[#8b5cf6]
                     rounded-2xl font-bold text-white transition-all hover:scale-105
                     hover:shadow-lg hover:shadow-purple-500/25"
                >
                    Play Again ↺
                </button>
            </div>
        </div>
    );
}