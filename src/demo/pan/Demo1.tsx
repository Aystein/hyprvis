import { useRef } from "react";
import { Center } from "../Center";
import { TransformTester } from "../TransformTester";
import { usePan } from "../../lib/usePan";
import { Brushable } from "../Brushable";

export function Demo1 () {
    const interactionRef = useRef();
    const { zoom } = usePan(interactionRef, {});

    return <Center>
        <Brushable ref={interactionRef}>
            <TransformTester zoom={zoom} />
        </Brushable>
    </Center>
}