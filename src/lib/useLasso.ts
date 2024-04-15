import { RefObject, useRef, useState } from "react";
import { useInteractions } from "./useInteractions";
import { clamp } from "./util";
import { produce } from "immer";

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



export function useLasso(ref: RefObject<HTMLElement>, callbacks: {
    onChange?: (points: { x: number, y: number }[]) => void;
} = {}) {
    const lastXY = useRef<{ x: number, y: number }>();
    const [lasso, setLasso] = useState<{ x: number, y: number }[]>();

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
                setLasso(newLasso);
                lastXY.current = event.end;
                callbacksRef.current.onChange?.(newLasso);
            } else {
                // if distance is high enough
                if (Math.abs(event.end.x - lastXY.current.x) > 6 || Math.abs(event.end.y - lastXY.current.y) > 6) {
                    const newPoint = {
                        x: clamp(event.end.x, 1, bounds.width - 1),
                        y: clamp(event.end.y, 1, bounds.height - 1),
                    }

                    const newLasso = produce(lasso, (draft) => {
                        draft.push(newPoint);
                    });
                    setLasso(newLasso);
                    lastXY.current = newPoint;

                    callbacksRef.current.onChange?.(newLasso);
                }
            }

            if (event.isLastDrag) {
                setLasso(undefined);
                lastXY.current = undefined;

                callbacksRef.current.onChange?.(undefined);
            }
        },
    })

    return { lasso };
}