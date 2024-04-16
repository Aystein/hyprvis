import { useRef, useState } from "react";
import { Brushable } from "../Brushable";
import { Center } from "../Center";
import { lassoToSvgPath, useLasso } from "../../lib/useLasso";

export function LassoControlled() {
    const ref = useRef();
    const [lasso, setLasso] = useState<{ x: number, y: number }[]>();

    useLasso(ref, {
        value: lasso,
        onChange: setLasso,
    });

    return <Center>
        <Brushable ref={ref}>
            { lasso ? <path d={lassoToSvgPath(lasso)} fill="none" stroke="black" strokeDasharray="4" strokeWidth={2} /> : null }
        </Brushable>
    </Center>
}