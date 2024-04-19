import { Dispatch, RefObject } from "react";
import { ZoomTransform } from "./interfaces";
import { useInteractions } from "./useInteractions";
import { useControlledUncontrolled } from "./useControlledUncontrolled";

export function usePan(ref: RefObject<HTMLElement>, options: {
    value?: ZoomTransform,
    defaultValue?: ZoomTransform,
    onChange?: Dispatch<ZoomTransform>,
    direction?: 'x' | 'y' | 'xy',
} = {}) {
    const [zoom, setZoom] = useControlledUncontrolled({
        value: options.value,
        defaultValue: options.defaultValue || { x: 0, y: 0, k: 1 },
        onChange: options.onChange,
    });

    useInteractions(ref, {
        onDrag: (event) => {
            setZoom((prev) => ({
                x: options.direction === 'y' ? prev.x : prev.x + event.movementX,
                y: options.direction === 'x' ? prev.y : prev.y + event.movementY,
                k: prev.k
            }))
        }
    });

    return { value: zoom, setValue: setZoom };
}