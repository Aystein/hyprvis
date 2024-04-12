import { useRef, RefObject, useEffect } from "react";
import { normalizeWheelEvent } from "./normalizeWheelEvent";
import { NormalizedWheelEvent } from "./interfaces";

/**
 * Adds active wheel listener to element and calls callback
 */
export function useWheel(ref: RefObject<HTMLElement>, callback: (event: NormalizedWheelEvent) => void){
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return;
        }

        const handler = (event: WheelEvent) => {
            callbackRef.current(normalizeWheelEvent(event));
        };

        element.addEventListener("wheel", handler, { passive: false });

        return () => {
            element.removeEventListener("wheel", handler);
        };
    }, [ref]);
}