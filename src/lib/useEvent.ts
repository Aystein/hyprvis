import { useRef, useLayoutEffect, useCallback } from "react";

export function useEvent<T extends (...args: any[]) => any>(handler: T) {
  const handlerRef = useRef(handler);
  // In a real implementation, this would run before layout effects
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: any[]) => {
    const fn = handlerRef.current;
    return fn(...args);
  }, []);
}
