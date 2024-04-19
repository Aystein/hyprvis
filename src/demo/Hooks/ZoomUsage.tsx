import { useMemo, useRef } from "react";
import { Center } from "../Center";
import { Brushable } from "../Brushable";
import { useZoom } from "../../lib/useZoom";
import { scaleLinear } from "d3-scale";
import { rescaleX, rescaleY } from "../../lib/transform";
import { dinoDomainX, dinoDomainY, DinoData } from "./DinoData";

export function ZoomUsage () {
    const interactionRef = useRef();
    const { value } = useZoom(interactionRef);

    const xScale = useMemo(() => {
        return scaleLinear().domain(dinoDomainX).range([0, 300]);
    }, []);
    
    const yScale = useMemo(() => {
        return scaleLinear().domain(dinoDomainY).range([300, 0]);
    }, []);

    return <Center>
        <Brushable ref={interactionRef}>
            <DinoData xScale={rescaleX(value, xScale)} yScale={rescaleY(value, yScale)} selection={[]} />
        </Brushable>
    </Center>
}