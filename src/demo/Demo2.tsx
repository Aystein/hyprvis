import { useRef, useState } from "react";
import { Center } from "./Center";
import { useBrush } from "../lib/hooks/useBrush";
import { Brushable } from "./Brushable";
import { BrushRect } from "../lib/Brush";
import { Brush } from "../lib/interfaces";

export function Demo2() {
    const interactionRef = useRef();
    const [brush, setBrush] = useState<Brush>(null);

    useBrush(interactionRef, {
        value: brush,
        onChange: setBrush
    });

    return <Center>
        <Brushable ref={interactionRef}>
            {brush ? <BrushRect parent={interactionRef} brush={brush} direction="both" onChange={setBrush} /> : null}
        </Brushable>
    </Center>
}