import { RefObject, useState } from "react";
import { useInteractions } from "./useInteractions";
import { Brush } from "./interfaces";
import { clamp } from "./util";


export function useBrush(ref: RefObject<any>, callbacks: {

}, options: {
    direction?: "horizontal" | "vertical" | "both";
} = {}) {
    const [brush, setBrush] = useState<Brush>();

    useInteractions(ref, {
        onDrag: (event) => {
            const bounds = ref.current.getBoundingClientRect();

            const newBrush = {
                x1: Math.min(event.anchor.x, event.end.x),
                y1: Math.min(event.anchor.y, event.end.y),
                x2: Math.max(event.anchor.x, event.end.x),
                y2: Math.max(event.anchor.y, event.end.y),
            };

            if (options.direction === 'horizontal') {
                newBrush.y1 = 0;
                newBrush.y2 = bounds.height;
            } else if (options.direction === 'vertical') {
                newBrush.x1 = 0;
                newBrush.x2 = bounds.width;
            }

            newBrush.x1 = clamp(newBrush.x1, 0, bounds.width);
            newBrush.y1 = clamp(newBrush.y1, 0, bounds.height);
            newBrush.x2 = clamp(newBrush.x2, 0, bounds.width);
            newBrush.y2 = clamp(newBrush.y2, 0, bounds.height);

            setBrush(newBrush);
        }
    })

    return { brush, setBrush };
}