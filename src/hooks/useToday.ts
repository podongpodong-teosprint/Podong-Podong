import { useMemo } from 'react';

export const useToday = () => {
  const todayDate = useMemo(() => {
    const date = new Date()
      .toLocaleDateString()
      .split('.')
      .slice(0, -1)
      .map((e) => e.replaceAll(' ', '').padStart(2, '0'));
    const year = date[0];
    const month = date[1];
    const day = date[2];
    return `${year}-${month}-${day}`;
  }, []);

  return todayDate;
};
