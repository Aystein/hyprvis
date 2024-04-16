import { RefObject, useRef } from "react";
import { useInteractions } from "./useInteractions";
import { clamp } from "./util";
import { produce } from "immer";
import { useControlledUncontrolled } from "./useControlledUncontrolled";

export interface LassoEvent {
    lasso: { x: number, y: number }[];
    isFirstDrag: boolean;
    isLastDrag: boolean;
}

export function lassoToSvgPath(lasso: { x: number, y: number }[]) {
    return lasso.map((point, index) => {
        if (index === 0) {
            return `M ${point.x} ${point.y}`;
        } else {
            return `L ${point.x} ${point.y}`;
        }
    }).join(" ");
}

export type Lasso = { x: number, y: number }[];

export interface LassoProps {
    onChange?: (points: Lasso) => void;
}


export function useLasso(ref: RefObject<HTMLElement>, callbacks: {
    value?: Lasso;
    onChange?: (points: { x: number, y: number }[]) => void;
} = {}) {
    const lastXY = useRef<{ x: number, y: number }>();

    const { value, onChange } = callbacks;

    const [internalValue, setInternalValue] = useControlledUncontrolled({
        value,
        onChange,
    })

    const callbacksRef = useRef(callbacks);
    callbacksRef.current = callbacks;

    useInteractions(ref, {
        onDrag: (event) => {
            const bounds = ref.current.getBoundingClientRect();

            if (event.isFirstDrag) {
                const newLasso = [
                    event.start,
                    event.end,
                ];
                setInternalValue(newLasso);
                lastXY.current = event.end;
                callbacksRef.current.onChange?.(newLasso);
            } else {
                // if distance is high enough
                if (Math.abs(event.end.x - lastXY.current.x) > 6 || Math.abs(event.end.y - lastXY.current.y) > 6) {
                    const newPoint = {
                        x: clamp(event.end.x, 1, bounds.width - 1),
                        y: clamp(event.end.y, 1, bounds.height - 1),
                    }

                    const newLasso = produce(internalValue, (draft) => {
                        draft.push(newPoint);
                    });
                    setInternalValue(newLasso);
                    lastXY.current = newPoint;

                    callbacksRef.current.onChange?.(newLasso);
                }
            }

            if (event.isLastDrag) {
                setInternalValue(undefined);
                lastXY.current = undefined;

                callbacksRef.current.onChange?.(undefined);
            }
        },
    })

    return { value: internalValue, setValue: setInternalValue };
}