import { Brush } from './interfaces';

interface BrushProps {
    brush: Brush;
    direction: "horizontal" | "vertical" | "both";
    onChange?: (brush: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }) => void;
    parent: React.RefObject<SVGSVGElement>;
}
/**
 * Brush with draggable borders
 */
export declare function BrushRect({ parent, brush, direction, onChange }: BrushProps): import("react/jsx-runtime").JSX.Element;
export {};
