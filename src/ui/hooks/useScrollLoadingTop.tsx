import { useState, useEffect, useRef } from "react";

export function useScrollLoadingTop() {

  const DELAY = 600;

  const THRESHOLD = 50; 

  const isCoolingDown = useRef(false);
  const [trigger, setTrigger] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (isCoolingDown.current) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop <= THRESHOLD && scrollTop >= 0) {
        
        setTrigger(prev => prev + 1);
        isCoolingDown.current = true;

        setTimeout(() => {
          isCoolingDown.current = false;
        }, DELAY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); 

  return { trigger };
}
