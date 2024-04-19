import { useMemo, useRef, useState } from "react";
import { Brushable } from "../Brushable";
import { Center } from "../Center";
import { checkForInclusion, lassoToSvgPath, useLasso } from "../../lib/useLasso";
import { scaleLinear } from "d3-scale";
import { DinoData, dinoDomainX, dinoDomainY } from "./DinoData";
import { dinoData } from "../DinoData";

export function LassoUsage() {
    const ref = useRef();

    const xScale = useMemo(() => {
        return scaleLinear().domain(dinoDomainX).range([0, 300]);
    }, []);

    const yScale = useMemo(() => {
        return scaleLinear().domain(dinoDomainY).range([300, 0]);
    }, []);

    const { value } = useLasso(ref, {
        onChangeEnd: (lasso) => {
            const selection = [];
            dinoData.forEach((point, i) => {
                if (checkForInclusion(lasso, { x: xScale(point.x), y: yScale(point.y) })) {
                    selection.push(i);
                }
            });
            setSelection(selection);
        },
    });

    const [selection, setSelection] = useState<number[]>();


    
    return <Center>
        <Brushable ref={ref}>
            <DinoData xScale={xScale} yScale={yScale} selection={selection} />
            { value ? <path d={lassoToSvgPath(value)} fill="none" stroke="black" strokeDasharray="4" strokeWidth={2} /> : null }
        </Brushable>
    </Center>
}