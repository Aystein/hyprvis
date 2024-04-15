import { Brush } from './interfaces';
import { RefObject } from '../../node_modules/react';

export declare function useBrush(ref: RefObject<HTMLElement>, callbacks: {
    onBrush?: (brush: Brush) => void;
}, options?: {
    direction?: "horizontal" | "vertical" | "both";
}): {
    brush: Brush;
    setBrush: import('../../node_modules/react').Dispatch<import("react").SetStateAction<Brush>>;
};
