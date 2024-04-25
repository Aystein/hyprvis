import { useMemo } from "react";
import { scaleBand } from "d3-scale";
import { ZoomTransform } from "../interfaces";
import { m4 } from "../math";

type UseBandScaleProps = {
  direction: "x" | "y";
  domain: string[];
  range: [number, number];
  transform: ZoomTransform;
};

export function useBandScale({
  direction,
  domain,
  range,
  transform,
}: UseBandScaleProps) {
  return useMemo(() => {
    const s = m4.getScaling(transform);
    const t = m4.getTranslation(transform);
    const scaledRange =
      direction === "x"
        ? range.map((r) => r * s[0] + t[0])
        : range.map((r) => r * s[1] + t[1]);
    return scaleBand().domain(domain).range(scaledRange);
  }, [domain, range]);
}

export default useBandScale;
