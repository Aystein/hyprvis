import { useEffect, useRef } from "react";

interface Vector {
    x: number;
    y: number;
}

/**
 * supports interactions like drag, mousemove etc with an overlay div in the dom
 */
export function useInteractions(ref: React.RefObject<HTMLElement>, callbacks: {
    onDrag?: (start: Vector, end: Vector, movement: Vector) => void;
    onClick?: (position: Vector) => void;
    onMouseMove?: (position: Vector) => void;
}
) {
    // Store state in ref for performance
    // https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-useeffect
    const stateRef = useRef({
        state: 'idle',
        start: { x: 0, y: 0 },
        overlay: null,
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

            stateRef.current.overlay = overlay;

            document.body.appendChild(overlay);

            const windowMouseMove = (event: MouseEvent) => {
                const { x, y } = relativeMousePosition(event);

                // if distance is larger than 4px
                if (stateRef.current.state === 'mouse_down' && Math.abs(x - stateRef.current.start.x) > 4 || Math.abs(y - stateRef.current.start.y) > 4) {
                    // First drag
                    stateRef.current.state = 'drag';
                    callbacks.onDrag?.(stateRef.current.start, { x, y }, { x: x - stateRef.current.start.x, y: y - stateRef.current.start.y });
                    stateRef.current.start = { x, y };
                } else if (stateRef.current.state === 'drag') {
                    // Dragging
                    callbacks.onDrag?.(stateRef.current.start, { x, y }, { x: x - stateRef.current.start.x, y: y - stateRef.current.start.y });
                    stateRef.current.start = { x, y };
                }
            }

            const windowMouseUp = (event: MouseEvent) => {
                // Last drag event
                if (stateRef.current.state === 'drag') {
                    const { x, y } = relativeMousePosition(event);
                    callbacks.onDrag?.(stateRef.current.start, { x, y }, { x: x - stateRef.current.start.x, y: y - stateRef.current.start.y });
                } else if (stateRef.current.state === 'mouse_down') {
                    // Click
                    const { x, y } = relativeMousePosition(event);

                    callbacks.onClick?.({ x, y });
                }

                overlay.remove();
                stateRef.current.overlay = null;
                stateRef.current.state = 'idle';

                window.removeEventListener("mouseup", windowMouseUp);
                window.removeEventListener("mousemove", windowMouseMove);
            }

            window.addEventListener("mouseup", windowMouseUp);
            window.addEventListener("mousemove", windowMouseMove);

            stateRef.current.start = { x, y };
            stateRef.current.state = 'mouse_down';
        };

        element.addEventListener("mousedown", handleMouseDown);

        return () => {
            element.removeEventListener("mousedown", handleMouseDown);
        }
    }, [ref])
}