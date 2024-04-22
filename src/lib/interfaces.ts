import { mat4 } from "gl-matrix";

export interface NormalizedWheelEvent {
    spinX: number;
    spinY: number;
    pixelX: number;
    pixelY: number;
    x: number;
    y: number;
}

export interface Brush {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export type ZoomTransform = mat4