import { RefObject } from '../../node_modules/react';

export interface LassoEvent {
    lasso: {
        x: number;
        y: number;
    }[];
    isFirstDrag: boolean;
    isLastDrag: boolean;
}
export declare function lassoToSvgPath(lasso: {
    x: number;
    y: number;
}[]): string;
export declare function useLasso(ref: RefObject<HTMLElement>, callbacks?: {
    onChange?: (points: {
        x: number;
        y: number;
    }[]) => void;
}): {
    lasso: {
        x: number;
        y: number;
    }[];
};
