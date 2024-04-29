import { useRef, useState } from "react";
import { Center } from "../Center";
import { useBrush } from "../../lib/hooks/useBrush";
import { Brushable } from "../Brushable";
import { BrushRect } from "../../lib/Brush";
import { DinoData, dinoDomainX, dinoDomainY } from "./DinoData";
import { dinoData } from "../DinoData";
import { useScale } from "../../lib/hooks/useScale";
import { Brush } from "../../lib/interfaces";

export function BrushUsage() {
  const interactionRef = useRef();

  const xScale = useScale({
    direction: "x",
    domain: dinoDomainX,
    range: [0, 300],
  });
  const yScale = useScale({
    direction: "y",
    domain: dinoDomainY,
    range: [300, 0],
  });

  const [selection, setSelection] = useState<number[]>();

  const onChangeEnd = (value: Brush) => {
    if (value) {
      const newSelection = [];
      dinoData.forEach((point, i) => {
        if (
          value.x1 <= xScale(point.x) &&
          xScale(point.x) <= value.x2 &&
          value.y1 <= yScale(point.y) &&
          yScale(point.y) <= value.y2
        ) {
          newSelection.push(i);
        }
      });
      setSelection(newSelection);
    } else {
      setSelection(undefined);
    }
  };

  const { brush, setBrush } = useBrush(interactionRef, {
    onClick: () => {
      setSelection(undefined);
    },
    onChangeEnd,
    direction: "xy",
    extent: {
      x1: 50,
      x2: 250,
      y1: 50,
      y2: 250,
    },
  });

  return (
    <Center>
      <Brushable ref={interactionRef}>
        <DinoData xScale={xScale} yScale={yScale} selection={selection} />
        {brush ? (
          <BrushRect
            parent={interactionRef}
            brush={brush}
            direction="xy"
            onChange={setBrush}
            onChangeEnd={onChangeEnd}
            extent={{
              x1: 50,
              x2: 250,
              y1: 50,
              y2: 250,
            }}
          />
        ) : null}
      </Brushable>
    </Center>
  );
}
