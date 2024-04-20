import { useRef, useState } from "react";
import { useZoom } from "../lib/useZoom";
import { Brushable } from "./Brushable";
import { Center } from "./Center";
import { dinoDomainX, dinoDomainY, DinoData } from "./Hooks/DinoData";
import { useScale } from "../lib/useScale";
import { usePan } from "../lib/usePan";
import { css } from "@emotion/css";
import { ScaleX } from "./vis/ScaleX";
import { ScaleY } from "./vis/ScaleY";

export function SyncedBrush() {
    const interactionRef = useRef();
    const scaleXRef = useRef();
    const scaleYRef = useRef();

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

    useZoom(scaleXRef, {
        direction: 'x',
        value: transformX,
        onChange: setTransformX,
    });

    useZoom(scaleYRef, {
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
    const yScale = useScale({ direction: 'y', domain: dinoDomainY, range: [300, 0], transform: transformY });

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