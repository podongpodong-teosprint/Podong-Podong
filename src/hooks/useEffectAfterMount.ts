import { useEffect, useRef } from 'react';

const useEffectAfterMount = (callback: React.EffectCallback, dependency: React.DependencyList) => {
  const justMounted = useRef(true);
  useEffect(() => {
    if (!justMounted.current) callback(); // don't need to return
    justMounted.current = false;
  }, dependency);
};

export { useEffectAfterMount };
