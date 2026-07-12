interface StatsItemProps {
    icon: string;
    label: string;
    value: string | number;
}

export default function StatsItem({ icon, label, value }: StatsItemProps) {
    return (
        <div className="flex min-w-16 flex-col items-center justify-center px-4 py-2 rounded-xl bg-blackish border border-dark">
      <span className="text-grayish text-[0.65rem] font-bold uppercase tracking-wider">
        {icon} {label}
      </span>
            <span className="text-whitish text-xl font-black">
        {value}
      </span>
        </div>
    );
}