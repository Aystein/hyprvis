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
            event.preventDefault();

            // Get x,y coordinates relative to ref
            const rect = element.getBoundingClientRect();

            callbackRef.current({
                ...normalizeWheelEvent(event),
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            });
        };

        element.addEventListener("wheel", handler, { passive: false });

        return () => {
            element.removeEventListener("wheel", handler);
        };
    }, [ref]);
}