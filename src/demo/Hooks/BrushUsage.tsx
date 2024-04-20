import { useRef, useState } from "react";
import { Center } from "../Center";
import { useBrush } from "../../lib/useBrush";
import { Brushable } from "../Brushable";
import { BrushRect } from "../../lib/Brush";
import { DinoData, dinoDomainX, dinoDomainY } from "./DinoData";
import { dinoData } from "../DinoData";
import { useScale } from "../../lib/useScale";

export function BrushUsage() {
    const interactionRef = useRef();

    const xScale = useScale({ direction: 'x', domain: dinoDomainX, range: [0, 300] });
    const yScale = useScale({ direction: 'y', domain: dinoDomainY, range: [300, 0] });

    const [selection, setSelection] = useState<number[]>();
    const { brush, setBrush } = useBrush(interactionRef, {
        onChange: (value) => {
            if (!value) {
                setSelection(undefined);
                return;
            }

            const selection = [];
            dinoData.forEach((point, i) => {
                if (value.x1 <= xScale(point.x) && xScale(point.x) <= value.x2 && value.y1 <= yScale(point.y) && yScale(point.y) <= value.y2) {
                    selection.push(i);
                }
            });
            setSelection(selection);
        }
    });

    return <Center>
        <Brushable ref={interactionRef}>
            <DinoData xScale={xScale} yScale={yScale} selection={selection} />
            {brush ? <BrushRect parent={interactionRef} brush={brush} direction="both" onChange={setBrush} /> : null}
        </Brushable>
    </Center>
}