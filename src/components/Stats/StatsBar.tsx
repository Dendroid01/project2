import Button from "./Button";
import StatItem from "./StatItem";

function StatsBar() {
    return (
        <div className="flex flex-wrap gap-4 justify-center">
            <StatItem icon="🔄" label="ROUNDS" value="1" />
            <StatItem icon="✓" label="MATCHED" value={`2/8`} />
            <StatItem icon="⏱" label="TIME" value={1} />
            <Button onClick={() => {}} icon="↺">Restart</Button>
        </div>);
}

export default StatsBar