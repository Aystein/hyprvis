import { useRef } from "react";
import { Center } from "../Center";
import { TransformTester } from "../TransformTester";
import { usePan } from "../../lib/usePan";

export function Demo1 () {
    const interactionRef = useRef();
    const { zoom } = usePan(interactionRef, {});

    return <Center>
        <div ref={interactionRef} style={{ position: 'relative', width: 300, height: 300, overflow: 'hidden', border: '1px dashed black' }}>
            <TransformTester zoom={zoom} />
        </div>
    </Center>
}