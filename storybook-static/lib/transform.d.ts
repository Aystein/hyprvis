import { ZoomTransform } from './interfaces';
import { ScaleLinear } from 'd3-scale';

export declare function identityZoom(): ZoomTransform;
export declare function invertX(transform: ZoomTransform, x: number): number;
export declare function invertY(transform: ZoomTransform, y: number): number;
export declare function rescaleX(transform: ZoomTransform, x: ScaleLinear<number, number>): ScaleLinear<number, number, never>;
export declare function translate(transform: ZoomTransform, x: number, y: number): {
    x: number;
    y: number;
    k: number;
};
export declare function defaultConstraint(transform: ZoomTransform, width: number, height: number): {
    x: number;
    y: number;
    k: number;
};
/**
 * Given a zoom transform, a mouse position and a wheel delta, calculate the new zoom transform
 */
export declare function calculateTransform(zoom: ZoomTransform, x: number, y: number, wheel: number): {
    k: number;
    x: number;
    y: number;
};
