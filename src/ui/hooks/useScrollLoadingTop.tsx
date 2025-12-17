import { useState, useRef, type UIEvent } from "react";

export function useScrollLoadingTop() {

    const DELAY = 600;
    const THRESHOLD = 50;

    const isCoolingDown = useRef(false);
    const [trigger, setTrigger] = useState(1);
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        if (isCoolingDown.current) return;

        const scrollTop = e.currentTarget.scrollTop;

        if (scrollTop <= THRESHOLD && scrollTop >= 0) {

            setTrigger(prev => prev + 1);
            isCoolingDown.current = true;

            setTimeout(() => {
                isCoolingDown.current = false;
            }, DELAY);
        }
    };

    return { trigger, handleScroll, shouldScrollToBottom, setShouldScrollToBottom };
}
