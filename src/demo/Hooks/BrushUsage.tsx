import { useRef, useState } from "react";
import { Center } from "../Center";
import { useBrush } from "../../lib/hooks/useBrush";
import { Brushable } from "../Brushable";
import { BrushRect } from "../../lib/Brush";
import { DinoData, dinoDomainX, dinoDomainY } from "./DinoData";
import { dinoData } from "../DinoData";
import { useScale } from "../../lib/hooks/useScale";
import { Brush } from "../../lib";

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
    if (!value) {
      setSelection(undefined);
      return;
    }

    const selection = [];
    dinoData.forEach((point, i) => {
      if (
        value.x1 <= xScale(point.x) &&
        xScale(point.x) <= value.x2 &&
        value.y1 <= yScale(point.y) &&
        yScale(point.y) <= value.y2
      ) {
        selection.push(i);
      }
    });
    setSelection(selection);
  };

  const { brush, setBrush } = useBrush(interactionRef, {
    onClick: () => {
      setSelection(undefined);
    },
    onChangeEnd,
    direction: "x",
    extent: {
      x1: 110,
      x2: 298,
      y1: 110,
      y2: 298,
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
            direction="x"
            onChange={setBrush}
            onChangeEnd={onChangeEnd}
            extent={{
              x1: 110,
              x2: 298,
              y1: 110,
              y2: 298,
            }}
          />
        ) : null}
      </Brushable>
    </Center>
  );
}
