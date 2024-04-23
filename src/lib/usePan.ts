import { Dispatch, RefObject } from "react";
import { Direction, ZoomTransform } from "./interfaces";
import { useInteractions } from "./useInteractions";
import { useControlledUncontrolled } from "./useControlledUncontrolled";
import { mat4 } from "gl-matrix";
import { defaultConstraint } from "./transform";

export function usePan(ref: RefObject<HTMLElement>, options: {
    value?: ZoomTransform,
    defaultValue?: ZoomTransform,
    onChange?: Dispatch<ZoomTransform>,
    constraint?: (transform: ZoomTransform) => ZoomTransform,
    direction?: Direction,
} = {}) {
    const [zoom, setZoom] = useControlledUncontrolled({
        value: options.value,
        defaultValue: options.defaultValue || mat4.create(),
        onChange: options.onChange,
    });

    useInteractions(ref, {
        onDrag: (event) => {
            setZoom((prev) => {
                let newMatrix = mat4.copy(mat4.create(), prev);
                if (options.direction !== 'y') {
                    newMatrix[12] = newMatrix[12] + event.movementX;
                }
                if (options.direction !== 'x') {
                    newMatrix[13] = newMatrix[13] + event.movementY;
                }

                if (options.constraint) {
                    return options.constraint(newMatrix);
                } else {
                    const bounds = ref.current.getBoundingClientRect();
                    newMatrix = defaultConstraint(newMatrix, bounds.width, bounds.height);
                }

                return newMatrix;
            })
        }
    });

    return { value: zoom, setValue: setZoom };
}