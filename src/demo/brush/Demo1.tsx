import { useRef } from "react";
import { Center } from "../Center";
import { useBrush } from "../../lib/useBrush";
import { Brushable } from "./Brushable";
import { BrushRect } from "../../lib/Brush";

export function Demo1 () {
    const interactionRef = useRef();
    const { brush, setBrush } = useBrush(interactionRef);

    return <Center>
        <Brushable ref={interactionRef}>
            { brush ? <BrushRect parent={interactionRef} brush={brush} direction="both" onChange={setBrush} /> : null }
        </Brushable>
    </Center>
}