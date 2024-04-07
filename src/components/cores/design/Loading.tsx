import { twMerge } from 'tailwind-merge';

export default function Loading({
  size = 'md',
  color = 'primary',
}: {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
}) {
  return (
    <span
      className={twMerge(
        `loading loading-${size} loading-spinner text-primary`,
        color === 'primary' && 'text-purple',
        color === 'secondary' && 'text-purple-hover'
      )}
    ></span>
  );
}
