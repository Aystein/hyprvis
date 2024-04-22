import { RefObject } from "react";
import { useWheel } from "./useWheel";
import { calculateTransform, defaultConstraint } from "./transform";
import { useControlledUncontrolled } from "./useControlledUncontrolled";
import { ZoomTransform } from "./interfaces";
import { mat4 } from "gl-matrix";

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
        defaultValue: options.defaultValue || mat4.create(),
        onChange: options.onChange,
    });

    useWheel(ref, (event) => {
        let newZoom = calculateTransform(internalValue, event.x, event.y, -event.spinY, options.direction);

        if (options.constraint) {
            newZoom = options.constraint(newZoom);
        } else {
            const bounds = ref.current.getBoundingClientRect();

            newZoom = defaultConstraint(newZoom, bounds.width, bounds.height);
        }

        setInternalValue(newZoom);
    });

    return { value: internalValue, setValue: setInternalValue };
}