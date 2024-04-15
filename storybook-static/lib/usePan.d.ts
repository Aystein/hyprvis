import { ZoomTransform } from './interfaces';
import { Dispatch, RefObject } from '../../node_modules/react';

export declare function usePan(ref: RefObject<HTMLElement>, options?: {
    value?: ZoomTransform;
    defaultValue?: ZoomTransform;
    onChange?: Dispatch<ZoomTransform>;
}): {
    zoom: ZoomTransform;
    setZoom: Dispatch<import('../../node_modules/react').SetStateAction<ZoomTransform>>;
};
