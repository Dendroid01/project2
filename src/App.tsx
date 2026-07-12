import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

import Header from './components/Header/Header';
import StatsBar from './components/Stats/StatsBar';
import Tile from './components/Tile/Tile.tsx';
import WinModal from './components/WinModal/WinModal';

const PAIRS = [
    { emoji: '🦊', color: '#ff7849' },
    { emoji: '🐬', color: '#38bdf8' },
    { emoji: '🌺', color: '#f472b6' },
    { emoji: '🍋', color: '#facc15' },
    { emoji: '🐢', color: '#4ade80' },
    { emoji: '🦋', color: '#a78bfa' },
    { emoji: '🍉', color: '#fb7185' },
    { emoji: '🐙', color: '#34d399' },
];

interface TileState {
    id: number;
    pairId: number;
    emoji: string;
    color: string;
    isFlipped: boolean;
    isMatched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function buildTiles(): TileState[] {
    const doubled = PAIRS.flatMap((p, pairId) => [
        { pairId, emoji: p.emoji, color: p.color },
        { pairId, emoji: p.emoji, color: p.color },
    ]);
    return shuffle(doubled).map((t, id) => ({
        id,
        ...t,
        isFlipped: false,
        isMatched: false,
    }));
}

export default function App() {
    const [tiles, setTiles] = useState<TileState[]>(buildTiles);
    const [selected, setSelected] = useState<number[]>([]);
    const [mismatchIds, setMismatchIds] = useState<number[]>([]);
    const [rounds, setRounds] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (gameStarted && !gameWon) {
            timerRef.current = setInterval(
                () => setSeconds((s) => s + 1),
                1000
            );
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [gameStarted, gameWon]);

    const handleRestart = useCallback(() => {
        setTiles(buildTiles());
        setSelected([]);
        setMismatchIds([]);
        setRounds(0);
        setSeconds(0);
        setGameStarted(false);
        setGameWon(false);
        setIsChecking(false);
    }, []);

    const handleTileClick = useCallback(
        (id: number) => {
            if (isChecking) return;
            if (selected.includes(id)) return;
            if (tiles[id].isMatched) return;

            if (!gameStarted) setGameStarted(true);

            const nextSelected = [...selected, id];
            setTiles((prev) =>
                prev.map((t) =>
                    t.id === id ? { ...t, isFlipped: true } : t
                )
            );

            if (nextSelected.length === 1) {
                setSelected(nextSelected);
                return;
            }

            const [firstId, secondId] = nextSelected;
            setRounds((r) => r + 1);
            setSelected([]);

            const first = tiles[firstId];
            const second = tiles[secondId];

            if (first.pairId === second.pairId) {
                setIsChecking(true);
                setTimeout(() => {
                    setTiles((prev) => {
                        const next = prev.map((t) =>
                            t.id === firstId || t.id === secondId
                                ? { ...t, isMatched: true, isFlipped: true }
                                : t
                        );
                        const won = next.every((t) => t.isMatched);
                        if (won) setGameWon(true);
                        return next;
                    });
                    setIsChecking(false);
                }, 250);
            } else {
                setIsChecking(true);
                setMismatchIds([firstId, secondId]);
                setTimeout(() => {
                    setMismatchIds([]);
                    setTiles((prev) =>
                        prev.map((t) =>
                            t.id === firstId || t.id === secondId
                                ? { ...t, isFlipped: false }
                                : t
                        )
                    );
                    setIsChecking(false);
                }, 900);
            }
        },
        [tiles, selected, isChecking, gameStarted]
    );

    const matchedCount = tiles.filter((t) => t.isMatched).length / 2;
    const totalPairs = PAIRS.length;

    return (
        <div className="min-h-screen bg-pitch flex flex-col items-center px-4 py-8 relative overflow-hidden">
            <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-150 h-100 pointer-events-none">
                <div className="w-full h-full bg-gradient-radial from-purple-500/15 to-transparent" />
            </div>

            <Header />

            <StatsBar
                rounds={rounds}
                matched={matchedCount}
                totalPairs={totalPairs}
                seconds={seconds}
                onRestart={handleRestart}
            />

            <div className="w-full max-w-120 h-1 bg-deep rounded-full mb-6 overflow-hidden">
                <div
                    className="h-full bg-linear-to-r from-[#6c63ff] to-[#8b5cf6] rounded-full transition-all duration-400"
                    style={{ width: `${(matchedCount / totalPairs) * 100}%` }}
                />
            </div>

            <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full max-w-120">
                {tiles.map((tile) => (
                    <Tile
                        key={tile.id}
                        emoji={tile.emoji}
                        color={tile.color}
                        isFlipped={tile.isFlipped}
                        isMatched={tile.isMatched}
                        isMismatch={mismatchIds.includes(tile.id)}
                        onClick={() => handleTileClick(tile.id)}
                        disabled={isChecking || tile.isMatched}
                    />
                ))}
            </div>

            {gameWon && (
                <WinModal
                    rounds={rounds}
                    seconds={seconds}
                    onRestart={handleRestart}
                />
            )}
        </div>
    );
}