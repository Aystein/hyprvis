import { ZoomTransform } from './interfaces';
import { RefObject } from '../../node_modules/react';

/**
 * useZoom manages zoom state and provides a way to control zoom state.
 * It can be used controlled or uncontrolled.
 * In controlled mode you can provide a value and an onChange handler.
 * In uncontrolled mode you can provide a defaultValue and the hook
 * will return the current value and a setter.
 */
export declare function useZoom(ref: RefObject<HTMLElement>, options?: {
    value?: ZoomTransform;
    defaultValue?: ZoomTransform;
    onChange?: (value: ZoomTransform) => void;
    constraint?: (transform: ZoomTransform) => ZoomTransform;
}): {
    zoom: ZoomTransform;
    setZoom: import('../../node_modules/react').Dispatch<import("react").SetStateAction<ZoomTransform>>;
};
