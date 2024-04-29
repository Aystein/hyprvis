import { Dispatch, RefObject } from "react";
import { Direction, ZoomTransform } from "../interfaces";
import { useInteractions } from "./useInteractions";
import { useControlledUncontrolled } from "./useControlledUncontrolled";
import { defaultConstraint } from "../transform";
import { m4 } from "../math";

interface UsePanProps {
  value?: ZoomTransform;
  onChange?: Dispatch<ZoomTransform>;
  defaultValue?: ZoomTransform;

  /**
   * Constrain the zoom transform.
   */
  constraint?: (transform: ZoomTransform) => ZoomTransform;

  /**
   * Direction to pan. 'x' pans horizontally, 'y' pans vertically, 'xy' pans both.
   */
  direction?: Direction;
}

export function usePan(ref: RefObject<HTMLElement>, options: UsePanProps = {}) {
  const [zoom, setZoom] = useControlledUncontrolled({
    value: options.value,
    defaultValue: options.defaultValue || m4.I(),
    onChange: options.onChange,
  });

  useInteractions(ref, {
    onDrag: (event) => {
      setZoom((prev) => {
        let newMatrix = m4.clone(prev);

        if (options.direction !== "y") {
          newMatrix[12] += event.movementX;
        }

        if (options.direction !== "x") {
          newMatrix[13] += event.movementY;
        }

        if (options.constraint) {
          newMatrix = options.constraint(newMatrix);
        } else {
          const bounds = ref.current.getBoundingClientRect();

          newMatrix = defaultConstraint(newMatrix, bounds.width, bounds.height);
        }

        return newMatrix;
      });
    },
  });

  return { value: zoom, setValue: setZoom };
}
