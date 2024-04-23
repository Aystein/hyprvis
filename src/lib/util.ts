import { Extent, Position } from "./interfaces";

export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function outsideExtent(value: Position, extent: Extent) {
    return value.x < extent.x1 || value.x > extent.x2 || value.y < extent.y1 || value.y > extent.y2;
}

export function relativeMousePosition(element: HTMLElement, position: Position) {
    const bounds = element.getBoundingClientRect();

    return {
        x: position.x - bounds.left,
        y: position.y - bounds.top,
    };
}