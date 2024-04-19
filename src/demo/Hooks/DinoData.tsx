import { ScaleLinear } from "d3-scale";
import { dinoData } from "../DinoData"

export function DinoData({ xScale, yScale, selection }: { xScale: ScaleLinear<number, number>, yScale: ScaleLinear<number, number>, selection: number[] }) {
    return <>
        {
            dinoData.map((dino, i) => {
                return <circle
                    key={i}
                    cx={xScale(dino.x)}
                    cy={yScale(dino.y)}
                    r={4}
                    fill={selection?.includes(i) ? "red" : "rgb(31, 119, 180)"}
                    stroke="white"
                    />
            })
        }
    </>
}

export const dinoDomainX = [Math.min(...dinoData.map(d => d.x)) - 5, Math.max(...dinoData.map(d => d.x)) + 5];
export const dinoDomainY = [Math.min(...dinoData.map(d => d.y)) - 5, Math.max(...dinoData.map(d => d.y)) + 5];