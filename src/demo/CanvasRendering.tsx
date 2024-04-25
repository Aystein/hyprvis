import { useEffect, useRef, useState } from "react";
import { useZoom } from "../lib/hooks/useZoom";
import { m4 } from "../lib/math";
import { useScale } from "../lib/hooks/useScale";
import { dinoDomainX, dinoDomainY } from "./Hooks/DinoData";
import { dinoData } from "./DinoData";
import { usePan } from "../lib/hooks/usePan";

const size = 400;

function useRenderLoop(callback: () => void) {
  const ref = useRef(callback);
  ref.current = callback;

  const frame = () => {
    ref.current();
    requestAnimationFrame(frame);
  };

  useEffect(() => {
    requestAnimationFrame(frame);
  }, []);
}

export function CanvasRendering() {
  const ref = useRef<HTMLCanvasElement>();

  const [transform, setTransform] = useState(m4.I());
  const margin = {
    l: 150,
    b: 150,
  };

  useZoom(ref, {
    value: transform,
    onChange: setTransform,
    zoomExtent: [1, 10],
    extent: {
      x1: margin.l,
      x2: size,
      y1: margin.b,
      y2: size,
    },
  });

  console.log(transform[12]);

  usePan(ref, {
    value: transform,
    onChange: setTransform,
  });

  const xScale = useScale({
    domain: dinoDomainX,
    range: [margin.l, size],
    transform,
    direction: "x",
  });

  const yScale = useScale({
    domain: dinoDomainY,
    range: [size - margin.b, 0],
    transform,
    direction: "y",
  });

  useRenderLoop(() => {
    const ctx = ref.current.getContext("2d");
    ctx.clearRect(0, 0, size, size);

    dinoData.forEach((dino) => {
      ctx.beginPath();
      ctx.arc(xScale(dino.x), yScale(dino.y), 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw x scale
    xScale.ticks().forEach((tick) => {
      const x = xScale(tick);
      ctx.beginPath();
      ctx.moveTo(x, size - margin.b);
      ctx.lineTo(x, size - margin.b + 5);
      ctx.stroke();
      ctx.fillText(tick.toString(), x, size - margin.b + 15);
    });
  });

  return (
    <canvas
      ref={ref}
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}
