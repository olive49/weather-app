import { useEffect, useRef } from 'react';

interface UseIntervalProps {
  callback: () => void;
  delay: number;
}

const useInterval = ({ callback, delay }: UseIntervalProps) => {
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
