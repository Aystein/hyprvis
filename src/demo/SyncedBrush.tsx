import { useRef, useState } from "react";
import { useZoom } from "../lib/hooks/useZoom";
import { Brushable } from "./Brushable";
import { Center } from "./Center";
import { dinoDomainX, dinoDomainY, DinoData } from "./Hooks/DinoData";
import { useScale } from "../lib/hooks/useScale";
import { usePan } from "../lib/hooks/usePan";
import { css } from "@emotion/css";
import { ScaleX } from "./vis/ScaleX";
import { ScaleY } from "./vis/ScaleY";
import { m4 } from "../lib/math";

export function SyncedBrush() {
    const interactionRef = useRef();
    const scaleXRef = useRef();
    const scaleYRef = useRef();

    const [transform, setTransform] = useState(m4.I());

    useZoom(interactionRef, {
        value: transform,
        onChange: setTransform,
        zoomExtent: [1, 10],
    });

    useZoom(scaleXRef, {
        direction: 'x',
        value: transform,
        onChange: setTransform,
        zoomExtent: [1, 10],
    });

    useZoom(scaleYRef, {
        direction: 'y',
        value: transform,
        onChange: setTransform,
        zoomExtent: [1, 10],
    });

    usePan(interactionRef, {
        value: transform,
        onChange: setTransform,
    });

    usePan(scaleXRef, {
        direction: 'x',
        value: transform,
        onChange: setTransform
    })

    usePan(scaleYRef, {
        direction: 'y',
        value: transform,
        onChange: setTransform
    })

    const xScale = useScale({ direction: 'x', domain: dinoDomainX, range: [0, 298], transform: transform });
    const yScale = useScale({ direction: 'y', domain: dinoDomainY, range: [298, 0], transform: transform });

    return <Center>
        <div className={css`
            display: grid;
            grid-template-areas:
                "interaction scaleY"
                "scaleX edge";
            grid-template-rows: 300px 200px;
            grid-template-columns: 300px;
        `}>
            <Brushable ref={interactionRef}>
                <DinoData xScale={xScale} yScale={yScale} selection={[]} />
            </Brushable>

            <div className={css`
                grid-area: scaleX;
                inset: 0;
            `}>
                <ScaleX ref={scaleXRef} domain={xScale.domain()} count={10} />
            </div>

            <div className={css`
                grid-area: scaleY;
                inset: 0;
            `}>
                <ScaleY ref={scaleYRef} domain={yScale.domain()} count={10} />
            </div>
        </div>
    </Center>
}