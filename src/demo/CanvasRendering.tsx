import { useEffect, useRef, useState } from "react";
import { useZoom } from "../lib/hooks/useZoom";
import { m4 } from "../lib/math";
import { useScale } from "../lib/hooks/useScale";
import { dinoDomainX, dinoDomainY } from "./Hooks/DinoData";
import { dinoData } from "./DinoData";
import { usePan } from "../lib/hooks/usePan";
import { outsideExtent } from "../lib/util";

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
    transformOrigin: [margin.l, 0],
    extent: {
      x1: margin.l,
      x2: size,
      y1: 0,
      y2: size - margin.b,
    },
  });

  usePan(ref, {
    value: transform,
    onChange: setTransform,
  });

  const xScale = useScale({
    domain: dinoDomainX,
    range: [0, size - margin.l],
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
    ctx.resetTransform();
    // ctx.scale(2, 2);
    const scale = window.devicePixelRatio;
    ctx.clearRect(0, 0, size * scale, size * scale);

    dinoData.forEach((dino) => {
      let x = xScale(dino.x) + margin.l;
      let y = yScale(dino.y);

      x *= scale;
      y *= scale;

      if (
        outsideExtent(
          { x: x / scale, y: y / scale },
          { x1: margin.l, x2: size, y1: 0, y2: size - margin.b },
        )
      ) {
        return;
      }

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw x scale
    xScale.ticks().forEach((tick) => {
      let x = xScale(tick) + margin.l;
      let y = size - margin.b;

      x *= scale;
      y *= scale;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 5);
      ctx.stroke();
      ctx.fillText(tick.toString(), x, y + 15);
    });
  });

  return (
    <canvas
      ref={ref}
      width={size * window.devicePixelRatio}
      height={size * window.devicePixelRatio}
      style={{ width: size, height: size }}
    />
  );
}
