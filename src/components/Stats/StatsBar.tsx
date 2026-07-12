import Button from "./Button";
import StatItem from "./StatItem";

interface StatsBarProps {
    rounds: number;
    matched: number;
    totalPairs: number;
    seconds: number;
    onRestart: () => void;
}

function formatTime(s: number): string {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function StatsBar({
                                     rounds,
                                     matched,
                                     totalPairs,
                                     seconds,
                                     onRestart
                                 }: StatsBarProps) {
    return (
        <div className="flex flex-wrap gap-4 justify-center mb-8">
            <StatItem icon="🔄" label="ROUNDS" value={rounds} />
            <StatItem icon="✓" label="MATCHED" value={`${matched}/${totalPairs}`} />
            <StatItem icon="⏱" label="TIME" value={formatTime(seconds)} />
            <Button onClick={onRestart} icon="↺">Restart</Button>
        </div>
    );
}