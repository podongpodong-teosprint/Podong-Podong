import { useRef } from 'react';
import { TypeGrape, TypeGrapeShape } from '../podo/types';
import { twMerge } from 'tailwind-merge';
import ConfirmModal from './ConfirmModal';
import { styleByType, grapes } from './consts';

export default function Podo({ param }: { param: string }) {
  const createGrape = (shape: TypeGrapeShape, type: TypeGrape) => {
    const baseClassName = 'cursor-pointer transition-all ';
    const style = styleByType[type];
    return { ...shape, ...style, className: twMerge(baseClassName) };
  };

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div className="flex flex-col hover:scale-105 transition-all">
      <svg
        onClick={openModal}
        width="100"
        height="200"
        viewBox="0 0 303 426"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M39.7541 49.3339L102.221 85.5874C106.247 87.972 111.332 85.0364 111.279 80.3579L111.116 8.13284C111.065 3.54417 106.091 0.709459 102.117 3.00394L39.8122 38.9755C35.838 41.27 35.8059 46.995 39.7541 49.3339Z"
          fill="#14AE5C"
        />
        {grapes.map((grape, i) => {
          return <circle id={`${i}`} key={i} {...createGrape(grape, (i % 3) + 1)} />;
        })}
      </svg>
      <ConfirmModal modalRef={modalRef} param={param} />
    </div>
  );
}
