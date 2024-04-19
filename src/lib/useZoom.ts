import { RefObject } from "react";
import { useWheel } from "./useWheel";
import { calculateTransform, defaultConstraint } from "./transform";
import { useControlledUncontrolled } from "./useControlledUncontrolled";
import { ZoomTransform } from "./interfaces";

/**
 * useZoom manages zoom state and provides a way to control zoom state.
 * It can be used controlled or uncontrolled.
 * In controlled mode you can provide a value and an onChange handler.
 * In uncontrolled mode you can provide a defaultValue and the hook
 * will return the current value and a setter.
 */
export function useZoom(ref: RefObject<HTMLElement>, options: {
    value?: ZoomTransform,
    defaultValue?: ZoomTransform,
    onChange?: (value: ZoomTransform) => void,
    constraint?: (transform: ZoomTransform) => ZoomTransform,
    direction?: 'x' | 'y' | 'xy',
} = {}) {
    const [internalValue, setInternalValue] = useControlledUncontrolled({
        value: options.value,
        defaultValue: options.defaultValue || { x: 0, y: 0, k: 1 },
        onChange: options.onChange,
    });

    useWheel(ref, (event) => {
        let newZoom = calculateTransform(internalValue, event.x, event.y, -event.spinY);

        if (options.constraint) {
            newZoom = options.constraint(newZoom);
        } else {
            const bounds = ref.current.getBoundingClientRect();

            newZoom = defaultConstraint(newZoom, bounds.width, bounds.height);
        }

        if (options.direction === 'x') newZoom.y = internalValue.y;
        if (options.direction === 'y') newZoom.x = internalValue.x;

        setInternalValue(newZoom);
    });

    return { value: internalValue, setValue: setInternalValue };
}