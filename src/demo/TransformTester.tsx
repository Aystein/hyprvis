import { ZoomTransform } from "../lib/interfaces";

export function TransformTester({ zoom }: { zoom: ZoomTransform }) {
    /* return <>
        <div style={{
            width: 150, height: 150,
            left: 75 * zoom.k, top: 75 * zoom.k,
            position: 'absolute', border: '1px solid black',
            transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.k})`,
            transformOrigin: '0 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', userSelect: 'none' }}>
                <div>k: {zoom.k.toPrecision(2)}</div>
                <div>x: {zoom.x.toPrecision(2)}</div>
                <div>y: {zoom.y.toPrecision(2)}</div>
            </div>
        </div>
    </> */

    return <rect
        x={75 + zoom.x}
        y={75 + zoom.y}
        width={150 * zoom.k}
        height={150 * zoom.k}
        fill="none"
        stroke="black"
        strokeWidth={1} />
}