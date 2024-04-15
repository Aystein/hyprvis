import { PropsWithChildren, forwardRef } from "react";

const Brushable = forwardRef<SVGSVGElement, PropsWithChildren<unknown>>(function Brushable(props, ref) {
    return <div style={{ width: 300, height: 300, border: '1px solid black' }}>
        <svg ref={ref} style={{ width: '100%', height: '100%' }}>
            {props.children}
        </svg>
    </div>
})

export { Brushable };