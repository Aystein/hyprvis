import { ScaleLinear } from "d3-scale";
import { ZoomTransform } from "./interfaces";

export function identityZoom(): ZoomTransform {
    return {
        x: 0,
        y: 0,
        k: 1
    };
}

export function invertX(transform: ZoomTransform, x: number) {
    return (x - transform.x) / transform.k;
}

export function invertY(transform: ZoomTransform, y: number) {
    return (y - transform.y) / transform.k;
}

export function rescaleX(transform: ZoomTransform, x: ScaleLinear<number, number>) {
    const newDomain = x.range().map((r) => invertX(transform, r));
    return x.copy().domain(newDomain.map(x.invert, x));
}

export function translate(transform: ZoomTransform, x: number, y: number) {
    return {
        x: transform.x + x * transform.k,
        y: transform.y + y * transform.k,
        k: transform.k
    };
}

export function defaultConstraint(transform: ZoomTransform, width: number, height: number) {
    const x0 = invertX(transform, 0);
    const x1 = invertX(transform, width) - width;
    const y0 = invertY(transform, 0);
    const y1 = invertY(transform, height) - height;

    return translate(
        transform,
        x1 > x0 ? (x0 + x1) / 2 : Math.min(0, x0) || Math.max(0, x1),
        y1 > y0 ? (y0 + y1) / 2 : Math.min(0, y0) || Math.max(0, y1),
    );
}



/**
 * Given a zoom transform, a mouse position and a wheel delta, calculate the new zoom transform
 */
export function calculateTransform(zoom: ZoomTransform, x: number, y: number, wheel: number) {
    const zoomFactor = Math.exp(wheel * 0.1);

    const newScale = Math.max(1, zoomFactor * zoom.k);
    // const newScale = zoomFactor * zoom.k;

    // downscaled coordinates relative to anchor
    const zoomPointX = (x - zoom.x) / zoom.k;
    const zoomPointY = (y - zoom.y) / zoom.k;

    const offsetX = -(zoomPointX * (newScale - zoom.k));
    const offsetY = -(zoomPointY * (newScale - zoom.k));

    const newX = zoom.x + offsetX;
    const newY = zoom.y + offsetY;

    return {
        k: newScale,
        x: Math.abs(newX) > 0.1 ? newX : 0,
        y: Math.abs(newY) > 0.1 ? newY : 0
    };
}