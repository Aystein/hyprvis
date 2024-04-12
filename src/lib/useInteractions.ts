import { useEffect, useRef } from "react";

/**
 * supports interactions like drag, mousemove etc with an overlay div in the dom
 */
export function useInteractions(ref: React.RefObject<HTMLElement>) {
    // Store state in ref for performance
    // https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-useeffect
    const stateRef = useRef({
        isDragging: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        overlay: undefined,
    });

    useEffect(() => {
        // Add mouse down, move and up listeners to element
        const element = ref.current;

        if (!element) {
            return;
        }

        const relativeMousePosition = (event: MouseEvent) => {
            const bounds = element.getBoundingClientRect();
            return {
                x: event.clientX - bounds.left,
                y: event.clientY - bounds.top,
            };
        }


        const handleMouseDown = (event: MouseEvent) => {
            const { x, y } = relativeMousePosition(event);

            // Add overlay div to the dom
            const overlay = document.createElement("div");
            overlay.style.position = "absolute";
            overlay.style.inset = "0";

            document.body.appendChild(overlay);

            overlay.addEventListener("mousemove", (event) => {
                const { x, y } = relativeMousePosition(event);
                
            });

            stateRef.current = {
                ...stateRef.current,
                isDragging: true,
                startX: x,
                startY: y,
                currentX: x,
                currentY: y,
            };
        };

        const handleMouseMove = (event: MouseEvent) => {
            
        };

        const handleMouseUp = (event: MouseEvent) => {
            
        };

        element.addEventListener("mousedown", handleMouseDown);
        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseup", handleMouseUp);

        return () => {
            element.removeEventListener("mousedown", handleMouseDown);
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseup", handleMouseUp);
        }
    }, [ref])
}