import { useMemo } from 'react';

export const useToday = () => {
  const todayDate = useMemo(() => {
    const date = new Date().toLocaleDateString().split('.').slice(0, -1);
    const year = date[0];
    const month = date[1].replace(' ', '0');
    const day = date[2].replace(' ', '0');
    return `${year}-${month}-${day}`;
  }, []);

  return todayDate;
};
