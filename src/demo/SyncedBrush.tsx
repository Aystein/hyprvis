import { useRef, useState } from "react";
import { useZoom } from "../lib/useZoom";
import { Brushable } from "./Brushable";
import { Center } from "./Center";
import { dinoDomainX, dinoDomainY, DinoData } from "./Hooks/DinoData";
import { useScale } from "../lib/useScale";
import { usePan } from "../lib/usePan";


export function SyncedBrush () {
    const interactionRef = useRef();
    const [transformX, setTransformX] = useState({ k: 1, x: 0, y: 0 });
    const [transformY, setTransformY] = useState({ k: 1, x: 0, y: 0 });

    useZoom(interactionRef, {
        direction: 'x',
        value: transformX,
        onChange: setTransformX,
    });

    useZoom(interactionRef, {
        direction: 'y',
        value: transformY,
        onChange: setTransformY,
    });

    usePan(interactionRef, {
        direction: 'x',
        value: transformX,
        onChange: setTransformX,
    });

    usePan(interactionRef, {
        direction: 'y',
        value: transformY,
        onChange: setTransformY,
    });

    const xScale = useScale({ direction: 'x', domain: dinoDomainX, range: [0, 300], transform: transformX });
    const yScale = useScale({ direction: 'y', domain: dinoDomainY, range: [300, 0], transform: transformY});

    return <Center>
        <Brushable ref={interactionRef}>
            <DinoData xScale={xScale} yScale={yScale} selection={[]} />
        </Brushable>
    </Center>
}