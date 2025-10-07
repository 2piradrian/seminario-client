import { useState, useEffect, useRef } from "react";

export function useScrollLoading() {

  const DELAY: number = 600;

  const isCoolingDown = useRef(false);
  const [trigger, setTrigger] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (isCoolingDown.current) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      const contentHeight = document.documentElement.scrollHeight;

      const distanceToBottom = contentHeight - (scrollTop + clientHeight);

      if (distanceToBottom <= 250) {
        setTrigger(prev => prev + 1);
        isCoolingDown.current = true;

        setTimeout(() => {
          isCoolingDown.current = false;
        }, DELAY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [DELAY]);

  return { trigger };
}
