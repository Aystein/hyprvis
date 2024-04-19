import { ZoomTransform } from "../lib/interfaces";

export function TransformTester({ zoom }: { zoom: ZoomTransform }) {
    return <rect
        x={zoom.x + 75 * zoom.k}
        y={zoom.y + 75 * zoom.k}
        width={150 * zoom.k}
        height={150 * zoom.k}
        fill="green"
        stroke="black"
        strokeWidth={1} />
}