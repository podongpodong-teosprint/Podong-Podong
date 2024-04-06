import { RefObject, useEffect } from 'react';

interface IUseClickOutside<T> {
  handleClickOutside: () => void;
  ref: RefObject<T>;
}

const useClickOutside = ({ handleClickOutside, ref }: IUseClickOutside<HTMLElement>) => {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as Node;
    const isOutside = ref.current && !ref.current.contains(target);
    if (isOutside) handleClickOutside();
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [ref, handleClickOutside]);
};

export { useClickOutside };
