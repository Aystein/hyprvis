import { Dispatch, RefObject, useState } from "react";
import { ZoomTransform } from "./interfaces";
import { useInteractions } from "./useInteractions";
import { identityZoom } from "./transform";
import { useControlledUncontrolled } from "./useUncontrolled";

export function usePan(ref: RefObject<HTMLElement>, options: {
    value?: ZoomTransform,
    defaultValue?: ZoomTransform,
    onChange?: Dispatch<ZoomTransform>,
} = {}) {
    const [zoom, setZoom] = useControlledUncontrolled({
        value: options.value,
        defaultValue: options.defaultValue,
        onChange: options.onChange,
        finalValue: identityZoom(),
    });

    useInteractions(ref, {
        onDrag: (event) => {
            setZoom((prev) => ({
                x: prev.x + event.movementX,
                y: prev.y + event.movementY,
                k: prev.k
            }))
        }
    });

    return { zoom, setZoom };
}