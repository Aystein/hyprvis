import { useMemo, useRef } from "react";
import { Center } from "../Center";
import { usePan } from "../../lib/usePan";
import { Brushable } from "../Brushable";
import { scaleLinear } from "d3-scale";
import { dinoDomainX, dinoDomainY, DinoData } from "./DinoData";
import { rescaleX, rescaleY } from "../../lib/transform";

export function PanUsage () {
    const interactionRef = useRef();
    const { value } = usePan(interactionRef);

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