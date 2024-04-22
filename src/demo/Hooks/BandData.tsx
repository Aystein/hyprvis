import { ScaleBand, ScaleLinear } from "d3-scale";
import { dinoData } from "../DinoData"

const barData = [
    {
        x: "A",
        y: 1
    },
    {
        x: "B",
        y: 3
    },
    {
        x: "C",
        y: 5
    },
    {
        x: "D",
        y: 9
    },
    {
        x: "E",
        y: 10
    },
]

export function BandData({ xScale, yScale, selection }: { xScale: ScaleBand<string>, yScale: ScaleLinear<number, number>, selection: number[] }) {
    return <>
        {
            barData.map((bar, i) => {
                return <rect
                    key={i}
                    x={xScale(bar.x)}
                    y={300 - yScale(bar.y)}
                    width={xScale.bandwidth()}
                    height={yScale(bar.y)}
                    r={4}
                    fill={selection?.includes(i) ? "red" : "rgb(31, 119, 180)"}
                    stroke="white"
                    />
            })
        }
    </>
}