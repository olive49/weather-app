import { useEffect, useRef } from 'react'//   

interface UseIntervalProps{
  callback: () => void;
  delay: number;
}

const useInterval = ({callback, delay}: UseIntervalProps) =>{
  const savedCallback =  useRef<(() => void) | null>(null)

  useEffect(() => {
    console.log("IN THE FIRST USE EFFECT", delay)
    savedCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    function tick(){
      console.log("IN THE TICK", delay)
      savedCallback.current && savedCallback.current();
    }
    if(delay !== null){
      console.log("IN THE SECOND USE EFFECT", delay)
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval