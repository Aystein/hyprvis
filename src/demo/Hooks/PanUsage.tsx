import { useMemo, useRef } from "react";
import { scaleLinear } from "d3-scale";
import { Center } from "../Center";
import { usePan } from "../../lib/hooks/usePan";
import { Brushable } from "../Brushable";
import { dinoDomainX, dinoDomainY, DinoData } from "./DinoData";
import { rescaleX, rescaleY } from "../../lib/transform";

export function PanUsage() {
  const interactionRef = useRef();

  // Constraint does nothing
  const { value } = usePan(interactionRef, {
    constraint: (transform) => transform,
  });

  const xScale = useMemo(() => {
    return scaleLinear().domain(dinoDomainX).range([0, 300]);
  }, []);

  const yScale = useMemo(() => {
    return scaleLinear().domain(dinoDomainY).range([300, 0]);
  }, []);

  return (
    <Center>
      <Brushable ref={interactionRef}>
        <DinoData
          xScale={rescaleX(value, xScale)}
          yScale={rescaleY(value, yScale)}
          selection={[]}
        />
      </Brushable>
    </Center>
  );
}
