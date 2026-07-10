interface StatsItemProps {
    icon: string;
    label: string;
    value: string | number;
}

function StatsItem({icon, label, value}: StatsItemProps) {
    return (
        <div className="flex min-w-16 flex-col items-center justify-center px-4 py-2 rounded-xl bg-blackish">
            <span className="text-grayish text-xs font-bold">{icon} {label}</span>
            <span className="text-whitish text-2xl font-black">{value}</span>
        </div>
    );
}

export default StatsItem