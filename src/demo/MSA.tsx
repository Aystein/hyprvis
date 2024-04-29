import React, { useEffect } from "react";
import { clamp } from "../lib/util";
import { generateRandomAlignment } from "./SequenceGenerator";
import { useScale } from "../lib/hooks/useScale";
import { useZoom } from "../lib/hooks/useZoom";
import { usePan } from "../lib/hooks/usePan";
import { BrushRect } from "../lib/Brush";
import { useBrush } from "../lib/hooks/useBrush";
import { m4 } from "../lib/math";
import { invertX } from "../lib/transform";

console.log(m4);

// Return clustal default color
function getColor(alteration: string) {
  // A,I,L,M,F,W,V -> #80a0f0
  // K,R -> #f01505
  // D,E -> #c048c0
  // N,Q,S,T -> #15c015
  // C -> #f08080
  // G -> #f09048
  // P -> #c0c000
  // H,Y -> #15a4a4
  // GAP -> #ffffff

  switch (alteration) {
    case "A":
    case "I":
    case "L":
    case "M":
    case "F":
    case "W":
    case "V":
      return "#80a0f0";
    case "K":
    case "R":
      return "#f01505";
    case "D":
    case "E":
      return "#c048c0";
    case "N":
    case "Q":
    case "S":
    case "T":
      return "#15c015";
    case "C":
      return "#f08080";
    case "G":
      return "#f09048";
    case "P":
      return "#c0c000";
    case "H":
    case "Y":
      return "#15a4a4";
    case "-":
      return "white";
    default:
      return "black";
  }
}

function useCanvasFrame(callback: (ctx: CanvasRenderingContext2D) => void) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const frameRef = React.useRef(null);
  const callbackRef = React.useRef(callback);

  callbackRef.current = callback;

  React.useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [callbackRef]);

  const invalidate = React.useCallback(() => {
    if (!frameRef.current) {
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;

        callbackRef.current(canvasRef.current.getContext("2d"));
      });
    }
  }, []);

  return { ref: canvasRef, invalidate };
}

export function MSA() {
  const dpi = window.devicePixelRatio;
  const width = 600;
  const height = 400;
  const [transform, setTransform] = React.useState(m4.I());

  const svgRef = React.useRef<SVGSVGElement>(null);

  const { brush, setBrush } = useBrush(svgRef, {
    direction: "x",
    defaultValue: { x1: 0, x2: width, y1: 0, y2: 100 },
  });

  const { data, xLength, yLength } = React.useMemo(() => {
    const alignment = [
      generateRandomAlignment(1000),
      generateRandomAlignment(1000),
      generateRandomAlignment(1000),
      generateRandomAlignment(1000),
    ];

    const nRows = alignment.length;
    const nCols = alignment[0].sequence.length;

    return {
      data: alignment,
      xLength: nCols,
      yLength: nRows,
    };
  }, []);

  const xScale = useScale({
    direction: "x",
    domain: [0, xLength],
    range: [0, width],
    transform,
  });
  const yScale = useScale({
    direction: "y",
    domain: [0, yLength],
    range: [0, height],
    transform,
  });

  const pxPerColumn = xScale(1) - xScale(0);
  const pxPerRow = yScale(1) - yScale(0);

  const { ref, invalidate } = useCanvasFrame((ctx) => {
    ctx.fillStyle = "gray";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillRect(0, 0, ref.current.width, ref.current.height);

    ctx.fill();

    let subsampleAmount =
      ((xScale.domain()[1] - xScale.domain()[0]) / xLength) * 3;
    subsampleAmount = Math.floor(clamp(subsampleAmount, 1, 3));

    // subsampleAmount = 1;

    // render all rows by subsampling one column each 3 pixels
    for (let y = 0; y < yLength; y++) {
      const row = data[y];
      const yPosition = yScale(y);
      const rowHeight = yScale(y + 1) - yPosition;

      for (
        let x = Math.floor(xScale.domain()[0]);
        x < Math.ceil(xScale.domain()[1]);
        x += subsampleAmount
      ) {
        const alteration = row.sequence[x];
        const xPosition = xScale(x);
        const xPositionEnd = xScale(x + subsampleAmount);

        const color = getColor(alteration);

        if (color !== "white") {
          ctx.fillStyle = color;
          ctx.fillRect(
            xPosition * dpi,
            yPosition * dpi,
            (xPositionEnd - xPosition) * dpi,
            rowHeight * dpi,
          );

          // render text only if zoomed in enough
          if (pxPerColumn > 14) {
            ctx.fillStyle = "black";
            ctx.font = "40px monospace";
            ctx.fillText(
              alteration,
              xPosition * dpi + pxPerColumn,
              yPosition * dpi + pxPerRow,
            );
          }
        }
      }
    }
  });

  useZoom(ref, {
    direction: "x",
    value: transform,
    zoomExtent: [1, 10],
    onChange: (newTransform) => {
      setTransform(newTransform);
      setBrush((newBrush) => ({
        ...newBrush,
        x1: invertX(newTransform, 0),
        x2: invertX(newTransform, xScale.range()[1]),
      }));
    },
  });

  usePan(ref, {
    direction: "x",
    value: transform,
    onChange: (newTransform) => {
      setTransform(newTransform);

      setBrush((newBrush) => ({
        ...newBrush,
        x1: invertX(newTransform, 0),
        x2: invertX(newTransform, xScale.range()[1]),
      }));
    },
  });

  React.useEffect(() => {
    invalidate();
  }, [data, xScale, yScale, yScale]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto max-content",
      }}
    >
      <div />
      <svg ref={svgRef} style={{ width: 600, height: 100 }}>
        {brush ? (
          <BrushRect
            clearOnMouse={false}
            brush={brush}
            onChange={(brush) => {
              setBrush(brush);
              // Get domain of brush
              const overviewXScale = xScale.copy().domain([0, xLength]);
              const x1 = overviewXScale.invert(brush.x1);
              const x2 = overviewXScale.invert(brush.x2);

              // Get scale of transform
              const scale = xLength / (x2 - x1);

              // Find translation of ZoomTransform from overview to detail
              const t = m4.I();
              m4.setTranslation(t, -x1, 0, 0);
              m4.setScaling(t, scale, 1, 1);
              setTransform(t);
            }}
            parent={svgRef}
            direction="x"
          />
        ) : null}
      </svg>

      <div>
        {Array.from({ length: yLength }).map((_, i) => (
          <div
            key={i}
            style={{
              textAlign: "right",
              paddingRight: "10px",
              lineHeight: 3,
              fontSize: pxPerRow / 3,
            }}
          >
            {data[i].name}
          </div>
        ))}
      </div>
      <canvas
        ref={ref}
        width={width * dpi}
        height={height * dpi}
        style={{ width, height }}
      />
    </div>
  );
}
