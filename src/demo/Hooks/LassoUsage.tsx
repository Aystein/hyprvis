import { useRef } from "react";
import { Brushable } from "../Brushable";
import { Center } from "../Center";
import { lassoToSvgPath, useLasso } from "../../lib/useLasso";

export function LassoUsage() {
    const ref = useRef();

    const { value } = useLasso(ref);

    return <Center>
        <Brushable ref={ref}>
            { value ? <path d={lassoToSvgPath(value)} fill="none" stroke="black" strokeDasharray="4" strokeWidth={2} /> : null }
        </Brushable>
    </Center>
}