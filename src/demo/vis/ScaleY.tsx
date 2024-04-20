import { scaleLinear } from "d3-scale"
import { forwardRef, useMemo } from "react"
import { css } from "@emotion/css"

interface ScaleYProps {
    domain: number[];
    count: number;
}

const ScaleY = forwardRef<HTMLDivElement, ScaleYProps>(function ScaleX({ domain, count = 10 }: { domain: [number, number]; count: number; }, ref) {
    const scale = useMemo(() => {
        return scaleLinear().domain(domain).range([0, 100]);
    }, [domain]);

    const ticks = useMemo(() => {
        return scale.ticks(5);
    }, [scale, count]);

    // Set Transform origin to rightmost position
    // and ellipsis to hide overflow
    return <div ref={ref} className={css`
        width: 200px;
        height: 100%;
        position: relative;
        user-select: none;
    `}>
        {
            ticks.map((tick, i) => <div key={i} className={css`
                width: 8px;
                height: 1px;
                background-color: black;
                position: absolute;
            `} style={{
                top: `${scale(tick)}%`
            }}></div>)
        }
        {ticks.map((tick, i) => <div key={i} className={css`
            position: absolute;
            transform-origin: 100% 50%;
            text-align: end;
            white-space: nowrap;
            overflow: hidden;
            transform: translateY(-50%);
            text-overflow: ellipsis;
            font-size: 12px;
            max-width: 100px;
            left: 10px;
        `}  style={{
            top: `${scale(tick)}%`
        }}>{tick}</div>)}
    </div>
})

export { ScaleY }