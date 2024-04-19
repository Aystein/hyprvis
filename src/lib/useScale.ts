import { useMemo } from "react";
import { ZoomTransform } from "./interfaces";
import { scaleLinear } from "d3-scale";
import { rescaleX, rescaleY } from "./transform";

export function useScale({
    domain,
    range,
    transform,
    direction,
}: {
    domain: number[],
    range: number[],
    transform?: ZoomTransform,
    direction: 'x' | 'y'
}) {
    return useMemo(() => {
        const scale = scaleLinear().domain(domain).range(range);
        if (transform) {
            return direction === 'x' ? rescaleX(transform, scale) : rescaleY(transform, scale);
        }
        return scale;
    }, [domain, range, transform, direction]);
}