import { scaleLinear } from "d3-scale"
import { forwardRef, useMemo } from "react"
import { css } from "@emotion/css"

interface ScaleXProps {
    domain: [number, number];
    count: number;
}

const ScaleX = forwardRef<HTMLDivElement, ScaleXProps>(function ScaleX({ domain, count = 10 }: { domain: [number, number]; count: number; }, ref) {
    const scale = useMemo(() => {
        return scaleLinear().domain(domain).range([0, 100]);
    }, [domain]);

    const ticks = useMemo(() => {
        return scale.ticks(5);
    }, [scale, count]);

    // Set Transform origin to rightmost position
    // and ellipsis to hide overflow
    return <div ref={ref} className={css`
        height: 200px;
        position: relative;
    `}>
        {
            ticks.map((tick, i) => <div key={i} className={css`
                width: 1px;
                height: 8px;
                background-color: black;
                position: absolute;
                left: ${scale(tick)}%;
            `}></div>)
        }
        {ticks.map((tick, i) => <div key={i} className={css`
            position: absolute;
            left: ${scale(tick)}%;
            padding-right: 4px;
            transform-origin: 100% 50%;
            transform: translateX(-100%) rotateZ(-65deg);
            text-align: end;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 12px;
            max-width: 100px;
        `}>{tick}</div>)}
    </div>
})

export { ScaleX }