import { useMemo, useRef, useState } from "react";
import { Brushable } from "../Brushable";
import { Center } from "../Center";
import { LassoValue, lassoToSvgPath, useLasso } from "../../lib/useLasso";
import { DinoData } from "./DinoData";
import { scaleLinear } from "d3-scale";

export function LassoControlled() {
    const ref = useRef();
    const [lasso, setLasso] = useState<LassoValue>();

    useLasso(ref, {
        value: lasso,
        onChange: setLasso,
    });

    const xScale = useMemo(() => {
        return scaleLinear().domain([0, 100]).range([0, 1000]);
    }, []);

    const yScale = useMemo(() => {
        return scaleLinear().domain([0, 100]).range([0, 1000]);
    }, []);

    return <Center>
        <Brushable ref={ref}>
            <DinoData xScale={xScale} yScale={yScale} />
            { lasso ? <path d={lassoToSvgPath(lasso)} fill="none" stroke="black" strokeDasharray="4" strokeWidth={2} /> : null }
        </Brushable>
    </Center>
}