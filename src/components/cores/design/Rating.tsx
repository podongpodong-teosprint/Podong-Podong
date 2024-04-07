import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Rating({
  value,
  max = 1,
  onChange = () => {},
}: {
  value: number;
  max: number;
  onChange: (rating: number) => void;
}) {
  const [rating, setRating] = useState<number>(value);
  const [tmpRating, setTmpRating] = useState<number>(-1);

  const handleClick = (index: number) => {
    if (index === rating) {
      setRating(-1);
      onChange(0);
    } else {
      setRating(index);
      onChange(index + 1);
    }
  };

  useEffect(() => {
    setRating(value);
  }, [value]);

  return (
    <div className="flex w-full gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={`rate-${i}`}
          onMouseEnter={() => {
            setTmpRating(i);
          }}
          onMouseLeave={() => {
            setTmpRating(rating);
          }}
          onClick={() => handleClick(i)}
          className={twMerge(
            'transition-all cursor-pointer w-[24px] h-[24px] rounded-full border-2 border-dashed border-purple',
            i <= tmpRating && 'bg-purple/50',
            i <= rating && 'bg-purple'
          )}
        ></div>
      ))}
    </div>
  );
}
