import { useRef, useState } from "react";
import { useZoom } from "../lib/useZoom";
import { Brushable } from "./Brushable";
import { Center } from "./Center";
import { useScale } from "../lib/useScale";
import { usePan } from "../lib/usePan";
import { css } from "@emotion/css";
import { ScaleX } from "./vis/ScaleX";
import { ScaleY } from "./vis/ScaleY";
import { mat4 } from "gl-matrix";
import useBandScale from "../lib/useBandScale";
import { BandData } from "./Hooks/BandData";

export function BarChart() {
    const interactionRef = useRef();
    const scaleXRef = useRef();
    const scaleYRef = useRef();

    const [transform, setTransform] = useState(mat4.create());

    useZoom(interactionRef, {
        direction: 'x',
        value: transform,
        onChange: setTransform,
    });

    usePan(interactionRef, {
        direction: 'x',
        value: transform,
        onChange: setTransform
    })

    const xScale = useBandScale({ direction: 'x', domain: ['A', 'B', 'C', 'D', 'E'], range: [0, 300], transform: transform });
    const yScale = useScale({ direction: 'y', domain: [0, 10], range: [0, 300], transform: transform });

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
                <BandData xScale={xScale} yScale={yScale} selection={[]} />
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