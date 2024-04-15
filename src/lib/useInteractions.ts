import { useEffect, useRef } from "react";

interface Vector {
    x: number;
    y: number;
}

interface DragEvent {
    anchor: Vector;
    start: Vector;
    end: Vector;
    movementX: number;
    movementY: number;
    isFirstDrag: boolean;
    isLastDrag: boolean;
    clientX: number;
    clientY: number;
    target: HTMLElement;
}

interface ClickEvent {
    x: number;
    y: number;
    target: HTMLElement;
}

/**
 * supports interactions like drag, mousemove etc with an overlay div in the dom
 */
export function useInteractions(ref: React.RefObject<HTMLElement>, callbacks: {
    onDrag?: (event: DragEvent) => void;
    onClick?: (event: ClickEvent) => void;
    onMouseMove?: (position: Vector) => void;
}
) {
    // Store state in ref for performance
    // https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-useeffect
    const stateRef = useRef({
        state: 'idle',
        anchor: { x: 0, y: 0 },
        start: { x: 0, y: 0 },
        overlay: null,
        target: null,
        frame: undefined,
        isFirstDrag: false,
        isLastDrag: false,
    });

    const callbacksRef = useRef(callbacks);
    callbacksRef.current = callbacks;


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
            event.stopPropagation();
            event.preventDefault();
            
            const { x, y } = relativeMousePosition(event);

            // Add overlay div to the dom
            const overlay = document.createElement("div");

            overlay.style.position = "absolute";
            overlay.style.inset = "0";

            stateRef.current.overlay = overlay;
            stateRef.current.anchor = { x, y };
            stateRef.current.target = event.target;

            // Get cursor of the element and set it on the overlay
            const cursor = window.getComputedStyle(element).cursor;
            overlay.style.cursor = cursor;

            document.body.appendChild(overlay);

            // Combines multiple mouse move events into one by only allow
            // one event to be processed every frame
            const debouncedMouseMove = (event: DragEvent) => {
                if (stateRef.current.frame) {
                    cancelAnimationFrame(stateRef.current.frame);
                }

                stateRef.current.frame = requestAnimationFrame(() => {
                    event.isFirstDrag = stateRef.current.isFirstDrag;
                    event.isLastDrag = stateRef.current.isLastDrag;

                    callbacksRef.current.onDrag?.(event);

                    stateRef.current.start = event.end;
                    stateRef.current.frame = undefined;
                    stateRef.current.isFirstDrag = false;
                    stateRef.current.isLastDrag = false;
                });
            }

            const windowMouseMove = (event: MouseEvent) => {
                const { x, y } = relativeMousePosition(event);

                let emitEvent = false;

                // if distance is larger than 4px
                if (stateRef.current.state === 'mouse_down' && (Math.abs(x - stateRef.current.start.x) > 4 || Math.abs(y - stateRef.current.start.y) > 4)) {
                    // First drag
                    stateRef.current.state = 'drag';

                    stateRef.current.isFirstDrag = true;

                    emitEvent = true;
                } else if (stateRef.current.state === 'drag') {
                    // Dragging
                    emitEvent = true;
                }

                if (emitEvent) {
                    debouncedMouseMove({
                        anchor: stateRef.current.anchor,
                        start: stateRef.current.start,
                        end: { x, y },
                        movementX: x - stateRef.current.start.x,
                        movementY: y - stateRef.current.start.y,
                        isFirstDrag: stateRef.current.isFirstDrag,
                        isLastDrag: stateRef.current.isLastDrag,
                        clientX: event.clientX,
                        clientY: event.clientY,
                        target: stateRef.current.target
                    });
                }
            }

            const windowMouseUp = (event: MouseEvent) => {
                // Last drag event
                if (stateRef.current.state === 'drag') {
                    const { x, y } = relativeMousePosition(event);
                    
                    stateRef.current.isLastDrag = true;

                    debouncedMouseMove({
                        anchor: stateRef.current.anchor,
                        start: stateRef.current.start,
                        end: { x, y },
                        movementX: x - stateRef.current.start.x,
                        movementY: y - stateRef.current.start.y,
                        isFirstDrag: false,
                        isLastDrag: true,
                        clientX: event.clientX,
                        clientY: event.clientY,
                        target: stateRef.current.target
                    })
                } else if (stateRef.current.state === 'mouse_down') {
                    // Click
                    const { x, y } = relativeMousePosition(event);

                    callbacksRef.current.onClick?.({ x, y, target: stateRef.current.target });
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