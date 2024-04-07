import { useEffectAfterMount } from 'hooks/useEffectAfterMount';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Rating({ max = 1, onChange = () => {} }: { max: number; onChange?: (rating: number) => void }) {
  const [rating, setRating] = useState<number>(-1);
  const [tmpRating, setTmpRating] = useState<number>(-1);

  const handleClick = (index: number) => {
    if (index === rating) {
      setRating(-1);
    } else {
      setRating(index);
    }
  };

  useEffectAfterMount(() => {
    onChange(rating + 1);
  }, [rating]);

  return (
    <div className="flex w-full gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          onMouseEnter={() => {
            setTmpRating(i);
          }}
          onMouseLeave={() => {
            setTmpRating(rating);
          }}
          onClick={() => handleClick(i)}
          className={twMerge(
            'transition-all cursor-pointer w-[24px] h-[24px] rounded-full border border-dashed border-purple',
            i <= tmpRating && 'bg-purple/50',
            i <= rating && 'bg-purple'
          )}
        ></div>
      ))}
    </div>
  );
}
