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
interface UseInteractionsProps {
    /**
     * The minimum distance the mouse has to be dragged before the onDrag event is emitted.
     */
    minimumDragDistance?: number;
    /**
     * Called when the mouse hast been dragged at least minimumDragDistance
     * pixels from the start point. This event is emitted at max once per frame.
     */
    onDrag?: (event: DragEvent) => void;
    /**
     * Called when the mouse has been clicked and NOT dragged at least minimumDragDistance pixels.
     */
    onClick?: (event: ClickEvent) => void;
    /**
     * Called when the mouse moves over the element while not dragging.
     */
    onMouseMove?: (position: Vector) => void;
    /**
     * If set to overlay, a full screen overlay div will be added to the dom
     * after the mouse down event. This is useful if you want to preserve the
     * cursor of the element while dragging.
     *
     * Otherwise the window will be used as the target for mouse move events.
     */
    moveTarget?: 'window' | 'overlay';
}
/**
 * supports interactions like drag, mousemove etc with an overlay div in the dom
 */
export declare function useInteractions(ref: React.RefObject<HTMLElement>, callbacks?: UseInteractionsProps): void;
export {};
