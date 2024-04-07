import { twMerge } from 'tailwind-merge';

export default function Progressbar({
  value = 0,
  maxValue = 0,
  label = true,
  className,
}: {
  value?: number;
  maxValue?: number;
  label?: boolean;
  className?: string;
}) {
  return (
    <div className={twMerge('flex gap-1 items-center', className)}>
      <progress
        className="[&::-webkit-progress-bar]:rounded-lg w-full [&::-webkit-progress-value]:rounded-lg  [&::-webkit-progress-bar]:bg-gray [&::-webkit-progress-value]:bg-purple [&::-moz-progress-bar]:bg-purple"
        value={value}
        max={maxValue}
      ></progress>
      {label && (
        <p className="gap-1">
          <span>{value}</span>
          <span>/</span>
          <span className="">{maxValue}</span>
        </p>
      )}
    </div>
  );
}
