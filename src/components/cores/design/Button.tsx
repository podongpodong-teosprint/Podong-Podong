import { ComponentProps } from 'react';

type TypeButtonProps = {
  text: string;
} & ComponentProps<'button'>;

export default function Button({ text, ...props }: TypeButtonProps) {
  return (
    <button className="bg-purple px-3 py-1 rounded-full hover:bg-purple-hover" {...props}>
      {text}
    </button>
  );
}
