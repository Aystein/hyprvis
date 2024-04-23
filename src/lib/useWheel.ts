import { useRef, RefObject, useEffect } from 'react';
import { normalizeWheelEvent } from './normalizeWheelEvent';
import { Extent, NormalizedWheelEvent } from './interfaces';
import { outsideExtent, relativeMousePosition } from './util';

export interface UseWheelProps {
  callback: (event: NormalizedWheelEvent) => void;
  extent?: Extent;
}

/**
 * Adds active wheel listener to element and calls callback
 */
export function useWheel(ref: RefObject<HTMLElement>, props: UseWheelProps) {
  const propsRef = useRef(props);
  propsRef.current = props;

  console.log(propsRef.current);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return () => {};
    }

    const handler = (event: WheelEvent) => {
      const relativePosition = relativeMousePosition(element, {
        x: event.clientX,
        y: event.clientY,
      })

      const bounds = element.getBoundingClientRect();
      const extent = propsRef.current.extent || {
        x1: 0,
        x2: bounds.width,
        y1: 0,
        y2: bounds.height,
      };

      if (outsideExtent(relativePosition, extent)) {
        return;
      }

      event.preventDefault();

      propsRef.current.callback({
        ...normalizeWheelEvent(event),
        x: relativePosition.x,
        y: relativePosition.y,
      });
    };

    element.addEventListener('wheel', handler, { passive: false });

    return () => {
      element.removeEventListener('wheel', handler);
    };
  }, [ref]);
}
