import { useRef } from "react";
import { Center } from "../Center";
import { Brushable } from "../Brushable";
import { useZoom } from "../../lib/hooks/useZoom";
import { rescaleX, rescaleY } from "../../lib/transform";
import { dinoDomainX, dinoDomainY, DinoData } from "./DinoData";
import { useScale } from "../../lib/hooks/useScale";

export function ZoomUsage () {
    const interactionRef = useRef();
    const { transform } = useZoom(interactionRef, {
        zoomExtent: [1, 3],
    });

    const xScale = useScale({ domain: dinoDomainX, range: [0, 300], direction: 'x' });
    const yScale = useScale({ domain: dinoDomainY, range: [300, 0], direction: 'y' });

    return <Center>
        <Brushable ref={interactionRef}>
            <DinoData xScale={rescaleX(transform, xScale)} yScale={rescaleY(transform, yScale)} selection={[]} />
        </Brushable>
    </Center>
}