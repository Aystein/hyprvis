import { NormalizedWheelEvent } from './interfaces';

export declare function normalizeWheelEvent(event: WheelEvent & {
    wheelDelta?: number;
    wheelDeltaX?: number;
    wheelDeltaY?: number;
}): NormalizedWheelEvent;
