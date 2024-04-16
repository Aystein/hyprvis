import { useMemo, useRef } from "react";
import { Center } from "../Center";
import { TransformTester } from "../TransformTester";
import { css } from "@emotion/css";
import { ScaleX } from "./ScaleX";
import { useZoom } from "../../lib/useZoom";
import { invertX, rescaleX } from "../../lib/transform";
import { scaleLinear } from "d3-scale";
import { ZoomTransform } from "d3-zoom";

const x = scaleLinear().domain([0, 100]).range([0, 300]);

export function Demo1 () {
    const scaleXRef = useRef();

    const { zoom } = useZoom(scaleXRef, {
        direction: 'x'
    });

    const dynamicXScale = useMemo(() => {
        return scaleLinear().domain(x.range().map((r) => invertX(zoom, r)).map((r) => x.invert(r))).range([0, 300]);
    }, [zoom]);

    return <Center>
        <div className={css`
            display: grid;
            grid-template-areas:
                "interaction"
                "scaleX";
            grid-template-rows: 300px 200px;
            grid-template-columns: 300px;
        `}>
            <div className={css`
                grid-area: interaction;
                position: relative;
                overflow: hidden;
                inset: 0;
                border: 1px dashed black;
            `}>
                <TransformTester zoom={zoom} />
            </div>

            <div className={css`
                grid-area: scaleX;
                inset: 0;
            `}>
                <ScaleX ref={scaleXRef} domain={dynamicXScale.domain()} count={10} />
            </div>
        </div>
    </Center>
}