import { useRef, useState } from "react";
import { Center } from "../Center";
import { useInteractions } from "../../lib";
import { clamp } from "../../lib/util";

export function Demo1() {
    const parentRef = useRef();
    const draggableRef = useRef();

    const [height, setHeight] = useState(200);

    useInteractions(draggableRef, {
        onDrag: (event) => {
            const parentBounds = parentRef.current.getBoundingClientRect();

            console.log(parentBounds);

            const relativeToParent = {
                x: event.clientX - parentBounds.left,
                y: event.clientY - parentBounds.top
            }

            setHeight(clamp(parentBounds.height - relativeToParent.y, 100, parentBounds.height - 4 - 200));
        }
    })

    return <Center>
        <div ref={parentRef} style={{ border: '1px solid black', width: 600, height: 800, position: 'relative' }}>
            <div style={{ border: '1px solid red', position: 'absolute', bottom: 0, left: 0, right: 0, height: height }}>
                {/* drag nipple */}
                <div ref={draggableRef} style={{ width: 16, height: 16, background: 'red', borderRadius: '50%', position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, 50%)' }}></div>
            </div>
        </div>
    </Center>
}