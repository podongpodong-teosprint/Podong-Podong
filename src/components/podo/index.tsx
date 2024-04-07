import { twMerge } from 'tailwind-merge';
import { TypeGrape, TypeGrapeShape } from './types';
import { grapes, styleByType } from './consts';
import { TypeMemorySchema } from 'apis/memory';
import { deepSearch } from 'utils.ts';
import { memo } from 'react';

const Podo = memo(function ({ memories }: { memories: TypeMemorySchema[] }) {
  const handlePodoClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = e.target as SVGElement;
    if (target.nodeName === 'circle') {
      console.log('circle clicked', target.id);
    }
  };

  const createGrape = (shape: TypeGrapeShape, type: TypeGrape) => {
    const baseClassName = 'cursor-pointer transition-all hover:rotate-1 active:-rotate-1';
    const normalTypeClassName = 'hover:opacity-90';
    const noneTypeClassName = 'hover:fill-[#645cbb]';
    const className = type === 0 ? noneTypeClassName : normalTypeClassName;
    const style = styleByType[type];
    return { ...shape, ...style, className: twMerge(baseClassName, className) };
  };

  return (
    <svg
      onClick={handlePodoClick}
      width="303"
      height="426"
      viewBox="0 0 303 426"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.7541 49.3339L102.221 85.5874C106.247 87.972 111.332 85.0364 111.279 80.3579L111.116 8.13284C111.065 3.54417 106.091 0.709459 102.117 3.00394L39.8122 38.9755C35.838 41.27 35.8059 46.995 39.7541 49.3339Z"
        fill="#14AE5C"
      />
      {grapes.map((grape, i) => {
        return <circle id={`${i}`} key={i} {...createGrape(grape, deepSearch(memories[`${i}`], 'density') ?? 0)} />;
      })}
    </svg>
  );
});

export default Podo;
