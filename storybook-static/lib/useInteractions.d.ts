/// <reference types="react" />
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
export declare function useInteractions(ref: React.RefObject<HTMLElement>, callbacks: {
    onDrag?: (event: DragEvent) => void;
    onClick?: (event: ClickEvent) => void;
    onMouseMove?: (position: Vector) => void;
}): void;
export {};
