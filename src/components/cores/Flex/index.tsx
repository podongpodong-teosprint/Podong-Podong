import { cva } from 'class-variance-authority';
import React from 'react';
import { twMerge as tw } from 'tailwind-merge';

type TypeFlexVariants =
  | 'verticalLeft'
  | 'verticalCenter'
  | 'verticalRight'
  | 'horizontalLeft'
  | 'horizontalCenter'
  | 'horizontalRight';

const FlexVariants = cva('flex', {
  variants: {
    intents: {
      verticalLeft: 'flex-col items-start',
      verticalCenter: 'flex-col items-center',
      verticalRight: 'flex-col items-end',
      horizontalLeft: ' justify-start',
      horizontalCenter: ' justify-center',
      horizontalRight: ' justify-end',
    },
  },
  defaultVariants: {
    intents: 'horizontalLeft',
  },
});

interface IFlexProps {
  children?: React.ReactNode;
  variants?: TypeFlexVariants;
  className?: string;
}

export default function Flex({ children, variants, className }: IFlexProps) {
  return <div className={tw(FlexVariants({ intents: variants }), className)}>{children}</div>;
}
