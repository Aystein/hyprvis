import { useRef } from "react";
import { Brushable } from "../Brushable";
import { Center } from "../Center";
import { lassoToSvgPath, useLasso } from "../../lib/useLasso";

export function Demo1() {
    const ref = useRef();

    const { lasso } = useLasso(ref);

    return <Center>
        <Brushable ref={ref}>
            { lasso ? <path d={lassoToSvgPath(lasso)} fill="none" stroke="black" /> : null }
        </Brushable>
    </Center>
}