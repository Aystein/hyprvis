import { RefObject } from '../../node_modules/react';

export type LassoValue = {
    x: number;
    y: number;
}[];
export interface LassoEvent {
    lasso: LassoValue;
    isFirstDrag: boolean;
    isLastDrag: boolean;
}
export declare function lassoToSvgPath(lasso: {
    x: number;
    y: number;
}[]): string;
export interface LassoProps {
    onChange?: (points: LassoValue) => void;
}
export declare function useLasso(ref: RefObject<HTMLElement>, options?: {
    value?: LassoValue;
    onChange?: (points: LassoValue) => void;
    onChangeEnd?: (points: LassoValue) => void;
    minDistanceToCreatePoint?: number;
}): {
    value: LassoValue;
    setValue: import('../../node_modules/react').Dispatch<import("react").SetStateAction<LassoValue>>;
};
