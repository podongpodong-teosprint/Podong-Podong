import React, { ComponentProps, Suspense } from 'react';
import { TypeIconName } from './types.ts';

interface ISvgProps {
  iconName: TypeIconName;
  svgProps?: ComponentProps<'svg'>;
}

export default function Svg({ iconName, svgProps }: ISvgProps) {
  const Component = React.lazy(() => import(`../../../assets/svgs/${iconName}.svg?react`));
  return (
    <Suspense fallback={<div className="w-[24px] h-[24px]" />}>
      <Component {...svgProps} />
    </Suspense>
  );
}
